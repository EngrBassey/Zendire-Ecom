import React from 'react';
import { Link } from 'react-router-dom';
import classes from './navbar.module.css';
import logo from '../../assert/Zendir-logo.png';
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
    return (
        <div className={classes.position} >
            <div className={classes.navbar}>
                <div className={classes.navbarbox1} >
                    <img src={logo} alt='Zendir-logo' />
                </div>
                <div className={classes.navbarbox2} >
                    <Link to='/'>Home</Link>
                    <Link to=''>Categories</Link>
                    <Link to=''>Products</Link>
                    <Link to=''>Patners</Link>
                    <Link to=''>Shop</Link>
                    <Link to=''>Contact</Link>
                    <div>
                        <Link to="/cart">
                            <FaCartShopping />
                        </Link>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Signup</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar;
