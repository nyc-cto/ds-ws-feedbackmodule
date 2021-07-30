import { useState, useEffect, createRef } from "react";
import { useTranslation } from "react-i18next";

import { invalidEmail, invalidPhone } from "../utils/textboxUtil";

/**
 * Custom hook that contains the state for the text input responses on a screen and refs to text inputs
 * Includes methods for validating inputs, updating input data for new screens, and adding focus states to inputs
 * @param {*} firstCheckRef - a reference to the first check on a page, if applicable
 * @returns {Object}
 */
export default function useInputs(firstCheckRef) {
  const { t, i18n } = useTranslation();
  const en = i18n.getFixedT("en");

  const [inputQuestions, setInputQuestions] = useState(null);
  const [inputRefs, setInputRefs] = useState([]);

  /* On a new screen, if there are no checkboxes & at least 1 input,
   * the first input is focused */
  useEffect(() => {
    if (!firstCheckRef.current && inputRefs.length > 0) {
      inputRefs[0].current.focus();
    }
  }, [inputRefs]);

  // initializes new input values and refs upon screen change, if there are any
  const newScreenInputs = (textInputs) => {
    let refList = [];
    // Updates the text inputs based on the new screen
    t(textInputs) &&
      setInputQuestions(
        en(textInputs).map((question) => {
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

  /* If input errors are present, the input with the first error is focused */
  const focusFirstError = () => {
    const firstErrorIndex = inputQuestions.findIndex(
      (question) => question.error
    );
    if (firstErrorIndex >= 0 && inputRefs[firstErrorIndex].current) {
      inputRefs[firstErrorIndex].current.focus();
    }
  };

  return {
    inputQuestions,
    setInputQuestions,
    newScreenInputs,
    inputsValidated,
    focusFirstError,
    inputRefs,
  };
}
