import { useState } from "react";
import { useTranslation } from "react-i18next";

import { OTHER_MAX_CHAR } from "../constants";

/**
 * Custom hook that contains the state for a set of checkbox's
 * checked values and "Other" value, if applicable
 * @param {Object[]} initialFields
 * @param {string} initialOther
 * @returns {Object}
 */
export default function useCheckboxes(initialFields = null, initialOther = "") {
  const { t, i18n } = useTranslation();
  const en = i18n.getFixedT("en");

  const [checkedFields, setCheckedFields] = useState(initialFields);
  const [otherField, setOtherField] = useState(initialOther);

  const onCheck = (index) => {
    let checked = checkedFields;
    checked[index].checked = !checked[index].checked;
    setCheckedFields(checked);
  };

  // sets new checkboxes upon screen change, if there are any
  const newScreenCheckboxes = (checkboxes) => {
    checkboxes &&
      t(checkboxes.labels) &&
      setCheckedFields(
        en(checkboxes.labels).map((label) => {
          return { label: label, checked: false };
        })
      );
  };

  // checks if at least one checkbox was checked - returns true if yes false if no
  const checkboxValidated = () => {
    return checkedFields.some((field) => field.checked);
  };

  const otherFieldValidated = () => {
    console.log(otherField.length);
    return otherField.length <= OTHER_MAX_CHAR;
  };

  // updates the other field's label
  const updateOtherField = () => {
    if (checkedFields) {
      checkedFields.forEach((field) => {
        field.label === "Other" &&
          field.checked &&
          (field.label = `Other: ${otherField}`);
      });
      setCheckedFields(checkedFields);
    }
  };

  return {
    checkedFields,
    onCheck,
    newScreenCheckboxes,
    checkboxValidated,
    updateOtherField,
    setOtherField,
    otherFieldValidated,
  };
}
