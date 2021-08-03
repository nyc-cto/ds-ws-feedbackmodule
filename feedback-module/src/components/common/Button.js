import React from "react";
import { Button } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

import { BUTTON_STYLE } from "../../assets/styling_classnames";
import ErrorAlert from "./ErrorAlert";

function ModuleButton({
  buttonText,
  onClick,
  isRight,
  networkError,
  dir,
  className,
}) {
  const { t } = useTranslation();

  return (
    <div className={`display-flex ${isRight && "flex-align-self-end"}`}>
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
        className={`${BUTTON_STYLE} ${className}`}
        type="button"
      >
        {buttonText}
      </Button>
    </div>
  );
}

export default ModuleButton;
