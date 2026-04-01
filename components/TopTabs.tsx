"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Hub" },
  { href: "/vote", label: "Vote" },
  { href: "/poll/base-open-poll", label: "Results" },
  { href: "/my", label: "My Vote" },
  { href: "/leaderboard", label: "Leaderboard" },
];

export function TopTabs() {
  const pathname = usePathname();

  return (
    <nav className="top-tabs" aria-label="Primary">
      {tabs.map((tab) => {
        const isActive =
          tab.href === "/"
            ? pathname === "/"
            : pathname === tab.href || pathname.startsWith(`${tab.href}/`);

        return (
          <Link key={tab.href} href={tab.href} className={isActive ? "active" : ""}>
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
