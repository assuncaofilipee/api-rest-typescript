export default {
  UnprocessableGenericError: {
    value: {
      errors: [
        {
          type: "field",
          value: "some value",
          msg: "Property 'some property' error description",
          path: "some property",
          location: "body",
        },
      ],
    },
  },
};
