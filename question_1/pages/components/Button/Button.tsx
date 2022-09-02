import React, { FC } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	type?: "button" | "submit" | "reset";
	text?: string;
}
const Button: FC<ButtonProps> = ({ onClick, text, type }): JSX.Element => {
	return (
		<button className={styles.button} type={type} onClick={onClick}>
			{text}
		</button>
	);
};

export default Button;
