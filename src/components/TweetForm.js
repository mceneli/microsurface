import React, { useState, useEffect } from 'react';

const TweetForm = () => {
    const [tweetContent, setTweetContent] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
          const decodedToken = decodeToken(localStorage.getItem('token'));
          setUserName(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
      }, [localStorage.getItem('token')]);
    
    const decodeToken = (token) => {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
    
          return JSON.parse(jsonPayload);
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      };

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
    <div>

    <label htmlFor="userName">Kullanıcı Adı:{userName}</label>

      <label htmlFor="tweetContent">Tweet İçeriği:</label>
      <textarea
        id="tweetContent"
        name="tweetContent"
        value={tweetContent}
        onChange={(e) => setTweetContent(e.target.value)}
        rows="4"
        required
      ></textarea>

      <button type="button" onClick={sendTweet}>
        Tweet Gönder
      </button>
    </div>
  );
};

export default TweetForm;