export const postFeedbackSchema = {
  tags: ["Feedback"],
  summary: "Submit feedback",
  description: "Submit user feedback about the application",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["full_name", "email", "feedback"],
          properties: {
            full_name: {
              type: "string",
              description: "Full name of the user",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email address of the user",
              example: "john@example.com",
            },
            feedback: {
              type: "string",
              description: "Feedback text",
              example: "This application is very helpful!",
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: "Feedback created successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true,
              },
              message: {
                type: "string",
                example: "Thank you for your feedback!",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Email is already in use",
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
                example: "Email has already submitted feedback",
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
                example: "Failed to create feedback",
              },
            },
          },
        },
      },
    },
  },
};
