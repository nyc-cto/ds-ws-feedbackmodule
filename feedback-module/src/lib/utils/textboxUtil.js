//Check if valid email address
export const invalidEmail = (email, required) => {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  if (!required && email === "") {
    return false;
  }
  return !re.test(email);
};

export const invalidPhone = (phone, required) => {
  const reUS = /^\W?\d*?\W*?(?<area>\d{3})\W*?(?<group1>\d{3})\W*?(?<group2>\d{4})\W*?$/;

  //Commenting this out because probably won't accept interntional phone numbers
  //But keeping just in case:
  // const reInternational = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  if (!required && phone === "") {
    return false;
  }
  return !reUS.test(phone);
};

export const flattenInputs = (inputQuestions) => {
  return inputQuestions
    ? inputQuestions.map(({ question, answer }) => {
        return { question: question, answer: answer };
      })
    : [];
};
