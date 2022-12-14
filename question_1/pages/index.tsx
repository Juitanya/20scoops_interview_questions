import type { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import { REGEX } from "./constant";
import { useAuth } from "./hooks/useAuth";
import { fetchData } from "./firebase/database";
import { validateByRegex } from "./utils";
import styles from "../styles/Home.module.css";
import Information from "./components/Information/Information";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";

interface FormData {
	email: { value: string };
	password: { value: string };
}

interface UserInformation {
	gender: string;
	firstName: string;
	lastName: string;
	address: string;
	postCode: string;
	email: string;
	tel: string;
}

const Home: NextPage = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { authUser, authLoading, signIn, signOut } = useAuth();
	const [userData, setUserData] = useState({
		gender: "",
		firstName: "",
		lastName: "",
		address: "",
		postCode: "",
		email: "",
		tel: "",
	} as UserInformation);

	useEffect(() => {
		const fetchUserData = async () => {
			setLoading(true);

			const data = await fetchData((authUser as any).email);

			setUserData(data[0]);
			setLoading(false);
		};
		if (authUser) fetchUserData().catch(console.error);
	}, [authUser]);

	const handleSignIn = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		const target = e.target as typeof e.target & FormData;
		const email = target.email.value;
		const password = target.password.value;
		if (!validateByRegex(email, REGEX.EMAIL)) return false;

		try {
			setLoading(true);
			await signIn(email, password);
			setError("");
		} catch (error) {
			setError("Incorrect username or password.");
		}

		setLoading(false);
	};
	const handleSignOut = async () => {
		try {
			setLoading(true);
			await signOut();
		} catch (error) {
			setError("Something went wrong while signing out.");
		}
		setError("");
		setLoading(false);
	};
	const { gender, firstName, lastName, address, postCode, email, tel }: any =
		userData;

	return (
		<div className={styles.container}>
			{authLoading ? (
				<Loader />
			) : !authUser ? (
				<div className={styles.contentContainer}>
					<Header text="Sign In" />
					<form
						onSubmit={(e) => handleSignIn(e)}
						id="loginform"
						className={styles.formContainer}
					>
						<div className={styles.leftSide}>
							<label>Email</label>
							<Input
								type="text"
								name="email"
								required
								placeholder="Enter your email address"
							/>
						</div>
						<div className={styles.leftSide}>
							<label>Password</label>
							<Input
								type="password"
								name="password"
								required
								placeholder="Enter your password"
							/>
						</div>
						<Button
							type="submit"
							text="Login"
							loading={loading}
							littleMarginTop
						/>
					</form>
					<Link href="/register" passHref>
						<a>
							<Button text="Register" secondary />
						</a>
					</Link>

					{error ? (
						<div className={styles.textErrorColor}>{error}</div>
					) : (
						""
					)}
				</div>
			) : (
				<div className={styles.informationContainer}>
					<Header text="User Information" />
					{loading ? (
						""
					) : (
						<React.Fragment>
							<Information topic="Gender" info={gender} />
							<Information topic="First Name" info={firstName} />
							<Information topic="Last Name" info={lastName} />
							<Information topic="Address" info={address} />
							<Information topic="Post Code" info={postCode} />
							<Information topic="Email" info={email} />
							<Information
								topic="Telephone Number (+66)"
								info={tel}
							/>
							<Button
								onClick={() => handleSignOut()}
								text="LOGOUT"
								loading={loading}
								littleMarginTop
							/>
						</React.Fragment>
					)}

					{error ? (
						<div className={styles.textErrorColor}>{error}</div>
					) : (
						""
					)}
				</div>
			)}
		</div>
	);
};

export default Home;
