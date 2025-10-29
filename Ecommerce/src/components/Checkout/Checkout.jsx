import api from "../../api/axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
import { getBackendImageUrl } from "../../utilities/images";
import "../Checkout/Checkout-Header.css";
import "../Checkout/Checkout.css";

const Checkout = ({ cart, loadCart }) => {
  const [deliveryOptions, setdeliveryOptions] = useState([]);
  const [paymentSummary, setpaymentSummary] = useState(null);

  useEffect(() => { // runs once
    const fetchCheckoutData = async () => {
      let response = await api.get("/api/delivery-options?expand=estimatedDeliveryTime");
      setdeliveryOptions(response.data);
    };

    fetchCheckoutData();
  }, []);

  useEffect(() => { // runs when cart changes
    const fetchPaymentSummary = async () => {
      let response = await api.get("/api/payment-summary");
      setpaymentSummary(response.data);
    };

    fetchPaymentSummary();
  }, [cart]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/" className="checkout-header-link">
              <div className="checkout-logo-container">
                <svg className="checkout-shop-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 9V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V9" stroke="rgb(25, 135, 84)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 9L4.5 4.5H19.5L21 9" stroke="rgb(25, 135, 84)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 12V16" stroke="rgb(25, 135, 84)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 12V16" stroke="rgb(25, 135, 84)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="checkout-logo-text">
                  <span className="checkout-logo-online">Online</span>
                  <span className="checkout-logo-shop">Shop</span>
                </span>
              </div>
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
              <Link className="return-to-home-link" to="/">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src={getBackendImageUrl('images/icons/checkout-lock-icon.png')}
                 alt="Secure Checkout" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
};

export default Checkout;
