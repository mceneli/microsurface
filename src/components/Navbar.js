import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home } from '@mui/icons-material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bottom-navbar">
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction className="navbar-component" label="Home" icon={<Home />} component={Link} to="/" />
        <BottomNavigationAction className="navbar-component" label="Register" icon={<AppRegistrationIcon />} component={Link} to="/register" />
        <BottomNavigationAction className="navbar-component" label="Login" icon={<LoginIcon />} component={Link} to="/login" />
      </BottomNavigation>
    </div>
  );
};

export default Navbar;