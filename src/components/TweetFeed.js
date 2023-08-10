import React from 'react';
import Tweet from './Tweet'; // Tweet bileşenini içe aktarın

const TweetFeed = ({ tweets }) => {

  return (
    <div className="tweet-feed">
      {tweets.map((tweet, index) => (
        <Tweet
          key={index}
          username={tweet.username}
          content={tweet.content}
          timestamp={tweet.timestamp}
        />
      ))}
    </div>
  );
};

export default TweetFeed;