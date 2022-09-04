import React, { FC } from "react";
import Loader from "../Loader/Loader";
import styles from "./Button.module.css";

interface ButtonProps {
	loading?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	type?: "button" | "submit" | "reset";
	text?: string;
	littleMarginTop?: boolean;
}
const Button: FC<ButtonProps> = ({
	loading,
	littleMarginTop,
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
			style={{ marginTop: littleMarginTop ? "0.25rem" : "" }}
		>
			{loading ? <Loader /> : text}
		</button>
	);
};

export default Button;
