import React, { useState } from 'react'; // Import useState
import { Link } from 'react-router-dom';
import classes from './navbar.module.css';
import logo from '../../assert/Zendir-logo.png';
import { FaCartShopping } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for toggle button

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to manage mobile menu

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
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Signup</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
