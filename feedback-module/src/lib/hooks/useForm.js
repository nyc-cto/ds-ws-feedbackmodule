import { useState } from "react";
import { flattenCheckboxes } from "../utils/checkboxUtil";
import { flattenInputs } from "../utils/textboxUtil";

/**
 * Custom hook that contains the state for a set of form values
 * @param {Object} initialFormState
 * @returns {Array}
 */
export default function useForm() {
  const [formData, setFormData] = useState({});

  const setSubmission = (
    type,
    text,
    feedbackID,
    checkedFields,
    inputQuestions
  ) => {
    let updatedData = formData;
    updatedData.interaction = type === "form";
    text &&
      feedbackID &&
      (updatedData.feedbackType = {
        label: text,
        feedbackID: feedbackID,
      });
    updatedData.checkedOptions = checkedFields
      ? flattenCheckboxes(checkedFields)
      : [];
    updatedData.inputResponses = inputQuestions
      ? flattenInputs(inputQuestions)
      : [];
    updatedData.source = window.location.href;

    setFormData(updatedData);
  };

  return {
    setSubmission,
    formData,
    setFormData,
  };
}
