import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { formatMoney } from "../../utilities/money";
import DeliveryOptions from "./DeliveryOptions";

const OrderSummary = ({ cart, deliveryOptions, loadCart }) => {
  const [editingQuantity, setEditingQuantity] = useState({});
  const [newQuantities, setNewQuantities] = useState({});
  return (
    <>
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          let selctedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            }
          );

          const deleteCartItem = async () => {
            await axios.delete(`/api/cart-items/${cartItem.productId}`);
            await loadCart();
          };

          const startEditingQuantity = () => {
            setEditingQuantity(prev => ({
              ...prev,
              [cartItem.productId]: true
            }));
            setNewQuantities(prev => ({
              ...prev,
              [cartItem.productId]: cartItem.quantity
            }));
          };

          const cancelEditingQuantity = () => {
            setEditingQuantity(prev => ({
              ...prev,
              [cartItem.productId]: false
            }));
          };

          const saveQuantity = async () => {
            const newQuantity = newQuantities[cartItem.productId];
            if (newQuantity && newQuantity > 0) {
              await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: newQuantity
              });
              await loadCart();
              setEditingQuantity(prev => ({
                ...prev,
                [cartItem.productId]: false
              }));
            }
          };

          const handleQuantityChange = (event) => {
            const quantity = Number(event.target.value);
            setNewQuantities(prev => ({
              ...prev,
              [cartItem.productId]: quantity
            }));
          };

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                {dayjs(
                  selctedDeliveryOption.estimatedDeliveryTimeMs
                ).format("dddd, MMMM D")}
              </div>

              <div className="cart-item-details-grid">
                <img
                  className="product-image"
                  src={cartItem.product.image}
                  alt={cartItem.product.name}
                />
                <div className="cart-item-details">
                  <div className="product-name">
                    {cartItem.product.name}
                  </div>
                  <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    {editingQuantity[cartItem.productId] ? (
                      <div className="quantity-edit-container">
                        <span>Quantity: </span>
                        <select 
                          value={newQuantities[cartItem.productId] || cartItem.quantity} 
                          onChange={handleQuantityChange}
                          className="quantity-select"
                        >
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
                        <span className="save-quantity-link link-primary" onClick={saveQuantity}>
                          Save
                        </span>
                        <span className="cancel-quantity-link link-primary" onClick={cancelEditingQuantity}>
                          Cancel
                        </span>
                      </div>
                    ) : (
                      <>
                        <span>
                          Quantity:{" "}
                          <span className="quantity-label">
                            {cartItem.quantity}
                          </span>
                        </span>
                        <span className="update-quantity-link link-primary" onClick={startEditingQuantity}>
                          Update
                        </span>
                        <span className="delete-quantity-link link-primary" 
                         onClick={deleteCartItem}>
                          Delete
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <DeliveryOptions 
                  deliveryOptions={deliveryOptions} 
                  cartItem={cartItem} 
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
    </>
  )
}

export default OrderSummary
