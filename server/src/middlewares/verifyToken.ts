import { Request, Response, NextFunction  } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers['x-access-token'];

    if (!token) {
      res.status(403).send('No token provided');
      return;
    }

    jwt.verify((token || '').toString(), process.env.SECRET_KEY || '', (error, decoded) => {
      if (error) {
        res.status(401).send(`Unauthorized: ${error}`);
        return;
      }
      req.body.UserId = (decoded as JwtPayload).id;
      next();
    });
  } catch (error) {
    res.status(401).send(`Unauthorized: ${error}`);
  }
};