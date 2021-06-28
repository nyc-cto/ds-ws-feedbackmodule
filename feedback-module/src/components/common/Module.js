import React from "react";
import { GridContainer, Grid } from "@trussworks/react-uswds";

import Header from "./Header";
// import ModuleCheckbox from "./Checkbox";
// import ModuleButton from "./Button";

function Module({ children }) {
  return (
    <GridContainer
      desktop={{ col: 2 }}
      mobile={{ col: "fill" }}
      className="bg-primary-light radius-top-lg padding-x-0"
    >
      <Header />
      <Grid className="padding-x-6 padding-y-5">
        {/* <ModuleCheckbox label="test" id="checkbox-test" />
        <ModuleButton
          onClick={() => {
            alert("Feedback button has been pressed");
          }}
          style={{ cursor: "pointer" }}
          buttonText="Button"
        /> */}
        {children}
      </Grid>
    </GridContainer>
  );
}

export default Module;
