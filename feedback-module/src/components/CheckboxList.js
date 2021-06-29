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
          <Grid row key={index} className="flex-align-baseline">
            <ModuleCheckbox
              id={index}
              label={label}
              onCheck={() => onCheckOther(index, label)}
            />
            {otherChecked && label === "Other" && (
              <Grid col="6">
                <Textbox
                  id="label"
                  size="input"
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
