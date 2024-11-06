export const getReportsSchema = {
  tags: ["Report system"],
  summary: "Get all bushfire incident reports",
  description: "Retrieve all submitted bushfire incident reports",
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
                    contact_number: {
                      type: "string",
                      description: "Contact number of reporter",
                      example: "0302020034",
                    },
                    state: {
                      type: "string",
                      description: "State where incident occurred",
                      example: "California",
                    },
                    nearest_town: {
                      type: "string",
                      description: "Nearest town to incident",
                      example: "San Francisco",
                    },
                    discovery_date: {
                      type: "string",
                      description: "Date when fire was discovered",
                      example: "12-05-2024",
                    },
                    discovery_time: {
                      type: "string",
                      description: "Time when fire was discovered",
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
                      description: "Cause of the bushfire",
                      example: "human",
                    },
                    estimated_size: {
                      type: "string",
                      description: "Estimated size of affected area",
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
                      description: "Current evacuation status",
                      example: "advisory",
                    },
                    description: {
                      type: "string",
                      description: "Additional details about the incident",
                      example: "Please evacuate",
                    },
                    created_at: {
                      type: "string",
                      format: "date-time",
                      description: "Timestamp when report was created",
                      example: "2024-11-04 11:23:26",
                    },
                  },
                },
                example: [
                  {
                    id: 1,
                    full_name: "Anthony Tang",
                    contact_number: "0302020034",
                    state: "California",
                    nearest_town: "San Francisco",
                    discovery_date: "12-05-2024",
                    discovery_time: "14:30",
                    severity: "high",
                    cause: "human",
                    estimated_size: "30m",
                    status: "active",
                    evacuation_status: "advisory",
                    description: "Please evacuate",
                    created_at: "2024-11-04 11:23:26",
                  },
                  {
                    id: 2,
                    full_name: "John Doe",
                    contact_number: "0302020034",
                    state: "California",
                    nearest_town: "San Francisco",
                    discovery_date: "12-05-2024",
                    discovery_time: "14:30",
                    severity: "high",
                    cause: "human",
                    estimated_size: "30m",
                    status: "active",
                    evacuation_status: "advisory",
                    description: "Please evacuate",
                    created_at: "2024-11-04 11:24:53",
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
                example: "Failed to submit report",
              },
            },
          },
        },
      },
    },
  },
};
