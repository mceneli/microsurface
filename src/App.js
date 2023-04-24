import React, { useState } from "react";
//import firebase from "firebase/app";
//import "firebase/auth";

const RegisterLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(true);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      //await firebase.auth().createUserWithEmailAndPassword(email, password);

      const userdata = { username: 'example', password: 'password123' };

      fetch('http://192.168.1.5:31609/api/auth/register', {
      //fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdata)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });

    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userdata = { username: 'example', password: 'password123' };
  
      const response = await fetch('http://192.168.1.5:31609/api/auth/login', {
      //const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdata)
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const responseData = await response.json(); // parse the response body

      console.log(responseData);
      localStorage.setItem('token', responseData.token);
  
    } catch (error) {
      setError(error.message);
    }
  };

  const handleToggle = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div>
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>
      <button onClick={handleToggle}>
        {isRegistering
          ? "Already have an account? Login here."
          : "Don't have an account? Register here."}
      </button>
    </div>
  );
};

export default RegisterLogin;