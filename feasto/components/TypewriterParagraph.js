"use client";

import { useEffect, useState } from "react";

export default function TypewriterParagraph({ text }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <p className="text-black text-center mb-10 uppercase">{displayed}</p>;
}
