import React, { useState } from "react";
import { GridContainer, Grid } from "@trussworks/react-uswds";

import Header from "./Header";
import Screen2 from "../pages/Screen2";
import { MISSING_INFO } from "../../assets/constants";

function Module() {
  const [screen, setScreen] = useState(
    <Screen2
      feedbackType={MISSING_INFO}
      changeScreen={() => setScreen(<Screen2 feedbackType={MISSING_INFO} />)}
    />
  );

  return (
    <GridContainer
      desktop={{ col: 2 }}
      mobile={{ col: "fill" }}
      className="bg-primary-light radius-top-lg padding-x-0"
    >
      <Header />
      <Grid className="padding-x-6 padding-y-5">{screen}</Grid>
    </GridContainer>
  );
}

export default Module;
