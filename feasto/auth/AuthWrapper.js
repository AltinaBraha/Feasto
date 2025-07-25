// components/AuthWrapper.jsx
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AuthWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading)
    return <div className="text-white text-center mt-20">Loading...</div>;

  // nëse s’është i loguar, s’lejojmë qasje
  if (!user) {
    return (
      <div className="text-center mt-20 text-red-500 font-semibold">
        You must be logged in to view this page.
      </div>
    );
  }

  return <>{children}</>; // në rregull, shfaq përmbajtjen
}
