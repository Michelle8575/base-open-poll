import { PollStatusChip } from "@/components/PollStatusChip";
import type { PollOptionView } from "@/lib/poll";

type VoteOptionSelectorProps = {
  options: PollOptionView[];
  selectedOption: number | null;
  onSelect: (index: number) => void;
  disabled?: boolean;
  winnerIndex: number;
};

export function VoteOptionSelector({
  options,
  selectedOption,
  onSelect,
  disabled,
  winnerIndex,
}: VoteOptionSelectorProps) {
  return (
    <div className="vote-options">
      {options.map((option, index) => {
        const isSelected = selectedOption === index;
        const isLeading = winnerIndex === index;

        return (
          <button
            key={option.id}
            type="button"
            className={`vote-option ${isSelected ? "vote-option-selected" : ""} ${isLeading ? "vote-option-leading" : ""}`}
            onClick={() => onSelect(index)}
            disabled={disabled}
          >
            <header>
              <div>
                <p className="eyebrow">Option {index + 1}</p>
                <h3>{option.label}</h3>
              </div>
              {isLeading ? <PollStatusChip tone="winner" label="Leading" /> : null}
            </header>
            <p>{option.votes} public votes counted</p>
          </button>
        );
      })}
    </div>
  );
}
