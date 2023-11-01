import React, { useState, useEffect } from 'react';

const TwitForm = () => {
    const [twitContent, setTwitContent] = useState('');
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
    
  return (
    <div>

    <label htmlFor="userName">Kullanıcı Adı:{userName}</label>

      <label htmlFor="twitContent">Twit İçeriği:</label>
      <textarea
        id="twitContent"
        name="twitContent"
        value={twitContent}
        onChange={(e) => setTwitContent(e.target.value)}
        rows="4"
        required
      ></textarea>

      <button type="button" /*onClick={handleSubmit}*/>
        Twit Gönder
      </button>
    </div>
  );
};

export default TwitForm;