import React, { useState } from "react";
import { Form } from "@trussworks/react-uswds";

import CheckboxList from "../CheckboxList";
import TextboxList from "../TextboxList";
import ModuleButton from "../common/Button";

function Screen2({ feedbackType, changePage }) {
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
    let checked = checkedFields;
    checked.map(
      (checkedField) =>
        checkedField.label === "Other" &&
        checkedField.checked &&
        (checkedField.info = otherField)
    );
    console.log(checked);
    setCheckedFields(checked);
    console.log(inputQuestions);
    changePage();
    e.preventDefault();
  };

  return (
    <>
      <h1>{feedbackType.title}</h1>
      <Form className="maxw-none overflow-hidden">
        <CheckboxList
          feedbackCheckboxes={feedbackType.checkboxes}
          onCheck={(label) => onCheck(label)}
          setOtherField={setOtherField}
        />
        <TextboxList
          feedbackInputs={feedbackType.textInputs}
          setInputQuestions={setInputQuestions}
          inputQuestions={inputQuestions}
        />
        <ModuleButton
          buttonText={feedbackType.button}
          isRight
          onClick={onSubmit}
        />
      </Form>
    </>
  );
}

export default Screen2;
