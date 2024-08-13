'use client';
import { useEffect, useState } from 'react';

const Timer: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className='flex-col-4 flex items-center gap-2 text-center align-middle text-xs'>
            <p>
                {currentTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hourCycle: 'h24',
                })}
            </p>
        </div>
    );
};

export default Timer;
