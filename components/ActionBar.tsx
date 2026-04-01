import Link from "next/link";

type ActionBarProps = {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export function ActionBar({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: ActionBarProps) {
  return (
    <div className="action-bar">
      <Link href={primaryHref} className="button-link button-link-primary">
        {primaryLabel}
      </Link>
      <Link href={secondaryHref} className="button-link button-link-secondary">
        {secondaryLabel}
      </Link>
    </div>
  );
}
