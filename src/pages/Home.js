import React, { useState } from 'react';
import '../styles.css';
import TweetFeed from '../components/TweetFeed';

const initialRows = [
  { username: 'user1', content: 'Tweet content 1', timestamp: '10 minutes ago' },
  { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
  { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
  { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
  { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
  { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
  { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
  { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
  { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
  { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
  { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
  { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
  { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
  { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
  { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
  { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
  // ... daha fazla tweet nesnesi ...
];

const Home = () => {
  const [rows, setRows] = useState(initialRows);

  const bindData = async () => {
    //if(localStorage.getItem('token')!=null){
    const rows = await getTweets();

    const updatedRows = rows.map((row) => ({
      ...row,
      username: `${row.userName}`,
      content: `${row.text}`,
      timestamp: '20 minutes ago',

    }));

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
          'Content-Type': 'application/json'
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
    <div className="fullscreen-page">
      <center><div height="15vh"><h1>Home Page</h1></div></center>

      <div>
        <TweetFeed tweets={rows} />
        <div className="center-container"><button className="center-button" onClick={bindData}>Bind Data</button></div>
      </div>
    
    </div>
  );
};

export default Home;