import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/module/user/user.route';
import { StudentRoutes } from './app/module/student/student.route';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//use global error handler
app.use(globalErrorHandler);

//not found middleware
app.use(notFound);

app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
