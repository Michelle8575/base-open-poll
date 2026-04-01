"use client";

import { TopTabs } from "@/components/TopTabs";
import { PollStatusChip } from "@/components/PollStatusChip";
import { usePollState } from "@/lib/poll";

export default function LeaderboardPage() {
  const poll = usePollState();

  return (
    <main className="page-wrap leaderboard-layout">
      <TopTabs />
      <section className="leaderboard-stage">
        <div className="section-head">
          <div>
            <p className="eyebrow">Leaderboard</p>
            <h1>Public ranking and lead spread.</h1>
          </div>
          <PollStatusChip tone="winner" label="Live Ranking" />
        </div>

        <div className="ranking-board">
          {poll.rankedOptions.map((option, index) => (
            <article
              key={option.id}
              className={`rank-row ${index === 0 ? "rank-row-leading" : ""}`}
            >
              <div className="rank-index">0{index + 1}</div>
              <div className="rank-copy">
                <h2>{option.label}</h2>
                <p>{option.votes} votes</p>
              </div>
              <div className="rank-bar">
                <span style={{ width: `${option.share}%` }} />
              </div>
              <div className="rank-share">{option.share}%</div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
