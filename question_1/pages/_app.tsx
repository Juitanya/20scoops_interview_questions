import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthUserProvider } from "./hooks/useAuth";
import Head from "next/head";
import Logo from "./components/Logo/Logo";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthUserProvider>
			<Head>
				<title>20Scoops Interview</title>
			</Head>
			<Logo />
			<Component {...pageProps} />
		</AuthUserProvider>
	);
}

export default MyApp;
