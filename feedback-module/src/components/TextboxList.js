import React from "react";
import { Grid } from "@trussworks/react-uswds";

import Textbox from "./common/Textbox";

function TextboxList({ labels, inputQuestions, setInputQuestions, size }) {
  const onChange = ({ target }) => {
    let answers = inputQuestions;
    answers[target.id].answer = target.value;
    setInputQuestions(answers);
  };

  return (
    <Grid>
      {labels.map((label, index) => {
        return (
          <Grid col="fill" key={index}>
            <Textbox
              id={index}
              size={size}
              type="text"
              label={label}
              onChange={onChange}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default TextboxList;
