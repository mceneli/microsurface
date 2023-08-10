import React from 'react';
import '../styles.css';
import TweetFeed from '../components/TweetFeed';

const Home = () => {

  const tweets = [
    { username: 'user1', content: 'Tweet content 1', timestamp: '10 minutes ago' },
    { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
    { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
    { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
    { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
    { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
    { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
    { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
    { username: 'user2', content: 'Tweet content 2', timestamp: '20 minutes ago' },
    // ... daha fazla tweet nesnesi ...
  ];


  return (
    <div className="fullscreen-page">
      <h1>Home Page</h1>

      <div>
        <TweetFeed tweets={tweets} />
      </div>
    </div>
  );
};

export default Home;