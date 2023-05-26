import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/user';

/**

Signs up a new user. The method hashes the password and generates a jwt-token.
*

@param {Request} req - The request object containing the user's name and password.

@param {Response} res - The response object to send the response to.

@returns {Promise} - A promise that resolves when the signup is complete.
*/
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password } = req.body;
    if (!name || !password) res.status(400).json({ message: 'Name and password are required' });
    const data = {
      name,
      password: await bcrypt.hash(password, parseInt(process.env.SALT_OF_ROUNDS as string)),
    };
    const user = await UserModel.create(data);

    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY || '', {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json(token);
    }
    else {
      res.status(409).send('Details are not correct');
    }
  } catch (error) {
    res.status(409).send(`Registration failed with error: ${error}`);
  }
};

/**

User login using jwt-token. 
*

@param {Request} req - The request object containing the user's name and password.

@param {Response} res - The response object to send the response to.

@returns {Promise} - A promise that resolves when the login is complete.
*/
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const {name, password} = req.body;
    const user = await UserModel.findOne({
      where: {
        name: name
      }
    });
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY || '', {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });
        res.status(201).json(token);
      }
      else {
        res.status(401).send('Authentication failed');
      }
    }
    else {
      res.status(401).send('Authentication failed');
    }
  } catch (error) {
    res.status(401).send(`Authorization failed with error: ${error}`);
  }
};