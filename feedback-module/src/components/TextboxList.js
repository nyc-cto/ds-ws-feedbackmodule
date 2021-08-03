import React from "react";
import { Grid } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

import Textbox from "./common/Textbox";
import ErrorAlert from "./common/ErrorAlert";

function TextboxList({
  inputs,
  inputQuestions,
  setInputQuestions,
  className,
  inputRefs,
}) {
  const { t } = useTranslation();

  // Curried onChange funtion: returns a new function binded with the index
  const onChange = (index) => {
    return ({ target }) => {
      let answers = inputQuestions;
      answers[index].answer = target.value;
      setInputQuestions(answers);
    };
  };

  const inputError = (input, id) => {
    let key;
    if (input.type === "tel") {
      key = "phoneError";
    } else if (input.type === "email") {
      key = "emailError";
    } else if (input.text === "Your name") {
      key = "nameError";
    } else if (input.type === "textarea" || input.type === "text") {
      key = "inputEmptyError";
    }
    if (!key) return;
    return (
      <ErrorAlert key={key} errorText={t(`errorMessages.${key}`)} id={id} />
    );
  };

  const isInvalid = (index) => {
    return (
      inputQuestions && inputQuestions[index] && inputQuestions[index].error
    );
  };

  const showErrors = (input, index) => {
    if (isInvalid(index)) {
      return inputError(input, `feedback-input-error-${index}`);
    }
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
              id={`feedback-input-${index}`}
              type={input.type}
              label={input.text}
              onChange={onChange(index)}
              required={input.required}
              invalid={isInvalid(index)}
              describedBy={`feedback-input-error-${index}`}
              inputRef={inputRefs[index]}
              showErrors={showErrors(input, index)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default TextboxList;
