export default {
  AuthPayload: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        required: true,
        length: 100
      },
      password: {
        type: 'string',
        required: true,
        length: 100
      }
    }
  },
  ResponseAuth: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                length: 100
              },
              name: {
                type: 'string',
                length: 150
              },
              createdAt: {
                type: 'string'
              },
              updatedAt: {
                type: 'string'
              },
              deletedAt: {
                type: 'string'
              }
            }
          },
          token: {
            type: "string"
          }
        },
      }
    }
  }
};
