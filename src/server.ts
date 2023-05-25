import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


const app: Express = express();
const port: Number = 5000;

const options: cors.CorsOptions = {
  origin: `http://localhost:${port}`
};

app.use(cors(options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});