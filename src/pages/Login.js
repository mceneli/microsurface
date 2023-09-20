import React, { useState } from 'react';
import '../styles.css';

const Login = () => {
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

const handleLogin = async (event) => {
  event.preventDefault();
  // You can add your registration logic here, such as making an API call.
  try {
    const userdata = { username: formData.username, password: formData.password };
    
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT+"/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userdata)
    });

    const responseData = await response.json(); // parse the response body
    if (responseData.result === "1") {
      throw new Error('User Not Found');
    }
    if (responseData.result === "2") {
      throw new Error('Wrong Password');
    }

    console.log(responseData);
    console.log("Logged In");
    localStorage.setItem('token', responseData.token);
    console.log(true);
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

    </div>
  );
};

export default Login;