import React from "react";
import { Grid } from "@trussworks/react-uswds";

import ModuleButton from "../common/Button";
import { SCREEN1_BUTTONS } from "../../assets/constants";
import { SCREEN_CONTAINER_STYLE } from "../../assets/styling_classnames";

function Screen1({ changePage, page }) {
  const buttons = SCREEN1_BUTTONS.map(({ text, data }, index) => {
    const handleClick = (e) => {
      changePage(data);
      e.preventDefault();
    };

    return <ModuleButton buttonText={text} onClick={handleClick} key={index} />;
  });

  return (
    <Grid className={SCREEN_CONTAINER_STYLE}>
      <h1>Do you have any feedback on {page}?</h1>
      {buttons}
    </Grid>
  );
}

export default Screen1;
