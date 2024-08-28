require("dotenv").config();
const express = require("express")
const app = express();

const connection = require('./db/connect');
const cors = require("cors");

const authRouter = require('./routes/auth')


const jobRouter = require('./routes/auth')

//connect to DB
connection()

app.use(express.json());

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/job',jobRouter)
const port = process.env.PORT || 3000

const start = async () => {
    try {
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();