import { describe, it } from "node:test";
import { GET } from "@/app/api/forecast/[city]/route";
import { createMocks } from "node-mocks-http";

jest.mock("node-fetch");
const { Response } = jest.requireActual("node-fetch");

describe("GET /api/forecast/[city]", () => {
    it("should return 400 if city is not provided", async () => {
        const { req } = createMocks({
            method: "GET",
            url: "/api/forecast",
        });

        const response = await GET(req as unknown as Request, {
            params: { city: "" },
        });

        expect(response.status).toBe(400);
        const json = await response.json();
        expect(json).toEqual({ error: "City and API key are required" });
    });

    it("should return 400 if API key is not provided", async () => {
        const originalApiKey = process.env.OPENWEATHER_API_KEY;
        delete process.env.OPENWEATHER_API_KEY;

        const { req } = createMocks({
            method: "GET",
            url: "/api/forecast?units=metric",
        });

        const response = await GET(req as unknown as Request, {
            params: { city: "London" },
        });

        expect(response.status).toBe(400);
        const json = await response.json();
        expect(json).toEqual({ error: "City and API key are required" });

        process.env.OPENWEATHER_API_KEY = originalApiKey;
    });

    it("should return weather data if city and API key are provided", async () => {
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
            new Response(
                JSON.stringify({
                    current: { temp: 15 },
                    daily: [{ temp: { day: 15 } }],
                }),
                { status: 200 }
            )
        );

        const { req } = createMocks({
            method: "GET",
            url: "/api/forecast?units=metric",
        });

        const response = await GET(req as unknown as Request, {
            params: { city: "London" },
        });

        expect(response.status).toBe(200);
        const json = await response.json();
        expect(json).toEqual({
            current: { temp: 15 },
            daily: [{ temp: { day: 15 } }],
        });
    });

    it("should return error if the API request fails", async () => {
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
            new Response(
                JSON.stringify({
                    message: "city not found",
                }),
                { status: 404 }
            )
        );

        const { req } = createMocks({
            method: "GET",
            url: "/api/forecast?units=metric",
        });

        const response = await GET(req as unknown as Request, {
            params: { city: "InvalidCity" },
        });

        expect(response.status).toBe(404);
        const json = await response.json();
        expect(json).toEqual({ error: "city not found" });
    });
});
