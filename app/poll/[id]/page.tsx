"use client";

import Link from "next/link";
import { TopTabs } from "@/components/TopTabs";
import { WinnerCard } from "@/components/WinnerCard";
import { ResultBoard } from "@/components/ResultBoard";
import { PollStatusChip } from "@/components/PollStatusChip";
import { CopyResultButton } from "@/components/CopyResultButton";
import { usePollState } from "@/lib/poll";

export default function PollDetailPage() {
  const poll = usePollState();

  return (
    <main className="page-wrap detail-layout">
      <TopTabs />
      <section className="detail-stage">
        <div className="detail-header">
          <div>
            <p className="eyebrow">Poll Result Detail</p>
            <h1>Result board in public view.</h1>
          </div>
          <div className="detail-actions">
            <PollStatusChip tone="winner" label="Winner Visible" />
            <CopyResultButton poll={poll} />
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-hero">
            <WinnerCard winner={poll.winner} totalVotes={poll.totalVotes} label="Current Winner" compact={false} />
            <div className="status-strip">
              <PollStatusChip tone="counted" label="Public Counted" />
              <PollStatusChip tone="ready" label={`Poll ID ${poll.poll.id}`} />
              <PollStatusChip tone="copied" label="Share Ready" />
            </div>
          </div>
          <div className="detail-board slab">
            <p className="eyebrow">Count Detail</p>
            <ResultBoard poll={poll} highlightWinner />
          </div>
        </div>

        <div className="detail-footer">
          <span>
            Contract: {poll.poll.contractAddress.slice(0, 6)}...
            {poll.poll.contractAddress.slice(-4)}
          </span>
          <Link href="/vote">Back To Vote</Link>
        </div>
      </section>
    </main>
  );
}
