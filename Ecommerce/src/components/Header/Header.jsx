import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getBackendImageUrl } from '../../utilities/images';
import '../Header/Header.css';

const Header = ({ cart = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search') || '';
    setSearchQuery(query);
  }, [location]);

  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <div className="logo-container">
              <img className="shop-icon" src="/shop-icon.svg" alt="Shop" />
              <span className="logo-text">
                <span className="logo-online">Online</span>
                <span className="logo-shop">Shop</span>
              </span>
            </div>
          </NavLink>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-button" onClick={handleSearch}>
            <img
              className="search-icon"
              src={getBackendImageUrl('images/icons/search-icon.png')}
              alt="Search"
            />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>
          <NavLink className="cart-link header-link" to="/checkout">
            <img
              className="cart-icon"
              src={getBackendImageUrl('images/icons/cart-icon.png')}
              alt="Cart"
            />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Header;
