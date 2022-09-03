import React, { FC } from "react";
import Loader from "../Loader/Loader";
import styles from "./Button.module.css";

interface ButtonProps {
	loading?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	type?: "button" | "submit" | "reset";
	text?: string;
}
const Button: FC<ButtonProps> = ({
	loading,
	onClick,
	text,
	type,
}): JSX.Element => {
	return (
		<button
			className={loading ? styles.loading : styles.button}
			type={type}
			onClick={onClick}
			disabled={loading}
		>
			{loading ? <Loader /> : text}
		</button>
	);
};

export default Button;
