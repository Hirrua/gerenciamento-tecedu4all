import 'express-async-errors';
import express from 'express';
import errorMiddleware from './middlewares/error.middleware.js';
import routes from './routes/router.js';
import connection from './database/connection.js';

const app = express();

const port = 3001;

app.use(express.json());

connection;

app.use(routes); 

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
