"use client";

import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { useTranslations } from "next-intl";

export default function AccountCard({
  icon,
  iconBg,
  titleKey,
  descriptionKey,
  actionKey,
  href,
  count,
  actionHref,
}) {
  const t = useTranslations("AccountCard");

  const title = t(titleKey);
  const description = t(descriptionKey);
  const actionText = actionKey ? t(actionKey) : null;

  return (
    <div className="border rounded-xl bg-white shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 p-6 flex flex-col justify-between border-gray-200">
      <div className="flex items-center gap-4 mb-5">
        <div
          className={`rounded-full p-3 flex items-center justify-center ${iconBg}`}
          style={{ width: 44, height: 44 }}
          aria-hidden="true"
        >
          {icon}
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      </div>

      {count != null && (
        <p className="text-3xl font-extrabold text-gray-900 mb-3">{count}</p>
      )}

      <p className="text-gray-600 text-sm leading-relaxed mb-6">{description}</p>

      <div className="flex flex-col gap-2 mt-auto">
        <Link href={href} className="text-sm font-medium text-gray-700 hover:text-gray-900 underline">
          {t("view")} {title}
        </Link>
        {actionText && actionHref && (
          <Link href={actionHref}>
            <button className="w-full mt-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 transition">
              <FiPlus className="w-4 h-4" />
              {actionText}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
