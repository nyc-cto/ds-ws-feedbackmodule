import React from "react";
import { Button } from "@trussworks/react-uswds";

import "./Button.scss";

function ModuleButton({ buttonText, onClick }) {
  return (
    <Button aria-label={buttonText} onClick={onClick}>
      {buttonText}
    </Button>
  );
}

export default ModuleButton;
