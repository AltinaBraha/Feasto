// "use client";

// import { useState } from "react";
// import { auth } from "@/lib/firebase"; // bëje këtë sipas rrugës që e ke ti
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";
// import { toast } from "react-toastify";
// import WaiterDashboard from "../dashboard/page";
// import Image from "next/image";

// export default function StaffLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [granted, setGranted] = useState(false);

//   const handleAuth = async () => {
//     try {
//       let userCredential;

//       if (isSignUp) {
//         userCredential = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         toast.success("Account created successfully");
//       } else {
//         userCredential = await signInWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         toast.success("Login successful");
//       }

//       setGranted(true);
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   if (granted) return <WaiterDashboard />;

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center flex items-center justify-center"
//       style={{
//         backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/img/bg-login.jpg")`,
//       }}
//     >
//       <div className="border-2 border-orange-500 p-8 rounded-lg shadow-lg w-full max-w-sm text-center text-white bg-transparent">
//         <Image
//           src="/img/logo.png"
//           alt="Logo"
//           width={160} // ose çfarëdo madhësie
//           height={160}
//           className="mx-auto mb-6 object-contain"
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

"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import WaiterDashboard from "../dashboard/page";
import Image from "next/image";
import { useAuthStore } from "@/lib/stores/authStore";

export default function StaffLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const handleAuth = async () => {
    try {
      let userCredential;

      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success("Account created successfully");
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success("Login successful");
      }

      setUser(userCredential.user);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (user) return <WaiterDashboard />;

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/img/bg-login.jpg")`,
      }}
    >
      <div className="border-2 border-orange-500 p-8 rounded-lg shadow-lg w-full max-w-sm text-center text-white bg-transparent">
        <Image
          src="/img/logo.png"
          alt="Logo"
          width={160}
          height={160}
          className="mx-auto mb-6 object-contain"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-white/50 text-black placeholder:text-black/50 text-center outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-white/50 text-black placeholder:text-black/50 text-center outline-none"
        />

        <button
          onClick={handleAuth}
          className="bg-orange-500/60 text-white font-semibold w-full py-2 rounded transition hover:bg-orange-500/80"
        >
          {isSignUp ? "Sign Up" : "Login"}
        </button>

        <p
          className="text-sm mt-4 cursor-pointer underline"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? "Already have an account? Login"
            : "Don't have an account? Sign up"}
        </p>
      </div>
    </div>
  );
}
