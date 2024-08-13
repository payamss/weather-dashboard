// components/Header.tsx
'use client';

import CitySearch from './search';
import UnitSelector from './main/unit_selectore';

interface HeaderProps {
    city: string;
    setCity: (city: string) => void;
    unit: string;
    setUnit: (unit: string) => void;
}

export default function Header({ city, setCity, unit, setUnit }: HeaderProps) {
    return (
        <header className='flex w-full items-center justify-between bg-slate-800 px-3 py-3 shadow-md'>
            <div className='font-bold text-white'>Weather</div>
            <div className='mx-4 flex-grow'>
                <CitySearch city={city} setCity={setCity} />
            </div>
            <div>
                <UnitSelector unit={unit} setUnit={setUnit} />
            </div>
        </header>
    );
}
