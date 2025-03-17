import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API Documentation Jahit Baju Apps",
    version: "1.0.0",
    description: "Dokumentasi API Jahit Baju Apps",
  },
  host: "localhost:3000",
  schemes: ["http"],
  securityDefinitions: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/route/api.js", "./src/route/public-api.js"]; // Sesuaikan dengan file route



swaggerAutogen()(outputFile, endpointsFiles);
