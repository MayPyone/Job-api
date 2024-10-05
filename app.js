require("dotenv").config();
const express = require("express")
const app = express();

const connection = require('./db/connect');
const cors = require("cors");

const swaggerUi = require('swagger-ui-express');
const  swaggerJsdoc = require("swagger-jsdoc");
 YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const authenticateUser = require('./middleware/authentication');
const errorHandlerMiddleware = require('./middleware/error-handler');
const NotFoundError = require('./errors/not-found');
const authRouter = require('./routes/auth')


const jobRouter = require('./routes/jobs')


//connect to DB
connection()

app.use(express.json());

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/job',authenticateUser,jobRouter)

app.use(errorHandlerMiddleware);

// const options = {
//   definition: {
//     openapi: "3.1.0",
//     info: {
//       title: "LogRocket Express API with Swagger",
//       version: "0.1.0",
//       description:
//         "This is a simple CRUD API application made with Express and documented with Swagger",
//       license: {
//         name: "MITb ",
//         url: "https://spdx.org/licenses/MIT.html",
//       },
//       contact: {
//         name: "LogRocket",
//         url: "https://logrocket.com",
//         email: "info@email.com",
//       },
//     },
//     servers: [
//       {
//         url: "http://localhost:3000",
//       },
//     ],
//   },
//   apis: ["./routes/*.js"],
// };

// const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

const port = process.env.PORT || 3000

const start = async () =>   { 
    try {
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();