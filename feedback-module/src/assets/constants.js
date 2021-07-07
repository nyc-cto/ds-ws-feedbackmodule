export const SCREENS = {
  feedback_type: {
    buttons: [
      {
        type: "form",
        text: "missing.initialBtn",
        nextScreen: "missing_info",
        feedbackID: "data1",
      },
      {
        type: "form",
        text: "brokenBtn",
        nextScreen: "broken",
        feedbackID: "data2",
      },
      {
        type: "form",
        text: "otherBtn",
        nextScreen: "other",
        feedbackID: "data3",
      },
    ],
  },
  missing_info: {
    title: "missingTitle",
    checkboxes: "missingCheckboxes",
    textInputs: "missingTextInputs",
    buttons: [
      { type: "submit", text: "submitBtn", nextScreen: "feedback_results" },
    ],
  },
  broken: {
    title: "brokenTitle",
    checkboxes: "brokenCheckboxes",
    textInputs: "brokenTextInputs",
    buttons: [
      { type: "submit", text: "submitBtn", nextScreen: "feedback_results" },
    ],
  },
  other: {
    title: "otherTitle",
    textInputs: "otherTextInputs",
    buttons: [
      { type: "submit", text: "submitBtn", nextScreen: "feedback_results" },
    ],
  },
  feedback_results: {
    titleInverse: "feedbackResultsTitle",
    plain_text: "feedbackResultsPlain_text",
    buttons: [
      {
        type: "submit",
        text: "feedbackResultsButton",
        nextScreen: "user_research",
      },
    ],
  },
  user_research: {
    title: "userResearchTitle",
    plain_text: "userResearchPlain_text",
    textInputs: "userResearchTextInputs",
    buttons: [
      { type: "submit", text: "submitBtn", nextScreen: "user_feedback_result" },
    ],
  },
  user_feedback_result: {
    titleInverse: "userFeedbackResultsTitle",
  },
};
