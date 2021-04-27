import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxZHU8-_KhnI7pNj3aUvWKs9l6rM5sclA",
  authDomain: "nitc-online-exam.firebaseapp.com",
  projectId: "nitc-online-exam",
  storageBucket: "nitc-online-exam.appspot.com",
  messagingSenderId: "467037212542",
  appId: "1:467037212542:web:31cb571fe577360920ed2f",
  measurementId: "G-SJVTH5WD5Q",
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
