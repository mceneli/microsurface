import React, { useState } from 'react';
import '../styles.css';
import SnackbarComponent from '../components/SnackbarComponent';
import UseSnackbar from '../components/UseSnackbar';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { open, message, severity, handleOpenSnackbar, handleCloseSnackbar } = UseSnackbar();

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleLogin = async (event) => {
  event.preventDefault();
  try {
    const userdata = { username: formData.username, password: formData.password };
    
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT+"/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userdata)
    });

    const responseData = await response.json();
    if (responseData.result === "1") {
      handleOpenSnackbar('User Not Found', 'error');
    }
    if (responseData.result === "2") {
      handleOpenSnackbar('Wrong Password', 'error');
    }
    if (responseData.result === "3") {
      handleOpenSnackbar('Logged In', 'success');
      localStorage.setItem('token', responseData.token);
    }
    
  } catch (error) {
    console.log(error.message);
  }

};
  
  return (
    <div className="fullscreen-page">
      <center className="page-header"><h1>Login Page</h1></center>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <SnackbarComponent
        open={open}
        message={message}
        severity={severity}
        onClose={handleCloseSnackbar}
      />

    </div>
  );
};

export default Login;