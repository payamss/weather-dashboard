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
        <div className='m-1 flex items-center justify-start gap-3 rounded-xl border border-slate-300/10 bg-slate-950/25 px-3 py-2 text-center align-middle text-xs'>
            <div className={`text-2xl ${iconColor}`} style={iconStyle}>
                <Icon />
            </div>
            <div className={`text-sm font-medium ${textColor ?? 'text-slate-100'}`}>
                {value}
                {unit}
            </div>
        </div>
    );
};

export default IconValueComponent;
