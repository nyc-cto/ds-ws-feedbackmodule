import React, { useEffect, useState } from "react";
import { Form } from "@trussworks/react-uswds";

import Module from "../common/Module";
import CheckboxList from "../CheckboxList";
import TextboxList from "../TextboxList";
import ModuleButton from "../common/Button";

function Screen2({ feedbackType }) {
  const [checkedFields, setCheckedFields] = useState({});
  const [otherField, setOtherField] = useState("");
  const [inputQuestions, setInputQuestions] = useState({});

  useEffect(() => {
    let fields = {};

    feedbackType.checkboxes.map((label) => {
      fields = {
        ...fields,
        [label]: false,
      };
    });
    setCheckedFields(fields);
    let questions = {};
    feedbackType.textInputs.map((question) => {
      questions = {
        ...questions,
        [question]: "",
      };
    });
    setInputQuestions(questions);
  }, []);

  const onCheck = (label) => {
    let checked = checkedFields;
    checked[label] = !checked[label];
    setCheckedFields(checked);
  };

  const onSubmit = (e) => {
    let checked = checkedFields;
    checkedFields["Other"] &&
      (checked = {
        ...checked,
        OtherText: otherField,
      });
    console.log(checked);
    setCheckedFields(checked);
    console.log(inputQuestions);
    e.preventDefault();
  };

  return (
    <Module>
      <h1>{feedbackType.title}</h1>
      <Form className="maxw-none overflow-hidden">
        <CheckboxList
          feedbackType={feedbackType}
          onCheck={(label) => onCheck(label)}
          setOtherField={setOtherField}
        />
        <TextboxList
          feedbackType={feedbackType}
          setInputQuestions={setInputQuestions}
          inputQuestions={inputQuestions}
        />
        <ModuleButton
          buttonText={feedbackType.button}
          className="float-right margin-x-0"
          onClick={onSubmit}
        />
      </Form>
    </Module>
  );
}

export default Screen2;
