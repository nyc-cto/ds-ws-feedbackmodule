import React from "react";
import { Alert } from "@trussworks/react-uswds";

function ErrorAlert({ errorText }) {
  return (
    <Alert type="error" slim>
      {errorText}
    </Alert>
  );
}

export default ErrorAlert;
