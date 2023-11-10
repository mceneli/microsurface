import React, { useState, useEffect } from 'react';
import { decodeToken } from '../util/Util';

const TweetForm = () => {
    const [tweetContent, setTweetContent] = useState('');
    const [userName, setUserName] = useState('');
    let token = null;
    if(localStorage.getItem('token')){
      token = decodeToken(localStorage.getItem('token'));
    }
    
    useEffect(() => {
      if (token) {
        
        setUserName(token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
      }    
    }, [token]);
    
      const sendTweet = async () => {
        try {
          const data = { username: userName, text: tweetContent};
          
          const response = await fetch(process.env.REACT_APP_API_ENDPOINT+"/api/tweets/CreateTweet", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(data)
          });
          if(response){
            console.log("Tweet Created.");
          }
        } catch (error) {
          console.log(error.message);
        }
      
      };
    
  return (
    <div className="tweet-form-container">
    <label htmlFor="userName">Kullanıcı Adı: {userName}</label>

    <label htmlFor="tweetContent">Tweet İçeriği:</label>
    <textarea
      id="tweetContent"
      name="tweetContent"
      value={tweetContent}
      onChange={(e) => setTweetContent(e.target.value)}
      rows="4"
      required
    ></textarea>

    <button type="button" className="send-button" onClick={sendTweet}>
      Tweet Gönder
    </button>
  </div>
  );
};

export default TweetForm;