import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzqas7sxHklDPm2WlWeYykvZWaaJ81aH8",
  authDomain: "house-app-39b4e.firebaseapp.com",
  projectId: "house-app-39b4e",
  storageBucket: "house-app-39b4e.appspot.com",
  messagingSenderId: "884904955474",
  appId: "1:884904955474:web:5b33caffeb91da0c7a598b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export { auth, db };
