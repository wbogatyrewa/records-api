import { Request, Response, NextFunction  } from 'express';
import UserModel from '../models/user';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const username = await UserModel.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (username) return res.json(409).send("Username already exists");
    next();
  } catch (error) {
    res.status(401).json({ message: `Authentication failed` });
  }
};