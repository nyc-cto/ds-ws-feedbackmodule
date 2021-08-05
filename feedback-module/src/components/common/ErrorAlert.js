import React from "react";
import { Alert } from "@trussworks/react-uswds";
import FeatherIcon from "feather-icons-react";

function ErrorAlert({ errorText, id, className }) {
  return (
    <Alert
      type="error"
      slim
      noIcon
      wrapper="span"
      id={id}
      className={className ?? null}
    >
      <FeatherIcon icon="alert-triangle" size="22" strokeWidth="2.5" />
      {errorText}
    </Alert>
  );
}

export default ErrorAlert;
