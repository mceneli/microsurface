import React, { useState, useEffect } from 'react';
import '../styles.css';
import TweetFeed from '../components/TweetFeed';
import TweetForm from '../components/TweetForm';
import { deleteTweet } from '../util/Util';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { checkTokenValidity } from '../util/Util';

const Home = () => {
  const [rows, setRows] = useState([]);
  const [checkTwitForm, setCheckTwitForm] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    bindData();
    setIsTokenValid(checkTokenValidity());
  }, []);
  
  const bindData = async () => {
    setCheckTwitForm(false);
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
  };

  const getTweets = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/api/Tweets", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
  
      if (!response.ok) {
        throw new Error('Error while getting tweets');
      }
  
      const responseData = await response.json();
  
      return responseData;
    } catch (error) {
      console.error('An error occurred while fetching tweets:', error.message);
      return [];
    }
  };

  const handleDelete = async (index) => {
    const updatedRows = await deleteTweet(rows, index);
    setRows(updatedRows);
  };

  return (
    <div>
      <center>
        <div className="page-header">
          <div className="header-column"><h1>Home Page</h1></div>
        </div>
      </center>

      {(checkTwitForm && localStorage.getItem('token') != null) ?
      (<div>
        <TweetForm/>
      </div>)
      :
      (<div>
        <TweetFeed tweets={rows} onDelete={handleDelete}/>
      </div>)
      }
      {isTokenValid && (
      <Box className="fab-container" sx={{ '& > :not(style)': { m: 1 }, }} >
        <Fab color="primary" aria-label="add">
          <AddIcon onClick={() =>setCheckTwitForm(true)} />
        </Fab>
      </Box>)}

    </div>
  );
};

export default Home;