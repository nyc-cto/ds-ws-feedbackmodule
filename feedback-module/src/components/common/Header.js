import React from "react";
import { GridContainer } from "@trussworks/react-uswds";

import Logo from "../../assets/header_logo.png";
import { HEADER_STYLE } from "../../assets/styling_classnames";

function Header() {
  return (
    <GridContainer className={HEADER_STYLE}>
      <img
        className="width-auto height-2 mobile-lg:height-205 mobile-lg-height-205"
        src={Logo}
        alt="New York City feedback module logo"
      />
    </GridContainer>
  );
}

export default Header;
