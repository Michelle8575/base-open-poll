"use client";

import { useEffect } from "react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { pollAbi, pollContract } from "@/lib/contract";
import { trackTransaction } from "@/utils/track";

const VOTE_STORAGE_KEY = "base-open-poll:vote";

type CastVoteButtonProps = {
  selectedOption: number | null;
  disabled?: boolean;
};

export function CastVoteButton({ selectedOption, disabled }: CastVoteButtonProps) {
  const { address } = useAccount();
  const { data: hash, isPending, writeContract, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess && hash && address && selectedOption !== null) {
      window.localStorage.setItem(`${VOTE_STORAGE_KEY}:${address.toLowerCase()}`, String(selectedOption));
      trackTransaction("app-001", "base-open-poll", address, hash);
    }
  }, [address, hash, isSuccess, selectedOption]);

  const label = disabled
    ? "Vote Counted"
    : isPending
      ? "Confirm In Wallet"
      : isConfirming
        ? "Counting Vote..."
        : "Cast Vote";

  return (
    <button
      className="cast-vote-button"
      type="button"
      disabled={disabled || selectedOption === null || isPending || isConfirming}
      onClick={() =>
        selectedOption !== null &&
        writeContract({
          address: pollContract,
          abi: pollAbi,
          functionName: "vote",
          args: [BigInt(selectedOption)],
        })
      }
    >
      {label}
      {error ? " Retry" : ""}
    </button>
  );
}
