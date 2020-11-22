import React from 'react';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils'

import { ReactComponent as Logo } from '../../asset/crown.svg';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';


import { HeaderContainer, OptionLink, OptionsContainer, LogoContainer } from './header.styles';

import { createStructuredSelector } from 'reselect';

const Header = ({ currentUser, hidden }) => {
  return (
    <HeaderContainer>
     <LogoContainer to='/'>
       <Logo className="logo"></Logo>
     </LogoContainer>
     <OptionsContainer>
       <OptionLink  to='/shop'>SHOP</OptionLink>
       <OptionLink to='/contact'>CONTACT</OptionLink>
       {
         currentUser ?
          <OptionLink as='div'onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
          : 
          <OptionLink className="option" to='/signin'>SIGN IN</OptionLink>
       }
       <CartIcon/>
     </OptionsContainer>
     {
       hidden ? null : <CartDropdown/>  
     }
    </HeaderContainer>
  );
}
 
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);