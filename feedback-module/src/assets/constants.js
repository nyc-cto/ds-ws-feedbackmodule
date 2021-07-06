export const SCREENS = {
  feedback_type: {
    title: "Do you have any feedback on {{page}}?",
    buttons: [
      {
        type: "form",
        text: "missingBtn",
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
    title:
      "Sorry you couldn't find what you were looking for! Can you tell us a little more?",
    checkboxes: [
      "I wasn't sure where to look",
      "I was confused by the information I found",
      "I don't understand how to use this website",
      "I hit a dead end",
      "The content was not available in my preferred language",
      "There were errors with the translation available",
      "Other",
    ],
    textInputs: [
      { type: "text", text: "What were you looking for or trying to do?" },
      { type: "text", text: "Would you like to add anything else?" },
    ],
    buttons: [
      { type: "submit", text: "submitBtn", nextScreen: "feedback_results" },
    ],
  },
  broken: {
    title:
      "Sorry to hear that something is broken or inaccurate! Can you tell us a little more?",
    checkboxes: [
      "There is a spelling mistake or typo",
      "A link or button does not work",
      "The information is out of date",
      "I got different information from another source (311, printed mailer, elected official, etc.)",
      "The layout looks broken",
      "I got an error",
      "Other",
    ],
    textInputs: [
      {
        type: "text",
        text: "Can you give us more details on what you were trying to do, or the exact problem you encountered? (optional)",
      },
    ],
    buttons: [
      { type: "submit", text: "submitBtn", nextScreen: "feedback_results" },
    ],
  },
  other: {
    title: "We appreciate your feedback.",
    textInputs: [{ type: "text", text: "Can you tell us a little more?" }],
    buttons: [
      { type: "submit", text: "submitBtn", nextScreen: "feedback_results" },
    ],
  },
  feedback_results: {
    titleInverse:
      "Thank you for your feedback! It has been submitted.<br /><br />Your feedback is anonymous and confidential, so you will not receive a reply.",
    plainText:
      "The City of New York is always trying to improve its services. Are you interesed in being a user research participant? This is is entirely voluntary and you can opt out at any time. Signing up to be a user research participant will have no impact on your feedback today, or your eligibility to access or receive services in the future.",
    buttons: [
      { type: "next", text: "Yes, sign me up!", nextScreen: "user_research" },
    ],
  },
  user_research: {
    title:
      "As a user research participant you can help us continue to improve services for New Yorkers",
    plainText:
      "Please leave your contact details and we will get in touch with you. Being a research participant means you may be contacted from time to time to help us test new services and products. We will send you an email with more details.<br />You can opt out at any time.",
    textInputs: [
      { type: "text", text: "Your name" },
      { type: "email", text: "Your email" },
      { type: "tel", text: "Your phone number" },
    ],
    buttons: [
      { type: "submit", text: "submitBtn", nextScreen: "user_feedback_result" },
    ],
  },
  user_feedback_result: {
    titleInverse:
      "Thank you for signing up to be a user research participant!  We’ll be in touch if there are any opportunities to test products and services.",
  },
};
