import React from "react";
import { Button } from "@trussworks/react-uswds";

// import styles from "./Button.module.scss";

function ModuleButton({ buttonText, onClick }) {
  return (
    <Button
      aria-label={buttonText}
      onClick={onClick}
      className="border-05 border-bottom-05 border-transparent hover:bg-primary-light hover:text-primary hover:border-primary"
    >
      {buttonText}
    </Button>
  );
}

export default ModuleButton;
