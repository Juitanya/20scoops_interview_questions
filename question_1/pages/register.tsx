import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import Label from "./components/Label/Label";
import { REGEX } from "./constant";
import { useAuth } from "./context/useAuth";
import { writeData } from "./firebase/database";
import { validateByRegex } from "./utils";
import styles from "../styles/Register.module.css";
import Select from "./components/Select/Select";

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

			const data = {
				gender,
				firstName,
				lastName,
				address,
				postCode,
				email: email.toLowerCase(),
				tel,
			};

			await writeData(data);

			console.log(
				`Gender : ${gender}\nFirst Name : ${firstName}\nLast Name : ${lastName}\nAddress : ${address}\nPost Code : ${postCode}\nEmail : ${email}\nTelephone Number : ${tel}\nAccepted Terms : Checked !`
			);
			router.push("/");
		} catch (error: any) {
			console.log("err", error);
			if (error.code === "auth/email-already-in-use")
				setError("The email has already been used.");
			else setError("Something went wrong, Please try again later.");
		}
		setLoading(false);
	};
	return (
		<div className={styles.container}>
			<div className={styles.contentContainer}>
				<form
					autoComplete="off"
					onSubmit={(e) => handleRegister(e)}
					id="registerform"
					className={styles.formContainer}
				>
					<Label text="Gender: " required />
					<Select
						option={[
							{ value: "", disabled: true, hidden: true },
							{ value: "Male" },
							{ value: "Female" },
							{ value: "Other" },
						]}
						required
						defaultValue=""
						id="gender"
						name="gender"
					/>

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

					<div className={styles.checkBoxContainer}>
						<Input required type="checkbox" name="acceptedTerms" />
						<p style={{ paddingLeft: "1rem" }}>
							I have read and agree to the website terms and
							conditions
						</p>
					</div>
					<Button type="submit" text="Register" loading={loading} />
				</form>
				{error ? <div className={styles.error}>{error}</div> : ""}
				<div className={styles.goToSignInPage}>
					<Link href="/">
						Already have account ? Go to sign in page.
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
