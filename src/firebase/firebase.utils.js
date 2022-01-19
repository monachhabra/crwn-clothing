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

  export const createUserProfileDocument  = async(userAuth,additionalData) =>{
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    if(!snapshot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try{
        await userRef.set(
          {
            displayName,
            email,
            createdAt,
            ...additionalData
          }
        )
      }catch(error){
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  }
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt : 'select_account'});
  export const signInWithGoogle  = () => auth.signInWithPopup(provider);

  export default firebase; 

