'use client';
import { useEffect, useState } from 'react';

const Timer: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="flex flex-col-4 items-center text-center align-middle text-xs gap-2">
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
