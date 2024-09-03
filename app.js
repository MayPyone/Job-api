require("dotenv").config();
const express = require("express")
const app = express();

const connection = require('./db/connect');
const cors = require("cors");

const authenticateUser = require('./middleware/authentication');
const NotFoundError = require('./errors/not-found');
const authRouter = require('./routes/auth')


const jobRouter = require('./routes/jobs')


//connect to DB
connection()

app.use(express.json());

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/job',authenticateUser,jobRouter)

app.use((err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ message: err.message || 'Internal Server Error' });
});

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