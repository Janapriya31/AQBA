// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASVfBVIXnlKtAAHxmW9xiZYQlLOG1WTwM",
    authDomain: "loginpage-3fd4c.firebaseapp.com",
    projectId: "loginpage-3fd4c",
    storageBucket: "loginpage-3fd4c.appspot.com",
    messagingSenderId: "927268606611",
    appId: "1:927268606611:web:606da0b05663b3d5033366",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export auth and provider
export { auth, googleProvider, signInWithPopup };
