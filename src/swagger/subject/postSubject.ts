export default {
  post: {
    summary: "Criar um assunto (subject)",
    description:
      "Esta rota é responsável por criar um assunto (subject).",
    tags: ["Subjects"],
    parameters: [],
    security: [{
      Authorization: []
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/SubjectPayload'
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
              $ref: "#/components/schemas/ResponseSubject",
            },
            examples: {
              subject: {
                $ref: "#/components/examples/ResponseSubject",
              },
            },
          },
        },
      },
      422: {
        description: "Unprocessable entity",
        content: {
          "application/json": {
            schema: {
              type: "object",
              $ref: "#/components/schemas/UnprocessableGenerictError",
            },
            examples: {
              subject: {
                $ref: "#/components/examples/UnprocessableGenericError",
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
