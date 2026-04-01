import type { WinnerView } from "@/lib/poll";

type WinnerCardProps = {
  label: string;
  winner: WinnerView;
  totalVotes: number;
  compact?: boolean;
};

export function WinnerCard({ label, winner, totalVotes, compact }: WinnerCardProps) {
  return (
    <section className="winner-card">
      <div className="winner-meta">
        <div>
          <p className="eyebrow">{label}</p>
          <h2>{winner.label}</h2>
        </div>
        <span className="chip chip-winner">Winner</span>
      </div>
      <div className="winner-stats">
        <span>{winner.votes} votes</span>
        <span>{winner.share}% share</span>
        <span>{totalVotes} total counted</span>
      </div>
      {!compact ? <p className="micro-copy">Updated from public Base poll state.</p> : null}
    </section>
  );
}
