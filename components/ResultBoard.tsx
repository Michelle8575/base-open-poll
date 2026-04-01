import type { PollState } from "@/lib/poll";

type ResultBoardProps = {
  poll: PollState;
  highlightWinner?: boolean;
};

export function ResultBoard({ poll, highlightWinner }: ResultBoardProps) {
  return (
    <div className="result-board">
      {poll.options.map((option, index) => {
        const isLeader = highlightWinner && index === poll.winner.index;

        return (
          <div key={option.id} className={`result-row ${isLeader ? "result-row-leading" : ""}`}>
            <strong>{option.label}</strong>
            <div className="result-bar">
              <span style={{ width: `${option.share}%` }} />
            </div>
            <span>{option.votes}</span>
          </div>
        );
      })}
    </div>
  );
}
