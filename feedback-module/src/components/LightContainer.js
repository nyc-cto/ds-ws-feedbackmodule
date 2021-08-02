import React from "react";
import { Grid } from "@trussworks/react-uswds";

function LightContainer({ children, formID }) {
  const isChildNull = (children) => {
    /* returns true if there are no elements outside of the form element
         and the form is empty */
    return !(React.Children.toArray(children).length > 1 || formID);
  };
  return isChildNull(children) ? (
    children
  ) : (
    <Grid className="feedback-screen-container">{children}</Grid>
  );
}

export default LightContainer;
