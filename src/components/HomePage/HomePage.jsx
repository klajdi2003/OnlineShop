import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import ProductsGrid from "./ProductsGrid";
import "../HomePage/HomePage.css";

const HomePage = ({ cart }) => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get('/api/products')
      setProducts(response.data);
    };

    getHomeData();
  }, []);

  return (
    <>
      <title>OnlineShop</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
};

export default HomePage;
