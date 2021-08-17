import React, { useEffect, useState, useRef } from "react";
import { GridContainer, Grid, Form } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

import { SCREENS, INITIAL_SCREEN, ENDPOINTS } from "../lib/constants";
import requestService from "../services/requestService";
import googleAnalytics from "../lib/hooks/googleAnalytics";
import useCheckboxes from "../lib/hooks/useCheckboxes";
import useInputs from "../lib/hooks/useInputs";
import useForm from "../lib/hooks/useForm";
import Header from "./common/Header";
import ModuleButton from "./common/Button";
import CheckboxList from "./CheckboxList";
import TextboxList from "./TextboxList";
import ErrorAlert from "./common/ErrorAlert";
import LightContainer from "./LightContainer";
import LoadingSpinner from "./common/LoadingSpinner";

function Module({ pagetitle, endpoint, dir, theme }) {
  const [screen, setScreen] = useState(INITIAL_SCREEN);
  const { formData, setFormData, setSubmission } = useForm(screen);
  const [checkboxError, setCheckboxError] = useState(false);
  const [failedRequest, setFailedRequest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otherTooLong, setOtherTooLong] = useState(false);

  // Methods and variables for accessing the state of the checkbox fields
  const {
    checkedFields,
    onCheck,
    newScreenCheckboxes,
    checkboxValidated,
    updateOtherField,
    setOtherField,
    otherFieldValidated,
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

  const { trackFormAction, pageTitleAsScreen, pageChange, moduleOnScreen } =
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

  // requestInfo parses the user's info and returns the object that will be submitted to the Microsoft Flow endpoint
  const requestInfo = (formID, feedbackID, text, type) => {
    let submission;
    setSubmission(type, en(text), feedbackID, checkedFields, inputQuestions);
    trackFormAction(formID);

    if (ENDPOINTS.includes(formID)) {
      submission = {
        id: endpoint,
        [formID]: formData,
      };
    }
    console.log(submission);
    return submission;
  };

  //Check to see if there are any errors within the form the user tries to submit
  const formErrors = () => {
    return (
      (screen.textInputs && !inputsValidated()) ||
      (screen.checkboxes &&
        screen.checkboxes.required &&
        !checkboxValidated(checkedFields)) ||
      !otherFieldValidated()
    );
  };

  const submitForm = (nextScreen, type, feedbackID, text) => {
    setOtherTooLong(false);
    setCheckboxError(false);
    // Submit form data if this screen contains a form
    // Make sure all checkboxes are checked if they exist on this page
    // Make sure all required fields are completed and no inputs are over the character limit
    if (type === "submit" && formErrors()) {
      if (
        screen.checkboxes &&
        screen.checkboxes.required &&
        !checkboxValidated(checkedFields)
      ) {
        setCheckboxError(true);
        firstCheckRef.current && firstCheckRef.current.focus();
      } else if (!otherFieldValidated()) {
        setOtherTooLong(true);
      } else if (screen.textInputs && !inputsValidated()) {
        focusFirstError();
      }
      setFailedRequest(false);
    }
    //If all inputs are valid:
    else {
      updateOtherField();
      setCheckboxError(false);

      let currentPageTitle = en(screen.title)
        ? en(screen.title, { page: pagetitle })
        : en(screen.titleInverse, { page: pagetitle });
      let nextPageTitle = en(SCREENS[nextScreen].title)
        ? en(SCREENS[nextScreen].title, { page: pagetitle })
        : en(SCREENS[nextScreen].titleInverse, { page: pagetitle });

      pageTitleAsScreen(currentPageTitle);
      pageChange(currentPageTitle, nextPageTitle);

      const submissionObj = requestInfo(screen.formID, feedbackID, text, type);
      if (submissionObj) {
        setLoading(true);
        requestService(
          screen.formID,
          submissionObj,
          () => changeScreen(nextScreen),
          setFailedRequest,
          setLoading
        );
        type === "submit" && setFormData({});
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const changeScreen = (nextScreen) => {
    setScreen(SCREENS[nextScreen]);
    headerRef.current.scrollIntoView(true);
  };

  const handleClick = (type, text, nextScreen, feedbackID) => {
    // If button contains a feedbackID, update the feedbackType of the feedback object
    if (screen.formID) {
      submitForm(nextScreen, type, feedbackID, text);
    } else {
      changeScreen(nextScreen);
      setCheckboxError(false);
      setOtherTooLong(false);

      let currentPageTitle = en(screen.title)
        ? en(screen.title, { page: pagetitle })
        : en(screen.titleInverse, { page: pagetitle });
      let nextPageTitle = en(SCREENS[nextScreen].title)
        ? en(SCREENS[nextScreen].title, { page: pagetitle })
        : en(SCREENS[nextScreen].titleInverse, { page: pagetitle });

      pageTitleAsScreen(currentPageTitle);
      pageChange(currentPageTitle, nextPageTitle);
    }
  };

  return (
    <div ref={moduleVisibleRef} className={theme}>
      <div className="feedback-widget">
        <GridContainer
          desktop={{ col: 2 }}
          mobile={{ col: "fill" }}
          dir={dir}
          className="feedback-module"
        >
          {moduleOnScreen(moduleVisibleRef)}
          <Header innerRef={headerRef} />

          {screen.titleInverse && (
            <Grid
              className={"feedback-module__main feedback-module__main--inverse"}
            >
              <p
                className="font-sans-md2 feedback-module__heading feedback-module__heading--inverse"
                dangerouslySetInnerHTML={{ __html: t(screen.titleInverse) }}
              ></p>
            </Grid>
          )}

          <LightContainer formID={screen.formID}>
            {loading && <LoadingSpinner overlay />}
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
                    <ErrorAlert errorText={t("errorMessages.checkboxError")} />
                  )}
                  <CheckboxList
                    feedbackCheckboxes={t(screen.checkboxes.labels)}
                    onCheck={(index) => onCheck(index)}
                    setOtherField={setOtherField}
                    checkboxKey={screen.checkboxes.labels}
                    firstCheckRef={firstCheckRef}
                    checkedFields={checkedFields}
                    otherTooLong={otherTooLong}
                    setOtherTooLong={setOtherTooLong}
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
                        className={`flex-button flex-button--${type}`}
                        networkError={
                          failedRequest && index === screen.buttons.length - 1
                        }
                        onClick={() =>
                          handleClick(type, text, nextScreen, feedbackID)
                        }
                        key={index}
                        type={type}
                      />
                    );
                  }
                )}
            </Form>
          </LightContainer>
        </GridContainer>
      </div>
    </div>
  );
}

export default Module;
