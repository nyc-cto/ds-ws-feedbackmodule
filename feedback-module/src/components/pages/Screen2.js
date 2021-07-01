import React, { useState } from "react";
import { Form } from "@trussworks/react-uswds";
import { Grid } from "@trussworks/react-uswds";

import { SCREEN_CONTAINER_STYLE } from "../../assets/styling_classnames";
import CheckboxList from "../CheckboxList";
import TextboxList from "../TextboxList";
import ModuleButton from "../common/Button";

function Screen2({ feedbackType, changePage, setFeedback }) {
  const [checkedFields, setCheckedFields] = useState(
    feedbackType.checkboxes.map((checkboxLabel) => {
      return { label: checkboxLabel, checked: false };
    })
  );

  const [otherField, setOtherField] = useState("");

  const [inputQuestions, setInputQuestions] = useState(
    feedbackType.textInputs.map((question) => {
      return { question: question, answer: "" };
    })
  );

  const onCheck = (index) => {
    let checked = checkedFields;
    checked[index].checked = !checked[index].checked;
    setCheckedFields(checked);
  };

  const onSubmit = (e) => {
    const checkedOptions = checkedFields.map(({ label, checked }) => {
      return {
        checked: checked,
        label: label === "Other" && checked ? `Other: ${otherField}` : label,
      };
    });
    setCheckedFields(checkedOptions);
    setFeedback((feedback) => {
      feedback.checkedOptions = checkedOptions
        .filter(({ checked }) => checked)
        .map(({ label }) => label);
      feedback.inputResponses = inputQuestions;
      console.log(feedback);
      return feedback;
    });
    changePage();
    e.preventDefault();
  };

  return (
    <Grid className={SCREEN_CONTAINER_STYLE}>
      <h1>{feedbackType.title}</h1>
      <Form className="maxw-none overflow-hidden">
        <CheckboxList
          feedbackCheckboxes={feedbackType.checkboxes}
          onCheck={(label) => onCheck(label)}
          setOtherField={setOtherField}
        />
        <TextboxList
          inputs={feedbackType.textInputs}
          setInputQuestions={setInputQuestions}
          inputQuestions={inputQuestions}
          size="area"
        />
        <ModuleButton
          buttonText={feedbackType.button}
          isRight
          onClick={onSubmit}
        />
      </Form>
    </Grid>
  );
}

export default Screen2;
