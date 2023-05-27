import { Request, Response, NextFunction  } from 'express';
import RecordModel from '../models/record';

export const isAuthor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // получить id юзера после декодинга и UserId записи
    // сравнить эти id
    // если норм, то вызвать next(), если нет, то выкинуть ошибку
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