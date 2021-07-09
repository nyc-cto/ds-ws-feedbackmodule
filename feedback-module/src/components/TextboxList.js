import React from "react";
import { Grid } from "@trussworks/react-uswds";

import Textbox from "./common/Textbox";

function TextboxList({ inputs, inputQuestions, setInputQuestions, className }) {
  const onChange = ({ target }) => {
    let answers = inputQuestions;
    answers[target.id].answer = target.value;
    setInputQuestions(answers);
  };

  return (
    <Grid>
      {inputs.map((input, index) => {
        return (
          <Grid
            col="fill"
            key={index}
            className={`${className} padding-y-2 mobile:padding-y-${
              input.type === "textarea" ? 4 : 3
            }`}
          >
            <Textbox
              id={index}
              type={input.type}
              label={input.text}
              onChange={onChange}
              required={input.required}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default TextboxList;
