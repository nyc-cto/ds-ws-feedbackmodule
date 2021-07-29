//Check if valid email address
export const invalidEmail = (email, required) => {
  const re =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  if (!required && email === "") {
    return false;
  }
  return !re.test(email);
};

export const invalidPhone = (phone, required) => {
  const reUS = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  //Commenting this out because probably won't accept interntional phone numbers
  //But keeping just in case:
  // const reInternational = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  if (!required && phone === "") {
    return false;
  }
  return !reUS.test(phone);
};

//Checks if all the required fields have been completed - returns true if yes false if no
export const inputsValidated = (inputQuestions, setInputQuestions) => {
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
