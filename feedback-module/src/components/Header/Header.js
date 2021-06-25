import React from "react";
import { GridContainer } from "@trussworks/react-uswds";

import Logo from "../../assets/header_logo.png";

function Header() {
  return (
    <GridContainer className="radius-top-lg bg-primary height-6 display-flex padding-x-2 padding-y-105 font-sans-check">
      <img src={Logo} alt="New York City feedback module logo" />
    </GridContainer>
  );
}

export default Header;
