import React from 'react';
import { Link } from 'react-router-dom';

const Profile = ({ username }) => {
  
  return (
    <div className="profile">
      <Link to={`/user?username=${username}`} className="profile-link">
        <span className="username">{username}</span>
      </Link>
    </div>
  );
};

export default Profile;