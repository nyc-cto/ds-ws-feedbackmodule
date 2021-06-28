import React from "react";
import { GridContainer } from "@trussworks/react-uswds";

import Logo from "../../assets/header_logo.png";

function Header() {
  return (
    <GridContainer className="radius-top-lg bg-primary height-4 mobile-lg:height-6 display-flex padding-x-10px padding-9px mobile-lg:padding-x-2 mobile-lg:padding-y-105 font-sans-check">
      <img src={Logo} alt="New York City feedback module logo" />
    </GridContainer>
  );
}

export default Header;
