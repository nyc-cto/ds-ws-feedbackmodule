import React from "react";
import { Checkbox } from "@trussworks/react-uswds";

// import styles from "./Checkbox.module.scss";

function ModuleCheckbox({ label }) {
  return (
    <Checkbox
      id="checkbox"
      label={label}
      color="primary"
      className="text-primary bg-transparent"
    />
  );
}

export default ModuleCheckbox;
