import React, { useState } from "react";
import { Grid } from "@trussworks/react-uswds";

import ModuleCheckbox from "./common/Checkbox";
import Textbox from "./common/Textbox";

function CheckboxList({ feedbackCheckboxes, onCheck, setOtherField }) {
  const [otherChecked, setOtherChecked] = useState(false);

  const onCheckOther = (index, label) => {
    label === "Other" && setOtherChecked(!otherChecked);
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
              id={`checkbox-${index}`}
              label={label}
              // label={<div className="margin-left-2">{label}</div>}
              onCheck={() => onCheckOther(index, label)}
              className="width-full"
            />
            {otherChecked && label === "Other" && (
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
