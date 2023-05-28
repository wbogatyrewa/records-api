import express, { Router } from "express";
import { getRecords, addRecord, editRecord, deleteRecord, getRecord } from "../controllers/record";
import { verifyToken } from "../middlewares/verifyToken";
import { isAuthor } from "../middlewares/isAuthor";

const recordRouter: Router = express.Router();

recordRouter.get('/', getRecords);
recordRouter.get('/:id', getRecord);
recordRouter.post('/add', verifyToken, addRecord);
recordRouter.post('/edit/:id', [verifyToken, isAuthor], editRecord);
recordRouter.post('/delete/:id', [verifyToken, isAuthor], deleteRecord);

export default recordRouter;