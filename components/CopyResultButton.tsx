"use client";

import { useState } from "react";
import type { PollState } from "@/lib/poll";

type CopyResultButtonProps = {
  poll: PollState;
};

export function CopyResultButton({ poll }: CopyResultButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const lines = poll.options.map((option) => `${option.label}: ${option.votes}`);
    const payload = [`Winner: ${poll.winner.label}`, ...lines].join("\n");
    await navigator.clipboard.writeText(payload);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button className="copy-button" type="button" onClick={handleCopy}>
      {copied ? "Copied" : "Copy Result"}
    </button>
  );
}
