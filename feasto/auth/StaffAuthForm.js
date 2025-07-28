// // components/StaffAuthForm.jsx
// "use client";

// import { useState } from "react";
// import { auth } from "@/lib/firebase";
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

// export default function StaffAuthForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isSignUp, setIsSignUp] = useState(false);
//   const router = useRouter();

//   const handleAuth = async () => {
//     if (!email || !password) {
//       toast.error("Email and password are required");
//       return;
//     }

//     console.log("▶️ Triggering", isSignUp ? "Sign Up" : "Login");
//     console.log("📧 Email:", email, "🔑 Password:", password);
//     console.log("⚙️ Firebase config:", auth.app.options);

//     try {
//       if (isSignUp) {
//         await createUserWithEmailAndPassword(auth, email, password);
//         toast.success("✅ Account created successfully");
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//         toast.success("✅ Login successful");
//       }

//       router.push("/dashboard");
//     } catch (err) {
//       console.error("❌ Firebase error:", err.code, err.message);
//       toast.error(`❌ ${err.code.replace("auth/", "")}`);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center flex items-center justify-center"
//       style={{
//         backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/img/bg-login.jpg")`,
//       }}
//     >
//       <div className="border-2 border-orange-500 p-8 rounded-lg shadow-lg w-full max-w-sm text-center text-white bg-transparent">
//         <img
//           src="/img/logo.png"
//           alt="Logo"
//           className="mx-auto mb-6 w-40 h-40 object-contain"
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 mb-4 rounded bg-white/50 text-black placeholder:text-black/50 text-center outline-none"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 mb-4 rounded bg-white/50 text-black placeholder:text-black/50 text-center outline-none"
//         />

//         <button
//           onClick={handleAuth}
//           className="bg-orange-500/60 text-white font-semibold w-full py-2 rounded transition hover:bg-orange-500/80"
//         >
//           {isSignUp ? "Sign Up" : "Login"}
//         </button>

//         <p
//           className="text-sm mt-4 cursor-pointer underline"
//           onClick={() => setIsSignUp(!isSignUp)}
//         >
//           {isSignUp
//             ? "Already have an account? Login"
//             : "Don't have an account? Sign up"}
//         </p>
//       </div>
//     </div>
//   );
// }
