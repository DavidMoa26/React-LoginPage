import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,getAuth, signInWithRedirect, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCfzFcqu-3LjkZaw6YeEYokYXBD05kuThI",
  authDomain: "e-commerce-db-b1a5d.firebaseapp.com",
  projectId: "e-commerce-db-b1a5d",
  storageBucket: "e-commerce-db-b1a5d.appspot.com",
  messagingSenderId: "236962356957",
  appId: "1:236962356957:web:c00d5be740c0a9833c4534",
};

const firebaseDB = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
export const signInWithGoogleRedirect = () => {
  signInWithRedirect(auth,provider);
}

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {displayName : 'David'}
  ) => {
  if(!userAuth) return

  const userDocRef = doc(db, 'users',userAuth.uid );
  const userSnapShot = await getDoc(userDocRef);
  if(!userSnapShot.exists()){
    const {displayName,email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });     
    }catch(error){
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth,email,password)
}

