import React, { FC } from "react";
import styles from "./Header.module.css";
interface HeaderProps {
	text?: string;
}
const Header: FC<HeaderProps> = ({ text }: HeaderProps): JSX.Element => {
	return <div className={styles.header}>{text}</div>;
};

export default Header;
