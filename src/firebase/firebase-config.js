// Import necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";


// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0tAgb_9UVqmRGWmPQxLy_u4sYWDAeS-8",
  authDomain: "stacktack-330ba.firebaseapp.com",
  projectId: "stacktack-330ba",
  databaseURL: "https://stacktack-330ba-default-rtdb.firebaseio.com/",
  storageBucket: "stacktack-330ba.appspot.com",
  messagingSenderId: "1061903285772",
  appId: "1:1061903285772:web:f013be815eddb79c5db829",
  measurementId: "G-46323JBYE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Realtime Database
const db = getDatabase(app); 

// Initialize Analytics for Firebase (if needed)
const analytics = getAnalytics(app);

// Google provider
const googleProvider = new GoogleAuthProvider();

// Function to save data to Realtime Database
function saveDataToDatabase(data) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      const userRef = ref(db, 'users/' + userId);

      set(userRef, data);
      console.log("Data saved to Realtime Database:", data);
    } else {
      console.log("User is not signed in.");
    }
  });
}

// Function to save data to Realtime Database with a list name
function saveDataToDatabaseList(data, listName) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      const userRef = ref(db, `users/${userId}/${listName}`);
      set(userRef, data);
      console.log(`Data saved to Realtime Database for ${listName}:`, data);
    } else {
      console.log("User is not signed in.");
    }
  });
}

// Example: Saving data from local storage
function saveDataFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem('myData')); // Get data from local storage

  if (data) {
    saveDataToDatabase(data); // Save to Realtime Database
    localStorage.removeItem('myData'); // Remove from local storage
  }
}

// Call saveDataFromLocalStorage() when you want to move data from local storage
// ... (Add your logic to call this function when needed)

export { app, auth, db, analytics, googleProvider, saveDataFromLocalStorage, saveDataToDatabaseList };
