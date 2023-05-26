import { Request, Response, NextFunction  } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers['x-access-token'];

    if (!token) {
      res.status(403).send('No token provided');
    }

    jwt.verify((token || '').toString(), process.env.SECRET_KEY || '', (error, decoded) => {
      if (error) {
        res.status(401).send('Unauthorized');
      }
      req.userId = decoded?.id;
      next();
    });
  } catch (error) {
    res.status(401).send(`Unauthorized: ${error}`);
  }
};