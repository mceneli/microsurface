import React, { useState, useEffect } from 'react';
import '../styles.css';
import ProfileFeed from '../components/ProfileFeed';

const Profiles = () => {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
      bindData();
    }, []);

    const bindData = async () => {
        const profiles = await getUsers();
        const updatedProfiles = profiles.map((profile) => {
          return {
            ...profile,
            username: `${profile.username}`,
          };
        });
        setProfiles(updatedProfiles);
      };

      const getUsers = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/api/Users", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error while getting users');
            }

            const responseData = await response.json();
            console.log(responseData);

            return responseData;
        } catch (error) {
            console.error('An error occurred while fetching users:', error.message);
            return [];
        }
    };
    
    return (
    <div>
      <center>
        <div className="page-header">
          <div className="header-column"><h1>Profiles</h1></div>
        </div>
      </center>
      
      <div>
        <ProfileFeed profiles={profiles} />
      </div>
      
    </div>
  );
};

export default Profiles;