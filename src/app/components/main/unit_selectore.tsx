import React from "react";

interface UnitSelectorProps {
    unit: string;
    setUnit: (unit: string) => void;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({ unit, setUnit }) => {
    return (
        <div className="flex justify-start text-red-600">
            <button
                className={`px-2 py-1 transform hover:scale-105 ease-linear duration-300  rounded-l-lg ${unit === "metric" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                onClick={() => setUnit("metric")}
            >
                °C
            </button>
            <button
                className={`px-2 py-1 transform hover:scale-105 ease-linear duration-300 rounded-r-lg ${unit === "imperial" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                onClick={() => setUnit("imperial")}
            >
                °F
            </button>
        </div>
    );
};

export default UnitSelector;
