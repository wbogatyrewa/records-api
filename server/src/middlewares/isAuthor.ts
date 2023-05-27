import { Request, Response, NextFunction  } from 'express';
import RecordModel from '../models/record';

/** 
 * Checks if the user making the request is the author of the specified record. 
 * 
 * @async 
 * @method isAuthor 
 * @param {Request} req - Express request object. 
 * @param {Response} res - Express response object. 
 * @param {NextFunction} next - Express next middleware function. 
 * @returns {Promise<void>} - Promise that resolves if the user is the author of the record. 
 * @throws {Error} - Throws an error if there is an issue with the authorization. 
 */
export const isAuthor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userTokenId = req.body.UserId;
    const recordId = req.params.id;
    const record = await RecordModel.findByPk(recordId);
    if (!record) {
      res.status(401).send(`Record doesn't exist`);
      return;
    }

    const userId = record.get('UserId');

    if (userTokenId !== userId) {
      res.status(401).send(`User doesn't have permission to access this record`);
      return;
    }
    next();
  } catch (error) {
    res.status(401).send(`Author error: ${error}`);
  }
};