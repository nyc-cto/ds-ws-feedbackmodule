import React, { useEffect, useState } from "react";
import { GridContainer, Grid, Form } from "@trussworks/react-uswds";

import {
  MODULE_CONTAINER_STYLE,
  SCREEN_CONTAINER_STYLE,
  H1_STYLE,
  H1_WHITE_STYLE,
  FORM_STYLE,
} from "../../assets/styling_classnames";
import { SCREENS } from "../../assets/constants";
import Header from "./Header";
import ModuleButton from "./Button";
import CheckboxList from "../CheckboxList";
import TextboxList from "../TextboxList";

function Module() {
  const [feedback, setFeedback] = useState({});
  const [screen, setScreen] = useState(SCREENS.feedback_type);
  const [checkedFields, setCheckedFields] = useState(null);
  const [otherField, setOtherField] = useState("");
  const [inputQuestions, setInputQuestions] = useState();

  useEffect(() => {
    if (screen.checkboxes) {
      setCheckedFields(
        screen.checkboxes.map((checkboxLabel) => {
          return { label: checkboxLabel, checked: false };
        })
      );
    }
    if (screen.textInputs) {
      setInputQuestions(
        screen.textInputs.map((question) => {
          return { question: question, answer: "" };
        })
      );
    }
    console.log(feedback);
  }, [screen]);

  const handleSubmit = (formID) => {
    const checkedOptions =
      checkedFields &&
      checkedFields.map(({ label, checked }) => {
        return {
          checked: checked,
          label: label === "Other" && checked ? `Other: ${otherField}` : label,
        };
      });
    setCheckedFields(checkedOptions);
    if (formID === "feedback") {
      setFeedback((feedback) => {
        feedback.checkedOptions = checkedOptions
          .filter(({ checked }) => checked)
          .map(({ label }) => label);
        feedback.inputResponses = inputQuestions;
        return feedback;
      });
    }
  };

  const changeScreen = (text, nextScreen, feedbackID, type) => {
    if (feedbackID) {
      setFeedback((feedback) => {
        feedback.feedbackType = {
          label: text,
          feedbackID: feedbackID,
        };
        return feedback;
      });
    }
    if (type === "submit" && screen.formID) {
      handleSubmit(screen.formID);
    }
    setScreen(SCREENS[nextScreen]);
  };

  const onCheck = (index) => {
    let checked = checkedFields;
    checked[index].checked = !checked[index].checked;
    setCheckedFields(checked);
  };

  return (
    <GridContainer
      desktop={{ col: 2 }}
      mobile={{ col: "fill" }}
      className={MODULE_CONTAINER_STYLE}
    >
      <Header />
      {screen.titleInverse && (
        <Grid className={`bg-primary ${SCREEN_CONTAINER_STYLE}`}>
          <p
            className={`${H1_WHITE_STYLE}`}
            dangerouslySetInnerHTML={{ __html: screen.titleInverse }}
          ></p>
        </Grid>
      )}
      {screen.buttons && (
        <Grid className={SCREEN_CONTAINER_STYLE}>
          {screen.title && <p className={H1_STYLE}>{screen.title}</p>}
          {screen.plainText && (
            <p dangerouslySetInnerHTML={{ __html: screen.plainText }}></p>
          )}
          <Form className={FORM_STYLE} onSubmit={(e) => e.preventDefault()}>
            {screen.checkboxes && (
              <CheckboxList
                feedbackCheckboxes={screen.checkboxes}
                onCheck={(index) => onCheck(index)}
                setOtherField={setOtherField}
              />
            )}
            {screen.textInputs && (
              <TextboxList
                inputs={screen.textInputs}
                setInputQuestions={setInputQuestions}
                inputQuestions={inputQuestions}
              />
            )}
            {screen.buttons.map(
              ({ type, text, nextScreen, feedbackID }, index) => {
                return (
                  <ModuleButton
                    buttonText={text}
                    isRight={type !== "form"}
                    onClick={() =>
                      changeScreen(text, nextScreen, feedbackID, type)
                    }
                    key={index}
                  />
                );
              }
            )}
          </Form>
        </Grid>
      )}
    </GridContainer>
  );
}

export default Module;
