export default {
  put: {
    summary: 'Altera os dados de um assunto (subject)',
    description:
      'Esta rota é responsável por alterar os dados de um assunto.',
    tags: ['Subjects'],
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
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/ResponseSubject'
            },
            examples: {
              User: {
                $ref: '#/components/examples/ResponseSubject'
              }
            }
          }
        }
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
    }
  }
};
