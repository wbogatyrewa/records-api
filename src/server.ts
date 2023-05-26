import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import userRouter from './routes/user';
import sequelize from './models';


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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});