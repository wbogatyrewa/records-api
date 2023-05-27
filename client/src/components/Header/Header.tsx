import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface HeaderProps {
  title: string;
  signUpHandleClick: () => void;
  signInHandleClick: () => void;
  user?: string;
}

export default function Header({ title, signUpHandleClick = () => {}, signInHandleClick = () => {}, user }: HeaderProps) {
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        {
          user ||
          <>
            <Button variant="outlined" size="small" onClick={signUpHandleClick} sx={{ marginRight: '5px' }}>
              Sign up
            </Button>
            <Button variant="outlined" size="small" onClick={signInHandleClick}>
              Sign in
            </Button>
          </>
        }
      </Toolbar>
    </React.Fragment>
  );
}