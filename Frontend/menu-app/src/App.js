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
import Cart from './components/Cartshop/Cart';
import Main from './components/Hompage/Main';
import Checkoutpage from './Pages/Checkoutpage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Payment from './Pages/Payment';

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
            <Route path='/cart' element={<Cart />}/>
            <Route path='/checkout' element={<Checkoutpage />}/>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/pay' element={<Payment />} />
            <Route path='/checkout?' />
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
