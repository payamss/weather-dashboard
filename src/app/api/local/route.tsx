/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorResponse } from '@/app/types/error_response';
import { NextResponse } from 'next/server';

export async function GET() {
    const url: string = 'http://192.168.178.56/data';

    const response = await fetch(url);
    const res = await response.json();

    if (response.ok) {
        // Convert the response to the desired structure
        const data: IWeatherLocal = {
            Temperature: res.find((item: any) => item.type === 'temperature').value,
            Temperature_unit: res.find((item: any) => item.type === 'temperature').unit,
            Humidity: res.find((item: any) => item.type === 'humidity').value,
            Humidity_unit: res.find((item: any) => item.type === 'humidity').unit,
        };

        console.log('res', res);
        console.log('data', data);
        return NextResponse.json(data);
    } else {
        const errorResponse: ErrorResponse = { error: res.message };
        return NextResponse.json(errorResponse, { status: response.status });
    }
}
