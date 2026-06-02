import React from 'react';

interface UnitSelectorProps {
    unit: string;
    setUnit: (unit: string) => void;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({ unit, setUnit }) => {
    return (
        <div className='flex justify-start rounded-xl border border-slate-300/20 bg-slate-950/55 p-1 text-red-600'>
            <button
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition duration-200 ${unit === 'metric' ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-900/30' : 'text-slate-300 hover:bg-slate-800/70'}`}
                onClick={() => setUnit('metric')}
            >
                °C
            </button>
            <button
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition duration-200 ${unit === 'imperial' ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-900/30' : 'text-slate-300 hover:bg-slate-800/70'}`}
                onClick={() => setUnit('imperial')}
            >
                °F
            </button>
        </div>
    );
};

export default UnitSelector;
