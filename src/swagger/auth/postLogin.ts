export default {
  post: {
    summary: "Login",
    description:
      "Esta rota é responsável pela autenticação do usuário",
    tags: ["Auth"],
    parameters: [],
    security: [{
      Authorization: []
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/AuthPayload'
          }
        }
      }
    },
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              $ref: "#/components/schemas/ResponseAuth",
            },
            examples: {
              subject: {
                $ref: "#/components/examples/ResponseAuth",
              },
            },
          },
        },
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: {
              type: "object",
              $ref: "#/components/schemas/UnauthorizedError",
            },
            examples: {
              subject: {
                $ref: "#/components/examples/UnauthorizedError",
              },
            },
          },
        },
      },
      500: {
        description: "Internal Server Error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                },
              },
            },
            examples: {
              GenericRoleError: {
                value: {
                  error: 'Internal Server Error'
                }
              },
            },
          },
        },
      },
    },
  },
};
