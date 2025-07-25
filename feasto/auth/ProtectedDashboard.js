// components/ProtectedDashboard.jsx
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function ProtectedDashboard({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push("/staff-login");
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  if (loading)
    return <div className="text-white text-center mt-20">Loading...</div>;

  return <>{children}</>;
}
