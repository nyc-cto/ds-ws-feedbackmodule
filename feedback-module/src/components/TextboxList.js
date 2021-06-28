import React from "react";
import { Grid } from "@trussworks/react-uswds";

import Textbox from "./common/Textbox";

function TextboxList({ feedbackType }) {
  return (
    <Grid>
      {feedbackType.textInputs.map((label, index) => {
        return (
          <Grid col="fill" key={index}>
            <Textbox id={index} size="area" type="text" label={label} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default TextboxList;
