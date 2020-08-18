import React from 'react';

import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions'

import { ReactComponent as ShopppingIcon } from '../../asset/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ cartItems, toggleCartHidden }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShopppingIcon className='shopping-icon'/>
<span className='item-count'>{cartItems.length}</span>
  </div>
)

const mapStateToProps = ({ cart }) => ({
  cartItems: cart.cartItems
});

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);