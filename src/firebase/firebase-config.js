// Import necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0tAgb_9UVqmRGWmPQxLy_u4sYWDAeS-8",
  authDomain: "stacktack-330ba.firebaseapp.com",
  projectId: "stacktack-330ba",
  storageBucket: "stacktack-330ba.appspot.com",
  messagingSenderId: "1061903285772",
  appId: "1:1061903285772:web:f013be815eddb79c5db829",
  measurementId: "G-46323JBYE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize FireStore
const db = getFirestore(app);

// Initialize Analytics for Firebase (if needed)
const analytics = getAnalytics(app);

// Google provider
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, analytics, googleProvider };
