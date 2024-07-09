// src/types/node-mocks-http.d.ts
declare module "node-mocks-http" {
    import { IncomingHttpHeaders } from "http";
    import { Readable } from "stream";

    export interface MockRequestOptions {
        method?: string;
        url?: string;
        headers?: IncomingHttpHeaders;
        body?: any;
        query?: any;
        params?: any;
        cookies?: any;
        signedCookies?: any;
        session?: any;
    }

    export interface MockRequest extends Readable {
        method: string;
        url: string;
        headers: IncomingHttpHeaders;
        body: any;
        query: any;
        params: any;
        cookies: any;
        signedCookies: any;
        session: any;
    }

    export interface MockResponseOptions {
        eventEmitter?: any;
    }

    export interface MockResponse {
        statusCode: number;
        statusMessage: string;
        body: any;
        headers: IncomingHttpHeaders;
        cookies: any;
        send(body: any): MockResponse;
        json(body: any): MockResponse;
        status(code: number): MockResponse;
    }

    export function createRequest(options?: MockRequestOptions): MockRequest;
    export function createResponse(options?: MockResponseOptions): MockResponse;
    export function createMocks(options?: MockRequestOptions & MockResponseOptions): {
        req: MockRequest;
        res: MockResponse;
    };
}
