import React, { useState } from "react";
import { Grid } from "@trussworks/react-uswds";

import ModuleCheckbox from "./common/Checkbox";
import Textbox from "./common/Textbox";

function CheckboxList({ feedbackType, onCheck, setOtherField }) {
  const [otherChecked, setOtherChecked] = useState(false);

  const onCheckOther = (label) => {
    label === "Other" && setOtherChecked(!otherChecked);
    onCheck(label);
  };

  const onChangeOther = ({ target }) => {
    setOtherField(target.value);
  };

  return (
    <Grid>
      {feedbackType.checkboxes.map((label, index) => {
        return (
          <Grid row key={index} className="flex-align-baseline">
            <ModuleCheckbox
              id={index}
              label={label}
              onCheck={() => onCheckOther(label)}
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
