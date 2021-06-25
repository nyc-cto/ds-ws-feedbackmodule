import React from "react";
import { GridContainer } from "@trussworks/react-uswds";

import Header from "../Header/Header";

function Module() {
  return (
    <GridContainer
      desktop={{ col: 2 }}
      mobile={{ col: "fill" }}
      className="bg-primary-light radius-top-lg padding-x-0"
    >
      <Header />
    </GridContainer>
  );
}

export default Module;
