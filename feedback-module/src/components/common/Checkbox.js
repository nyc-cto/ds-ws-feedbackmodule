import React from "react";
import { Checkbox } from "@trussworks/react-uswds";

import { CHECKBOX_STYLE } from "../../assets/styling_classnames";

function ModuleCheckbox({ label, id, onCheck }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onCheck();
      e.target.checked = !e.target.checked;
    }
  };

  return (
    <Checkbox
      id={id}
      label={label}
      color="primary"
      className={CHECKBOX_STYLE}
      onChange={onCheck}
      onKeyDown={handleKeyDown}
    />
  );
}

export default ModuleCheckbox;
