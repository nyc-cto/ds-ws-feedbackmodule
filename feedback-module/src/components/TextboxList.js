import React from "react";
import { Grid } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

import Textbox from "./common/Textbox";
import ErrorAlert from "./common/ErrorAlert";

function TextboxList({ inputs, inputQuestions, setInputQuestions, className }) {
  const { t } = useTranslation();

  const onChange = ({ target }) => {
    let answers = inputQuestions;
    answers[target.id].answer = target.value;
    setInputQuestions(answers);
  };

  const phoneEmailError = () => {
    return (
      <ErrorAlert
        key="phoneEmailError"
        errorText={t("errorMessages.emailPhoneError")}
      />
    );
  };

  const nameError = () => {
    return (
      <ErrorAlert key="nameError" errorText={t("errorMessages.nameError")} />
    );
  };

  const textError = () => {
    return (
      <ErrorAlert
        key="textError"
        errorText={t("errorMessages.inputEmptyError")}
      />
    );
  };

  const showErrors = (input, index) => {
    if (
      inputQuestions &&
      inputQuestions[index] &&
      inputQuestions[index].error
    ) {
      if (input.type === "tel" || input.type === "email") {
        return phoneEmailError();
      } else if (input.text === "Your name") {
        return nameError();
      } else if (input.type === "textarea" || input.type === "text") {
        return textError();
      }
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
            {showErrors(input, index)}
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
