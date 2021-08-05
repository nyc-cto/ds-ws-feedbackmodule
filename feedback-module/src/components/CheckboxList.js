import React, { useState } from "react";
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
  otherTooLong,
  dir,
}) {
  const { i18n, t } = useTranslation();
  const en = i18n.getFixedT("en");

  const [otherChecked, setOtherChecked] = useState(false);

  const onCheckOther = (index) => {
    en(checkboxKey)[index] === "Other" && setOtherChecked(!otherChecked);
    onCheck(index);
  };

  const onChangeOther = ({ target }) => {
    setOtherField(target.value);
  };

  return (
    <Grid>
      {feedbackCheckboxes.map((label, index) => {
        return (
          <div key={index}>
            {en(checkboxKey)[index] === "Other" && otherTooLong && (
              <ErrorAlert
                errorText={t("errorMessages.charLimitError")}
                dir={dir}
              />
            )}
            <Grid row className="flex-no-wrap ">
              <ModuleCheckbox
                id={`feedback-checkbox-${index}`}
                label={label}
                onCheck={() => onCheckOther(index)}
                className="width-full"
                firstCheckRef={index === 0 ? firstCheckRef : undefined}
              />

              {otherChecked && en(checkboxKey)[index] === "Other" && (
                <div className="margin-left-1 width-full margin-right-3">
                  <Textbox
                    id="other-field"
                    type="text"
                    onChange={onChangeOther}
                    label=""
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
