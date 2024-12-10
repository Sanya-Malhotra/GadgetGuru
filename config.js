import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHAMZG3MTnT6iMDyrsr0jeZBlQMaaNvdg",
  authDomain: "ecommerce-electric.firebaseapp.com",
  projectId: "ecommerce-electric",
  storageBucket: "ecommerce-electric.appspot.com",
  messagingSenderId: "79839921012",
  appId: "1:79839921012:web:7b7f7293b650e893fde221",
  measurementId: "G-LYB1NFZZMM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
