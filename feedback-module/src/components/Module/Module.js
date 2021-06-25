import React from "react";
import { GridContainer } from "@trussworks/react-uswds";

import Header from "../Header/Header";
import ModuleCheckbox from "../Checkbox/Checkbox";

function Module() {
  return (
    <GridContainer
      desktop={{ col: 2 }}
      mobile={{ col: "fill" }}
      className="bg-primary-light radius-top-lg padding-x-0"
    >
      <Header />
      <ModuleCheckbox label="test" id="checkbox-test" />
    </GridContainer>
  );
}

export default Module;
