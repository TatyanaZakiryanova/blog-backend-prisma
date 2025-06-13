import { Options } from 'swagger-jsdoc';

const swaggerConfig: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'Документация для REST API блога',
    },
    servers: [
      {
        url: 'https://blog-backend-prisma-sv62.onrender.com',
      },
    ],
  },
  apis: ['src/swagger/*.yaml'],
};

export default swaggerConfig;
