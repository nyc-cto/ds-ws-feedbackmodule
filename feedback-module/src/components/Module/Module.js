import React from "react";
import { GridContainer, Grid } from "@trussworks/react-uswds";

import Header from "../Header/Header";
import ModuleCheckbox from "../Checkbox/Checkbox";
import ModuleButton from "../Button/Button";

function Module() {
  return (
    <GridContainer
      desktop={{ col: 2 }}
      mobile={{ col: "fill" }}
      className="bg-primary-light radius-top-lg padding-x-0"
    >
      <Header />
      <Grid className="padding-x-6 padding-y-5">
        <ModuleCheckbox label="test" id="checkbox-test" />
        <ModuleButton
          onClick={() => {
            alert("Feedback button has been pressed");
          }}
          style={{ cursor: "pointer" }}
          buttonText="Button"
        />
      </Grid>
    </GridContainer>
  );
}

export default Module;
