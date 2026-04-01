import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description: string;
  actionHref: string;
  actionLabel: string;
};

export function EmptyState({ title, description, actionHref, actionLabel }: EmptyStateProps) {
  return (
    <section className="empty-state">
      <p className="eyebrow">No Record</p>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link href={actionHref} className="button-link button-link-primary">
        {actionLabel}
      </Link>
    </section>
  );
}
