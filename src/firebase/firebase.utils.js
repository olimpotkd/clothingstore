import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAuHqM-7Rq-tCxthJrnjTiECYUba1WdKgA",
  authDomain: "clothingstore-c18da.firebaseapp.com",
  databaseURL: "https://clothingstore-c18da.firebaseio.com",
  projectId: "clothingstore-c18da",
  storageBucket: "clothingstore-c18da.appspot.com",
  messagingSenderId: "524232173715",
  appId: "1:524232173715:web:157a192fac278335978566",
  measurementId: "G-RDSWZ07L69"
};

export const createUserProfileDocument = async (userAuth, aditionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...aditionalData })
    } catch (error) {
      console.log('error  creating user', error.message);
    }
  }
  
  return userRef;

}




firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;