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

const LightContainer = ({ children }) => {
  const isChildNull = (children) => {
    return React.Children.toArray(children).length <= 1;
  };
  const isNull = isChildNull(children);
  if (isNull) {
    return children;
  }
  return <Grid className={SCREEN_CONTAINER_STYLE}>{children}</Grid>;
};

function Module() {
  const [feedbackForAPI, setFeedbackForAPI] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [screen, setScreen] = useState(SCREENS.feedback_type);
  const [checkedFields, setCheckedFields] = useState(null);
  const [otherField, setOtherField] = useState("");
  const [inputQuestions, setInputQuestions] = useState();
  // const [hasChildren, setHasChildren] = useState(true);

  useEffect(() => {
    // Updates the checkboxes based on the new screen
    screen.checkboxes &&
      setCheckedFields(
        screen.checkboxes.map((checkboxLabel) => {
          return { label: checkboxLabel, checked: false };
        })
      );

    // Updates the text inputs based on the new screen
    screen.textInputs &&
      setInputQuestions(
        screen.textInputs.map((question) => {
          return { question: question.text, answer: "" };
        })
      );

    // TODO: after merging with dev, this will send data to backend instead of just console.log
    console.log(feedbackForAPI);
    console.log(userInfo);
  }, [screen]);

  // updateFormData determines which form data state to update, based on the formID
  const updateFormData = (formID) => {
    if (formID === "feedback") {
      /* if formID is feedback, sets checkedOptions and inputResponses 
         in the feedbackForAPI object */
      setFeedbackForAPI((feedback) => {
        /* filters checkedOptions for the fields that are checked,
           then returns only the label property */
        checkedFields &&
          (feedback.checkedOptions = checkedFields
            .filter(({ checked }) => checked)
            .map(({ label }) => label));
        feedback.inputResponses = inputQuestions;
        return feedback;
      });
    } else if (formID === "research") {
      setUserInfo(inputQuestions);
    }
  };

  // Updates the label to "Other: <user-input other content>" if other field is checked
  const updateOtherField = (checkedFields) => {
    checkedFields.forEach((field) => {
      field.label === "Other" &&
        field.checked &&
        (field.label = `Other: ${otherField}`);
    });

    return checkedFields;
  };

  const handleSubmit = () => {
    setCheckedFields(checkedFields && updateOtherField(checkedFields));
    updateFormData(screen.formID);
  };

  const changeScreen = (text, nextScreen, feedbackID) => {
    // If button contains a feedbackID, update the feedbackType of the feedback object
    if (feedbackID) {
      setFeedbackForAPI((feedback) => {
        feedback.feedbackType = {
          label: text,
          feedbackID: feedbackID,
        };
        return feedback;
      });
    }

    // Submit form data if this screen contains a form
    screen.formID && handleSubmit();
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
      {
        <LightContainer>
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
            {screen.buttons &&
              screen.buttons.map(
                ({ type, text, nextScreen, feedbackID }, index) => {
                  return (
                    <ModuleButton
                      buttonText={text}
                      isRight={type === "submit"}
                      onClick={() => changeScreen(text, nextScreen, feedbackID)}
                      key={index}
                    />
                  );
                }
              )}
          </Form>
        </LightContainer>
      }
    </GridContainer>
  );
}

export default Module;
