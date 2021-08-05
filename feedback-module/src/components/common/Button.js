import React from "react";
import { Button } from "@trussworks/react-uswds";

function ModuleButton({ buttonText, onClick, className }) {
  return (
    <Button
      aria-label={buttonText}
      onClick={onClick}
      className={className}
      type="button"
    >
      {buttonText}
    </Button>
  );
}

export default ModuleButton;
