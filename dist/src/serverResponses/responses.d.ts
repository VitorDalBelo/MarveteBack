export declare const UserCreated: {
    status: number;
    description: string;
    schema: {
        $ref: string;
    };
};
export declare const LoginOk: {
    status: number;
    description: string;
    schema: {
        $ref: string;
    };
};
export declare const Ok: {
    status: number;
    description: string;
};
export declare const Unauthorized: {
    status: number;
    description: string;
    content: {
        'application/json': {
            schema: {
                type: string;
                properties: {
                    statusCode: {
                        type: string;
                        example: number;
                    };
                    message: {
                        type: string;
                        example: string;
                    };
                };
            };
        };
    };
};
export declare const Forbidden: {
    status: number;
    description: string;
    content: {
        'application/json': {
            schema: {
                type: string;
                properties: {
                    statusCode: {
                        type: string;
                        example: number;
                    };
                    message: {
                        type: string;
                        example: string;
                    };
                };
            };
        };
    };
};
export declare const ServiceUnavailable: {
    status: number;
    description: string;
    content: {
        'application/json': {
            schema: {
                type: string;
                properties: {
                    statusCode: {
                        type: string;
                        example: number;
                    };
                    message: {
                        type: string;
                        example: string;
                    };
                };
            };
        };
    };
};
export declare const BadRequest: {
    status: number;
    description: string;
    content: {
        'application/json': {
            schema: {
                type: string;
                properties: {
                    statusCode: {
                        type: string;
                        example: number;
                    };
                    message: {
                        type: string;
                        example: string;
                    };
                    error: {
                        type: string;
                        example: string;
                    };
                };
            };
        };
    };
};
export declare const Conflict: {
    status: number;
    description: string;
    content: {
        'application/json': {
            schema: {
                type: string;
                properties: {
                    statusCode: {
                        type: string;
                        example: number;
                    };
                    message: {
                        type: string;
                        example: string;
                    };
                };
            };
        };
    };
};
export declare const InternalServerError: {
    status: number;
    description: string;
    content: {
        'application/json': {
            schema: {
                type: string;
                properties: {
                    statusCode: {
                        type: string;
                        example: number;
                    };
                    message: {
                        type: string;
                        example: string;
                    };
                };
            };
        };
    };
};
