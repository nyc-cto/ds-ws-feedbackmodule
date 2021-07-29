import { useState, useEffect, createRef } from "react";
import { useTranslation } from "react-i18next";

import { invalidEmail, invalidPhone } from "../utils/textboxUtil";

export default function useInputQuestions(firstCheckRef) {
  const { t, i18n } = useTranslation();
  const en = i18n.getFixedT("en");

  const [inputQuestions, setInputQuestions] = useState(null);
  const [inputRefs, setInputRefs] = useState([]);

  useEffect(() => {
    if (!firstCheckRef.current && inputRefs.length > 0) {
      inputRefs[0].current.focus();
    }
  }, [inputRefs]);

  // sets new checkboxes upon screen change (screen.checkboxes will be passed in)
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
