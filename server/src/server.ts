import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import sequelize from './models';
import fileUpload from 'express-fileupload';
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
app.use(fileUpload({
  createParentPath: true
}));
app.use('/media', express.static('../media'));

app.use(function(req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

sequelize.sync({ force: true }).then(() => {
  console.log('Database has been synced');
});

app.use('/api/users', userRouter);
app.use('/api/records', recordRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});