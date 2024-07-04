import React from 'react';
import Header from '../Header/Header';
import Show from '../Header/Shows/Show';
import Check from '../Checkout/Check';
import Paymentguide from '../ShopList/Paymentguide';
import Footer from '../Footer/Footer';


const Main = () => {
    return (
        <div>
            <Header />
            <div className='section'>
                <Show />
                <Check />
                <Paymentguide />
            </div>
            <Footer />
        </div>
    )
}

export default Main
