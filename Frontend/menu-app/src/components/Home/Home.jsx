import Navbar from '../Navbar/navbar';
import Header from '../Header/Header';
import Show from '../Header/Shows/Show';
import Check from '../Checkout/Check';
import Paymentguide from '../ShopList/Paymentguide';
import Footer from '../Footer/Footer';
import Shopcontextapi from '../../context/Shopcontextapi';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div className="App">
      <Shopcontextapi>

        <Header />
        <div className='section'>
          <Show />
          <Check />
          <Paymentguide />
        </div>

      </Shopcontextapi>
    </div>
  );
}

export default Home;
