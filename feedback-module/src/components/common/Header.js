import React from "react";
import { GridContainer } from "@trussworks/react-uswds";

import Logo from "../../assets/header_logo.svg";
import { HEADER_STYLE } from "../../assets/styling_classnames";

function Header({ innerRef }) {
  return (
    <>
      {/* Using dummy empty div to host headerRef since ref does not work with GridContainer  */}
      <div ref={innerRef}></div>
      <GridContainer className={HEADER_STYLE}>
        <img
          className="width-auto height-2 mobile-lg:height-205 mobile-lg-height-205 margin-top-1px"
          src={Logo}
          alt="New York City feedback module logo"
        />
      </GridContainer>
    </>
  );
}

export default Header;
