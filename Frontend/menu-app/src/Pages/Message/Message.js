import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from './WelcomePage.module.css';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();
//   const history = useHistory();

//   const handleShopNow = () => {
//     history.push('/'); // Redirect to the shop page
//   };

  return (
    <div className={classes.welcomeContainer}>
      <h1>Welcome to Zendir!</h1>
      <p>We are thrilled to have you here. Enjoy your shopping experience.</p>
      <button className={classes.shopNowButton} onClick={() => navigate('/')}>
        Shop Now
      </button>
    </div>
  );
};

export default WelcomePage;
