"use client";

import { useEffect, useState } from "react";

export default function OfferTimer() {
  const deadline = new Date();
  deadline.setHours(15, 0, 0, 0); // Ora 15:00 sot

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const difference = deadline - now;

    if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0 };

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-orange-600 text-white p-4 rounded-lg text-center max-w-md mx-auto my-4">
      <h2 className="text-lg font-bold">🎉 Oferta deri në ora 15:00!</h2>
      <p className="text-xl font-semibold">
        Zbritje -20% në picë
      </p>
      <p className="text-sm mt-2">
        Koha e mbetur: {timeLeft.hours}h {timeLeft.minutes}min {timeLeft.seconds}sec
      </p>
    </div>
  );
}
