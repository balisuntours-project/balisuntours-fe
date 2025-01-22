"use client"

import Link from "next/link";

export function CustomLink({ href, children }: { href: string; children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const newTab = window.open(href, "_blank");
    if (newTab) {
      newTab.focus();
    }
  };

  return (
    <Link href={href} passHref legacyBehavior>
      <a onClick={handleClick}>{children}</a>
    </Link>
  );
}
