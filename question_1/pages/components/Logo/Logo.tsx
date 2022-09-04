import React, { FC } from "react";
import styles from "./Logo.module.css";
import logo from "../../assets/images/20scoops.png";

const Logo: FC = (): JSX.Element => {
	return <img className={styles.logo} src={logo.src} />;
};

export default Logo;
