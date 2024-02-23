import { getSchemaPath } from "@nestjs/swagger";
import { GetAccessTokenDto } from "src/modules/auth/dto/get-access_token-auth.dto";
import { GetUserDto } from "src/modules/users/dto/get-user.dto";


export const UserCreated = {
  status: 201,
  description: 'User Created',
  schema: {
    $ref: getSchemaPath(GetUserDto),
  },
}

export const LoginOk = {
  status: 200,
  description: 'Login Ok',
  schema: {
    $ref: getSchemaPath(GetAccessTokenDto),
  },
}

export const Unauthorized = {
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
}

export const Forbidden = {
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
}


export const BadRequest = {
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
  }

export const Conflict = {
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
}

export const InternalServerError = {
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
}