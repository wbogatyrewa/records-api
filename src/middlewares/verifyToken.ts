import { Request, Response, NextFunction  } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers['x-access-token'];

    if (!token) {
      res.status(403).send('No token provided');
      return;
    }

    jwt.verify((token || '').toString(), process.env.SECRET_KEY || '', (error, decoded) => {
      if (error) {
        res.status(401).send('Unauthorized');
        return;
      }
      //  LOGS!!!
      console.log(decoded);
      req.body.userId = decoded;
      next();
    });
  } catch (error) {
    res.status(401).send(`Unauthorized: ${error}`);
  }
};