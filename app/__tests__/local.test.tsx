import { GET } from '@/app/api/local/route';

jest.mock('node-fetch');
const { Response } = jest.requireActual('node-fetch');

describe('GET /api/local/', () => {
    it('should return weather data if the response is OK', async () => {
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
            new Response(
                JSON.stringify([
                    { type: 'temperature', value: 22, unit: 'C' },
                    { type: 'humidity', value: 60, unit: '%' },
                ]),
                { status: 200 }
            )
        );

        const response = await GET();
        const json = await response.json();

        const expectedData = {
            Temperature: 22,
            Temperature_unit: 'C',
            Humidity: 60,
            Humidity_unit: '%',
        };

        expect(response.status).toBe(200);
        expect(json).toEqual(expectedData);
    });

    it('should return an error response if fetch fails', async () => {
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
            new Response(JSON.stringify({ message: 'Internal Server Error' }), {
                status: 500,
            })
        );

        const response = await GET();
        const json = await response.json();

        const expectedErrorResponse = { error: 'Internal Server Error' };

        expect(response.status).toBe(500);
        expect(json).toEqual(expectedErrorResponse);
    });

    it('should handle missing temperature data gracefully', async () => {
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
            new Response(JSON.stringify([{ type: 'humidity', value: 60, unit: '%' }]), {
                status: 200,
            })
        );

        const response = await GET();
        const json = await response.json();

        const expectedData = {
            Temperature: undefined,
            Temperature_unit: undefined,
            Humidity: 60,
            Humidity_unit: '%',
        };

        expect(response.status).toBe(200);
        expect(json).toEqual(expectedData);
    });

    it('should handle missing humidity data gracefully', async () => {
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
            new Response(JSON.stringify([{ type: 'temperature', value: 22, unit: 'C' }]), {
                status: 200,
            })
        );

        const response = await GET();
        const json = await response.json();

        const expectedData = {
            Temperature: 22,
            Temperature_unit: 'C',
            Humidity: undefined,
            Humidity_unit: undefined,
        };

        expect(response.status).toBe(200);
        expect(json).toEqual(expectedData);
    });
});
