import React, { useState } from 'react';
import '../styles.css';
import TweetFeed from '../components/TweetFeed';
import TwitForm from '../components/TwitForm';

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
  { username: 'user2', content: 'Tweet content 2', timestamp: '19 minutes ago' },
  // ... daha fazla tweet nesnesi ...
];

const Home = () => {
  const [rows, setRows] = useState(initialRows);
  const [checkTwitForm, setCheckTwitForm] = useState(false);

  const bindData = async () => {
    setCheckTwitForm(false);
    //if(localStorage.getItem('token')!=null){
    const rows = await getTweets();

    const updatedRows = rows.map((row) => ({
      ...row,
      username: `${row.userName}`,
      content: `${row.text}`,
      timestamp: `${row.timestamp}`,

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
    <div>
      <center>
        <div className="page-header">
          <div className="header-column"><h1>Home Page</h1></div>
          <div className="header-column"><button onClick={bindData} >Get Tweets</button>
                                          <button onClick={() =>setCheckTwitForm(true)} >Send Tweet</button></div>
        </div>
      </center>

      {checkTwitForm ?
      (<div>
        <TwitForm/>
      </div>)
      :
      (<div>
        <TweetFeed tweets={rows} />
      </div>)
      }

    </div>
  );
};

export default Home;