import React from 'react';
import classes from './paymentguide.module.css';
import { MdOutlinePayment } from "react-icons/md";
import { SlPlane } from "react-icons/sl";
import imageMethod from '../../assert/payment_methods.jpg'

const Paymentguide = () => {
    return (
        <div className={classes.paymentContainer}>
            <div className={classes.payment}>
                <MdOutlinePayment size={40}/>
                <h3>Payment method</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                    dolore magna aliquam erat volutpat.
                </p>
                <img src={imageMethod} alt='paymethod-image' />
            </div>
            <div className={classes.payment}>
                <SlPlane size={40}/>
                <h3>Shipment and delivery</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                    dolore magna aliquam erat volutpat.
                </p>
                <ul>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Morbi rutrum ex ultricies, mollis magna sed</li>
                </ul>
            </div>
        </div>
    )
}

export default Paymentguide
