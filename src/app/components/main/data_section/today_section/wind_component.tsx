// components/WindComponent.tsx
import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import { FaWind } from "react-icons/fa6";
interface WindComponentProps {
  windSpeed: number;
  windDeg: number;
}

const WindComponent: React.FC<WindComponentProps> = ({
  windSpeed,
  windDeg,
}) => {
  return (
    <div className="flex flex-col-4 items-center text-center align-middle text-xs gap-2">
      <div className="text-xs text-blue-700">
      <FaWind />
      </div>
      <div className="">{windSpeed} km/h</div>({windDeg}°)
      <div
        className="relative flex items-center justify-center text-red-800 "
        style={{ transform: `rotate(${windDeg - 45}deg)` }}
      >
        <FaLocationArrow />
      </div>
    </div>
  );
};

export default WindComponent;
