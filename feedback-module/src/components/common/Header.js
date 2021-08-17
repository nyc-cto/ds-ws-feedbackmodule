import React from "react";
import { GridContainer } from "@trussworks/react-uswds";

function Header({ innerRef }) {
  return (
    <>
      {/* Using dummy empty div to host headerRef since ref does not work with GridContainer  */}
      <div ref={innerRef}></div>
      <GridContainer className="feedback-module__header">
        <span className="feedback-module__logo"></span>
      </GridContainer>
    </>
  );
}

export default Header;
