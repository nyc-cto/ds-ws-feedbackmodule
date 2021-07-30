export const flattenCheckboxes = (checkedFields) => {
  return checkedFields
    ? checkedFields.filter(({ checked }) => checked).map(({ label }) => label)
    : [];
};
