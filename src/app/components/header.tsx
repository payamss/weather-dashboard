// components/Header.tsx
"use client";

import { useState } from "react";
import CitySearch from "./search";
import UnitSelector from "./main/unit_selectore";

interface HeaderProps {
  city: string;
  setCity: (city: string) => void;
  unit: string;
  setUnit: (unit: string) => void;
}

export default function Header({ city, setCity, unit, setUnit }: HeaderProps) {
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
