import React from "react";
import { GridContainer } from "@trussworks/react-uswds";

import Header from "../Header/Header";

function Module() {
  return (
    <GridContainer desktop={{ col: 2 }} mobile={{ col: "fill" }}>
      <Header />
    </GridContainer>
  );
}

export default Module;
