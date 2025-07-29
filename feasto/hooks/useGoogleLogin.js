import { signInWithGoogle } from "@/lib/firebase/googleLogin";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuthStore } from "@/lib/store/authStore";
import { getFirebaseErrorMessage } from "@/lib/firebase/errorMessages";

export const useGoogleLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const loginWithGoogle = async () => {
    const { user, error } = await signInWithGoogle();
    if (error) throw new Error(getFirebaseErrorMessage(error.code));

    await setDoc(
      doc(db, "users", user.uid),
      {
        fullName: user.displayName,
        email: user.email,
        role: "customer",
        createdAt: new Date(),
      },
      { merge: true }
    );

    setUser(user);
    return user;
  };

  return { loginWithGoogle };
};
