"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { pollAbi, pollContract } from "@/lib/contract";

export type PollOptionView = {
  id: string;
  label: string;
  votes: number;
  share: number;
};

export type WinnerView = {
  index: number;
  label: string;
  votes: number;
  share: number;
};

export type PollState = {
  poll: {
    id: string;
    contractAddress: string;
  };
  question: string;
  options: PollOptionView[];
  rankedOptions: PollOptionView[];
  winner: WinnerView;
  totalVotes: number;
  hasVoted: boolean;
  userVote: PollOptionView | null;
};

const fallbackQuestion = "Which public signal should lead the board today?";
const fallbackOptions = ["Open Access", "Civic Clarity", "Faster Execution"];
const fallbackVotes = [7, 11, 5];
const VOTE_STORAGE_KEY = "base-open-poll:vote";

function toNumber(value: unknown, fallback = 0) {
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "number") return value;
  return fallback;
}

export function usePollState(): PollState {
  const { address } = useAccount();
  const [storedVoteIndex, setStoredVoteIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!address) {
      setStoredVoteIndex(null);
      return;
    }

    const storedValue = window.localStorage.getItem(`${VOTE_STORAGE_KEY}:${address.toLowerCase()}`);
    setStoredVoteIndex(storedValue === null ? null : Number(storedValue));
  }, [address]);

  const { data: countData } = useReadContract({
    address: pollContract,
    abi: pollAbi,
    functionName: "getOptionsCount",
    query: { staleTime: 15000 },
  });

  const { data: questionData } = useReadContract({
    address: pollContract,
    abi: pollAbi,
    functionName: "question",
    query: { staleTime: 15000 },
  });

  const { data: totalVotesData } = useReadContract({
    address: pollContract,
    abi: pollAbi,
    functionName: "totalVotes",
    query: { staleTime: 15000 },
  });

  const { data: winnerData } = useReadContract({
    address: pollContract,
    abi: pollAbi,
    functionName: "getWinner",
    query: { staleTime: 15000 },
  });

  const { data: votedData } = useReadContract({
    address: pollContract,
    abi: pollAbi,
    functionName: "voted",
    args: address ? [address] : undefined,
    query: {
      staleTime: 15000,
      enabled: Boolean(address),
    },
  });

  const optionCount = countData ? Number(countData) : fallbackOptions.length;
  const optionIndexes = Array.from({ length: optionCount }, (_, index) => index);

  const { data: optionData } = useReadContracts({
    allowFailure: true,
    contracts: optionIndexes.flatMap((index) => [
      {
        address: pollContract,
        abi: pollAbi,
        functionName: "options",
        args: [BigInt(index)],
      },
      {
        address: pollContract,
        abi: pollAbi,
        functionName: "votes",
        args: [BigInt(index)],
      },
    ]),
    query: {
      staleTime: 15000,
      enabled: optionIndexes.length > 0,
    },
  });

  return useMemo(() => {
    const question = questionData || fallbackQuestion;
    const onchainTotalVotes = toNumber(totalVotesData);
    const winnerTuple = winnerData as readonly [bigint, bigint] | undefined;
    const hasVoted = Boolean(votedData);

    const optionsFromChain = optionIndexes.map((index) => {
      const labelResult = optionData?.[index * 2]?.result;
      const votesResult = optionData?.[index * 2 + 1]?.result;

      return {
        id: `option-${index + 1}`,
        label:
          typeof labelResult === "string" && labelResult.length > 0
            ? labelResult
            : fallbackOptions[index] || `Option ${index + 1}`,
        votes: toNumber(votesResult, fallbackVotes[index] || 0),
        share: 0,
      };
    });

    const options = optionsFromChain.length
      ? optionsFromChain
      : fallbackOptions.map((label, index) => ({
          id: `option-${index + 1}`,
          label,
          votes: fallbackVotes[index],
          share: 0,
        }));

    const derivedTotalVotes = options.reduce((sum, option) => sum + option.votes, 0);
    const totalVotes = onchainTotalVotes || derivedTotalVotes;

    const normalizedOptions = options.map((option) => ({
      ...option,
      share: totalVotes > 0 ? Math.max(3, Math.round((option.votes / totalVotes) * 100)) : 0,
    }));

    const rankedOptions = [...normalizedOptions].sort((left, right) => right.votes - left.votes);
    const fallbackWinner = rankedOptions[0];
    const winnerIndex = winnerTuple
      ? Number(winnerTuple[0])
      : normalizedOptions.findIndex((item) => item.id === fallbackWinner?.id);
    const resolvedWinner = normalizedOptions[winnerIndex] || fallbackWinner;
    const userVote =
      storedVoteIndex !== null && normalizedOptions[storedVoteIndex]
        ? normalizedOptions[storedVoteIndex]
        : null;

    return {
      poll: {
        id: "base-open-poll",
        contractAddress: pollContract,
      },
      question,
      options: normalizedOptions,
      rankedOptions,
      winner: {
        index: winnerIndex >= 0 ? winnerIndex : 0,
        label: resolvedWinner?.label || "No winner yet",
        votes: winnerTuple ? Number(winnerTuple[1]) : resolvedWinner?.votes || 0,
        share: resolvedWinner?.share || 0,
      },
      totalVotes,
      hasVoted,
      userVote,
    };
  }, [optionData, optionIndexes, questionData, storedVoteIndex, totalVotesData, votedData, winnerData]);
}
