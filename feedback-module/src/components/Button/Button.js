import React from "react";
import { Button } from "@trussworks/react-uswds";

import styles from "./Button.module.scss";

function ModuleButton({ buttonText, onClick }) {
  return (
    <Button aria-label={buttonText} onClick={onClick} className={styles.btn}>
      {buttonText}
    </Button>
  );
}

export default ModuleButton;
