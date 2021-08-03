import React from "react";
import { Button } from "@trussworks/react-uswds";
// import { useTranslation } from "react-i18next";

import {
  BUTTON_STYLE,
  BUTTON_RIGHT_STYLE,
} from "../../assets/styling_classnames";
// import ErrorAlert from "./ErrorAlert";

function ModuleButton({
  buttonText,
  onClick,
  isRight,
  // networkError,
  // dir,
  className,
}) {
  // const { t } = useTranslation();
  return (
    // <div className="display-flex">
    //   {networkError && (
    //     <div className="margin-right-2">
    //       <ErrorAlert errorText={t("errorMessages.requestFailure")} dir={dir} />
    //     </div>
    //   )}
    <Button
      aria-label={buttonText}
      onClick={onClick}
      className={`${
        isRight && BUTTON_RIGHT_STYLE
      } ${BUTTON_STYLE} ${className}`}
      type="button"
    >
      {buttonText}
    </Button>
    // </div>
  );
}

export default ModuleButton;
