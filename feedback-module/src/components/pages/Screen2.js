import React, { useEffect, useState } from "react";
import { Form } from "@trussworks/react-uswds";

import CheckboxList from "../CheckboxList";
import TextboxList from "../TextboxList";
import ModuleButton from "../common/Button";

function Screen2({ feedbackType, changeScreen }) {
  const [checkedFields, setCheckedFields] = useState([]);
  const [otherField, setOtherField] = useState("");
  const [inputQuestions, setInputQuestions] = useState([]);

  useEffect(() => {
    let checkedField = {};
    let checkboxesArray = [];

    feedbackType.checkboxes.map((checkboxLabel) => {
      checkedField = {
        label: checkboxLabel,
        checked: false,
      };
      checkboxesArray.push(checkedField);
    });
    setCheckedFields(checkboxesArray);

    let questionObject = {};
    let questionsArray = [];
    feedbackType.textInputs.map((question) => {
      questionObject = {
        question: question,
        answer: "",
      };
      questionsArray.push(questionObject);
    });
    setInputQuestions(questionsArray);
  }, []);

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
        checked.push({
          label: "Other text",
          info: otherField,
        })
    );
    console.log(checked);
    setCheckedFields(checked);
    console.log(inputQuestions);
    e.preventDefault();
    changeScreen();
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
          className="float-right margin-x-0"
          onClick={onSubmit}
        />
      </Form>
    </>
  );
}

export default Screen2;
