import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAi04VEj-LPLmwphTfMaqGATZKY6esjf9Y",
  authDomain: "cellroyale-b12b6.firebaseapp.com",
  projectId: "cellroyale-b12b6",
  storageBucket: "cellroyale-b12b6.appspot.com",
  messagingSenderId: "537898554989",
  appId: "1:537898554989:web:e308e3979f89dd8ec05164"
};

const app = initializeApp(firebaseConfig);

export const googleAuthProvider = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);
