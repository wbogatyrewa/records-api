import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from './components/Header/Header';
import Modal from '@mui/material/Modal';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Blog from './components/Blog/Blog';
import Box from '@mui/material/Box';

const defaultTheme = createTheme();

function App() {
  const [user, setUser] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [openModalSignUp, setOpenModalSignUp] = useState<boolean>(false);
  const [openModalSignIn, setOpenModalSignIn] = useState<boolean>(false);

  const changeUser = (name: string) => setUser(name);
  const changeToken = (token: string) => setToken(token);

  const signUpHandleClick = () => setOpenModalSignUp(true);
  const signInHandleClick = () => setOpenModalSignIn(true);
  const handleClose = () => {
    setOpenModalSignUp(false);
    setOpenModalSignIn(false);
  }

  useEffect(() => {
    setOpenModalSignUp(false);
    setOpenModalSignIn(false);
  }, [user])

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
          onClose={handleClose}>
            <SignUp />
        </Modal>
        <Modal
          open={openModalSignIn}
          onClose={handleClose}>
            <SignIn changeUser={changeUser} changeToken={changeToken} />
        </Modal>
        <Box mt={4}></Box>
        <Blog user={user} token={token} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
