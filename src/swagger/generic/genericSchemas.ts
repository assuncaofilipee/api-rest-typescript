export default {
  UnprocessableGenerictError: {
    type: "object",
    properties: {
      errors: {
        type: "array",
        items: {
          type: "string",
          value: "string",
          msg: "string",
          path: "string",
          location: "string",
        },
      },
    },
  },
};
