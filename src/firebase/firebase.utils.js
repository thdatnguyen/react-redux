import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyD-4Feb_GHYuRxO-bLFGA2uDtpNXzObIlE',
  authDomain: 'react-app-with-redux.firebaseapp.com',
  databaseURL: 'https://react-app-with-redux.firebaseio.com',
  projectId: 'react-app-with-redux',
  storageBucket: 'react-app-with-redux.appspot.com',
  messagingSenderId: '580300902944',
  appId: '1:580300902944:web:f05b75de95c42c42732245'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
