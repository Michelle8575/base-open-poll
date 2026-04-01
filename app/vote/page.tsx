"use client";

import { useState } from "react";
import { ForumSideRail } from "@/components/ForumSideRail";
import { TopTabs } from "@/components/TopTabs";
import { VoteOptionSelector } from "@/components/VoteOptionSelector";
import { CastVoteButton } from "@/components/CastVoteButton";
import { PollStatusChip } from "@/components/PollStatusChip";
import { WinnerCard } from "@/components/WinnerCard";
import { ResultBoard } from "@/components/ResultBoard";
import { usePollState } from "@/lib/poll";

export default function VotePage() {
  const poll = usePollState();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  return (
    <main className="page-wrap vote-layout">
      <TopTabs />
      <div className="forum-grid">
        <ForumSideRail
          title="Vote Rules"
          eyebrow="Decision Panel"
          items={[
            "One wallet can vote once",
            "Votes are counted in public",
            "Select one option only",
            "Winner updates after each count",
          ]}
        />
        <section className="vote-stage">
          <div className="section-head">
            <div>
              <p className="eyebrow">Decision Console</p>
              <h1>{poll.question}</h1>
            </div>
            <PollStatusChip
              tone={poll.hasVoted ? "counted" : "ready"}
              label={poll.hasVoted ? "Already Counted" : "Select An Option"}
            />
          </div>
          <VoteOptionSelector
            options={poll.options}
            selectedOption={selectedOption}
            onSelect={setSelectedOption}
            disabled={poll.hasVoted}
            winnerIndex={poll.winner.index}
          />
          <div className="vote-action-row">
            <div className="rule-banner">
              <span>One wallet one vote</span>
              <span>{poll.hasVoted ? "This wallet has already voted." : "This wallet is ready to vote."}</span>
            </div>
            <CastVoteButton selectedOption={selectedOption} disabled={poll.hasVoted} />
          </div>
        </section>
        <aside className="result-panel">
          <div className="panel-stack">
            <WinnerCard winner={poll.winner} totalVotes={poll.totalVotes} label="Lead Signal" compact />
            <div className="slab">
              <p className="eyebrow">Public Count Board</p>
              <ResultBoard poll={poll} highlightWinner />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
