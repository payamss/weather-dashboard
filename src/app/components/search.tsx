import React from "react";
import { FaSearch } from "react-icons/fa";
interface ICitySearch {
  city: string;
  setCity: (city: string) => void;
}

const handleCitySearch = () => {
  let lat: number;
  let long: number;
  // fetchWeatherByCity(city)
};

const CitySearch: React.FC<ICitySearch> = ({ city, setCity }) => {
  return (
    <div className="flex sm:flex-row justify-center items-center w-full max-w-fit mx-auto ">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full sm:flex-grow p-1 rounded-l-lg border-blue-600 focus:outline-none focus:ring-0 "
        placeholder=" city"
      />
      <button
        onClick={handleCitySearch}
        className="p-2 bg-blue-600 rounded-r-lg text-white"
      >
       <FaSearch />
      </button>
    </div>
  );
};

export default CitySearch;
