import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="order-summary">
      <div className="empty-cart-container">
        <div className="empty-cart-message">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart</p>
          <button 
            className="view-products-button button-primary"
            onClick={() => navigate('/')}
          >
            View Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;

