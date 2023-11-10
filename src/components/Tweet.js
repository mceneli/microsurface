import React from 'react';

const Tweet = ({ username, content, timestamp, onDelete }) => {
  return (
    <div className="tweet">
      <div className="tweet-header">
        <span className="username">{username}</span>
        <span className="timestamp">{timestamp}</span>
      </div>
      <div className="tweet-content">
        {content}
      </div>
      <button className="delete-button" onClick={onDelete}>
        Sil
      </button>
    </div>
  );
};

export default Tweet;