import React from 'react';
import { Link } from 'react-router-dom';
import classes from './navbar.module.css';
import logo from '../../assert/Zendir-logo.png';
import { FaCartShopping } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";

const Navbar = () => {
    return (
        <div className={classes.position} >
            <div className={classes.navbar}>
                <div className={classes.navbarbox1} >
                    <img src={logo} alt='Zendir-logo' />
                </div>
                <div className={classes.navbarbox2} >
                    <Link to='/'>Home</Link>
                    <Link to='/categories'>Categories</Link>
                    <Link to='/products'>Products</Link>
                    <Link to='/patners'>Patners</Link>
                    <Link to='/shop'>Shop</Link>
                    <Link to='/contact'>Contact</Link>
                    <div>
                        <Link to="/cart">
                            <FaCartShopping />
                        </Link>
                        <Link>
                            <FaTwitter />
                        </Link>
                        <Link>
                            <FaFacebookF />
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar;
