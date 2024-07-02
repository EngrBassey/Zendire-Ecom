import React from 'react';
import classes from './header.module.css';

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.headerContainer}>
        <h1>Discount on fall collection</h1>
        <button className={classes.btn1}>WHAT NEW</button>
        <button className={classes.btn2}>PRODUCTS</button>
      </div>
    </div>
  )
}

export default Header
