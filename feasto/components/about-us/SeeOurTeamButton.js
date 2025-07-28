"use client";

import Link from "next/link";

export default function SeeOurTeamButton() {
  return (
    <Link
      href="/our-chefs"
      className="inline-block text-black font-semibold tracking-wide hover:underline"
    >
      SEE OUR TEAM →
    </Link>
  );
}
