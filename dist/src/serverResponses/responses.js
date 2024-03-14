"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.Conflict = exports.BadRequest = exports.ServiceUnavailable = exports.Forbidden = exports.Unauthorized = exports.Ok = exports.LoginOk = exports.UserCreated = void 0;
const swagger_1 = require("@nestjs/swagger");
const get_access_token_auth_dto_1 = require("../modules/auth/dto/get-access_token-auth.dto");
const get_user_dto_1 = require("../modules/users/dto/get-user.dto");
exports.UserCreated = {
    status: 201,
    description: 'User Created',
    schema: {
        $ref: (0, swagger_1.getSchemaPath)(get_user_dto_1.GetUserDto),
    },
};
exports.LoginOk = {
    status: 200,
    description: 'Login Ok',
    schema: {
        $ref: (0, swagger_1.getSchemaPath)(get_access_token_auth_dto_1.GetAccessTokenDto),
    },
};
exports.Ok = {
    status: 200,
    description: 'Ok',
};
exports.Unauthorized = {
    status: 401,
    description: 'Unauthorized',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    statusCode: {
                        type: 'number',
                        example: 401
                    },
                    message: {
                        type: 'string',
                        example: 'Unauthorized'
                    }
                }
            }
        }
    }
};
exports.Forbidden = {
    status: 403,
    description: 'Forbidden',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    statusCode: {
                        type: 'number',
                        example: 403
                    },
                    message: {
                        type: 'string',
                        example: 'The account is a google accont'
                    }
                }
            }
        }
    }
};
exports.ServiceUnavailable = {
    status: 503,
    description: 'Forbidden',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    statusCode: {
                        type: 'number',
                        example: 503
                    },
                    message: {
                        type: 'string',
                        example: 'service unavailable'
                    }
                }
            }
        }
    }
};
exports.BadRequest = {
    status: 400,
    description: 'Bad Request',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    statusCode: {
                        type: 'number',
                        example: 400
                    },
                    message: {
                        type: 'string',
                        example: 'Name is required'
                    },
                    error: {
                        type: 'string',
                        example: 'Bad Request'
                    }
                }
            }
        }
    }
};
exports.Conflict = {
    status: 409,
    description: 'Conflict',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    statusCode: {
                        type: 'number',
                        example: 409
                    },
                    message: {
                        type: 'string',
                        example: 'Conflict'
                    }
                }
            }
        }
    }
};
exports.InternalServerError = {
    status: 500,
    description: 'Internal server error',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    statusCode: {
                        type: 'number',
                        example: 500
                    },
                    message: {
                        type: 'string',
                        example: 'Internal server error'
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=responses.js.map