import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TweetFeed from '../components/TweetFeed';
import { decodeToken, deleteTweet } from '../util/Util';
import SnackbarComponent from '../components/SnackbarComponent';
import UseSnackbar from '../components/UseSnackbar';

const User = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const username = params.get('username');
    const [rows, setRows] = useState([]);
    const [checkPrivate, setCheckPrivate] = useState();
    const [authorizedUsername, setAuthorizedUsername] = useState('');
    const { open, message, severity, handleOpenSnackbar, handleCloseSnackbar } = UseSnackbar();

    let token = null;
    if(localStorage.getItem('token')){
      token = decodeToken(localStorage.getItem('token'));
    }

    useEffect(() => {
      bindData();
      if (token) {
        setAuthorizedUsername(token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
      } 
    }, []);

    const bindData = async () => {
        const rows = await getUserTweets();
    
        const updatedRows = rows.map((row) => {
          const date = new Date(row.date);
        
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const hour = date.getHours();
          const minute = date.getMinutes();
          const second = date.getSeconds();
        
          return {
            ...row,
            username: `${row.userName}`,
            content: `${row.text}`,
            timestamp: `${day}/${month}/${year} ${hour}:${minute}:${second}`,
          };
        });
    
        setRows(updatedRows);
      };
    
      const getUserTweets = () => {
        return new Promise((resolve, reject) => {
          
          fetch(process.env.REACT_APP_API_ENDPOINT+"/api/Tweets/GetTweetsByUsername/"+username, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
            .then(response => {
              if (response.ok) {
                setCheckPrivate(false);
                return response.json();
              } else {
                if(response.statusText === "Bad Request"){
                  console.log('Profile is Hidden');
                  setCheckPrivate(true);
                  return [];
                }
              }
            })
            .then(responseData => {
              resolve(responseData);
            })
            .catch(error => {
              reject(error);
            });
        });
      };

    const handleDelete = async (index) => {
      const updatedRows = await deleteTweet(rows, index);
      setRows(updatedRows);
    };

    const makePrivate = async (isPrivate) => {
      try {
        const data = {
          isPrivate: isPrivate
        };
    
        const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/api/users/MakePrivate", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify(data)
        });
    
        if (response.ok) {
          handleOpenSnackbar('Profile Hidden is '+ isPrivate, 'success');
        } else {
          handleOpenSnackbar('Failed to changge profile private settings', 'error');
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const subscribe = async () => {
      try {
        const data = {
          username: username
        };
    
        const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/api/subscription/Subscribe", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify(data)
        });
    
        if (response.ok) {
          handleOpenSnackbar('Subscribed', 'success');
          bindData();
        } else {
          const errorData = await response.json();
          handleOpenSnackbar('Failed to subscription: '+errorData.message, 'error');
        }
      } catch (error) {
        console.log(error.message);
      }
    };

  return (
    <div>
      <center>
        <div className="page-header">
          <div className="header-column"><h1>User Page</h1></div>
        </div>
        <p>username: {username}</p>
        {checkPrivate && <p>Account is private</p>}
        {(username === authorizedUsername) && (<div><button onClick={() =>makePrivate(true)} >Make Private</button>
                                           <button onClick={() =>makePrivate(false)} >Make Public</button></div>)}
        {(checkPrivate && token)&& (<div><button onClick={() =>subscribe()} >Subscribe</button></div>)}
      </center>
      
      <div>
        <TweetFeed tweets={rows} onDelete={handleDelete}/>
      </div>

      <SnackbarComponent
        open={open}
        message={message}
        severity={severity}
        onClose={handleCloseSnackbar}
      />
      
    </div>
  );
};

export default User;
