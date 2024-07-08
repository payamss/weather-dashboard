// components/WindComponent.tsx
import React from "react";
import { FiSunrise, FiSunset } from "react-icons/fi";
interface PrHuComponentProps {
  sunrise: number;
  sunset: number;
}

const SunComponent: React.FC<PrHuComponentProps> = ({ sunrise, sunset }) => {
  return (
    <div className="flex flex-col-4 items-center justify-between text-center align-middle text-xs m-4">
      <div className="   text-xl text-orange-600">
        <FiSunrise />
      </div>

      <div className=" text-xs ">
        {new Date(sunrise * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h24",
        })}
      </div>
      <div className=" text-xl text-pink-900">
        <FiSunset />
      </div>
      <div className="  text-xs ">
        {new Date(sunset * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h24",
        })}
      </div>
    </div>
  );
};

export default SunComponent;
