import React, { useState } from "react";
import { Grid } from "@trussworks/react-uswds";

import ModuleCheckbox from "./common/Checkbox";
// import Textbox from "./common/Textbox";

function CheckboxList({ feedbackType, setCheckedFields }) {
  const [checkboxObjs, setCheckboxObjs] = useState(
    feedbackType.checkboxes.map((label) => {
      return { label: label, checked: false };
    })
  );

  return (
    <Grid>
      {checkboxObjs.map(({ label, checked }, index) => {
        const onCheck = () => {
          setCheckboxObjs((pastChecks) => {
            pastChecks[index] = { label: label, checked: !checked };
            return pastChecks;
          });
          setCheckedFields(() =>
            checkboxObjs
              .filter(({ checked }) => checked)
              .map(({ label }) => label)
          );
        };

        return (
          <Grid row key={index} className="flex-align-baseline">
            <ModuleCheckbox
              id={index}
              label={label}
              onCheck={() => onCheck()}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default CheckboxList;
