import express, { Router } from "express";
import { getRecords, addRecord, editRecord, deleteRecord } from "../controllers/record";
import { verifyToken } from "../middlewares/verifyToken";

const recordRouter: Router = express.Router();

recordRouter.get('/', getRecords);
recordRouter.post('/add', verifyToken, addRecord);
recordRouter.post('/edit', verifyToken, editRecord);
recordRouter.post('/delete', verifyToken, deleteRecord);

export default recordRouter;