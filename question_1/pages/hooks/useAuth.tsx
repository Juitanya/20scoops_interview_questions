import { createContext, useContext } from "react";
import useFirebaseAuth from "./useFirebaseAuth";

const authUserContext = createContext({
	authUser: null,
	authLoading: true,
	signIn: async (email: string, password: string) => {},
	registerByEmailAndPassword: async (email: string, password: string) => {},
	signOut: async () => {},
});

export function AuthUserProvider({ children }: { children: any }) {
	const auth: any = useFirebaseAuth();
	return (
		<authUserContext.Provider value={auth}>
			{children}
		</authUserContext.Provider>
	);
}

export const useAuth = () => useContext(authUserContext);
