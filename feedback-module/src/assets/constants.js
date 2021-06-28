export const MISSING_INFO = {
  title:
    "Sorry you couldn't find what you were looking for! Can you tell us a little more?",
  checkboxes: [
    { label: "I wasn't sure where to look", checked: false },
    { label: "I was confused by the information I found", checked: false },
    { label: "I don't understand how to use this website", checked: false },
    { label: "I hit a dead end", checked: false },
    {
      label: "The content was not available in my preferred language",
      checked: false,
    },
    {
      label: "There were errors with the translation available",
      checked: false,
    },
    { label: "Other", checked: false },
  ],
  textInputs: [
    "What were you looking for or trying to do?",
    "Would you like to add anything else?",
  ],
  button: "Submit",
};
const BROKEN = {
  title:
    "Sorry to hear that something is broken or inaccurate! Can you tell us a little more?",
  checkboxes: [
    "There is a spelling mistake or typo",
    "A link or button does not work",
    "The information is out of date",
    "I got different informatino from another source (311, printed mailer, elected official, etc.)",
    "The layout looks broken",
    "I got an error",
    "Other",
  ],
  textInputs: [
    "Can you give us more details on what you were trying to do, or the exact problem you encountered? (optional)",
  ],
  button: "Submit",
};
const OTHER = {
  title: "We appreciate your feedback.",
  checkboxes: [],
  textInputs: ["Can you tell us a little more?"],
  button: "Submit",
};

export const SCREEN1_BUTTONS = [
  { text: "I couldn’t find what I was looking for", data: MISSING_INFO },
  { text: "Something appears to be broken or inaccurate", data: BROKEN },
  { text: "I have other feedback on this page or website", data: OTHER },
];
