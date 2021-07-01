import React from "react";
import { Checkbox } from "@trussworks/react-uswds";

import { CHECKBOX_STYLE } from "../../assets/styling_classnames";

function ModuleCheckbox({ label, id, onCheck }) {
  return (
    <Checkbox
      id={id}
      label={label}
      color="primary"
      className={CHECKBOX_STYLE}
      onChange={onCheck}
    />
  );
}

export default ModuleCheckbox;
