import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TweetFeed from '../components/TweetFeed';
import { deleteTweet } from '../util/Util';

const User = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const username = params.get('username');
    const [rows, setRows] = useState([]);
    const [checkPrivate, setCheckPrivate] = useState(false);

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
              console.log(responseData);
              resolve(responseData);
            })
            .catch(error => {
              reject(error);
            });
        });
      };

    useEffect(() => {
      bindData();
    }, []);

    const handleDelete = async (index) => {
      const updatedRows = await deleteTweet(rows, index);
      setRows(updatedRows);
    };

  return (
    <div>
      <center>
        <div className="page-header">
          <div className="header-column"><h1>User Page</h1></div>
        </div>
        <p>username: {username}</p>
        {checkPrivate && <p>Account is private</p>}
      </center>
      
      <div>
        <TweetFeed tweets={rows} onDelete={handleDelete}/>
      </div>
      
    </div>
  );
};

export default User;
