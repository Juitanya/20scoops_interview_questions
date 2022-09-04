import React, { FC } from "react";
import styles from "./Information.module.css";

interface InformationProps {
	info?: string;
	topic: string;
}
const Information: FC<InformationProps> = ({ info, topic }): JSX.Element => {
	return (
		<div className={styles.container}>
			<p style={{ fontWeight: 700 }}>{topic}:</p>
			<p>{info}</p>
		</div>
	);
};

export default Information;
