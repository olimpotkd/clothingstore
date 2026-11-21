import React from 'react';

import { auth } from '../../firebase/firebase.utils'
import { useUser } from '../../contexts/user.context';
import { useCart } from '../../contexts/cart.context';

import Logo from '../../asset/crown.svg?react';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { HeaderContainer, OptionLink, OptionsContainer, LogoContainer } from './header.styles';

const Header = () => {
  const { currentUser } = useUser();
  const { isCartOpen } = useCart();

  return (
    <HeaderContainer>
      <LogoContainer to='/'>
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to='/shop'>SHOP</OptionLink>
        <OptionLink to='/contact'>CONTACT</OptionLink>
        {
          currentUser
            ? <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
            : <OptionLink to='/signin'>SIGN IN</OptionLink>
        }
        <CartIcon />
      </OptionsContainer>
      {isCartOpen && <CartDropdown />}
    </HeaderContainer>
  );
}

export default Header;
