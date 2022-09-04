import React, { FC } from "react";
import styles from "./Option.module.css";
interface OptionProps {
	value: string;
	disabled?: boolean;
	hidden?: boolean;
}
const Option: FC<OptionProps> = ({ value, disabled, hidden }): JSX.Element => {
	return (
		<option
			className={styles.option}
			value={value}
			disabled={disabled}
			hidden={hidden}
		>
			{value}
		</option>
	);
};

export default Option;
