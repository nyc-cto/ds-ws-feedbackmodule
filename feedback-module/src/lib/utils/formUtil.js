import { flattenInputs } from "./textboxUtil";
import { flattenCheckboxes } from "./checkboxUtil";

export const setFeedbackType = (feedbackForAPI, text, feedbackID) => {
  let feedback = feedbackForAPI;
  feedback.feedbackType = {
    label: text,
    feedbackID: feedbackID,
  };
  return feedback;
};

export const processFeedback = (
  feedbackForAPI,
  checkedFields,
  inputQuestions
) => {
  /* if formID is feedback, sets checkedOptions and inputResponses 
    in the feedbackForAPI object */
  let feedback = feedbackForAPI;
  /* filters checkedOptions for the fields that are checked,
        then returns only the label property */
  feedback.checkedOptions = flattenCheckboxes(checkedFields);
  feedback.inputResponses = flattenInputs(inputQuestions);
  feedback.source = window.location.href;
  return feedback;
};

export const processUserInfo = (userInfo, inputQuestions, endpoint) => {
  let userObj = userInfo;
  inputQuestions.forEach(({ question, answer }) => {
    userObj[question] = answer;
  });
  userObj.source = window.location.href;
  userObj.id = endpoint;
  return userObj;
};
