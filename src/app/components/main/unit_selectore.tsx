import React from 'react';

interface UnitSelectorProps {
    unit: string;
    setUnit: (unit: string) => void;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({ unit, setUnit }) => {
    return (
        <div className='flex justify-start text-red-600'>
            <button
                className={`transform rounded-l-lg px-2 py-1 duration-300 ease-linear hover:scale-105 ${unit === 'metric' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setUnit('metric')}
            >
                °C
            </button>
            <button
                className={`transform rounded-r-lg px-2 py-1 duration-300 ease-linear hover:scale-105 ${unit === 'imperial' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setUnit('imperial')}
            >
                °F
            </button>
        </div>
    );
};

export default UnitSelector;
