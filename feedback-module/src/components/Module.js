/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { GridContainer, Grid, Form } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

import {
  MODULE_CONTAINER_STYLE,
  SCREEN_CONTAINER_STYLE,
  H1_STYLE,
  H1_WHITE_STYLE,
  FORM_STYLE,
} from "../assets/styling_classnames";
import { SCREENS } from "../assets/constants";
import Header from "./common/Header";
import ModuleButton from "./common/Button";
import CheckboxList from "./CheckboxList";
import TextboxList from "./TextboxList";

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

function Module({ pageTitle }) {
  const [feedbackForAPI, setFeedbackForAPI] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [screen, setScreen] = useState(SCREENS.feedback_type);
  const [checkedFields, setCheckedFields] = useState(null);
  const [otherField, setOtherField] = useState("");
  const [inputQuestions, setInputQuestions] = useState();

  const { t } = useTranslation();
  // const en = i18next.getFixedT('en');

  useEffect(() => {
    // Updates the checkboxes based on the new screen
    t(screen.checkboxes) &&
      setCheckedFields(
        t(screen.checkboxes).map((checkboxLabel) => {
          return { label: checkboxLabel, checked: false };
        })
        // en(screen.checkboxes).map(label => {
        //   return { label: label, checked: false };
        // })
      );

    // Updates the text inputs based on the new screen
    t(screen.textInputs) &&
      setInputQuestions(
        t(screen.textInputs).map((question) => {
          return { question: question.text, answer: "" };
        })
        // en(screen.textInputs).map(label => {
        //   return { question: question.text, answer: "" };
        // })
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
  // TODO: possible delete this method
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
    setCheckedFields((checked) => {
      checked[index].checked = !checked[index].checked;
      return checked;
    });
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
            <p className={H1_STYLE}>{t(screen.title, { page: pageTitle })}</p>
          )}
          {screen.plainText && (
            <p dangerouslySetInnerHTML={{ __html: t(screen.plainText) }}></p>
          )}
          <Form className={FORM_STYLE} onSubmit={(e) => e.preventDefault()}>
            {screen.checkboxes && (
              <CheckboxList
                feedbackCheckboxes={t(screen.checkboxes)}
                onCheck={(index) => onCheck(index)}
                setOtherField={setOtherField}
              />
            )}
            {screen.textInputs && (
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
