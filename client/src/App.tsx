import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Header from './components/Header/Header';
import Modal from '@mui/material/Modal';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';

const defaultTheme = createTheme();

function App() {
  const [user, setUser] = useState<string>('');
  const [openModalSignUp, setOpenModalSignUp] = useState<boolean>(false);
  const [openModalSignIn, setOpenModalSignIn] = useState<boolean>(false);

  const signUpHandleClick = () => setOpenModalSignUp(true);
  const signInHandleClick = () => setOpenModalSignIn(true);
  const handleClose = () => {
    setOpenModalSignUp(false);
    setOpenModalSignIn(false);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header 
          title="Blog" user={user} 
          signUpHandleClick={signUpHandleClick} 
          signInHandleClick={signInHandleClick} />
        <Modal
          open={openModalSignUp}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
            <SignUp />
        </Modal>
        <Modal
          open={openModalSignIn}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
            <SignIn />
        </Modal>
      </Container>
    </ThemeProvider>
  );
}

export default App;
