import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import TweetFeed from '../components/TweetFeed';

const initialRows = [
    { username: 'user1', content: 'Tweet content 1', timestamp: '10 minutes ago' },
    { username: 'user1', content: 'Tweet content 2', timestamp: '20 minutes ago' },
    // ... daha fazla tweet nesnesi ...
];

const User = (props) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const username = params.get('username');
    const [rows, setRows] = useState(initialRows);

    const bindData = async () => {
        //if(localStorage.getItem('token')!=null){
        const rows = await getTweets();
    
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
    
      const getTweets = () => {
        return new Promise((resolve, reject) => {
          
          fetch(process.env.REACT_APP_API_ENDPOINT+"/api/Tweets", {
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
    /*<div>
      <h2>User Page</h2>
      <p>username : {username}</p>
      
      <h3>User Tweets</h3>
      <TweetFeed tweets={rows}/>

    </div>*/
    <div>
      <center>
        <div className="page-header">
          <div className="header-column"><h1>User Page</h1></div>
          <div className="header-column"><button /*onClick={bindData}*/ >Get User Tweets</button>
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