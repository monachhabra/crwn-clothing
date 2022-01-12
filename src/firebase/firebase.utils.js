import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; //for database
import 'firebase/compat/auth'; //for auth

const config = {
    apiKey: "AIzaSyDte-VK_8z6gstybSax9qNuiA43pIFxcZA",
    authDomain: "crwn-db-ab6c7.firebaseapp.com",
    projectId: "crwn-db-ab6c7",
    storageBucket: "crwn-db-ab6c7.appspot.com",
    messagingSenderId: "946078893768",
    appId: "1:946078893768:web:4db3c992ae045f08fd47fd",
    measurementId: "G-876FYJEJWF"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt : 'select_account'});
  export const signInWithGoogle  = () => auth.signInWithPopUp(provider);

  export default firebase; 

