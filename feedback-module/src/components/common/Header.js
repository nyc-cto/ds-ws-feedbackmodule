import React from "react";
import { GridContainer } from "@trussworks/react-uswds";

import Logo from "../../assets/header_logo.png";

function Header({ innerRef }) {
  return (
    <>
      {/* Using dummy empty div to host headerRef since ref does not work with GridContainer  */}
      <div ref={innerRef}></div>
      <GridContainer className="feedback-header">
        <img
          className="width-auto height-2 mobile-lg:height-205 mobile-lg-height-205"
          src={Logo}
          alt="New York City feedback module logo"
        />
      </GridContainer>
    </>
  );
}

export default Header;
