import express, { Router } from "express";
import { getRecords, addRecord, editRecord, deleteRecord } from "../controllers/record";

const recordRouter: Router = express.Router();

recordRouter.get('/', getRecords);
recordRouter.post('/add', addRecord);
recordRouter.post('/edit', editRecord);
recordRouter.post('/delete', deleteRecord);

export default recordRouter;