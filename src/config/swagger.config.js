import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación de la API",
      description: "Documentación de la API de la aplicación de gestión de productos y carritos de compra",
    },
  },
  apis: ["/docs/**/*.yaml"],
};

const specs = swaggerJSDoc(swaggerOptions);

export { specs };
