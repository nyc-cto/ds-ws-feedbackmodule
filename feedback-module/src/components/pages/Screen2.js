import React, { useEffect, useState } from "react";
import { Form } from "@trussworks/react-uswds";

import Module from "../common/Module";
import CheckboxList from "../CheckboxList";
import TextboxList from "../TextboxList";
import ModuleButton from "../common/Button";

function Screen2({ feedbackType }) {
  const [checkedFields, setCheckedFields] = useState([]);

  useEffect(() => {
    console.log(checkedFields);
  }, [checkedFields]);

  return (
    <Module>
      <h1>{feedbackType.title}</h1>
      <Form className="maxw-none overflow-hidden">
        <CheckboxList
          feedbackType={feedbackType}
          setCheckedFields={setCheckedFields}
        />
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
