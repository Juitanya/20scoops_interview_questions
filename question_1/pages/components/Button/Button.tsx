import React, { FC } from "react";
import Loader from "../Loader/Loader";
import styles from "./Button.module.css";

interface ButtonProps {
	loading?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	type?: "button" | "submit" | "reset";
	text?: string;
	littleMarginTop?: boolean;
	secondary?: boolean;
}
const Button: FC<ButtonProps> = ({
	loading,
	littleMarginTop,
	onClick,
	text,
	type,
	secondary,
}): JSX.Element => {
	return (
		<button
			className={
				loading
					? styles.loading
					: secondary
					? styles.buttonSecondary
					: styles.button
			}
			type={type}
			onClick={onClick}
			disabled={loading}
			style={{ marginTop: littleMarginTop ? "1rem" : "" }}
		>
			{loading ? <Loader /> : text}
		</button>
	);
};

export default Button;
