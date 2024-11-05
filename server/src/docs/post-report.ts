export const postReportSchema = {
  tags: ["Report system"],
  summary: "Submit bushfire incident report",
  description: "Submit a new bushfire incident report with location and severity details",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: [
            "full_name",
            "contact_number",
            "state",
            "nearest_town",
            "discovery_date",
            "discovery_time",
            "severity",
            "cause",
            "estimated_size",
            "status",
            "evacuation_status",
            "description",
          ],
          properties: {
            full_name: {
              type: "string",
              description: "Full name of the reporter",
              example: "John Doe",
            },
            contact_number: {
              type: "string",
              description: "Contact phone number",
              example: "0302020034",
            },
            state: {
              type: "string",
              description: "State where the incident occurred",
              example: "California",
            },
            nearest_town: {
              type: "string",
              description: "Nearest town to the incident",
              example: "San Francisco",
            },
            discovery_date: {
              type: "string",
              format: "date",
              description: "Date when the fire was discovered (DD-MM-YYYY)",
              example: "12-05-2024",
            },
            discovery_time: {
              type: "string",
              format: "time",
              description: "Time when the fire was discovered (HH:MM)",
              example: "14:30",
            },
            severity: {
              type: "string",
              enum: ["low", "medium", "high", "extreme"],
              description: "Severity level of the bushfire",
              example: "high",
            },
            cause: {
              type: "string",
              enum: ["human", "natural", "unknown"],
              description: "Suspected cause of the bushfire",
              example: "human",
            },
            estimated_size: {
              type: "string",
              description: "Estimated size of the affected area",
              example: "30m",
            },
            status: {
              type: "string",
              enum: ["active", "contained", "controlled", "out"],
              description: "Current status of the bushfire",
              example: "active",
            },
            evacuation_status: {
              type: "string",
              enum: ["none", "advisory", "voluntary", "mandatory"],
              description: "Current evacuation status for the area",
              example: "advisory",
            },
            description: {
              type: "string",
              description: "Additional details about the incident",
              example: "Please evacuate",
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: "Report submitted successfully",
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
                example: "Thank you for your report!",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Validation error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: {
                type: "string",
                example: "Invalid data",
              },
              details: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "field - Required",
                    },
                  },
                },
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
                example: "Failed to submit report",
              },
            },
          },
        },
      },
    },
  },
};
