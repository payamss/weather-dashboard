// components/Header.tsx
"use client";

import { useState } from "react";
import UnitSelector from "./main/unit_selectore";
import CitySearch from "./search";

export default function Header() {
  const [city, setCity] = useState<string>("");
  const [unit, setUnit] = useState<string>("metric");

  return (
    <header className="w-full bg-slate-800 shadow-md py-3 px-3 flex items-center justify-between">
      <div className="text-white font-bold">Weather</div>
      <div className="flex-grow mx-4">
        <CitySearch city={city} setCity={setCity} />
      </div>
      <div>
        <UnitSelector unit={unit} setUnit={setUnit} />
      </div>
    </header>
  );
}
