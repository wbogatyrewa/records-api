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

interface BlogProps {
  user: string;
  token: string;
}

const defaultTheme = createTheme();

export default function Blog({ user, token }: BlogProps) {
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [records, setRecords] = useState<
    {
      id: number;
      date: string;
      text: string;
      media: string;
      user: string;
    }[]>([]);

  useEffect(() => {
    getRecords(page - 1).then(result => {
      setTotalItems(result['totalPages']);
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
          <Grid container spacing={4}>
            {records.map((record) => (
              <Record key={record.id} record={record} />
            ))}
          </Grid>
          <Box mt={4}></Box>
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <Pagination 
              count={totalItems} 
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