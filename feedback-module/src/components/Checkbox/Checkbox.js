import React from "react";
import { Checkbox } from "@trussworks/react-uswds";

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
