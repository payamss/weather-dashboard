import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface ICitySearch {
  city: string;
  setCity: (city: string) => void;
}

const CitySearch: React.FC<ICitySearch> = ({ city, setCity }) => {
  const [searchCity, setSearchCity] = useState(city);

  const handleCitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCity(searchCity);
  };

  return (
    <form
      onSubmit={handleCitySearch}
      className="flex sm:flex-row justify-center items-center w-full max-w-fit mx-auto"
    >
      <input
        type="text"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        className="w-full sm:flex-grow p-1 rounded-l-lg border-blue-600 focus:outline-none focus:ring-0"
        placeholder="city"
      />
      <button
        type="submit"
        className="p-2 bg-blue-600 rounded-r-lg text-white transform hover:scale-105"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default CitySearch;
