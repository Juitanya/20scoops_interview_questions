import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
	storageBucket: "scoops-interview.appspot.com",
	messagingSenderId: "1084925854065",
	appId: "1:1084925854065:web:90b292aeefe2d54dae76d0",
	measurementId: "G-3DQ8RYRR2N",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
