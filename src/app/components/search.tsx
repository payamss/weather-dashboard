import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

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
        <form onSubmit={handleCitySearch} className='mx-auto flex w-full max-w-fit flex-row items-center justify-center'>
            <input
                type='text'
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className='w-full flex-grow rounded-l-lg border-blue-600 p-1 text-black focus:outline-none focus:ring-0'
                placeholder='city'
            />
            <button type='submit' aria-label='Submit' className='transform rounded-r-lg bg-blue-600 p-2 text-white hover:scale-105'>
                <FaSearch />
            </button>
        </form>
    );
};

export default CitySearch;
