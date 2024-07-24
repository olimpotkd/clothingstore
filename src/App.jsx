import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";

import HomePage from "./pages/homepage/HomePage.jsx";
import ShopPage from "./pages/shop/shop.component.jsx";
import Header from "./components/header/header.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx";
import CheckoutPage from "./pages/checkout/Checkout.jsx";

import {
  auth,
  createUserProfileDocument /*addCollectionAndDocuments*/,
} from "./firebase/firebase.utils.js";
import { setCurrentUser } from "./redux/user/userSlice.js";

const App = () => {
  const dispatch = useDispatch();

  const [unsubscribeFromAuth, setUnsubscribeFromAuth] = useState(() => {});

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const unsubscribeFunction = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          dispatch(setCurrentUser({ id: snapShot.id, ...snapShot.data() }));
        });
      }

      setUnsubscribeFromAuth(unsubscribeFunction);

      setCurrentUser(userAuth);
      // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({ title, items })));
    });

    // TODO - Consider changing to useCallback
    return () => {
      unsubscribeFromAuth && unsubscribeFromAuth();
    };
  }, [unsubscribeFromAuth, dispatch]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/">
          <HomePage />
        </Route>
        <Route path="/shop">
          <ShopPage />
        </Route>
        <Route path="/checkout">
          <CheckoutPage />
        </Route>
        <Route path="/signin">
          {currentUser ? <Navigate to="/" /> : <SignInAndSignUpPage />}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
