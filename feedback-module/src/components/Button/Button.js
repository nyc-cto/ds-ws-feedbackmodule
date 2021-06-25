import React from "react";
import { Button } from "@trussworks/react-uswds";

// import styles from "./Button.module.scss";

function ModuleButton({ buttonText, onClick }) {
  return (
    <Button
      aria-label={buttonText}
      onClick={onClick}
      className="border-transparent hover:bg-primary-light hover:text-primary hover:border-primary padding-10px mobile-lg:padding-x-205 mobile-lg:padding-y-2 mobile-lg:font-sans-lg border-05 hover:border-bottom-05"
    >
      {buttonText}
    </Button>
  );
}

export default ModuleButton;
