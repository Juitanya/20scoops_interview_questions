import React, { FC } from "react";
import styles from "./Label.module.css";

interface LabelProps {
	required?: boolean;
	text: string;
}
const Label: FC<LabelProps> = ({ required, text }): JSX.Element => {
	return (
		<label className={text === "Telephone Number " ? styles.telLabel : ""}>
			{text}{" "}
			{required ? (
				<span style={{ color: required ? "red" : "" }}>*</span>
			) : (
				""
			)}
		</label>
	);
};

export default Label;
