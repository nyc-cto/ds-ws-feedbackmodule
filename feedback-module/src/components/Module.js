import React, { useEffect, useState, useRef } from "react";
import { GridContainer, Grid, Form } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

import { SCREENS, INITIAL_SCREEN } from "../lib/constants";
import requestService from "../services/requestService";
import googleAnalytics from "../lib/hooks/googleAnalytics";
import useCheckboxes from "../lib/hooks/useCheckboxes";
import useInputs from "../lib/hooks/useInputs";
import useForm from "../lib/hooks/useForm";
import {
  setFeedbackType,
  processFeedback,
  processUserInfo,
} from "../lib/utils/formUtil";
import Header from "./common/Header";
import ModuleButton from "./common/Button";
import CheckboxList from "./CheckboxList";
import TextboxList from "./TextboxList";
import ErrorAlert from "./common/ErrorAlert";
import LightContainer from "./LightContainer";

function Module({ pagetitle, endpoint, dir }) {
  const [feedbackForAPI, updateFeedbackForAPI] = useForm({});
  const [userInfo, updateUserInfo] = useForm({});
  const [screen, setScreen] = useState(INITIAL_SCREEN);
  const [checkboxError, setCheckboxError] = useState(false);

  // Methods and variables for accessing the state of the checkbox fields
  const {
    checkedFields,
    onCheck,
    newScreenCheckboxes,
    checkboxValidated,
    updateOtherField,
    setOtherField,
  } = useCheckboxes();

  const headerRef = useRef(null);
  const firstCheckRef = useRef(null);

  // Methods and variables for accessing the state of the input fields
  const {
    inputQuestions,
    setInputQuestions,
    newScreenInputs,
    inputsValidated,
    focusFirstError,
    inputRefs,
  } = useInputs(firstCheckRef);

  const { t, i18n } = useTranslation();
  const en = i18n.getFixedT("en");

  const { trackFutureResearch, pageTitleAsScreen, pageChange, moduleOnScreen } =
    googleAnalytics();

  const moduleVisibleRef = useRef();

  useEffect(() => {
    // Updates the checkboxes based on the new screen
    newScreenCheckboxes(screen.checkboxes);
    newScreenInputs(screen.textInputs);

    if (firstCheckRef.current) {
      firstCheckRef.current.focus();
    }
  }, [screen]);

  // sendFormData determines which form data state to update, based on the formID
  const sendFormData = (formID) => {
    if (formID === "feedback") {
      updateFeedbackForAPI(processFeedback, [checkedFields, inputQuestions]);
      requestService("feedback", {
        id: endpoint,
        feedback: feedbackForAPI,
      });
      console.log(feedbackForAPI);
    } else if (formID === "research") {
      trackFutureResearch();
      updateUserInfo(processUserInfo, [inputQuestions, endpoint]);
      requestService("userResearch", userInfo);
      console.log(userInfo);
    }
  };

  const submitForm = (nextScreen) => {
    // Submit form data if this screen contains a form
    // Make sure all checkboxes are checked if they exist on this page
    if (
      screen.checkboxes &&
      screen.checkboxes.required &&
      !checkboxValidated(checkedFields)
    ) {
      setCheckboxError(true);
      firstCheckRef.current && firstCheckRef.current.focus();
      // Make sure all required fields are completed
    } else if (screen.textInputs && !inputsValidated()) {
      focusFirstError();
    } else {
      updateOtherField();

      let currentPageTitle = en(screen.title)
        ? en(screen.title, { page: pagetitle })
        : en(screen.titleInverse, { page: pagetitle });
      let nextPageTitle = en(SCREENS[nextScreen].title)
        ? en(SCREENS[nextScreen].title, { page: pagetitle })
        : en(SCREENS[nextScreen].titleInverse, { page: pagetitle });

      pageTitleAsScreen(currentPageTitle);
      pageChange(currentPageTitle, nextPageTitle);

      sendFormData(screen.formID),
        setScreen(SCREENS[nextScreen]),
        setCheckboxError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const changeScreen = (text, nextScreen, feedbackID) => {
    // If button contains a feedbackID, update the feedbackType of the feedback object
    if (screen.formID) {
      submitForm(nextScreen);
    } else {
      feedbackID &&
        updateFeedbackForAPI(setFeedbackType, [en(text), feedbackID]);
      setScreen(SCREENS[nextScreen]);
      setCheckboxError(false);

      let currentPageTitle = en(screen.title)
        ? en(screen.title, { page: pagetitle })
        : en(screen.titleInverse, { page: pagetitle });
      let nextPageTitle = en(SCREENS[nextScreen].title)
        ? en(SCREENS[nextScreen].title, { page: pagetitle })
        : en(SCREENS[nextScreen].titleInverse, { page: pagetitle });

      pageTitleAsScreen(currentPageTitle);
      pageChange(currentPageTitle, nextPageTitle);
    }

    headerRef.current.scrollIntoView(true);
  };

  return (
    <div ref={moduleVisibleRef}>
      <GridContainer
        desktop={{ col: 2 }}
        mobile={{ col: "fill" }}
        className="feedback-module"
        dir={dir}
      >
        {moduleOnScreen(moduleVisibleRef)}
        <Header innerRef={headerRef} />
        {screen.titleInverse && (
          <Grid className={"bg-primary feedback-module__main"}>
            <p
              className="font-sans-md2 feedback-module__heading feedback-module__heading--inverse"
              dangerouslySetInnerHTML={{ __html: t(screen.titleInverse) }}
            ></p>
          </Grid>
        )}
        {
          <LightContainer formID={screen.formID}>
            {screen.title && (
              <p className="font-sans-md2 feedback-module__heading feedback-module__heading--default">
                {`${t(screen.title, { page: pagetitle })}${
                  screen.checkboxes && screen.checkboxes.required ? "*" : ""
                }`}
              </p>
            )}
            {screen.plainText &&
              t(screen.plainText) &&
              t(screen.plainText).map((paragraph, index) => {
                return (
                  <p
                    className="font-sans-md feedback-module__plaintext"
                    key={index}
                  >
                    {paragraph}
                  </p>
                );
              })}
            <Form onSubmit={handleSubmit}>
              {screen.checkboxes && t(screen.checkboxes.labels) && (
                <>
                  {checkboxError && (
                    <ErrorAlert
                      errorText={t("errorMessages.checkboxError")}
                      dir={dir}
                    />
                  )}
                  <CheckboxList
                    feedbackCheckboxes={t(screen.checkboxes.labels)}
                    onCheck={(index) => onCheck(index)}
                    setOtherField={setOtherField}
                    checkboxKey={screen.checkboxes.labels}
                    firstCheckRef={firstCheckRef}
                  />
                </>
              )}
              {screen.textInputs && t(screen.textInputs) && (
                <TextboxList
                  inputs={t(screen.textInputs)}
                  setInputQuestions={setInputQuestions}
                  inputQuestions={inputQuestions}
                  inputRefs={inputRefs}
                />
              )}
              {screen.buttons &&
                screen.buttons.map(
                  ({ type, text, nextScreen, feedbackID }, index) => {
                    return (
                      <ModuleButton
                        buttonText={t(text)}
                        className={`usa-button--${type}`}
                        onClick={() =>
                          changeScreen(text, nextScreen, feedbackID)
                        }
                        key={index}
                      />
                    );
                  }
                )}
            </Form>
          </LightContainer>
        }
      </GridContainer>
    </div>
  );
}

export default Module;
