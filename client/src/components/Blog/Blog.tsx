import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Record from '../Record/Record';
import { getRecords } from '../../api/getRecords';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import RecordForm from '../RecordForm/RecordForm';

interface BlogProps {
  user: string;
  token: string;
}

const defaultTheme = createTheme();

export default function Blog({ user, token }: BlogProps) {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [openModalRecordForm, setOpenModalRecordForm] = useState<boolean>(false);
  const [editOrDelete, setEditOrDelete] = useState<boolean>(false);
  const [id, setId] = useState<number>(1);
  const [records, setRecords] = useState<
    {
      id: number;
      date: string;
      text: string;
      media: string;
      user: string;
    }[]>([]);

  const totalPagesChange = (pages: number) => {
    setTotalPages(pages);
  };

  const recordsChange = (recordsList: []) => {
    setRecords(recordsList);
  };

  const addHandleClick = () => {
    setOpenModalRecordForm(true);
    setEditOrDelete(false);
  }

  const handleClose = () => {
    setOpenModalRecordForm(false);
  };

  const handleRecordClick = (event:  React.MouseEvent<HTMLButtonElement>, key: number) => {
    if (user) {
      setOpenModalRecordForm(true);
      setEditOrDelete(true);
      setId(key);
    }
    else {
      alert('Please, Sign up or Sign in');
    }
  };

  useEffect(() => {
    getRecords(page - 1).then(result => {
      setTotalPages(result['totalPages']);
      setRecords(result['records'].map((record: any) => {
        return {
          id: record['id'],
          date: record['createdAt'],
          text: record['text'],
          media: record['mediaPath'],
          user: record['User']['name']
        }
      }));
    });
  }, [page]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="lg">
        <CssBaseline />
        <main>
          {user && 
            <Box mb={4}>
              <Button 
                onClick={addHandleClick}
                variant='contained'>
                  Add record
              </Button>
            </Box>
          }
          <Modal
            open={openModalRecordForm}
            onClose={handleClose}>
              <RecordForm 
                id={id}
                token={token} 
                handleClose={handleClose} 
                page={page}
                totalPagesChange={totalPagesChange}
                recordsChange={recordsChange}
                editOrDelete={editOrDelete} />
          </Modal>          
          <Grid container spacing={4}>
            {records.map((record) => (
              <Record key={record.id} record={record} handleRecordClick={handleRecordClick} />
            ))}
          </Grid>
          <Box mt={4}></Box>
          <Stack spacing={2} sx={{ alignItems: 'center', mb: 4 }}>
            <Pagination 
              count={totalPages} 
              page={page}
              onChange={(e, value) => setPage(value)}
              variant="outlined" 
              color="primary" />
          </Stack>
        </main>
      </Container>
    </ThemeProvider>
  );
}