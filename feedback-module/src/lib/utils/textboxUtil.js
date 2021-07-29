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

export const flattenInputs = (inputQuestions) => {
  return inputQuestions.map(({ question, answer }) => {
    return { question: question, answer: answer };
  });
};
