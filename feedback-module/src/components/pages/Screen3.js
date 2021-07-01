import React from "react";
import { Grid } from "@trussworks/react-uswds";

import ModuleButton from "../common/Button";
import { SUBMISSION_TEXT } from "../../assets/constants";
import { SCREEN_CONTAINER_STYLE } from "../../assets/styling_classnames";

function Screen3({ changePage }) {
  return (
    <>
      <Grid className={`bg-primary ${SCREEN_CONTAINER_STYLE}`}>
        <h1 className="text-white">
          {SUBMISSION_TEXT.msg_line1}
          <br />
          <br />
          {SUBMISSION_TEXT.msg_line2}
        </h1>
      </Grid>
      <Grid className={SCREEN_CONTAINER_STYLE}>
        <p>{SUBMISSION_TEXT.user_research}</p>
        <ModuleButton
          buttonText={SUBMISSION_TEXT.button_text}
          isRight
          onClick={() => changePage()}
        />
      </Grid>
    </>
  );
}

export default Screen3;
