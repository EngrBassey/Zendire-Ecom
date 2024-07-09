import React, { useState } from 'react';
import classes from './check.module.css';
import Shoplist from '../ShopList/Shoplist';
import { Link } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";

const Check = () => {

  const items = ['All', 'Accessories', 'Clothings', 'Shirts', 'Shoes', 'Shorts'];

  const [active, setActive] = useState(0);

  return (
    <div className={classes.check}>
      <h1>Check out what's new</h1>
      <h2>Latest of the trends we have to offer</h2>
      <div className={classes.categories}>
        <ul>
          {items.map((item, indx) => (
            <li
              key={indx}
              className={active === indx ? classes.active : ""}
              onClick={() => setActive(indx)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Shoplist />
    </div>
  )
}

export default Check
