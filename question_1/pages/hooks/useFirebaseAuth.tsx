import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase/index";

const formatAuthUser = (user: any) => ({
	uid: user.uid,
	email: user.email,
});

export default function useFirebaseAuth() {
	const [authUser, setAuthUser] = useState(null);
	const [authLoading, setAuthLoading] = useState(true);
	const clear = () => {
		setAuthUser(null);
	};
	const authStateChanged = async (authState: any) => {
		if (!authState) {
			setAuthUser(null);
			setAuthLoading(false);
			return;
		}

		setAuthLoading(true);
		const formattedUser: any = formatAuthUser(authState);
		setAuthUser(formattedUser);
		setAuthLoading(false);
	};
	const signIn = (email: string, password: string) =>
		signInWithEmailAndPassword(auth, email, password);

	const registerByEmailAndPassword = (email: string, password: string) =>
		createUserWithEmailAndPassword(auth, email, password);

	const signOut = async () => {
		try {
			await auth.signOut();
			clear();
		} catch (error) {}
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(authStateChanged);
		return () => unsubscribe();
	}, []);

	return {
		authUser,
		authLoading,
		signIn,
		registerByEmailAndPassword,
		signOut,
	};
}
