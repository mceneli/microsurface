import React, { useState } from 'react';
import '../styles.css';
import TweetFeed from '../components/TweetFeed';
import TweetForm from '../components/TweetForm';

const initialRows = [
  { username: 'user1', content: 'Tweet content 1', timestamp: '10 minutes ago' },
  { username: 'user1', content: 'Tweet content 2', timestamp: '20 minutes ago' },
  { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
  { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
  { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
  // ... daha fazla tweet nesnesi ...
];

const Home = () => {
  const [rows, setRows] = useState(initialRows);
  const [checkTwitForm, setCheckTwitForm] = useState(false);
  
  const bindData = async () => {
    setCheckTwitForm(false);
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

  const handleDelete = async (index) => {
    try {
      console.log(index);
      console.log(rows[index].id);
      // Silinecek tweet'in id'sini al
      const tweetIdToDelete = rows[index].id; // Bu kısmı gerçek uygulamanıza göre ayarlamalısınız

      // Silme isteğini API'ye gönder
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT + `/api/Tweets/${tweetIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
      });

      if (response.ok) {
        // Başarılı bir şekilde silindiği varsayılıyor, yerel state'i güncelle
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
        console.log('The tweet was successfully deleted.');
      } else {
        const errorData = await response.json();
        console.log(errorData.message); // Tweet does not belong to the user
      }
    } catch (error) {
      console.error('An error occurred while deleting the tweet:', error.message);
    }
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

      {(checkTwitForm && localStorage.getItem('token') != null) ?
      (<div>
        <TweetForm/>
      </div>)
      :
      (<div>
        <TweetFeed tweets={rows} onDelete={handleDelete}/>
      </div>)
      }

    </div>
  );
};

export default Home;