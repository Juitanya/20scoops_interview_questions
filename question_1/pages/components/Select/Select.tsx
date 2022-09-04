import React, { FC } from "react";
import Option from "./Option";
import styles from "./Select.module.css";

interface SelectProps {
	option: {
		value: string;
		disabled?: boolean;
		hidden?: boolean;
	}[];
	defaultValue?: string;
	required?: boolean;
	id: string;
	name: string;
}
const Select: FC<SelectProps> = ({
	option,
	defaultValue,
	required,
	id,
	name,
}): JSX.Element => {
	return (
		<select
			className={styles.select}
			defaultValue={defaultValue}
			id={id}
			name={name}
			required={required}
		>
			{option.map(({ value, disabled, hidden }, i) => (
				<Option
					value={value}
					disabled={disabled}
					hidden={hidden}
					key={i}
				/>
			))}
		</select>
	);
};

export default Select;
