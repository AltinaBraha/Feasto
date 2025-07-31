"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SeeOurTeamButton() {
  const t = useTranslations("about-us.aboutContent");

  return (
    <Link
      href="/our-chefs"
      className="inline-block text-black font-semibold tracking-wide hover:underline"
    >
      {t("seeOurTeam")} →
    </Link>
  );
}
