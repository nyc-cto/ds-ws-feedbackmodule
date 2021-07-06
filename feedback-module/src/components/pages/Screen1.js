import React, { useEffect } from "react";
import { Grid } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

import ModuleButton from "../common/Button";
import { SCREEN1_BUTTONS } from "../../assets/constants2";
import { SCREEN_CONTAINER_STYLE } from "../../assets/styling_classnames";

function Screen1({ changePage, page, setFeedback }) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage("esp");
  }, []);

  const buttons = SCREEN1_BUTTONS.map(({ text, data }, index) => {
    const handleClick = (e) => {
      changePage(data);
      setFeedback((feedback) => {
        feedback.feedbackType = text;
        return feedback;
      });
      e.preventDefault();
    };

    return <ModuleButton buttonText={text} onClick={handleClick} key={index} />;
  });

  return (
    <Grid className={SCREEN_CONTAINER_STYLE}>
      <h1>Do you have any feedback on {page}?</h1>
      <p>{t("test")}</p>
      {buttons}
    </Grid>
  );
}

export default Screen1;
