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
        <form onSubmit={handleCitySearch} className='mx-auto flex w-full flex-row items-center justify-center'>
            <input
                type='text'
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className='w-full min-w-0 flex-grow rounded-l-xl border border-slate-300/15 bg-slate-950/70 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:border-sky-400/80 focus:outline-none focus:ring-2 focus:ring-sky-500/30'
                placeholder='Search city...'
            />
            <button
                type='submit'
                aria-label='Submit'
                className='rounded-r-xl border border-l-0 border-slate-300/15 bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-[0.625rem] text-white transition duration-200 hover:brightness-110'
            >
                <FaSearch />
            </button>
        </form>
    );
};

export default CitySearch;
