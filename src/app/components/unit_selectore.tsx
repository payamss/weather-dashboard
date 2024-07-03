import React from 'react'

interface UnitSelectorProps {
  unit: string
  setUnit: (unit: string) => void
}

const UnitSelector: React.FC<UnitSelectorProps> = ({ unit, setUnit }) => {
  return (
    <div className="flex justify-end mb-4">
      <button
        className={`px-4 py-2 rounded-l-lg ${unit === 'metric' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setUnit('metric')}
      >
        °C
      </button>
      <button
        className={`px-4 py-2 rounded-r-lg ${unit === 'imperial' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setUnit('imperial')}
      >
        °F
      </button>
    </div>
  )
}

export default UnitSelector
