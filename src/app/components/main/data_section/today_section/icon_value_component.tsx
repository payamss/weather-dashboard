import React from 'react';
import { IconType } from 'react-icons';

interface IconValueProps {
    iconStyle?: React.CSSProperties;
    icon: IconType;
    value: string;
    unit: string;
    iconColor?: string;
    textColor?: string;
}

const IconValueComponent: React.FC<IconValueProps> = ({ icon: Icon, value, unit, iconColor, textColor, iconStyle }) => {
    return (
        <div className="flex flex-col-2 items-center text-center align-middle text-xs justify-start gap-3">
            <div className={`text-2xl ${iconColor}`} style={iconStyle}>
                <Icon />
            </div>
            <div className={`text-sm ${textColor}`}>
                {value}
                {unit}
            </div>
        </div>
    );
};

export default IconValueComponent;
