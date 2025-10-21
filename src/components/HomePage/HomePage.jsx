import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import ProductsGrid from "./ProductsGrid";
import "../HomePage/HomePage.css";

const HomePage = ({ cart }) => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        setProducts(response.data);
      }) 
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
