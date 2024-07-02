import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/navbar';
import Shopcontextapi from './context/Shopcontextapi';
import Cart from './components/Cartshop/Cart';
import Main from './components/Hompage/Main';
import Checkoutpage from './Pages/Checkoutpage';

function App() {
  return (
    <div className="App">
      <Shopcontextapi>
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Main />}/>
            <Route path='/shop' />
            <Route path='/contact' />
            <Route path='/cart' element={<Cart />}/>
            <Route path='/checkout' element={<Checkoutpage />}/>
          </Routes>
        </Router>
      </Shopcontextapi>
    </div>
  );
}

export default App;
