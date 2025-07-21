"use client";

import { useState, useEffect } from "react";

const dailySpecials = {
  0: { day: "E Diel", item: "Pizza Margherita", discount: "15%" },
  1: { day: "E Hënë", item: "Lasagna", discount: "10%" },
  2: { day: "E Martë", item: "Spaghetti Bolognese", discount: "20%" },
  3: { day: "E Mërkurë", item: "Risotto", discount: "15%" },
  4: { day: "E Enjte", item: "Tavë Dheu", discount: "20%" },
  5: { day: "E Premte", item: "Sallatë Cezar", discount: "10%" },
  6: { day: "E Shtunë", item: "Pizza Pepperoni", discount: "15%" },
};

export default function DailySpecial() {
  const [todaySpecial, setTodaySpecial] = useState(null);

  useEffect(() => {
    const dayOfWeek = new Date().getDay(); // 0 = Sunday, 1 = Monday, ...
    setTodaySpecial(dailySpecials[dayOfWeek]);
  }, []);

  if (!todaySpecial) return null;

  return (
    <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 my-6 rounded-md max-w-lg mx-auto text-center">
      <h2 className="text-lg font-bold uppercase">
        Speciale e {todaySpecial.day}
      </h2>
      <p className="text-xl mt-2 font-semibold">{todaySpecial.item}</p>
      <p className="text-sm mt-1">Zbritje: {todaySpecial.discount}</p>
    </div>
  );
}
