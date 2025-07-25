"use client";

import TypewriterParagraph from "@/components/TypewriterParagraph";
import { useTranslations } from "next-intl";

export default function AboutUsClientWrapper() {
  const t = useTranslations("about-us");

  return (
    <div className="mt-14 px-4 sm:px-6 py-4 rounded-md max-w-6xl mx-auto mb-6">
      <TypewriterParagraph text={t("introParagraph")} />
      <div className="mt-8"></div>
    </div>
  );
}
