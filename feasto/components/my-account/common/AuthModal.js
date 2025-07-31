"use client";

import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAuthStore } from "@/lib/stores/authStore";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";
import { getFirebaseErrorMessage } from "@/lib/firebase/errorMessages";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl"; 


export default function AuthModal({ isOpen, onClose }) {
  const t = useTranslations();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const { loginWithGoogle } = useGoogleLogin();
  const setUser = useAuthStore((state) => state.setUser);
    const locale = useLocale(); 


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      setFormData({ fullName: "", email: "", phone: "", password: "" });
      setErrors({});
      setIsLogin(true);
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const e = {};
    if (!formData.email) e.email = t("auth.email") + " " + t("auth.required");
    if (!formData.password)
      e.password = t("auth.password") + " " + t("auth.required");
    if (!isLogin) {
      if (!formData.fullName)
        e.fullName = t("auth.fullName") + " " + t("auth.required");
      if (!formData.phone) e.phone = t("auth.phone") + " " + t("auth.required");
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const redirectBasedOnEmail = async (email) => {
  if (email.endsWith("@feasto.com")) {
    await router.push(`/${locale}/dashboard`);
  } else {
    await router.push(`/${locale}/my-account`);
  }
};
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      let cred;
      if (isLogin) {
        cred = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
      } else {
        cred = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        await updateProfile(cred.user, { displayName: formData.fullName });

        await setDoc(doc(db, "users", cred.user.uid), {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          role: "customer",
          createdAt: new Date(),
        });
      }

      setUser(cred.user);
      redirectBasedOnEmail(cred.user.email);
      onClose();
    } catch (err) {
      setErrors({ firebase: getFirebaseErrorMessage(err.code) });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      const user = auth.currentUser;
      setUser(user);
      redirectBasedOnEmail(user.email);
      onClose();
    } catch (err) {
      setErrors({ firebase: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition"
          type="button"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {isLogin ? t("auth.login") : t("auth.signup")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {!isLogin && (
            <>
              <div>
                <label
                  className="block font-medium mb-1 text-gray-700"
                  htmlFor="fullName"
                >
                  {t("auth.fullName")}
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full border rounded px-3 py-2 text-black focus:outline-none focus:ring-2 ${
                    errors.fullName
                      ? "border-red-600 focus:ring-red-500"
                      : "border-gray-300 focus:ring-gray-400"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label
                  className="block font-medium mb-1 text-gray-700"
                  htmlFor="phone"
                >
                  {t("auth.phone")}
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full border rounded px-3 py-2 text-black focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-gray-400"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </>
          )}

          <div>
            <label
              className="block font-medium mb-1 text-gray-700"
              htmlFor="email"
            >
              {t("auth.email")}
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 text-black focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-gray-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              className="block font-medium mb-1 text-gray-700"
              htmlFor="password"
            >
              {t("auth.password")}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 text-black focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-gray-400"
              }`}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {errors.firebase && (
            <p className="text-red-600 text-sm mt-1">
              {t("auth.firebaseError", { error: errors.firebase })}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-orange-500 text-white font-bold py-2 rounded transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
            }`}
          >
            {loading
              ? isLogin
                ? t("auth.loadingLogin")
                : t("auth.loadingSignup")
              : isLogin
                ? t("auth.loginButton")
                : t("auth.signupButton")}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-gray-200" />
          <span className="text-gray-500 text-xs uppercase">
            {t("auth.or")}
          </span>
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 border border-gray-300 rounded py-2 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        >
          <Image
            src="/img/google-icon.png"
            alt="Google logo"
            width={20}
            height={20}
            priority
          />
          {loading ? t("auth.loadingGoogle") : t("auth.googleButton")}
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              {t("auth.dontHaveAccount")}{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-orange-600 hover:underline"
              >
                {t("auth.signUpLink")}
              </button>
            </>
          ) : (
            <>
              {t("auth.alreadyHaveAccount")}{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-orange-600 hover:underline"
              >
                {t("auth.loginLink")}
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
