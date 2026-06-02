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
        <header className='sticky top-0 z-20 mx-3 mt-3 flex w-auto flex-col gap-3 rounded-2xl border border-slate-300/20 bg-slate-900/75 px-4 py-3 shadow-xl shadow-slate-950/45 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:gap-4'>
            <div className='flex w-full items-center justify-between sm:w-auto sm:gap-4'>
                <div className='flex min-w-fit items-baseline gap-2'>
                    <span className='text-xs uppercase tracking-[0.2em] text-sky-200/70'>Atlas</span>
                    <span className='text-2xl font-semibold text-white'>Weather</span>
                </div>
                <div className='min-w-fit sm:hidden'>
                    <UnitSelector unit={unit} setUnit={setUnit} />
                </div>
            </div>
            <div className='w-full sm:mx-2 sm:flex-grow'>
                <CitySearch city={city} setCity={setCity} />
            </div>
            <div className='hidden min-w-fit sm:block'>
                <UnitSelector unit={unit} setUnit={setUnit} />
            </div>
        </header>
    );
}
