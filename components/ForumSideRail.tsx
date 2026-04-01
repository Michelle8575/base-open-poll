type ForumSideRailProps = {
  eyebrow: string;
  title: string;
  items: string[];
};

export function ForumSideRail({ eyebrow, title, items }: ForumSideRailProps) {
  return (
    <aside className="side-rail">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div className="rail-list">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </aside>
  );
}
