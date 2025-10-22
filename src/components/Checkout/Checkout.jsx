import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
import "../Checkout/Checkout-Header.css";
import "../Checkout/Checkout.css";

const Checkout = ({ cart }) => {
  const [deliveryOptions, setdeliveryOptions] = useState([]);
  const [paymentSummary, setpaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
    let response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setdeliveryOptions(response.data);
      });

    response = await axios.get("/api/payment-summary").then((response) => {
      setpaymentSummary(response.data);
    });
    };

    fetchCheckoutData();
  }, []);

  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              3 items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
            <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

            <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
};

export default Checkout;
