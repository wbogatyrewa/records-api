import { Request, Response, NextFunction  } from 'express';
import UserModel from '../models/user';

/** 
 * Authenticates the user by checking if the given name already exists in the database. 
 * 
 * @async 
 * @method auth 
 * @param {Request} req - Express request object. 
 * @param {Response} res - Express response object. 
 * @param {NextFunction} next - Express next middleware function. 
 * @returns {Promise<void>} - Promise that resolves when the user is authenticated. 
 * @throws {Error} - Throws an error if there is an issue with authentication. 
 */
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