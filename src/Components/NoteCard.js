import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard({note}) {
  return (
    <Card sx={{ minWidth: 275 }} className="cardy">
      <CardContent>
      <TextareaAutosize
        maxRows={4}
        aria-label="maximum height"
        placeholder="Maximum 4 rows"
        defaultValue={note}
        style={{ width: 250 }}
        />
        
      </CardContent>
    </Card>
  );
}
