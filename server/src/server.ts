import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import sequelize from './models';
import userRouter from './routes/user';
import recordRouter from './routes/record';
import multer from 'multer';

const app: Express = express();
const port: Number = 5000;

const options: cors.CorsOptions = {
  origin: `*`,
  credentials: true
};

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
      cb(null, "media");
  },
  filename: (req, file, cb) =>{
      cb(null, `${(new Date()).toISOString().replace(/:/g, '-')}.jpg`);
  }
});

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/media', express.static('./media'));
app.use(express.static(__dirname));
app.use(multer({storage:storageConfig}).single("media"));

app.use(function(req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

sequelize.sync().then(() => {
  console.log('Database has been synced');
});

app.use('/api/users', userRouter);
app.use('/api/records', recordRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});