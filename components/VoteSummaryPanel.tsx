import type { PollState } from "@/lib/poll";

type VoteSummaryPanelProps = {
  poll: PollState;
  mode: "hub" | "personal";
};

export function VoteSummaryPanel({ poll, mode }: VoteSummaryPanelProps) {
  const title = mode === "hub" ? "Wallet Status" : "Participation Record";
  const selected = poll.userVote
    ? poll.userVote.label
    : poll.hasVoted
      ? "Recorded Onchain"
      : "No vote yet";

  return (
    <section className="summary-panel">
      <p className="eyebrow">{mode === "hub" ? "Status" : "Summary"}</p>
      <h3>{title}</h3>
      <div className="summary-grid">
        <div className="summary-metric">
          <span>Wallet vote state</span>
          <strong>{poll.hasVoted ? "Voted" : "Ready"}</strong>
        </div>
        <div className="summary-metric">
          <span>Selected option</span>
          <strong>{selected}</strong>
        </div>
        <div className="summary-metric">
          <span>Current leader</span>
          <strong>{poll.winner.label}</strong>
        </div>
      </div>
    </section>
  );
}
