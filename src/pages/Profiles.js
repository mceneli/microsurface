import React, { useState } from 'react';
import '../styles.css';
import ProfileFeed from '../components/ProfileFeed';

const initialProfiles = [
    { username: 'user1', },
    { username: 'user2', },
    // ... daha fazla profile nesnesi ...
];

const Profiles = () => {
    const [profiles, setProfiles] = useState(initialProfiles);

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

    const getUsers = () => {
        return new Promise((resolve, reject) => {
          
          fetch(process.env.REACT_APP_API_ENDPOINT+"/api/Users", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Error while getting users');
              }
            })
            .then(responseData => {
              console.log(responseData);
              resolve(responseData);
            })
            .catch(error => {
              reject(error);
            });
        });
      };
    
    return (
    <div>
      <center>
        <div className="page-header">
          <div className="header-column"><h1>Profiles</h1></div>
          <div className="header-column"><button onClick={bindData} >Get Profiles</button>
                                         </div>
        </div>
      </center>
      
      <div>
        <ProfileFeed profiles={profiles} />
      </div>
      

    </div>
  );
};

export default Profiles;