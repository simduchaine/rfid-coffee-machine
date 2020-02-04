// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/database";
import "firebase/auth";

//import Firebase Config
import fbConfig from "./firebaseConfig";

// Initialize Firebase
firebase.initializeApp(fbConfig);

// Get a reference to the database service
export const database = firebase.database();

//Get a reference to authentification service
export const auth = firebase.auth();
