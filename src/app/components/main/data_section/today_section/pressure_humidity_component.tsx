// components/WindComponent.tsx
import React from "react";
import { PiGaugeBold } from "react-icons/pi";
import { WiHumidity } from "react-icons/wi";
interface PrHuComponentProps {
  pressure: number;
  humidity: number;
}

const PrHuComponent: React.FC<PrHuComponentProps> = ({
  pressure,
  humidity,
}) => {
  return (
    <div className="flex flex-col-4 items-center text-center align-middle text-xs gap-2">
      <div className="text-xl text-yellow-600">
        <PiGaugeBold />
      </div>
      <div className="text-xs font-bold text-yellow-600">
      {pressure} MPa</div>

      <div className="text-xl text-blue-700">
        <WiHumidity />
      </div>
      <div className="text-xs font-bold text-blue-700">

      {humidity}%</div>
    </div>
  );
};

export default PrHuComponent;
