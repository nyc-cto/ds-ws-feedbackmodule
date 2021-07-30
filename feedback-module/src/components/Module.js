/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, createRef } from "react";
import { GridContainer, Grid, Form } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";
import { useGA4React } from "ga-4-react";

import {
  MODULE_CONTAINER_STYLE,
  SCREEN_CONTAINER_STYLE,
  H1_DARK_STYLE,
  H1_WHITE_STYLE,
  FORM_STYLE,
  PLAINTEXT_STYLE,
} from "../assets/styling_classnames";
import { SCREENS, INITIAL_SCREEN } from "../assets/constants";
import requestService from "../services/requestService";
import {
  trackFutureResearch,
  pageTitleAsScreen,
  pageChange,
  userViewedModule,
} from "../lib/utils/googleAnalytics";
import Header from "./common/Header";
import ModuleButton from "./common/Button";
import CheckboxList from "./CheckboxList";
import TextboxList from "./TextboxList";
import ErrorAlert from "./common/ErrorAlert";
import LightContainer from "./LightContainer";

import moduleOnScreen from "../lib/hooks/moduleOnScreen";

function Module({ pageTitle, endpoint, dir }) {
  const [feedbackForAPI, setFeedbackForAPI] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [screen, setScreen] = useState(INITIAL_SCREEN);
  const [checkedFields, setCheckedFields] = useState(null);
  const [otherField, setOtherField] = useState("");
  const [inputQuestions, setInputQuestions] = useState();
  const [checkboxError, setCheckboxError] = useState(false);
  const [inputRefs, setInputRefs] = useState([]);
  const [userViewed, setUserViewed] = useState(false);

  const headerRef = useRef(null);
  const firstCheckRef = useRef(null);

  const { t, i18n } = useTranslation();
  const en = i18n.getFixedT("en");

  const ga = useGA4React();

  const ref = useRef();
  const isVisible = moduleOnScreen(ref);

  useEffect(() => {
    // Updates the checkboxes based on the new screen
    screen.checkboxes &&
      t(screen.checkboxes.labels) &&
      setCheckedFields(
        en(screen.checkboxes.labels).map((label) => {
          return { label: label, checked: false };
        })
      );

    let refList = [];
    // Updates the text inputs based on the new screen
    t(screen.textInputs) &&
      setInputQuestions(
        en(screen.textInputs).map((question) => {
          refList.push(createRef(null));
          return {
            question: question.text,
            answer: "",
            required: question.required,
            error: false,
            type: question.type,
          };
        })
      );
    setInputRefs(refList);

    if (firstCheckRef.current) {
      firstCheckRef.current.focus();
    }
  }, [screen]);

  useEffect(() => {
    if (!firstCheckRef.current && inputRefs.length > 0) {
      inputRefs[0].current.focus();
    }
  }, [inputRefs]);

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
      requestService("feedback", {
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
      console.log(userInfo);
      requestService("userResearch", userObj);

      //Send event to google analytics that the user agreed to sign up for future research
      ga && trackFutureResearch(ga);
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

  //Check if valid email address
  const invalidEmail = (email, required) => {
    const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!required && email === "") {
      return false;
    }
    return !re.test(email);
  };

  const invalidPhone = (phone, required) => {
    const reUS = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    //Commenting this out because probably won't accept interntional phone numbers
    //But keeping just in case:
    // const reInternational = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    if (!required && phone === "") {
      return false;
    }
    return !reUS.test(phone);
  };

  //Checks if all the required fields have been completed - returns true if yes false if no
  const inputsValidated = () => {
    let validated = true;
    let questions = inputQuestions.map((question) => {
      if (question.required && question.answer === "") {
        (validated = false), (question.error = true);
      } else if (
        question.type === "email" &&
        invalidEmail(question.answer, question.required)
      ) {
        (validated = false), (question.error = true);
      } else if (
        question.type === "tel" &&
        invalidPhone(question.answer, question.required)
      ) {
        (validated = false), (question.error = true);
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
    //adds the screen title as the page title
    ga && pageTitleAsScreen(ga, t(screen.title));

    //triggers a new event called page_change that shares your current page and next page
    ga && pageChange(ga, t(screen.title), t(SCREENS[nextScreen].title));

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
      firstCheckRef.current && firstCheckRef.current.focus();
      // Make sure all required fields are completed
    } else if (screen.textInputs && !inputsValidated()) {
      const firstErrorIndex = inputQuestions.findIndex(
        (question) => question.error
      );
      if (firstErrorIndex >= 0 && inputRefs[firstErrorIndex].current) {
        inputRefs[firstErrorIndex].current.focus();
      }
    } else {
      screen.formID && handleSubmit(),
        setScreen(SCREENS[nextScreen]),
        setCheckboxError(false);
    }
    headerRef.current.scrollIntoView(true);
  };

  const onCheck = (index) => {
    let checked = checkedFields;
    checked[index].checked = !checked[index].checked;
    setCheckedFields(checked);
  };

  const checkVisible = () => {
    if (isVisible) {
      console.log("module in view");
      setUserViewed(true);
      ga && userViewedModule(ga);
    }
  };

  return (
    <div ref={ref}>
      <GridContainer
        desktop={{ col: 2 }}
        mobile={{ col: "fill" }}
        className={MODULE_CONTAINER_STYLE}
        dir={dir}
      >
        {!userViewed && checkVisible()}
        <Header innerRef={headerRef} />
        {screen.titleInverse && (
          <Grid className={`bg-primary ${SCREEN_CONTAINER_STYLE}`}>
            <p
              className={`${H1_WHITE_STYLE} ${dir === "rtl" && "text-right"}`}
              dangerouslySetInnerHTML={{ __html: t(screen.titleInverse) }}
            ></p>
          </Grid>
        )}
        {
          <LightContainer formID={screen.formID}>
            {screen.title && (
              <p
                className={`${H1_DARK_STYLE} ${dir === "rtl" && "text-right"}`}
              >
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
                        isRight={type === "submit"}
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
        }
      </GridContainer>
    </div>
  );
}

export default Module;
