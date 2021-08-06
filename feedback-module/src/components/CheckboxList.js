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
  firstCheckRef,
  checkedFields,
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
          <Grid row key={index} className="flex-no-wrap">
            <ModuleCheckbox
              id={`feedback-checkbox-${index}`}
              label={label}
              onCheck={() => onCheckOther(index)}
              className="width-full"
              firstCheckRef={index === 0 ? firstCheckRef : undefined}
              defaultChecked={checkedFields && checkedFields[index].checked}
            />
            {otherChecked && en(checkboxKey)[index] === "Other" && (
              <Textbox
                id="other-field"
                type="text"
                className="margin-left-1"
                onChange={onChangeOther}
                label=""
              />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
}

export default CheckboxList;
