import React from "react";
import { Grid } from "@trussworks/react-uswds";

import { SCREEN_CONTAINER_STYLE } from "../assets/styling_classnames";

function LightContainer({ children, formID }) {
  const isChildNull = (children) => {
    /* returns true if there are no elements outside of the form element
         and the form is empty */
    return !(React.Children.toArray(children).length > 1 || formID);
  };
  return isChildNull(children) ? (
    children
  ) : (
    <Grid className={SCREEN_CONTAINER_STYLE}>{children}</Grid>
  );
}

export default LightContainer;
