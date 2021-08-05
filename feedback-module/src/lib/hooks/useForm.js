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

  const setFeedbackType = (text, feedbackID) => {
    let updatedData = formData;
    updatedData.feedbackType = {
      label: text,
      feedbackID: feedbackID,
    };
    setFormData(updatedData);
  };

  const setCheckedOptions = (checkedFields) => {
    let updatedData = formData;
    if (checkedFields) {
      updatedData.checkedOptions = flattenCheckboxes(checkedFields);
    } else {
      updatedData.checkedOptions = [];
    }
    setFormData(updatedData);
  };

  const setInputResponses = (inputQuestions) => {
    let updatedData = formData;
    if (inputQuestions) {
      updatedData.inputResponses = flattenInputs(inputQuestions);
    } else {
      updatedData.inputResponses = [];
    }
    setFormData(updatedData);
  };

  const setSource = () => {
    let updatedData = formData;
    updatedData.source = window.location.href;
    setFormData(updatedData);
  };

  return {
    formData,
    setFormData,
    setFeedbackType,
    setCheckedOptions,
    setInputResponses,
    setSource,
  };
}
