import { Request, Response, NextFunction  } from 'express';
import UserModel from '../models/user';

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const name = await UserModel.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (name) {
      res.status(409).send("Username already exists");
      return;
    }
    next();
  } catch (error) {
    res.status(401).json({ message: `Authentication failed with error: ${error}` });
  }
};