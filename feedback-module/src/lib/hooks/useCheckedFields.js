import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function useCheckedFields(
  initialFields = null,
  initialOther = ""
) {
  const { t, i18n } = useTranslation();
  const en = i18n.getFixedT("en");

  const [checkedFields, setCheckedFields] = useState(initialFields);
  const [otherField, setOtherField] = useState(initialOther);

  const onCheck = (index) => {
    let checked = checkedFields;
    checked[index].checked = !checked[index].checked;
    setCheckedFields(checked);
  };

  // sets new checkboxes upon screen change (screen.checkboxes will be passed in)
  const newScreenCheckboxes = (checkboxes) => {
    checkboxes &&
      t(checkboxes.labels) &&
      setCheckedFields(
        en(checkboxes.labels).map((label) => {
          return { label: label, checked: false };
        })
      );
  };

  //Checks if at least one checkbox was checked - returns true if yes false if no
  const checkboxValidated = () => {
    return checkedFields.some((field) => field.checked);
  };

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
  };
}
