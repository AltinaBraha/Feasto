"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { FaUserCircle } from "react-icons/fa";
import { useAuthStore } from "@/lib/store/authStore";
import AuthModal from "./AuthModal";
import UserDropdown from "./UserDropdown";

export default function AuthButton() {
  const t = useTranslations("Header");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, initAuthListener, logout } = useAuthStore();

  useEffect(() => {
    initAuthListener();
  }, [initAuthListener]);

   useEffect(() => {
    if (user) {
      console.log("Logged user:", user);
    }
  }, [user]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hidden md:flex items-center cursor-pointer text-xs tracking-wide font-bold gap-2 text-white"
          aria-label={t("menu.loginSignUp")}
          type="button"
        >
          <FaUserCircle size={20} />
          <span>{t("menu.loginSignUp")}</span>
        </button>

        <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  }

  return (
    <div className="relative hidden md:block" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="flex items-center cursor-pointer text-xs tracking-wide font-bold gap-2 text-white hover:text-orange-400 transition"
        aria-label="User Menu"
        type="button"
      >
        <FaUserCircle size={20} />
       <span className="text-sm">
  {user.fullName || user.displayName }
</span>
      </button>

      {isDropdownOpen && <UserDropdown logout={logout} t={t} />}
    </div>
  );
}
