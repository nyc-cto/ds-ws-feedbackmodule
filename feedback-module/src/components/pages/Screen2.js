import React, { useEffect, useState } from "react";
import { Form } from "@trussworks/react-uswds";

import Module from "../common/Module";
import CheckboxList from "../CheckboxList";
import TextboxList from "../TextboxList";
import ModuleButton from "../common/Button";

function Screen2({ feedbackType }) {
  const [checkedFields, setCheckedFields] = useState({});

  useEffect(() => {
    let fields = {};
    feedbackType.checkboxes.map((label) => {
      fields = {
        ...fields,
        [label]: false,
      };
    });
    setCheckedFields(fields);
  }, []);

  const onCheck = (label) => {
    let checked = checkedFields;
    checked[label] = !checked[label];
    setCheckedFields(checked);
    console.log("hi");
  };

  return (
    <Module>
      <h1>{feedbackType.title}</h1>
      <Form className="maxw-none overflow-hidden">
        <CheckboxList feedbackType={feedbackType} onCheck={() => onCheck} />
        <TextboxList feedbackType={feedbackType} />
        <ModuleButton
          buttonText={feedbackType.button}
          className="float-right margin-x-0"
        />
      </Form>
    </Module>
  );
}

export default Screen2;
