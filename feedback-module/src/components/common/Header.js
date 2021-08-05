import React from "react";
import { GridContainer } from "@trussworks/react-uswds";

import Logo from "../../assets/header_logo.svg";

function Header({ innerRef }) {
  return (
    <>
      {/* Using dummy empty div to host headerRef since ref does not work with GridContainer  */}
      <div ref={innerRef}></div>
      <GridContainer className="feedback-module__header">
        <img
          className="feedback-module__logo"
          src={Logo}
          alt="New York City feedback module logo"
        />
      </GridContainer>
    </>
  );
}

export default Header;
