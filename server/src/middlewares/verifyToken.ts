import { Request, Response, NextFunction  } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

/** 
 * Verifies the JWT token provided in the request headers. 
 * 
 * @async 
 * @method verifyToken 
 * @param {Request} req - Express request object. 
 * @param {Response} res - Express response object. 
 * @param {NextFunction} next - Express next middleware function. 
 * @returns {Promise<void>} - Promise that resolves when the token is verified. 
 * @throws {Error} - Throws an error if there is an issue with verifying the token. 
 */ 
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