export default {
  SubjectPayload: {
    type: "object",
    properties: {
      name: {
        type: "string",
        required: true,
        length: 150,
      },
    },
  },
  ResponseSubject: {
    type: "object",
    properties: {
      data: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
            length: 150,
          },
          createdAt: {
            type: "string",
          },
          updatedAt: {
            type: "string",
          },
          deletedAt: {
            type: "string",
          },
        },
      },
    },
  },
  ResponseArraySubject: {
    type: "array",
    items: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            name: {
              type: "string",
              length: 150,
            },
            createdAt: {
              type: "string",
            },
            updatedAt: {
              type: "string",
            },
            deletedAt: {
              type: "string",
            },
          },
        },
        pagination: {
          type: "object",
          properties: {
            hasNextPage: {
              type: "boolean",
            },
            currentPage: {
              type: "number",
            },
            totalPage: {
              type: "number",
            },
            recordPage: {
              type: "number",
            },
            totalRecords: {
              type: "number",
            },
          },
        },
      },
    },
  },
};
