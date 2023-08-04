import React, { useState, useEffect } from "react";
import MyDataGrid from './components/MyDataGrid';

const RegisterLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isRegistering, setIsRegistering] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Perform initialization tasks here

    const token = localStorage.getItem('token');
    setIsLoggedIn(token !== null);
  }, []);

  const handleRegister = async (event) => {
    setMessage(null);
    event.preventDefault();
    try {
      const userdata = { username: username, password: password };

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
          setMessage("Username already taken");
        }else{
          setMessage("Registered successfully");
        }
      })
      .catch(error => {
        console.error(error);
      });

    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLogin = async (event) => {
    setMessage(null);
    event.preventDefault();
    try {
      const userdata = { username: username, password: password };
      
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
      setMessage("Logged In");
      localStorage.setItem('token', responseData.token);
      setIsLoggedIn(true);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setMessage("Logged Out");
  };

  const handleToggle = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div>

      {isLoggedIn ? (
      <div> 
        <div>
          <div className="center-container">
            <button className="center-button" onClick={handleLogout}>Logout</button>
          </div>
          <div>
            <h1>Platforms</h1> <MyDataGrid /> 
          </div>
        </div>
      </div>
        ) : (
      <div>
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <br />
        {message && <div style={{ color: "red" }}>{message}</div>}
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      
      <button className="text-button" onClick={handleToggle}>
        {isRegistering
          ? "Already have an account? Login here."
          : "Don't have an account? Register here."}
      </button>
      </form>

      </div>
      )
    }

  </div>    
  );
};

export default RegisterLogin;