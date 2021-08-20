import React from "react";
import { Checkbox } from "@trussworks/react-uswds";

function ModuleCheckbox({
  label,
  id,
  onCheck,
  firstCheckRef,
  defaultChecked,
  describedBy,
  invalid,
  labelledBy,
}) {
  // Sets checkbox to checked when user presses enter
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
      onChange={onCheck}
      onKeyDown={handleKeyDown}
      inputRef={firstCheckRef}
      defaultChecked={defaultChecked}
      aria-describedby={invalid ? describedBy : undefined}
      aria-labelledby={labelledBy ?? undefined}
      invalid={invalid}
    />
  );
}

export default ModuleCheckbox;
