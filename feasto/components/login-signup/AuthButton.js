"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";
import AuthModal from "./login-signup";
export default function AuthButton() {
  const t = useTranslations("Header");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (!user) {
    return (
      <>
        <button
 onClick={() => setIsModalOpen(true)}       
  className="hidden md:inline-flex items-center gap-2 border border-white px-4 py-2 rounded bg-transparent hover:bg-white hover:text-black transition text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 h-10"
        aria-label={t("menu.loginSignUp")}
        type="button"
        >
        <FaUserCircle size={18} />
        {t("menu.loginSignUp")}
        </button>


      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  }

  return (
    <div className="hidden md:inline-flex items-center gap-4 text-white text-sm">
      <FaUserCircle size={20} />
      <span className="max-w-[120px] truncate">{user.email}</span>
      <button
        onClick={handleLogout}
        className="border border-white px-4 py-2 rounded bg-transparent hover:bg-white hover:text-black transition font-semibold focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Logout"
        type="button"
      >
        Logout
      </button>
    </div>
  );
}
