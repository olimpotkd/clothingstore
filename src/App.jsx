import React from 'react';
import { Routes, Route, Navigate } from 'react-router';

import './App.css';

import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import CheckoutPage from './pages/checkout/checkout.component';

import { useUser } from './contexts/user.context';

const App = () => {
  const { currentUser } = useUser();

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop/*" element={<ShopPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/signin" element={currentUser ? <Navigate to="/" replace /> : <SignInAndSignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;
