// src/Login.tsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../config/authSlice';
import { useNavigate  } from 'react-router-dom';
import { selectAuthLoadingStatus } from '../selectors/selectors';
import LoadingScreen from '../components/loading';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const dispatch:any = useDispatch();
  const navigate = useNavigate ();

  const loadingStatus = useSelector(selectAuthLoadingStatus);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!(email&&password)){
      return alert("please fill all fields")
    }
    dispatch(login({ email, password })).then((data:any)=>{
        console.log("data",data)
        if(data.payload?.success){
          localStorage.setItem("accesstoken",data.payload.token.accessToken);
          localStorage.setItem("refreshtoken",data.payload.token.accessToken);
          localStorage.setItem("username",data.payload.user.name);
          

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
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
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
        Dont have account{' '}
        <Link to="/register" style={{ textDecoration: 'none', color: 'blue' }}>Sign In</Link>.
      </p>
    </Box>
        </>
      )}
      </div>
    );
  

 
};

export default Login;














