import React, { FC, useState } from "react";
import eye from "../../assets/images/eye.svg";
import eyeSlash from "../../assets/images/eye_slash.svg";
import styles from "./Input.module.css";

interface LabelProps {
	required?: boolean;
	text: string;
}
const Label: FC<LabelProps> = ({ required, text }): JSX.Element => {
	return (
		<label>
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
