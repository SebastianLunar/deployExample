import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GOOGLE_API_KEY } from "../utils/constants";

const firebaseConfig = {
  apiKey: GOOGLE_API_KEY,
  authDomain: "workoutapp-a582d.firebaseapp.com",
  projectId: "workoutapp-a582d",
  storageBucket: "workoutapp-a582d.firebasestorage.app",
  messagingSenderId: "854224472820",
  appId: "1:854224472820:web:6cf738ea868d751e1eaca1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const firestore = getFirestore();

export default app;