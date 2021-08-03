import React, { useEffect, useState, useRef } from "react";
import { GridContainer, Grid, Form } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

import {
  MODULE_CONTAINER_STYLE,
  SCREEN_CONTAINER_STYLE,
  H1_DARK_STYLE,
  H1_WHITE_STYLE,
  FORM_STYLE,
  PLAINTEXT_STYLE,
} from "../assets/styling_classnames";
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
  const [failedRequest, setFailedRequest] = useState(false);
  const [loading, setLoading] = useState(false);

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

      console.log(feedbackForAPI);

      return requestService("feedback", {
        id: endpoint,
        feedback: feedbackForAPI,
      });
    } else if (formID === "research") {
      trackFutureResearch();
      updateUserInfo(processUserInfo, [inputQuestions, endpoint]);
      console.log(userInfo);
      return requestService("userResearch", userInfo);
    }
  };

  const submitForm = async (nextScreen) => {
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

      setLoading(true);
      await sendFormData(screen.formID).then((res) => {
        console.log(res);
        //a failed request to API
        if (res === "failure") {
          setFailedRequest(true);
          setLoading(false);
        }
        //a successful request to API
        else {
          setScreen(SCREENS[nextScreen]),
            setCheckboxError(false),
            setFailedRequest(false);
          setLoading(false);
        }
      });
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
        className={MODULE_CONTAINER_STYLE}
        dir={dir}
      >
        {moduleOnScreen(moduleVisibleRef)}
        <Header innerRef={headerRef} />

        {screen.titleInverse && (
          <Grid className={`bg-primary ${SCREEN_CONTAINER_STYLE}`}>
            <p
              className={`${H1_WHITE_STYLE} ${dir === "rtl" && "text-right"}`}
              dangerouslySetInnerHTML={{ __html: t(screen.titleInverse) }}
            ></p>
          </Grid>
        )}
        {loading ? (
          <LightContainer>
            {/* will replace this <p></p> with loading spinner once merged in */}
            <p>Network Call Loading</p>
          </LightContainer>
        ) : (
          <LightContainer formID={screen.formID}>
            {screen.title && (
              <p
                className={`${H1_DARK_STYLE} ${dir === "rtl" && "text-right"}`}
              >
                {`${t(screen.title, { page: pagetitle })}${
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
            <Form className={FORM_STYLE} onSubmit={handleSubmit}>
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
                    checkedFields={checkedFields}
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
                        isRight={type === "submit"}
                        dir={dir}
                        networkError={failedRequest}
                        className={dir === "rtl" ? "text-right" : ""}
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
        )}
      </GridContainer>
    </div>
  );
}

export default Module;
