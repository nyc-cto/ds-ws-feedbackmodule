import React from "react";
import { Button } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";
import ErrorAlert from "./ErrorAlert";

function ModuleButton({ buttonText, onClick, networkError, dir, className }) {
  const { t } = useTranslation();

  return (
    <div className={`display-flex ${className}`}>
      {networkError && (
        <ErrorAlert
          errorText={t("errorMessages.requestFailure")}
          dir={dir}
          className="margin-right-2"
        />
      )}
      <Button
        aria-label={buttonText}
        onClick={onClick}
        className={className}
        type="button"
      >
        {buttonText}
      </Button>
    </div>
  );
}

export default ModuleButton;
