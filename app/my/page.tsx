"use client";

import Link from "next/link";
import { TopTabs } from "@/components/TopTabs";
import { VoteSummaryPanel } from "@/components/VoteSummaryPanel";
import { EmptyState } from "@/components/EmptyState";
import { PollStatusChip } from "@/components/PollStatusChip";
import { usePollState } from "@/lib/poll";

export default function MyVotePage() {
  const poll = usePollState();

  return (
    <main className="page-wrap my-layout">
      <TopTabs />
      <section className="my-stage">
        <div className="section-head split-head">
          <div>
            <p className="eyebrow">My Vote</p>
            <h1>Your participation summary.</h1>
          </div>
          <PollStatusChip tone={poll.hasVoted ? "counted" : "ready"} label={poll.hasVoted ? "Vote Found" : "No Vote Yet"} />
        </div>

        {poll.hasVoted ? (
          <div className="my-grid">
            <VoteSummaryPanel poll={poll} mode="personal" />
            <div className="my-links slab">
              <p className="eyebrow">Next Step</p>
              <Link href={`/poll/${poll.poll.id}`}>Open Result Detail</Link>
              <Link href="/leaderboard">Open Leaderboard</Link>
              <Link href="/vote">Review Poll Options</Link>
            </div>
          </div>
        ) : (
          <EmptyState
            title="No vote recorded for this wallet."
            description="Connect a wallet and cast one public vote."
            actionHref="/vote"
            actionLabel="Go To Vote"
          />
        )}
      </section>
    </main>
  );
}
