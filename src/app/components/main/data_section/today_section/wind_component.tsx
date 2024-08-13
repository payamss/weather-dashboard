// components/WindComponent.tsx
import React from 'react';
import { FaLocationArrow } from 'react-icons/fa';
interface WindComponentProps {
    windDeg: number;
}

const WindComponent: React.FC<WindComponentProps> = ({ windDeg }) => {
    return (
        <div className='relative flex items-center justify-center text-red-800' style={{ transform: `rotate(${windDeg - 45}deg)` }}>
            <FaLocationArrow />
        </div>
    );
};

export default WindComponent;
