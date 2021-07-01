import React, { useState } from "react";
import { Form } from "@trussworks/react-uswds";

import ModuleButton from "../common/Button";
import TextboxList from "../TextboxList";
import { USER_RESEARCH_FORM } from "../../assets/constants";

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
    <>
      <h1>{USER_RESEARCH_FORM.title}</h1>
      <p className="margin-bottom-0">{USER_RESEARCH_FORM.summaryText}</p>
      <p className="margin-top-0">{USER_RESEARCH_FORM.furtherInfoText}</p>
      <Form className="maxw-none overflow-hidden">
        <TextboxList
          inputs={USER_RESEARCH_FORM.form}
          setInputQuestions={setInputQuestions}
          inputQuestions={inputQuestions}
          size="input"
        />
        <ModuleButton
          buttonText={USER_RESEARCH_FORM.buttonText}
          className="float-right margin-x-0"
          onClick={onSubmit}
        />
      </Form>
    </>
  );
}

export default Screen4;
