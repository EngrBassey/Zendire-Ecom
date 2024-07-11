import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './navbar.module.css';
import logo from '../../assert/Zendir-logo.png';
import { FaCartShopping } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to manage mobile menu
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const userLoggedIn = localStorage.getItem('user');
        if (userLoggedIn) {
            const user = JSON.parse(userLoggedIn);
            setIsLoggedIn(true);
            setUsername(user.username);
            setIsAdmin(user.isAdmin);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className={classes.position}>
            <div className={classes.navbar}>
                <div className={classes.navbarbox1}>
                    <img src={logo} alt='Zendir-logo' />
                </div>
                <button className={classes.toggleButton} onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
                <div className={`${classes.navbarbox2} ${isMobileMenuOpen ? classes.showMenu : ''}`}>
                    <Link to='/'>Home</Link>
                    <Link to=''>Categories</Link>
                    <Link to=''>Products</Link>
                    <Link to=''>Partners</Link>
                    <Link to=''>Shop</Link>
                    <Link to=''>Contact</Link>
                    <div className={classes.iconLinks}>
                        <Link to="/cart">
                            <FaCartShopping />
                        </Link>
                        {isLoggedIn ? (
                            <>
                                <span>Hi, {username}</span>
                                {isAdmin && <Link to='/addproduct'>Add Product</Link>}
                                <Link to='/logout'>Logout</Link>
                            </>
                        ) : (
                            <>
                                <Link to='/login'>Login</Link>
                                <Link to='/register'>Signup</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
