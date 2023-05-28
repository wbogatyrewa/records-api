import React, { ChangeEvent, useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addRecords } from '../../api/addRecord';
import { getRecords } from '../../api/getRecords';
import { getRecord } from '../../api/getRecord';

interface RecordFormProps {
  id?: number;
  recordText?: string;
  media?: string;
  token: string;
  handleClose?: () => void;
  page?: number;
  totalPagesChange?: (pages: number) => void;
  recordsChange?: (recordsList: []) => void;
  editOrDelete: boolean;
}

const defaultTheme = createTheme();

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
};

export default function RecordForm({ 
  id, token, handleClose = () => {},
  page, totalPagesChange = () => {},
  recordsChange = () => {},
  editOrDelete = false }: RecordFormProps) {

  const [file, setFile] = useState<File>();
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const addHandleSubmit = () => {
    if (!text && !file) {
      setError(true);
      return;
    }

    const formData: any = new FormData();
    formData.append('text', text);
    formData.append('media', file);
    
    addRecords(formData, token).then(result => {
      handleClose();
      getRecords((page || 1) - 1).then(result => {
        totalPagesChange(result['totalPages']);
        recordsChange(result['records'].map((record: any) => {
          return {
            id: record['id'],
            date: record['createdAt'],
            text: record['text'],
            media: record['mediaPath'],
            user: record['User']['name']
          }
        }));
      });
    });
  };

  const editHandleSubmit = () => {};

  const deleteHandleSubmit = () => {};


  useEffect(() => {
    if (id && editOrDelete) {
      getRecord(id).then(record => {
        setText(record.text);
        setFile(record.media);
      })
    }
  }, [id, editOrDelete]);

  return (
    <Box sx={style}>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
            <Typography component="h1" variant="h5" mb={4}>
              Record form
            </Typography>
            <form encType='multipart/form-data'>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    value={text}
                    onChange={handleTextChange}
                    multiline
                    fullWidth
                    id="text"
                    label="Text"
                    name="text"
                    error={error}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input type="file" onChange={handleFileChange} accept="image/png, image/jpeg" />
                </Grid>
                
              </Grid>
              {
                editOrDelete ? 
                <>
                  <Button
                    variant="contained"
                    onClick={editHandleSubmit}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={deleteHandleSubmit}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Delete
                  </Button>
                </>
                : 
                <Button
                  variant="contained"
                  onClick={addHandleSubmit}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add
                </Button>
              }
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
}