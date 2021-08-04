export const TRANSLATIONS_ES = {
  submitBtn: "[es] Submit",

  feedbackType: {
    title: "[es] Do you have any feedback on {{page}}?",
  },

  missing: {
    initialBtn: "[es] I couldn't find what I was looking for",
    title:
      "[es] Sorry you couldn't find what you were looking for! Can you tell us a little more?",
    checkboxes: [
      "[es] I wasn't sure where to look",
      "[es] I was confused by the information I found",
      "[es] I don't understand how to use this website",
      "[es] I hit a dead end",
      "[es] The content was not available in my preferred language",
      "[es] There were errors with the translation available",
      "[es] Other",
    ],
    textInputs: [
      {
        type: "textarea",
        text: "[es] What were you looking for or trying to do?",
      },
      {
        type: "textarea",
        text: "[es] Would you like to add anything else?",
      },
    ],
  },

  broken: {
    initialBtn: "[es] Something appears to be broken or inaccurate",
    title:
      "[es] Sorry to hear that something is broken or inaccurate! Can you tell us a little more?",
    checkboxes: [
      "[es] There is a spelling mistake or typo",
      "[es] A link or button does not work",
      "[es] The information is out of date",
      "[es] I got different information from another source (311, printed mailer, elected official, etc.)",
      "[es] The layout looks broken",
      "[es] I got an error",
      "[es] Other",
    ],
    textInputs: [
      {
        type: "textarea",
        text:
          "[es] Can you give us more details on what you were trying to do, or the exact problem you encountered?",
      },
    ],
  },

  other: {
    initialBtn: "[es] I have other feedback on this page or website",
    title: "[es] We appreciate your feedback.",
    textInputs: [
      {
        type: "textarea",
        text: "[es] Can you tell us a little more?",
        required: true,
      },
    ],
  },

  feedbackResults: {
    title:
      "[es] Thank you for your feedback! It has been submitted.<br /><br />Your feedback is anonymous and confidential, so you will not receive a reply.",
    plainText:
      "[es] The City of New York is always trying to improve its services. Are you interesed in being a user research participant? This is is entirely voluntary and you can opt out at any time. Signing up to be a user research participant will have no impact on your feedback today, or your eligibility to access or receive services in the future.",
    button: "[es] Yes, sign me up!",
  },

  userResearch: {
    title:
      "[es] As a user research participant you can help us continue to improve services for New Yorkers",
    plainText:
      "[es] Please leave your contact details and we will get in touch with you. Being a research participant means you may be contacted from time to time to help us test new services and products. We will send you an email with more details.<br />You can opt out at any time.",
    textInputs: [
      { type: "text", text: "[es] Your name", required: true },
      { type: "email", text: "[es] Your email", required: true },
      { type: "tel", text: "[es] Your phone number" },
    ],
  },

  userFeedbackResults: {
    title:
      "[es] Thank you for signing up to be a user research participant!  We’ll be in touch if there are any opportunities to test products and services.",
  },

  errorMessages: {
    checkboxError: "[es] Please select at least one option.",
    nameError: "[es] Please provide your name.",
    emailPhoneError: "[es] Please provide your email or phone number.",
    inputEmptyError: "[es] Please provide a response.",
    requestFailure:
      "[es] Sorry your feedback could not be submitted at this time. Please retry in a few moments.",
  },
};
