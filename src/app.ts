import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './module/student/student.route';
import { UserRoutes } from './module/user/user.route';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
