import React from 'react';

const Profile = ({ username }) => {
  
  return (
    <div className="profile">
        <span className="username">{username}</span>
    </div>
  );
};

export default Profile;