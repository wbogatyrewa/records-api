import { Request, Response } from 'express';
import RecordModel from '../models/record';
import { UploadedFile } from 'express-fileupload';
import fs from 'fs';

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
    return;
  } catch (error) {
    res.status(500).send(`Getting records failed with error: ${error}`);
  }
};

export const addRecord = async (req: Request, res: Response): Promise<void> => {
  try {    
    const { UserId, text } = req.body;
    const file = (req.files?.media) as UploadedFile;

    if (!text && !file) {
      res.status(500).send('Content can not be empty');
      return;
    }

    const mediaPath = `/media/${(new Date()).toLocaleString()}`;
    file.mv(`../..${mediaPath}`, function(error) {
      if (error) {
        res.status(500).send(`No files were uploaded: ${error}`);
        return;
      }
    });

    const record = {
      text: text,
      mediaPath: mediaPath,
      UserId: UserId
    };
    
    await RecordModel.create(record);
    res.status(200).send('New record successfully added');
    return;
  } catch (error) {
    res.status(500).send(`Error adding Record: ${error}`);
  }
};

// загружать новые медиа, удалять старые
export const editRecord = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const recordById = await RecordModel.findByPk(id);

    if (!recordById) {
      res.status(500).send(`Record doesn't exist`);
      return;
    }

    const { UserId, text } = req.body;
    const file = (req.files?.media) as UploadedFile; 

    if (!text && !file) {
      res.status(500).send('Content can not be empty');
      return;
    }

    const mediaPath = `/media/${(new Date()).toLocaleString()}`;
    file.mv(mediaPath, function(error) {
      if (error) {
        res.status(500).send(`No files were uploaded: ${error}`);
        return;
      }
    });

    const oldPath = recordById.get('mediaPath');
    fs.unlink(`../..${oldPath}`, (err) => {
      if (err) throw err;
      console.log('Delete file');
    });

    const updateRecord = {
      text: text,
      mediaPath: mediaPath,
      UserId: UserId
    };

    const [data] = await RecordModel.update(updateRecord, {
      where: { id: id }
    });

    if (data === 1) {
      res.status(200).send('Record was updated successfully');
      return;
    } else {
      res.status(500).send('Cannot update Record');
      return;
    }
  } catch (error) {
    res.status(500).send(`Error updating Record: ${error}`);
  }
};

// удалять медиа поста с сервера
export const deleteRecord = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const recordById = await RecordModel.findByPk(id);

    if (!recordById) {
      res.status(500).send(`Record doesn't exist`);
      return;
    }

    const oldPath = recordById.get('mediaPath');
    fs.unlink(`../..${oldPath}`, (err) => {
      if (err) throw err;
      console.log('Delete file');
    });

    const data = await RecordModel.destroy({
      where: { id: id }
    });
    if (data === 1) {
      res.status(200).send('Record was deleted successfully');
      return;
    } else {
      res.status(500).send('Cannot delete Record');
      return;
    }
  } catch (error) {
    res.status(500).send(`Error deleting Record: ${error}`);
  }
};