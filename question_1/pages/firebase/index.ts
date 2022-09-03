import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	databaseURL:
		"https://scoops-interview-default-rtdb.asia-southeast1.firebasedatabase.app/",
	storageBucket: "scoops-interview.appspot.com",
	messagingSenderId: "1084925854065",
	appId: "1:1084925854065:web:90b292aeefe2d54dae76d0",
	measurementId: "G-3DQ8RYRR2N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
