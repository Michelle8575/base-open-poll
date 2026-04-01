type PollStatusChipProps = {
  label: string;
  tone: "ready" | "counted" | "winner" | "copied";
};

export function PollStatusChip({ label, tone }: PollStatusChipProps) {
  return <span className={`chip chip-${tone}`}>{label}</span>;
}
