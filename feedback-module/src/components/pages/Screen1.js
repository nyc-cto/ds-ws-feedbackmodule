import React from "react";
import { Grid } from "@trussworks/react-uswds";

import ModuleButton from "../common/Button";
import { SCREEN1_BUTTONS } from "../../assets/constants";
import {
  H1_STYLE,
  SCREEN_CONTAINER_STYLE,
} from "../../assets/styling_classnames";

function Screen1({ changePage, page, setFeedback }) {
  const buttons = SCREEN1_BUTTONS.map(({ text, data, feedbackID }, index) => {
    const handleClick = (e) => {
      changePage(data);
      setFeedback((feedback) => {
        feedback.feedbackType = { label: text, feedbackID: feedbackID };
        return feedback;
      });
      e.preventDefault();
    };

    return <ModuleButton buttonText={text} onClick={handleClick} key={index} />;
  });

  return (
    <Grid className={SCREEN_CONTAINER_STYLE}>
      <p className={H1_STYLE}>Do you have any feedback on {page}?</p>
      {buttons}
    </Grid>
  );
}

export default Screen1;
