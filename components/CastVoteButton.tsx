"use client";

import { useEffect, useState } from "react";
import { encodeFunctionData } from "viem";
import { base } from "wagmi/chains";
import { useAccount, useSendCallsSync, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { pollAbi, pollContract } from "@/lib/contract";
import { APP_NAME, BUILDER_CODE_DATA_SUFFIX, TRACKING_APP_ID } from "@/lib/app-config";
import { trackTransaction } from "@/utils/track";

const VOTE_STORAGE_KEY = "base-open-poll:vote";

type CastVoteButtonProps = {
  selectedOption: number | null;
  disabled?: boolean;
};

export function CastVoteButton({ selectedOption, disabled }: CastVoteButtonProps) {
  const { address } = useAccount();
  const { sendCallsSyncAsync, isPending: isSendingCalls, error: sendCallsError } = useSendCallsSync();
  const { data: fallbackHash, isPending: isWriting, writeContract, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: fallbackHash });
  const [trackedHash, setTrackedHash] = useState<string | null>(null);

  useEffect(() => {
    if (isSuccess && fallbackHash && address && selectedOption !== null && trackedHash !== fallbackHash) {
      window.localStorage.setItem(`${VOTE_STORAGE_KEY}:${address.toLowerCase()}`, String(selectedOption));
      setTrackedHash(fallbackHash);
      trackTransaction(TRACKING_APP_ID, APP_NAME, address, fallbackHash);
    }
  }, [address, fallbackHash, isSuccess, selectedOption, trackedHash]);

  const label = disabled
    ? "Vote Counted"
    : isSendingCalls || isWriting
      ? "Confirm In Wallet"
      : isConfirming
        ? "Counting Vote..."
        : "Cast Vote";

  async function handleCastVote() {
    if (selectedOption === null || !address) return;

    const data = encodeFunctionData({
      abi: pollAbi,
      functionName: "vote",
      args: [BigInt(selectedOption)],
    });

    try {
      const result = await sendCallsSyncAsync({
        account: address,
        chainId: base.id,
        calls: [
          {
            to: pollContract,
            data,
            value: BigInt(0),
          },
        ],
        capabilities: {
          dataSuffix: {
            value: BUILDER_CODE_DATA_SUFFIX,
            optional: true,
          },
        },
      });

      const txHash = result.receipts?.[0]?.transactionHash;
      if (txHash && trackedHash !== txHash) {
        window.localStorage.setItem(`${VOTE_STORAGE_KEY}:${address.toLowerCase()}`, String(selectedOption));
        setTrackedHash(txHash);
        trackTransaction(TRACKING_APP_ID, APP_NAME, address, txHash);
      }
    } catch {
      writeContract({
        address: pollContract,
        abi: pollAbi,
        functionName: "vote",
        args: [BigInt(selectedOption)],
      });
    }
  }

  const combinedError = sendCallsError || writeError;

  return (
    <button
      className="cast-vote-button"
      type="button"
      disabled={disabled || selectedOption === null || isSendingCalls || isWriting || isConfirming}
      onClick={handleCastVote}
    >
      {label}
      {combinedError ? " Retry" : ""}
    </button>
  );
}
