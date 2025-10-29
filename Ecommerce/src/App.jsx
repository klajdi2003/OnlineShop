import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './api/axios'; // <- use the shared api instance
import HomePage from './components/HomePage/HomePage';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';
import Tracking from './components/Tracking/Tracking';
import './styles/general.css';

const App = () => {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    try {
      const response = await api.get('/api/cart-items?expand=product'); // <- use api here
      setCart(response.data);
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route path='checkout' element={<Checkout cart={cart} loadCart={loadCart} />} />
        <Route path='orders' element={<Orders cart={cart} loadCart={loadCart} />} />
        <Route path='tracking' element={<Tracking />} />
      </Routes> 
    </BrowserRouter>
  );  
}

export default App;
