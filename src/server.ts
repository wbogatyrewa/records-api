import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import sequelize from './models';
import userRouter from './routes/user';
import recordRouter from './routes/record';


const app: Express = express();
const port: Number = 5000;

const options: cors.CorsOptions = {
  origin: `http://localhost:${port}`
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: true }).then(() => {
  console.log('Database has been synced');
});

app.use('/api/users', userRouter);
app.use('/api/records', recordRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});