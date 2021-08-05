import React from "react";
import { Button } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";
import ErrorAlert from "./ErrorAlert";

function ModuleButton({ buttonText, onClick, networkError, className }) {
  const { t } = useTranslation();

  return (
    <div className={className}>
      {networkError && (
        <ErrorAlert
          errorText={t("errorMessages.requestFailure")}
          className="flex-button__alert"
        />
      )}
      <Button aria-label={buttonText} onClick={onClick} type="button">
        {buttonText}
      </Button>
    </div>
  );
}

export default ModuleButton;
