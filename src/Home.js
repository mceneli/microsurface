import React from 'react';
import MyDataGrid from './components/MyDataGrid';

const Home = () => {

    return(
    <div>
        
        <div className="center-container">
            <button className="center-button" onClick={handleLogout}>Logout</button>
        </div>
        <div>
            <h1>Platforms</h1>
            <MyDataGrid />
        </div>
      
    </div>
    );
};

export default Home;