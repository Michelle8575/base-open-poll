"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletButton } from "@/components/WalletButton";

export function CivicHeader() {
  const pathname = usePathname();

  return (
    <header className="civic-header">
      <div className="civic-header-inner">
        <Link href="/" className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">
            <span />
          </div>
          <div className="brand-copy">
            <strong>base-open-poll</strong>
            <span>{pathname === "/" ? "public decision board" : "open civic signal forum"}</span>
          </div>
        </Link>
        <WalletButton />
      </div>
    </header>
  );
}
