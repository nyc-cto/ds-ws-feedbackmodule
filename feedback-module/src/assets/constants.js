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
        text: "broken.initialBtn",
        nextScreen: "broken",
        feedbackID: "data2",
      },
      {
        type: "form",
        text: "other.initialBtn",
        nextScreen: "other",
        feedbackID: "data3",
      },
    ],
  },
  missing_info: {
    title: "missing.title",
    checkboxes: "missing.checkboxes",
    textInputs: "missing.textInputs",
    buttons: [
      { type: "submit", text: "submitBtn", nextScreen: "feedback_results" },
    ],
  },
  broken: {
    title: "broken.title",
    checkboxes: "broken.checkboxes",
    textInputs: "broken.textInputs",
    buttons: [
      { type: "submit", text: "submitBtn", nextScreen: "feedback_results" },
    ],
  },
  other: {
    title: "other.title",
    textInputs: "other.textInputs",
    buttons: [
      { type: "submit", text: "submitBtn", nextScreen: "feedback_results" },
    ],
  },
  feedback_results: {
    titleInverse: "feedbackResults.itle",
    plain_text: "feedbackResults.plain_text",
    buttons: [
      {
        type: "submit",
        text: "feedbackResults.button",
        nextScreen: "user_research",
      },
    ],
  },
  user_research: {
    title: "userResearch.title",
    plain_text: "userResearch.plain_text",
    textInputs: "userResearch.textInputs",
    buttons: [
      { type: "submit", text: "submitBtn", nextScreen: "user_feedback_result" },
    ],
  },
  user_feedback_result: {
    titleInverse: "userFeedbackResults.title",
  },
};
