import React, { useState } from "react";
import { Form, Grid } from "@trussworks/react-uswds";

import ModuleButton from "../common/Button";
import TextboxList from "../TextboxList";
import { USER_RESEARCH_FORM } from "../../assets/constants";
import {
  H1_STYLE,
  SCREEN_CONTAINER_STYLE,
} from "../../assets/styling_classnames";

function Screen4() {
  const [inputQuestions, setInputQuestions] = useState(
    USER_RESEARCH_FORM.form.map((question) => {
      return { question: question, response: "" };
    })
  );

  const onSubmit = (e) => {
    console.log(inputQuestions);
    e.preventDefault();
  };

  return (
    <Grid className={SCREEN_CONTAINER_STYLE}>
      <p className={H1_STYLE}>{USER_RESEARCH_FORM.title}</p>
      <p className="margin-bottom-0">{USER_RESEARCH_FORM.summaryText}</p>
      <p className="margin-top-0">{USER_RESEARCH_FORM.furtherInfoText}</p>
      <Form className="maxw-none overflow-hidden">
        <TextboxList
          inputs={USER_RESEARCH_FORM.form}
          setInputQuestions={setInputQuestions}
          inputQuestions={inputQuestions}
          size="input"
          className="margin-bottom-5"
        />
        <ModuleButton
          buttonText={USER_RESEARCH_FORM.buttonText}
          isRight
          onClick={onSubmit}
        />
      </Form>
    </Grid>
  );
}

export default Screen4;
