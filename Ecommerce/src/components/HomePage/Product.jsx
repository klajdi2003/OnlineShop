import { useState } from "react";
import api from "../../api/axios";
import { formatMoney } from "../../utilities/money";
import { getBackendImageUrl } from "../../utilities/images";

const Product = ({ product, loadCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const addToCart = async () => {
    await api.post('/api/cart-items', {
      productId: product.id,
      quantity
    });
    await loadCart();

    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const selectQuantity = (event) => {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
  };

  return (
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
        <select value={quantity} onChange={selectQuantity}>
          {[...Array(10).keys()].map(i => (
            <option key={i+1} value={i+1}>{i+1}</option>
          ))}
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className={`added-to-cart ${addedToCart ? 'added-to-cart-visible' : ''}`}>
        <img src={getBackendImageUrl('checkmark.svg')} alt="Checkmark" />
        Added
      </div>

      <button className="add-to-cart-button button-primary" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
