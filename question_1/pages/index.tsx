import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";

interface FormData {
	email: { value: string };
	password: { value: string };
}

const Home: NextPage = () => {
	const [loggedIn, setLoggedIn] = useState(false);

	const handleSignIn = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & FormData;
		const email = target.email.value;
		const password = target.password.value;
		console.log(email, password);
		setLoggedIn(true);
	};
	const handleSignOut = () => {
		setLoggedIn(false);
	};
	return !loggedIn ? (
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
				<Button type="submit" text="Login" />
			</form>

			<Link href="/register">
				<Button text="Register" />
			</Link>
		</div>
	) : (
		<div>
			<p>Gender : $gender</p>
			<p>First Name : $firstName </p>
			<p>Last Name : $ lastName</p>
			<p>Address : $address</p>
			<p>Post Code : $postCode</p>
			<p>Email : $email</p>
			<p>Telephone Number : $tel</p>
			<p>Accepted Terms : Checked !</p>
			<Button onClick={() => handleSignOut()} text="LOGOUT" />
		</div>
	);
};

export default Home;
