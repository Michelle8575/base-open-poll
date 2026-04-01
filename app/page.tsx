"use client";

import Link from "next/link";
import { ForumSideRail } from "@/components/ForumSideRail";
import { TopTabs } from "@/components/TopTabs";
import { PollStatusChip } from "@/components/PollStatusChip";
import { WinnerCard } from "@/components/WinnerCard";
import { VoteSummaryPanel } from "@/components/VoteSummaryPanel";
import { ResultBoard } from "@/components/ResultBoard";
import { ActionBar } from "@/components/ActionBar";
import { usePollState } from "@/lib/poll";

export default function HomePage() {
  const poll = usePollState();

  return (
    <main className="page-wrap hub-layout">
      <TopTabs />
      <div className="forum-grid">
        <ForumSideRail
          title="Open Signal"
          eyebrow="Poll Hub"
          items={[
            "One wallet, one public vote",
            "Live winner signal",
            "Open count board",
            "Fast route to results",
          ]}
        />
        <section className="main-panel">
          <div className="section-head">
            <div>
              <p className="eyebrow">Public Poll Hub</p>
              <h1>Cast a vote. Watch the lead change.</h1>
            </div>
            <PollStatusChip
              tone={poll.hasVoted ? "winner" : "ready"}
              label={poll.hasVoted ? "Vote Recorded" : "Ready To Vote"}
            />
          </div>
          <ActionBar
            primaryHref="/vote"
            primaryLabel="Cast Vote"
            secondaryHref={`/poll/${poll.poll.id}`}
            secondaryLabel="View Results"
          />
          <div className="hero-board">
            <WinnerCard
              winner={poll.winner}
              totalVotes={poll.totalVotes}
              label="Current Winner"
              compact={false}
            />
            <VoteSummaryPanel poll={poll} mode="hub" />
          </div>
        </section>
        <aside className="result-panel">
          <div className="panel-stack">
            <div className="slab">
              <p className="eyebrow">Live Count</p>
              <ResultBoard poll={poll} highlightWinner />
            </div>
            <div className="slab muted-slab">
              <p className="eyebrow">Quick Routes</p>
              <div className="quick-links">
                <Link href="/my">My Vote</Link>
                <Link href="/leaderboard">Leaderboard</Link>
                <Link href={`/poll/${poll.poll.id}`}>Result Detail</Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
