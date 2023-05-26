import { Request, Response } from 'express';
import RecordModel from '../models/record';

interface Pagination {
  limit: number;
  offset: number;
}

interface PagingData {
  totalItems: number;
  records: RecordModel[];
  totalPages: number;
  currentPage: number;
}

const getPagination = (page: string, size: string): Pagination => {
  const limit = size ? +size : 20;
  const offset = page ? +page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data: any, page: string, limit: number): PagingData => {
  const { count: totalItems, rows: records } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, records, totalPages, currentPage };
};

export const getRecords = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination((page || '').toString(), (size || '').toString());
    
    const data = await RecordModel.findAndCountAll({ where: {}, limit, offset });
    const records = getPagingData(data, (page || '').toString(), limit);
    res.status(200).send(records);
  } catch (error) {
    res.status(500).send(`Getting records failed with error: ${error}`);
  }
};

// получать, сохранять файл и прописать путь к нему

export const addRecord = async (req: Request, res: Response): Promise<void> => {
  try {    
    const userId = req.userId;
    const { text, mediaPath } = req.body;
    if (!text && !mediaPath) res.status(500).send('Content can not be empty');

    const data = {
      date: new Date(),
      text: text,
      mediaPath: mediaPath,
      userId: userId
    };

    const record = RecordModel.create(data);
    res.status(200).send('New record successfully added'); 
  } catch (error) {
    res.status(500).send(`Adding record error: ${error}`);
  }
};

// добавить мидлвар на проверку юзера и записи

export const editRecord = async (req: Request, res: Response): Promise<void> => {};

export const deleteRecord = async (req: Request, res: Response): Promise<void> => {};