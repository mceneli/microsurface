import React, { useState, useEffect, useRef } from 'react';
import '../styles.css';
import SnackbarComponent from '../components/SnackbarComponent';
import UseSnackbar from '../components/UseSnackbar';
import Avatar from '@mui/material/Avatar';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { open, message, severity, handleOpenSnackbar, handleCloseSnackbar } = UseSnackbar();
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const triggerInputClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const userdata = { username: formData.username, password: formData.password };
      fetch(process.env.REACT_APP_API_ENDPOINT+"/api/auth/register", { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdata)
      })
      .then(response => response.json())
      .then(data => {
        if(data.result === "1"){
          handleOpenSnackbar('Username already taken', 'error');
        }else{
          handleOpenSnackbar('Registered successfully', 'success');
        }
      })
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="fullscreen-page">
      <center className="page-header"><h1>Register Page</h1></center>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="username">Profile Picture</label>
          <Avatar alt="Remy Sharp" onClick={triggerInputClick} src={selectedImage} />
          <input type="file" id="image" ref={inputRef} style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} />
        </div>
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
        <button type="submit">Register</button>
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

export default Register;