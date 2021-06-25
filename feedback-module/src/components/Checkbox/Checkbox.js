import React from "react";
import { Checkbox } from "@trussworks/react-uswds";

// import styles from "./Checkbox.module.scss";

function ModuleCheckbox({ label, id }) {
  return (
    <Checkbox
      id={id}
      label={label}
      color="primary"
      className="text-primary bg-transparent mobile-lg:font-sans-xl font-sans-md"
    />
  );
}

export default ModuleCheckbox;
