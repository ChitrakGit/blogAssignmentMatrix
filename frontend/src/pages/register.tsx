// src/Login.tsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../config/authSlice';
import { useNavigate  } from 'react-router-dom';
import { selectAuthLoadingStatus } from '../selectors/selectors';
import LoadingScreen from '../components/loading';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const dispatch:any = useDispatch();
  const navigate = useNavigate ();

  const loadingStatus = useSelector(selectAuthLoadingStatus);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!(name && email && password)){
      return alert("please fill all field")
    }
    dispatch(register({ name, email, password })).then((data:any)=>{
      console.log("===",data)
      if(data.payload?.success){
        localStorage.setItem("accesstoken",data.payload.token.accessToken);
        localStorage.setItem("refreshtoken",data.payload.token.accessToken);

        localStorage.setItem("userName",data.payload.token.accessToken);

        navigate('/dashboard')
      }
    }) ;
  };


    return (
      <div>
         {loadingStatus === 'loading'? (
        <LoadingScreen open={loadingStatus === 'loading'} message="Processing..." severity="info" />
      ) : (
        <>
       <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
      <p>
        Already have account{' '}
        <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>Login</Link>.
      </p>
    </Box>
        </>
      )}
      </div>
    );
  

 
};

export default Register;














