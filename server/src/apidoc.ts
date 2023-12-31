export default {
  openapi: "3.1.0",
  info: {
    title: "Exchange Rates API",
    version: "1.0.0",
    description:
      "This is a service that provides current exchange rates (sourced from CNB)",
  },
  servers: [
    {
      url: "https://effervescent-basbousa-225032.netlify.app/api/",
    },
  ],
  components: {
    schemas: {
      ExchangeRate: {
        type: "object",
        properties: {
          country: {
            type: "string",
            example: "Australia",
          },
          currency: {
            type: "string",
            example: "dollar",
          },
          amount: {
            type: "number",
            example: 1,
          },
          code: {
            type: "string",
            example: "AUD",
          },
          rate: {
            type: "number",
            example: 16.123,
          },
        },
      },
    },
  },
  paths: {
    "/exchange-rates": {
      get: {
        summary: "Get exchange rates",
        description: "Get current exchange rates",
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    rates: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/ExchangeRate",
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
};
