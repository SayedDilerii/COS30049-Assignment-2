export const getModelPredictionSchema = {
  tags: ["Machine Learning Model"],
  summary: "Get bushfire risk prediction",
  description: "Returns detailed risk assessment based on location, date, and temperature parameters",
  parameters: [
    {
      in: "query",
      name: "state",
      required: true,
      schema: {
        type: "string",
        example: "AR",
      },
      description: "US state code",
    },
    {
      in: "query",
      name: "date",
      required: true,
      schema: {
        type: "string",
        format: "date",
        example: "2024-11-04",
      },
      description: "Date for prediction",
    },
    {
      in: "query",
      name: "tmin",
      required: true,
      schema: {
        type: "number",
        example: 22,
      },
      description: "Minimum temperature",
    },
    {
      in: "query",
      name: "tmax",
      required: true,
      schema: {
        type: "number",
        example: 44,
      },
      description: "Maximum temperature",
    },
  ],
  responses: {
    200: {
      description: "Successful prediction",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true,
              },
              result: {
                type: "object",
                properties: {
                  current_prediction: {
                    type: "object",
                    properties: {
                      risk_score: {
                        type: "number",
                        example: 0.5188962506955337,
                      },
                      date: {
                        type: "string",
                        format: "date",
                        example: "2024-11-04",
                      },
                      state: {
                        type: "string",
                        example: "AR",
                      },
                      temperature: {
                        type: "object",
                        properties: {
                          min: {
                            type: "number",
                            example: 22,
                          },
                          max: {
                            type: "number",
                            example: 44,
                          },
                        },
                      },
                    },
                  },
                  feature_importance: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        feature: {
                          type: "string",
                          example: "temp_elev_interact",
                        },
                        importance: {
                          type: "number",
                          example: 0.25091757435558987,
                        },
                      },
                    },
                  },
                  historical_context: {
                    type: "object",
                    properties: {
                      avg_risk: {
                        type: "number",
                        example: 0.4648894901966819,
                      },
                      max_risk: {
                        type: "number",
                        example: 0.793733831084337,
                      },
                      min_risk: {
                        type: "number",
                        example: 0.052052052052052045,
                      },
                      percentile_90: {
                        type: "number",
                        example: 0.7643509299354538,
                      },
                    },
                  },
                  temperature_risk_curve: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        temperature: {
                          type: "number",
                          example: 17,
                        },
                        risk: {
                          type: "number",
                          example: 0.23626272454622974,
                        },
                      },
                    },
                  },
                  seasonal_risk: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        discovery_month: {
                          type: "number",
                          example: 1,
                        },
                        risk_score: {
                          type: "number",
                          example: 0.31360745962156844,
                        },
                        t_max: {
                          type: "number",
                          example: 14.543571428571429,
                        },
                        t_min: {
                          type: "number",
                          example: 0.8092857142857144,
                        },
                      },
                    },
                  },
                  state_comparison: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        state: {
                          type: "string",
                          example: "KY",
                        },
                        avg_risk: {
                          type: "number",
                          example: 0.5175714613409664,
                        },
                      },
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
                example: "Failed to query model...",
              },
            },
          },
        },
      },
    },
  },
};
