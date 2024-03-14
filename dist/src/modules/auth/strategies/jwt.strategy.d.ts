import { ExecutionContext } from "@nestjs/common";
import { Strategy } from "passport-jwt";
import { Reflector } from '@nestjs/core';
import "dotenv/config";
declare const JwtAuthStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAuthStrategy extends JwtAuthStrategy_base {
    private reflector;
    constructor(reflector: Reflector);
    validate(payload: any, context: ExecutionContext): Promise<any>;
}
export {};
