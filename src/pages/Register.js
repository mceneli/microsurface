import React, { useState } from 'react';
import '../styles.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    // You can add your registration logic here, such as making an API call.
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
        console.log(data);
        if(data.result === "1"){
          console.log("Username already taken");
        }else{
          console.log("Registered successfully");
        }
      })
      .catch(error => {
        console.error(error);
      });

    } catch (error) {
      console.log(error.message);
    }

  };

  return (
    <div className="fullscreen-page">
      <center className="page-header"><h1>Register Page</h1></center>

      <form onSubmit={handleRegister}>
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

    </div>
  );
};

export default Register;