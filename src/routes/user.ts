import express, { Request, Response, Router } from "express";
import { signup, login } from "../controllers/user";
import { auth } from "../middlewares/auth";

const userRouter: Router = express.Router();

userRouter.post('/signup', auth, signup);
userRouter.post('/login', login);

export default userRouter;