import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfuYKVDTgfh0oz1EFjZpd7gPucTkyxoxk",
  authDomain: "inviter-d2573.firebaseapp.com",
  projectId: "inviter-d2573",
  storageBucket: "inviter-d2573.appspot.com",
  messagingSenderId: "747570469400",
  appId: "1:747570469400:web:75a1b786e8f08a10efc16d",
  measurementId: "G-KLNZCQKK7K",
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

const auth = getAuth(firebaseApp);

export { storage, auth };
