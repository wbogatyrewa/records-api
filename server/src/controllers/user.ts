import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/user";

/**
 * Registers a new user with the given name and password.
 *
 * @async
 * @method signup
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Promise that resolves when the user is registered.
 * @throws {Error} - Throws an error if there is an issue with registration.
 */
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      res.status(400).json({ message: "Name and password are required" });
      return;
    }
    const data = {
      name,
      password: await bcrypt.hash(
        password,
        parseInt(process.env.SALT_OF_ROUNDS as string)
      ),
    };
    const user = await UserModel.create(data);

    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY || "", {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });
      res.status(201).send({
        token: token,
        name: name,
      });
      return;
    } else {
      res.status(409).send("Details are not correct");
      return;
    }
  } catch (error) {
    res.status(409).send(`Registration failed with error: ${error}`);
  }
};

/**
 * Logs in a user with the given name and password.
 *
 * @async
 * @method login
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Promise that resolves when the user is logged in.
 * @throws {Error} - Throws an error if there is an issue with logging in.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password } = req.body;
    const user = await UserModel.findOne({
      where: {
        name: name,
      },
    });
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY || "", {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        res.status(201).send({
          token: token,
          name: name,
        });
        return;
      } else {
        res.status(401).send("Authentication failed");
        return;
      }
    } else {
      res.status(401).send("Authentication failed");
      return;
    }
  } catch (error) {
    res.status(401).send(`Authorization failed with error: ${error}`);
  }
};
