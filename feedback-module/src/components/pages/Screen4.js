import React from "react";
import { Grid } from "@trussworks/react-uswds";

import ModuleButton from "../common/Button";
import { SCREEN_CONTAINER_STYLE } from "../../assets/styling_classnames";

function Screen4({ changePage }) {
  return (
    <Grid className={SCREEN_CONTAINER_STYLE}>
      <ModuleButton buttonText="" isRight onClick={() => changePage()} />
    </Grid>
  );
}

export default Screen4;
