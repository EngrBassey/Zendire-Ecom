import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/navbar';
import Header from './components/Header/Header';
import Show from './components/Header/Shows/Show';
import Check from './components/Checkout/Check';
import Paymentguide from './components/ShopList/Paymentguide';
import Footer from './components/Footer/Footer';
import Api from './API/api';
import Shopcontextapi from './context/Shopcontextapi';


function App() {
  return (
    <div className="App">
      <Shopcontextapi>
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' />
            <Route path='/shop' />
            <Route path='/contact' />
            <Route path='/cart' />
          </Routes>
        </Router>
        <Header />
        <div className='section'>
          <Show />
          <Check />
          <Paymentguide />
        </div>
        <Api />
        <Footer />
      </Shopcontextapi>
    </div>
  );
}

export default App;
