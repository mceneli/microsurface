import React, { useState } from 'react';
import Tweet from './Tweet';

const TweetFeed = ({ tweets, onDelete }) => {
  const [initialTweets, setTweets] = useState(tweets || []);

  return (
    <div className="tweet-feed">
      {tweets.map((tweet, index) => (
        <Tweet
          key={index}
          username={tweet.username}
          content={tweet.content}
          timestamp={tweet.timestamp}
          onDelete={() => onDelete(index)}
        />
      ))}
    </div>
  );
};

export default TweetFeed;
