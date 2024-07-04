import React from 'react';
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import classes from './footer.module.css';
import productData from '../ProdctData/productData';
import logo from '../../assert/white-logo.png';
import { Link } from 'react-router-dom';
import { IoCall } from "react-icons/io5";

const Footer = () => {
    return (
        <div className={classes.footer}>
            <div className={classes.footerBox}>
                <div className={classes.logo}>
                    <img src={logo} alt='white-logo' />
                    <p>
                        Duis semper mauris vitae purus rhoncus suscipit. Nunc dictum dapibus tellus, at viverra risus pharetra id. Nulla facilisi. Ut mollis et augue non gravida.
                    </p>
                    <Link>
                        <FaTwitter />
                    </Link>
                    <Link>
                        <FaFacebookF />
                    </Link>
                    <p className={classes.call}><IoCall /> +020-986-77</p>
                </div>
                <div className={classes.box1}>
                    <h5>Products</h5>
                    <div  className={classes.productBox}>
                        <img src={productData[0].Type[0].image} alt='footer img' />
                        <ul>
                            <h6>Havanna Shirt</h6>
                            <p>$67</p>
                        </ul>
                    </div>
                    <div  className={classes.productBox}>
                        <img src={productData[0].Type[0].image} alt='footer img' />
                        <ul>
                            <h6>Havanna Shirt</h6>
                            <p>$67</p>
                        </ul>
                    </div>
                </div>
                <div className={classes.box1}>
                    <h5>Top Rated Products</h5>
                    <div  className={classes.productBox}>
                        <img src={productData[0].Type[0].image} alt='footer img' />
                        <ul>
                            <h6>Havanna Shirt</h6>
                            <p>$67</p>
                        </ul>
                    </div>
                    <div  className={classes.productBox}>
                        <img src={productData[0].Type[0].image} alt='footer img' />
                        <ul>
                            <h6>Havanna Shirt</h6>
                            <p>$67</p>
                        </ul>
                    </div>
                </div>
            </div>
            <footer>
            &copy; Zendir 2024
            </footer>
        </div>
    )
}

export default Footer
