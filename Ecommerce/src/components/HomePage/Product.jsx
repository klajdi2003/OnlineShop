import { useState } from "react";
import api from "../../api/axios";
import { formatMoney } from "../../utilities/money";
import { getBackendImageUrl } from "../../utilities/images";

const Product = ({ product, loadCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const addToCart = async () => {
    await api.post('api/cart-items', {
      productId: product.id,
      quantity
    });
    await loadCart();
    
    setAddedToCart(true);
    
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const selectQunatity = (event) => {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
  };
  
  return (
    <>
      <div className="product-container">
        <div className="product-image-container">
          <img
            className="product-image"
            src={getBackendImageUrl(product.image)}
            alt={product.name}
          />
        </div>

        <div className="product-name limit-text-to-2-lines">
          {product.name}
        </div>

        <div className="product-rating-container">
          <img
            className="product-rating-stars"
            src={getBackendImageUrl(`images/ratings/rating-${product.rating.stars * 10}.png`)}
            alt={`${product.rating.stars} stars`}
          />
          <div className="product-rating-count link-primary">{product.rating.count}</div>
        </div>

        <div className="product-price">{formatMoney(product.priceCents)}</div>

        <div className="product-quantity-container">
          <select value={quantity} onChange={selectQunatity}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div className="product-spacer"></div>
        <div className={`added-to-cart ${addedToCart ? 'added-to-cart-visible' : ''}`}>
          <img src="/checkmark.svg" alt="Checkmark" />
          Added
        </div>
        <button className="add-to-cart-button button-primary"
          onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </>
  )
}

export default Product;
