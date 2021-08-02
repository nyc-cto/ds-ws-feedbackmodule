import React from "react";
import { Button } from "@trussworks/react-uswds";

function ModuleButton({ buttonText, onClick, isRight, className }) {
  return (
    <Button
      aria-label={buttonText}
      onClick={onClick}
      className={`${isRight && "flex-align-self-end"} ${className}`}
      type="button"
    >
      {buttonText}
    </Button>
  );
}

export default ModuleButton;
