import React, { useState } from 'react';
import Profile from './Profile';

const ProfileFeed = ({ profiles }) => {
  const [initialProfiles, setProfiles] = useState(profiles || []);

  return (
    <div className="profile-feed">
      {profiles.map((profile, index) => (
        <Profile
          key={index}
          username={profile.username}
        />
      ))}
    </div>
  );
};

export default ProfileFeed;
