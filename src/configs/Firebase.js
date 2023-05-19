// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBhe8XU9Jhw78hMCzU_ZUFP7casWC2bMMM",
  authDomain: "chat-app-52e7b.firebaseapp.com",
  databaseURL:
    "https://chat-app-52e7b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-app-52e7b",
  storageBucket: "chat-app-52e7b.appspot.com",
  messagingSenderId: "957800498855",
  appId: "1:957800498855:web:4ef8f1c368e5a107ec3d82",
  measurementId: "G-FTYKG4Q24J",
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const db = app.firestore();
export const realtime = getDatabase(app);
export const logout1 = () => {
  auth.signOut();
};
