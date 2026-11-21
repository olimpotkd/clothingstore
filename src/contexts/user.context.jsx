import React, { createContext, useContext, useEffect, useState } from 'react';

import { auth, createUserProfileDocument } from '../firebase/firebase.utils';

const UserContext = createContext({ currentUser: null });

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let unsubscribeFromProfile = () => {};

    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      unsubscribeFromProfile();

      if (!userAuth) {
        setCurrentUser(null);
        return;
      }

      const userRef = await createUserProfileDocument(userAuth);
      // The user may have signed out (or switched) while the profile was loading.
      if (auth.currentUser?.uid !== userAuth.uid) return;

      unsubscribeFromProfile = userRef.onSnapshot(snapshot => {
        setCurrentUser({ id: snapshot.id, ...snapshot.data() });
      });
    });

    return () => {
      unsubscribeFromAuth();
      unsubscribeFromProfile();
    };
  }, []);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
