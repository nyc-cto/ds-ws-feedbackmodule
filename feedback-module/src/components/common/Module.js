import React, { useState } from "react";
import { GridContainer, Grid } from "@trussworks/react-uswds";

import Header from "./Header";
import Screen1 from "../pages/Screen1";
import Screen2 from "../pages/Screen2";

function Module() {
  const [screen, setScreen] = useState(
    <Screen1
      setData={(data) => setScreen(<Screen2 data={data} />)}
      page="[this page]"
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
