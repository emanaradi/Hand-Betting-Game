// Import the functions you need from the SDKs you need

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALz0M1dCPtcx0i-rZw327TfVNt1N2mYRs",
  authDomain: "mahjong-betting-game.firebaseapp.com",
  projectId: "mahjong-betting-game",
  storageBucket: "mahjong-betting-game.firebasestorage.app",
  messagingSenderId: "833580241920",
  appId: "1:833580241920:web:996b5ab718bc6a108c74e5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
