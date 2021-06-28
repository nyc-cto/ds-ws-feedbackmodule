import React from "react";
import { Grid } from "@trussworks/react-uswds";

import ModuleCheckbox from "./common/Checkbox";
// import Textbox from "./common/Textbox";

function CheckboxList({ feedbackType }) {
  // const [otherChecked, setOtherChecked] = useState(false);

  // const onCheck = (label) => {
  //   label === "Other" && setOtherChecked(!otherChecked);
  // };

  return (
    <Grid>
      {feedbackType.checkboxes.map((label, index, onCheck) => {
        return (
          <Grid row key={index} className="flex-align-baseline">
            <ModuleCheckbox
              id={index}
              label={label}
              onCheck={() => onCheck(label)}
            />
            {/* {otherChecked && label === "Other" && (
              <Grid col="6">
                <Textbox
                  id="label"
                  size="input"
                  type="text"
                  className="margin-left-1"
                />
              </Grid>
            )} */}
          </Grid>
        );
      })}
    </Grid>
  );
}

export default CheckboxList;
