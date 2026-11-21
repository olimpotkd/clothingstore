import React from 'react';
import { useNavigate } from 'react-router';

import { useCart } from '../../contexts/cart.context';

import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const { cartItems, closeCart } = useCart();
  const navigate = useNavigate();

  const goToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {
          cartItems.length
            ? cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
            : <span className="empty-message">Your cart is empty</span>
        }
      </div>
      <CustomButton onClick={goToCheckout}>GO TO CHECKOUT</CustomButton>
    </div>
  );
};

export default CartDropdown;
