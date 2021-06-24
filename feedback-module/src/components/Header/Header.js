import React from "react";

import styles from "./Header.module.scss";
import Logo from "../../assets/header_logo.png";

function Header() {
  return (
    <div className={styles.header}>
      <img src={Logo} alt="New York City feedback module logo" />
    </div>
  );
}

export default Header;
