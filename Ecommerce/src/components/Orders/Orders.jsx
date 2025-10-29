import api from "../../api/axios";
import dayjs from "dayjs";
import { useState, useEffect, Fragment } from "react";
import Header from "../Header/Header";
import { formatMoney } from "../../utilities/money";
import "../Orders/Orders.css";

const Orders = ({ cart, loadCart }) => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/api/orders?expand=products')
      .then((response) => {
        setOrders(response.data);
      })
  }, []);

  const buyAgain = async (product, quantity) => {
    try {
      await api.post('/api/cart-items', {
        productId: product.id,
        quantity: quantity
      });
      await loadCart();
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <>
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((orderProduct) => {
                    return (
                      <Fragment key={orderProduct.product.id}>
                        <div className="product-image-container">
                          <img
                            src={orderProduct.product.image}
                            alt={orderProduct.product.name}
                          />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {orderProduct.product.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                          </div>
                          <div className="product-quantity">
                            Quantity: {orderProduct.quantity}
                          </div>
                          <button 
                            className="buy-again-button button-primary"
                            onClick={() => buyAgain(orderProduct.product, orderProduct.quantity)}
                          >
                            <img
                              className="buy-again-icon"
                              src="images/icons/buy-again.png"
                              alt="Buy Again"
                            />
                            <span className="buy-again-message">Buy Again</span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <a href="/tracking">
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </a>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Orders;
