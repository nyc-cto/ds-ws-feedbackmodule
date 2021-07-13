import React from "react";
import { Alert } from "@trussworks/react-uswds";
import FeatherIcon from "feather-icons-react";

function ErrorAlert({ errorText }) {
  return (
    <Alert type="error" slim noIcon wrapper="span">
      <FeatherIcon
        icon="alert-triangle"
        size="22"
        strokeWidth="2.5"
        className="margin-right-205 padding-top-2px"
      />
      {errorText}
    </Alert>
  );
}

export default ErrorAlert;
