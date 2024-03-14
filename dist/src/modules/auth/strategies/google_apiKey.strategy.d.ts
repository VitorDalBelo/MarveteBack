import { HeaderAPIKeyStrategy } from "passport-headerapikey";
import { Reflector } from '@nestjs/core';
import "dotenv/config";
declare const GoogleApiKeyStrategy_base: new (...args: any[]) => HeaderAPIKeyStrategy;
export declare class GoogleApiKeyStrategy extends GoogleApiKeyStrategy_base {
    private reflector;
    constructor(reflector: Reflector);
}
export {};
