import React, { useState, useRef } from "react";
import { Grid } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

import ModuleCheckbox from "./common/Checkbox";
import Textbox from "./common/Textbox";
import ErrorAlert from "./common/ErrorAlert";

function CheckboxList({
  feedbackCheckboxes,
  onCheck,
  setOtherField,
  checkboxKey,
  firstCheckRef,
  checkedFields,
  otherTooLong,
  setOtherTooLong,
}) {
  const { i18n, t } = useTranslation();
  const en = i18n.getFixedT("en");

  const [otherChecked, setOtherChecked] = useState(false);

  const otherTextboxRef = useRef();

  const isOther = (index) => {
    return en(checkboxKey)[index] === "Other";
  };

  const onCheckOther = (index) => {
    if (isOther(index)) {
      setOtherChecked(!otherChecked);
      setOtherTooLong(false);
      setOtherField("");
    }
    onCheck(index);
  };

  const onChangeOther = ({ target }) => {
    setOtherField(target.value);
  };

  const otherCharError = (index) => {
    if (isOther(index) && otherTooLong) {
      otherTextboxRef.current.focus();
      return <ErrorAlert errorText={t("errorMessages.charLimitError")} />;
    }
  };

  return (
    <Grid>
      {feedbackCheckboxes.map((label, index) => {
        return (
          <div key={index}>
            {otherCharError(index)}
            <Grid
              row
              className={`flex-no-wrap ${
                isOther(index) ? "flex-align-baseline" : ""
              }`}
            >
              <ModuleCheckbox
                id={`feedback-checkbox-${index}`}
                label={label}
                onCheck={() => onCheckOther(index)}
                className="width-full"
                firstCheckRef={index === 0 ? firstCheckRef : undefined}
                defaultChecked={checkedFields && checkedFields[index].checked}
              />

              {otherChecked && isOther(index) && (
                <div className="margin-left-1 width-full margin-right-3">
                  <Textbox
                    id="other-field"
                    type="text"
                    onChange={onChangeOther}
                    label=""
                    inputRef={otherTextboxRef}
                  />
                </div>
              )}
            </Grid>
          </div>
        );
      })}
    </Grid>
  );
}

export default CheckboxList;
