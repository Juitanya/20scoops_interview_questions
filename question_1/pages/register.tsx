import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import Label from "./components/Label/Label";
import { REGEX } from "./constant";
import { useAuth } from "./context/useAuth";
import { validateByRegex } from "./utils";

interface RegisterDataType {
	gender: { value: string };
	firstName: { value: string };
	lastName: { value: string };
	address: { value: string };
	postCode: { value: string };
	email: { value: string };
	tel: { value: string };
	acceptedTerms: { value: boolean };
}

const Register: NextPage = () => {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { registerByEmailAndPassword, signOut } = useAuth();

	const handleRegister = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		const target = e.target as typeof e.target & RegisterDataType;

		const gender = target.gender.value;
		const firstName = target.firstName.value;
		const lastName = target.lastName.value;
		const address = target.address.value;
		const postCode = target.postCode.value;
		const email = target.email.value;
		const tel = target.tel.value;

		if (
			!validateByRegex(tel, REGEX.ALL_NUMBER) ||
			!validateByRegex(email, REGEX.EMAIL) ||
			!validateByRegex(postCode, REGEX.ALL_NUMBER)
		)
			return false;

		try {
			setLoading(true);
			await registerByEmailAndPassword(email, tel);
			console.log(
				`Gender : ${gender}\nFirst Name : ${firstName}\nLast Name : ${lastName}\nAddress : ${address}\nPost Code : ${postCode}\nEmail : ${email}\nTelephone Number : ${tel}\nAccepted Terms : Checked !`
			);
			router.push("/");
		} catch (error: any) {
			if (error.code === "auth/email-already-in-use")
				setError("The email has already been used.");
			else setError("Something went wrong, Please try again later.");
		}
		setLoading(false);
	};
	return (
		<div>
			<form
				autoComplete="off"
				onSubmit={(e) => handleRegister(e)}
				id="registerform"
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					gap: "0.5rem",
				}}
			>
				<Label text="Gender: " required />
				<select name="gender" id="gender" required defaultValue="">
					<option disabled value="" hidden></option>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
					<option value="Other">Other</option>
				</select>
				<Label text="First name: " required />
				<Input
					type="text"
					name="firstName"
					placeholder="Enter your firstname"
					required
				/>

				<Label text="Last name: " required />
				<Input
					type="text"
					name="lastName"
					placeholder="Enter your lastname"
					required
				/>
				<Label text="Address: " required />
				<Input
					type="text"
					name="address"
					placeholder="Enter your address"
					required
				/>
				<Label text="Postcode: " required />
				<Input
					type="text"
					name="postCode"
					placeholder="Enter your postcode"
					required
				/>
				<Label text="Email: " required />
				<Input
					type="text"
					name="email"
					placeholder="Enter your email"
					required
				/>
				<Label text="Telephone Number: " required />
				<Input
					type="text"
					name="tel"
					placeholder="Enter your telephone number"
					required
					max={10}
				/>

				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Input required type="checkbox" name="acceptedTerms" />
					<p style={{ paddingLeft: "1rem" }}>
						I have read and agree to the website terms and
						conditions
					</p>
				</div>
				<Button type="submit" text="Register" loading={loading} />
			</form>
			{error ? (
				<div
					style={{
						color: "red",
						display: "flex",
						justifyContent: "center",
						marginTop: "1rem",
					}}
				>
					{error}
				</div>
			) : (
				""
			)}
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					marginTop: "1rem",
					color: "#3498db",
				}}
			>
				<Link href="/">Already have account ? Go to sign in page.</Link>
			</div>
		</div>
	);
};

export default Register;
