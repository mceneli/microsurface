import React from 'react';

const Tweet = ({ username, content, timestamp }) => {
  return (
    <div className="tweet">
      <div className="tweet-header">
        <span className="username">{username}</span>
        <span className="timestamp">{timestamp}</span>
      </div>
      <div className="tweet-content">
        {content}
      </div>
    </div>
  );
};

export default Tweet;