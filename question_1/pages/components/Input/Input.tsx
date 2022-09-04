import React, { FC, useState } from "react";
import eye from "../../assets/images/eye.svg";
import eyeSlash from "../../assets/images/eye_slash.svg";
import { REGEX } from "../../constant";
import { validateByRegex } from "../../utils";
import styles from "./Input.module.css";

interface InputProps {
	type?: string;
	name?: string;
	required?: boolean;
	placeholder?: string;
	max?: number;
	min?: number;
}
const Input: FC<InputProps> = ({
	type,
	name,
	required,
	placeholder,
	max,
	min,
}): JSX.Element => {
	const [hidePassword, setHidePassword] = useState(true);
	const [error, setError] = useState("");

	return (
		<div className={styles.container}>
			<div className={styles.contentContainer}>
				{name === "tel" ? (
					<div
						style={{
							fontWeight: "700",
						}}
					>
						+66
					</div>
				) : (
					""
				)}
				<input
					type={
						type === "password" && hidePassword
							? "password"
							: type === "password" && !hidePassword
							? "text"
							: type
					}
					name={name}
					required={required}
					placeholder={placeholder}
					autoComplete="off"
					maxLength={max}
					minLength={min}
					className={
						type === "password"
							? styles.passwordInput
							: type === "checkbox"
							? styles.checkboxInput
							: name === "tel"
							? styles.telInput
							: styles.input
					}
					onChange={(e) => {
						if (name === "tel") {
							if (
								validateByRegex(
									e.target.value.toString(),
									REGEX.ALL_NUMBER
								)
							) {
								setError("");
								return true;
							} else {
								setError("Telephone number must be a number");
								return false;
							}
						} else if (name === "email") {
							if (
								validateByRegex(
									e.target.value.toString(),
									REGEX.EMAIL
								)
							) {
								setError("");
								return true;
							} else {
								setError("Email format is incorrect");
								return false;
							}
						} else if (name === "postCode") {
							if (
								validateByRegex(
									e.target.value.toString(),
									REGEX.ALL_NUMBER
								)
							) {
								setError("");
								return true;
							} else {
								setError("Postcode must be a number");
								return false;
							}
						}
					}}
				/>
				{type === "password" ? (
					<img
						src={hidePassword ? eyeSlash.src : eye.src}
						className={styles.imgPassword}
						onClick={() => {
							setHidePassword(!hidePassword);
						}}
					/>
				) : (
					""
				)}
			</div>
			{error ? <div className={styles.error}>{error}</div> : ""}
		</div>
	);
};

export default Input;
