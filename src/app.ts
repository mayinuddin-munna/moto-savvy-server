import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

const testRoute = (req: Request, res: Response) => {
  res.send("Server is running!");
};

app.get('/', testRoute);

// Global Error Handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
