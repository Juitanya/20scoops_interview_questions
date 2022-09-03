import type { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import { REGEX } from "./constant";
import { useAuth } from "./context/useAuth";
import { fetchData } from "./firebase/database";
import { validateByRegex } from "./utils";

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
	const [userData, setUserData] = useState({});

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
			console.log(error);
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
	return authLoading ? (
		<div></div>
	) : !authUser ? (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				gap: "0.5rem",
			}}
		>
			<form
				autoComplete="off"
				onSubmit={(e) => handleSignIn(e)}
				id="loginform"
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					gap: "0.5rem",
				}}
			>
				<label>Email:</label>
				<Input
					type="text"
					name="email"
					required
					placeholder="Enter your email address"
				/>
				<label>Password:</label>
				<Input
					type="password"
					name="password"
					required
					placeholder="Enter your password"
				/>
				<Button type="submit" text="Login" loading={loading} />
			</form>

			<Link href="/register">
				<Button text="Register" />
			</Link>
			{error ? <div style={{ color: "red" }}>{error}</div> : ""}
		</div>
	) : (
		<div>
			{loading ? (
				""
			) : (
				<React.Fragment>
					<p>Gender : {gender}</p>
					<p>First Name : {firstName} </p>
					<p>Last Name : {lastName}</p>
					<p>Address : {address}</p>
					<p>Post Code : {postCode}</p>
					<p>Email : {email}</p>
					<p>Telephone Number : {tel}</p>
				</React.Fragment>
			)}

			<Button
				onClick={() => handleSignOut()}
				text="LOGOUT"
				loading={loading}
			/>

			{error ? <div style={{ color: "red" }}>{error}</div> : ""}
		</div>
	);
};

export default Home;
