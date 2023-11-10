import React from 'react';
import { decodeToken } from '../util/Util';

const Tweet = ({ username, content, timestamp, onDelete }) => {
  let loggedInUserName = "";
  const token = localStorage.getItem('token');
  if(token){
    const decodedToken = decodeToken(localStorage.getItem('token'));
    if(decodedToken != null){
      loggedInUserName = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "";
    }
  }
  
  return (
    <div className="tweet">
      <div className="tweet-header">
        <span className="username">{username}</span>
        <span className="timestamp">{timestamp}</span>
      </div>
      <div className="tweet-content">
        {content}
      </div>
      {loggedInUserName == username && (
        <button className="delete-button" onClick={onDelete}>
          Sil
        </button>
      )}
    </div>
  );
};

export default Tweet;