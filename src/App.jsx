import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import HomePage from './components/HomePage/HomePage';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';
import Tracking from './components/Tracking/Tracking';
import './styles/general.css';

const App = () => {

  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product')
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);
  
  return (
  <>
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path='checkout' element={<Checkout cart={cart} loadCart={loadCart} />} />
      <Route path='orders' element={<Orders cart={cart} />} />
      <Route path='tracking' element={<Tracking />} />
    </Routes> 
  </>
  )  
}

export default App
