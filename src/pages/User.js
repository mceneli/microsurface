import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TweetFeed from '../components/TweetFeed';

const initialRows = [
    { username: 'user1', content: 'Tweet content 1', timestamp: '10 minutes ago' },
    { username: 'user1', content: 'Tweet content 2', timestamp: '20 minutes ago' },
    // ... daha fazla tweet nesnesi ...
];

const User = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const username = params.get('username');
    const [rows, setRows] = useState(initialRows);

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
        //setMessage("Tweets Listed");
      /*}else{
        setRows([]);
        setMessage("Unauthorized");
      }*/
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
                throw new Error('Error while getting tweets');
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

  return (
    <div>
      <center>
        <div className="page-header">
          <div className="header-column"><h1>User Page</h1></div>
          <div className="header-column"><button onClick={bindData} >Get User Tweets</button>
                                         </div>
        </div>
        <p>username : {username}</p>
      </center>
      
      <div>
      <TweetFeed tweets={rows}/>
      </div>
      
    </div>
  );
};

export default User;