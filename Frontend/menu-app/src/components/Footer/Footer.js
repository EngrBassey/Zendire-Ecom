import React from 'react';
import classes from './footer.module.css';
import productData from '../ProdctData/productData';
import logo from '../../assert/white-logo.png'

const Footer = () => {
    return (
        <div className={classes.footer}>
            <div className={classes.footerBox}>
                <div className={classes.logo}>
                    <img src={logo} alt='white-logo' />
                    <p>
                        Duis semper mauris vitae purus rhoncus suscipit. Nunc dictum dapibus tellus, at viverra risus pharetra id. Nulla facilisi. Ut mollis et augue non gravida.
                    </p>
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
