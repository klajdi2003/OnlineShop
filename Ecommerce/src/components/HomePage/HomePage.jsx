import api from "../../api/axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import ProductsGrid from "./ProductsGrid";
import "../HomePage/HomePage.css";

const HomePage = ({ cart, loadCart }) => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const response = await api.get('/api/products')
      setProducts(response.data);
    };

    getHomeData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');
    
    if (searchQuery && searchQuery.trim()) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [location.search, products]);

  return (
    <>
      <title>OnlineShop</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={filteredProducts} loadCart={loadCart} />
      </div>
    </>
  );
};

export default HomePage;
