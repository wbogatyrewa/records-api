import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

interface RecordProps {
  record: {
    id: number;
    date: string;
    text: string;
    media: string;
    user: string;
  };
  handleRecordClick?: (event:  React.MouseEvent<HTMLButtonElement>, key: number) => void;
}

export default function Record({ record, handleRecordClick = () => {} }: RecordProps) {
  return (
    <Grid item xs={12} md={6} lg={3}>
      <CardActionArea component="button" onClick={(event) => handleRecordClick(event, record.id)}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {record.user}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {record.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {record.text}
            </Typography>
          </CardContent>
          {
            record.media && 
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image={`http://5.188.50.113:5000\\${record.media}`}
              alt={record.media}
            />
          }
        </Card>
      </CardActionArea>
    </Grid>
  );
}