/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { GridContainer, Grid, Form } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";
import axios from "axios";

import {
  MODULE_CONTAINER_STYLE,
  SCREEN_CONTAINER_STYLE,
  H1_DARK_STYLE,
  H1_WHITE_STYLE,
  FORM_STYLE,
  PLAINTEXT_STYLE,
} from "../assets/styling_classnames";
import { SCREENS } from "../assets/constants";
import Header from "./common/Header";
import ModuleButton from "./common/Button";
import CheckboxList from "./CheckboxList";
import TextboxList from "./TextboxList";
import ErrorAlert from "./common/ErrorAlert";

const env = "http://localhost:8000";
// const env = "fm-backend-stub";

function LightContainer({ children, formID }) {
  const isChildNull = (children) => {
    /* returns true if there are no elements outside of the form element
       and the form is empty */
    return !(React.Children.toArray(children).length > 1 || formID);
  };
  return isChildNull(children) ? (
    children
  ) : (
    <Grid className={SCREEN_CONTAINER_STYLE}>{children}</Grid>
  );
}

function Module({ pageTitle, endpoint }) {
  const [feedbackForAPI, setFeedbackForAPI] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [screen, setScreen] = useState(SCREENS.feedback_type);
  const [checkedFields, setCheckedFields] = useState(null);
  const [otherField, setOtherField] = useState("");
  const [inputQuestions, setInputQuestions] = useState();
  const [checkboxError, setCheckboxError] = useState(false);

  const { t, i18n } = useTranslation();
  const en = i18n.getFixedT("en");

  const sendRequest = (apiEndpoint, obj) => {
    axios
      .post(`${env}/api/${apiEndpoint}`, obj)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Updates the checkboxes based on the new screen
    screen.checkboxes &&
      t(screen.checkboxes.labels) &&
      setCheckedFields(
        en(screen.checkboxes.labels).map((label) => {
          return { label: label, checked: false };
        })
      );

    // Updates the text inputs based on the new screen
    t(screen.textInputs) &&
      setInputQuestions(
        en(screen.textInputs).map((question) => {
          return {
            question: question.text,
            answer: "",
            required: question.required,
            error: false,
          };
        })
      );
    console.log(userInfo);
  }, [screen]);

  // updateFormData determines which form data state to update, based on the formID
  const updateFormData = (formID) => {
    if (formID === "feedback") {
      /* if formID is feedback, sets checkedOptions and inputResponses 
         in the feedbackForAPI object */
      let feedback = feedbackForAPI;
      /* filters checkedOptions for the fields that are checked,
           then returns only the label property */
      feedback.checkedOptions = checkedFields
        ? checkedFields
            .filter(({ checked }) => checked)
            .map(({ label }) => label)
        : [];
      feedback.inputResponses = inputQuestions.map(({ question, answer }) => {
        return { question: question, answer: answer };
      });
      feedback.source = window.location.href;
      setFeedbackForAPI(feedback);
      sendRequest("feedback", {
        id: endpoint,
        feedback: feedbackForAPI,
      });
      console.log(feedbackForAPI);
    } else if (formID === "research") {
      let userObj = userInfo;
      inputQuestions.forEach(({ question, answer }) => {
        userObj[question] = answer;
      });
      userObj.source = window.location.href;
      userObj.id = endpoint;
      setUserInfo(userObj);
      sendRequest("userinfo", userObj);
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

  //Checks if at least one checkbox was checked - returns true if yes false if no
  const checkboxValidated = () => {
    return checkedFields.some((field) => field.checked);
  };

  //Checks if all the required fields have been completed - returns true if yes false if no
  const inputsValidated = () => {
    let validated = true;
    let questions = inputQuestions.map((question) => {
      if (question.required && question.answer === "") {
        (question.error = true), (validated = false);
      } else {
        question.error = false;
      }
      return question;
    });
    setInputQuestions(questions);
    return validated;
  };

  const handleSubmit = () => {
    setCheckedFields(checkedFields && updateOtherField(checkedFields));
    updateFormData(screen.formID);
  };

  const handleSend = (e) => {
    e.preventDefault();
  };

  const changeScreen = (text, nextScreen, feedbackID) => {
    // If button contains a feedbackID, update the feedbackType of the feedback object
    if (feedbackID) {
      setFeedbackForAPI((feedback) => {
        feedback.feedbackType = {
          label: en(text),
          feedbackID: feedbackID,
        };
        return feedback;
      });
    }

    // Submit form data if this screen contains a form
    // Make sure all checkboxes are checked if they exist on this page
    if (
      screen.checkboxes &&
      screen.checkboxes.required &&
      !checkboxValidated()
    ) {
      setCheckboxError(true);
      // Make sure all required fields are completed
    } else if (!(screen.textInputs && !inputsValidated())) {
      screen.formID && handleSubmit(),
        setScreen(SCREENS[nextScreen]),
        setCheckboxError(false);
    }
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
            dangerouslySetInnerHTML={{ __html: t(screen.titleInverse) }}
          ></p>
        </Grid>
      )}
      {
        <LightContainer formID={screen.formID}>
          {screen.title && (
            <p className={H1_DARK_STYLE}>
              {`${t(screen.title, { page: pageTitle })}${
                screen.checkboxes && screen.checkboxes.required ? "*" : ""
              }`}
            </p>
          )}
          {screen.plainText && (
            <p
              className={PLAINTEXT_STYLE}
              dangerouslySetInnerHTML={{ __html: t(screen.plainText) }}
            ></p>
          )}
          <Form className={FORM_STYLE} onSubmit={handleSend}>
            {screen.checkboxes && t(screen.checkboxes.labels) && (
              <>
                {checkboxError && (
                  <ErrorAlert errorText={t("errorMessages.checkboxError")} />
                )}
                <CheckboxList
                  feedbackCheckboxes={t(screen.checkboxes.labels)}
                  onCheck={(index) => onCheck(index)}
                  setOtherField={setOtherField}
                  checkboxKey={screen.checkboxes.labels}
                />
              </>
            )}
            {screen.textInputs && t(screen.textInputs) && (
              <TextboxList
                inputs={t(screen.textInputs)}
                setInputQuestions={setInputQuestions}
                inputQuestions={inputQuestions}
              />
            )}
            {screen.buttons &&
              screen.buttons.map(
                ({ type, text, nextScreen, feedbackID }, index) => {
                  return (
                    <ModuleButton
                      buttonText={t(text)}
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
