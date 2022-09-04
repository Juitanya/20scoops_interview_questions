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
}
const Input: FC<InputProps> = ({
	type,
	name,
	required,
	placeholder,
	max,
}): JSX.Element => {
	const [hidePassword, setHidePassword] = useState(true);
	const [error, setError] = useState("");

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: "1rem",
					position: "relative",
				}}
			>
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
					maxLength={max}
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
						style={{
							width: "2rem",
							cursor: "pointer",
							position: "absolute",
							right: "10px",
							opacity: "0.5",
						}}
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
