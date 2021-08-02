export const TRANSLATIONS_AR = {
  submitBtn: "[ar] Submit",

  feedbackType: {
    title: "[ar] Do you have any feedback on {{page}}?",
  },

  missing: {
    initialBtn: "[ar] I couldn't find what I was looking for",
    title:
      "[ar] Sorry you couldn't find what you were looking for! Can you tell us a little more?",
    checkboxes: [
      "[ar] I wasn't sure where to look",
      "[ar] I was confused by the information I found",
      "[ar] I don't understand how to use this website",
      "[ar] I hit a dead end",
      "[ar] The content was not available in my preferred language",
      "[ar] There were errors with the translation available",
      "[ar] Other",
    ],
    textInputs: [
      {
        type: "textarea",
        text: "[ar] What were you looking for or trying to do?",
      },
      {
        type: "textarea",
        text: "[ar] Would you like to add anything else?",
      },
    ],
  },

  broken: {
    initialBtn: "[ar] Something appears to be broken or inaccurate",
    title:
      "[ar] Sorry to hear that something is broken or inaccurate! Can you tell us a little more?",
    checkboxes: [
      "[ar] There is a spelling mistake or typo",
      "[ar] A link or button does not work",
      "[ar] The information is out of date",
      "[ar] I got different information from another source (311, printed mailer, elected official, etc.)",
      "[ar] The layout looks broken",
      "[ar] I got an error",
      "[ar] Other",
    ],
    textInputs: [
      {
        type: "textarea",
        text: "[ar] Can you give us more details on what you were trying to do, or the exact problem you encountered?",
      },
    ],
  },

  other: {
    initialBtn: "[ar] I have other feedback on this page or website",
    title: "[ar] We appreciate your feedback.",
    textInputs: [
      {
        type: "textarea",
        text: "[ar] Can you tell us a little more?",
        required: true,
      },
    ],
  },

  feedbackResults: {
    title:
      "[ar] Thank you for your feedback! It has been submitted.<br /><br />Your feedback is anonymous and confidential, so you will not receive a reply.",
    plainText:
      "<p>[ar] The City of New York is always trying to improve its services. Are you interesed in being a user research participant? This is is entirely voluntary and you can opt out at any time. Signing up to be a user research participant will have no impact on your feedback today, or your eligibility to access or receive services in the future.</p>",
    button: "[ar] Yes, sign me up!",
  },

  userResearch: {
    title:
      "[ar] As a user research participant you can help us continue to improve services for New Yorkers",
    plainText:
      '<p>[ar] Please leave your contact details and we will get in touch with you. Being a research participant means you may be contacted from time to time to help us test new services and products. We will send you an email with more details.</p><p class="padding-top-2">You can opt out at any time.</p>',
    textInputs: [
      { type: "text", text: "[ar] Your name", required: true },
      { type: "email", text: "[ar] Your email", required: true },
      { type: "tel", text: "[ar] Your phone number" },
    ],
  },

  userFeedbackResults: {
    title:
      "[ar] Thank you for signing up to be a user research participant!  We’ll be in touch if there are any opportunities to test products and services.",
  },

  errorMessages: {
    checkboxError: "[ar] Please select at least one option.",
    nameError: "[ar] Please provide your name.",
    emailError: "[ar] Please provide a valid email address.",
    phoneError: "[ar] This is an invalid phone number.",
    inputEmptyError: "[ar] Please provide a response.",
  },
};
