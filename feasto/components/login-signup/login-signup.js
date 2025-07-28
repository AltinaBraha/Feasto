"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!isLogin) {
      if (!formData.fullName) newErrors.fullName = "Full name is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isLogin) {
      console.log("Logging in", formData.email, formData.password);
    } else {
      console.log("Signing up", formData);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      aria-modal="true"
      role="dialog"
      aria-labelledby="auth-modal-title"
    >
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-md">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition"
        >
          <FaTimes size={20} />
        </button>

        <h2
          id="auth-modal-title"
          className="text-2xl font-semibold mb-6 text-center text-gray-800"
        >
          {isLogin ? "Login to Your Account" : "Create a New Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <>
              <div>
                <label htmlFor="fullName" className="block font-medium mb-1 text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
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
                <label htmlFor="phone" className="block font-medium mb-1 text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
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
            <label htmlFor="email" className="block font-medium mb-1 text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
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
            <label htmlFor="password" className="block font-medium mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
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

          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 rounded transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-gray-800 hover:underline focus:outline-none"
                type="button"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-gray-800 hover:underline focus:outline-none"
                type="button"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
