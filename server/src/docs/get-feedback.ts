export const getFeedbackSchema = {
  tags: ["Feedback"],
  summary: "Get all feedback entries",
  description: "Retreive all feedbacks about application",
  responses: {
    200: {
      description: "List of all feedback successfully retrieved",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true,
              },
              results: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      example: 1,
                    },
                    full_name: {
                      type: "string",
                      example: "Yuna",
                    },
                    email: {
                      type: "string",
                      format: "email",
                      example: "hello@gmail.com",
                    },
                    feedback: {
                      type: "string",
                      example: "Tremendous effort guys.",
                    },
                    created_at: {
                      type: "string",
                      format: "date-time",
                      example: "2024-10-29 02:57:53",
                    },
                  },
                },
                example: [
                  {
                    id: 1,
                    full_name: "Yuna",
                    email: "hello@gmail.com",
                    feedback: "Tremendous effort guys.",
                    created_at: "2024-10-29 02:57:53",
                  },
                  {
                    id: 2,
                    full_name: "John Doe",
                    email: "JohnDoe@gmail.com",
                    feedback: "Tremendous effort guys. LGTM!!!",
                    created_at: "2024-10-29 02:58:53",
                  },
                  {
                    id: 4,
                    full_name: "Sayed",
                    email: "dileri@gmail.com",
                    feedback:
                      "Tremendous effort guys, I really enjoy this platform and it is a handy-neat tool for me to better prepare for the worst sitations during summer times. Thanks guys!",
                    created_at: "2024-10-29 02:59:05",
                  },
                ],
              },
            },
          },
        },
      },
    },
    500: {
      description: "Server error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              error: {
                type: "string",
                example: "Failed to fetch feedback",
              },
            },
          },
        },
      },
    },
  },
};
