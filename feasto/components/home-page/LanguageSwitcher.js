"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "xk", label: "AL" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLocale = LANGUAGES.some(({ code }) => pathname.startsWith(`/${code}`))
    ? pathname.split("/")[1]
    : "en";

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (newLocale) => {
    setOpen(false);
    let newPath = pathname;

    if (LANGUAGES.some(({ code }) => pathname.startsWith(`/${code}`))) {
      newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    } else {
      newPath = `/${newLocale}${pathname}`;
    }

    const query = searchParams.toString();
    router.push(newPath + (query ? `?${query}` : ""));
  };

  return (
    <li
      ref={dropdownRef}
      className="relative cursor-pointer text-xs font-bold"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1
          after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-orange-500 
          after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300
          hover:after:scale-x-100
          focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        aria-haspopup="true"
        aria-expanded={open}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-orange-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2v20" />
        </svg>

        <span>
          {" "}
          {LANGUAGES.find(({ code }) => code === currentLocale)?.label.toUpperCase() || "ENGLISH"}
        </span>

        <span className="ml-1 text-[8px]">&#x25BC;</span>
      </button>

      <ul
        className={`
          absolute left-0 top-full mt-2 w-44 bg-black bg-opacity-90 rounded shadow-lg
          transition-opacity duration-300 z-50
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        role="menu"
      >
        {LANGUAGES.map(({ code, label }) => (
          <li
            key={code}
            onClick={() => changeLanguage(code)}
            className={`px-4 py-2 hover:bg-orange-600 cursor-pointer select-none ${
              code === currentLocale
                ? "font-semibold bg-orange-600 text-white"
                : "text-white"
            }`}
            role="menuitem"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") changeLanguage(code);
            }}
          >
            {label}
          </li>
        ))}
      </ul>
    </li>
  );
}
