import React from 'react';
import classes from './shows.module.css';

const Show = () => {
    return (
        <div className={classes.show}>
            <div className={classes.accessories}>
                <div className={classes.box1}>
                    <h2>Clothings</h2>
                    <button className={classes.btn}>3</button>
                </div>
                <div className={classes.box2}>
                    <h2>Accessories</h2>
                    <button className={classes.btn}>6</button>
                </div>
            </div>
        </div>
    )
}

export default Show
