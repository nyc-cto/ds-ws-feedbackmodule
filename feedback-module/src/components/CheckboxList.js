import React, { useState } from "react";
import { Grid } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

import ModuleCheckbox from "./common/Checkbox";
import Textbox from "./common/Textbox";

function CheckboxList({
  feedbackCheckboxes,
  onCheck,
  setOtherField,
  checkboxKey,
}) {
  const { i18n } = useTranslation();
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
          <Grid row key={index} className="flex-align-baseline">
            <ModuleCheckbox
              id={`checkbox-${index}`}
              label={label}
              onCheck={() => onCheckOther(index)}
            />
            {otherChecked && en(checkboxKey)[index] === "Other" && (
              <Grid col="6">
                <Textbox
                  id="other-field"
                  type="text"
                  className="margin-left-1"
                  onChange={onChangeOther}
                />
              </Grid>
            )}
          </Grid>
        );
      })}
    </Grid>
  );
}

export default CheckboxList;
