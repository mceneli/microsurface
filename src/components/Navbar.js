import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Explore, Favorite } from '@mui/icons-material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <BottomNavigation style={{ width: '100vw' , height: '10vh'}} value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction label="Home" icon={<Home />} component={Link} to="/" />
        <BottomNavigationAction label="Register" icon={<AppRegistrationIcon />} component={Link} to="/register" />
        <BottomNavigationAction label="Login" icon={<LoginIcon />} component={Link} to="/login" />
      </BottomNavigation>
    </div>
  );
};

export default Navbar;