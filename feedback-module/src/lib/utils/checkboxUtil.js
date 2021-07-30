// Updates the label to "Other: <user-input other content>" if other field is checked
export const updateOtherField = (checkedFields, otherField) => {
  checkedFields.forEach((field) => {
    field.label === "Other" &&
      field.checked &&
      (field.label = `Other: ${otherField}`);
  });
  return checkedFields;
};

//Checks if at least one checkbox was checked - returns true if yes false if no
export const checkboxValidated = (checkedFields) => {
  return checkedFields.some((field) => field.checked);
};
