'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaTemperatureHigh } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';

const REFRESH_MS = 30_000;

export default function WidgetPage() {
    const [data, setData] = useState<IWeatherLocal | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = useCallback(async () => {
        setRefreshing(true);
        try {
            const res = await fetch('/api/local', { cache: 'no-store' });
            const json = await res.json();
            if (!res.ok) {
                throw new Error(json.error ?? 'Sensor unavailable');
            }
            setData(json as IWeatherLocal);
            setLastUpdated(new Date());
            setError(null);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Sensor unavailable');
        } finally {
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        const id = setInterval(fetchData, REFRESH_MS);
        return () => clearInterval(id);
    }, [fetchData]);

    return (
        <div className='flex min-h-screen items-center justify-center p-4 font-[var(--font-source-sans)]'>
            <div className='glass-panel w-72 p-5 text-white'>
                <div className='flex items-center justify-between'>
                    <span className='soft-title'>Home network</span>
                    <span className={`h-2 w-2 rounded-full transition-colors duration-500 ${refreshing ? 'animate-pulse bg-sky-400' : 'bg-sky-500/30'}`} title='Auto-refreshes every 30s' />
                </div>

                <p className='mb-3 mt-1 text-lg font-semibold'>Local Sensor</p>
                <hr className='border-slate-300/20' />

                {error && !data && <p className='mt-4 text-sm text-red-300'>{error}</p>}

                {data && (
                    <div className='mt-3 grid grid-cols-2 gap-2'>
                        <div className='flex items-center gap-3 rounded-xl border border-slate-300/10 bg-slate-950/25 px-3 py-3'>
                            <FaTemperatureHigh className='shrink-0 text-2xl text-red-500' />
                            <div>
                                <p className='text-xl font-semibold leading-tight'>{data.Temperature.toFixed(1)}</p>
                                <p className='text-xs text-slate-400'>{data.Temperature_unit}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 rounded-xl border border-slate-300/10 bg-slate-950/25 px-3 py-3'>
                            <WiHumidity className='shrink-0 text-3xl text-blue-400' />
                            <div>
                                <p className='text-xl font-semibold leading-tight'>{data.Humidity.toFixed(0)}</p>
                                <p className='text-xs text-slate-400'>{data.Humidity_unit}</p>
                            </div>
                        </div>
                    </div>
                )}

                {lastUpdated && <p className='mt-3 text-right text-xs text-slate-500'>{lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>}
            </div>
        </div>
    );
}
