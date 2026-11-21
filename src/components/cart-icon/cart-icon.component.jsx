import React from 'react';

import { useCart } from '../../contexts/cart.context';

import ShoppingIcon from '../../asset/shopping-bag.svg?react';

import './cart-icon.styles.scss';

const CartIcon = () => {
  const { toggleCart, cartCount } = useCart();

  return (
    <div className="cart-icon" onClick={toggleCart}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  );
}

export default CartIcon;
