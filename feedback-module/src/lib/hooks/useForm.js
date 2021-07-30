import { useState } from "react";

/**
 * Custom hook that contains the state for a set of form values
 * @param {Object} initialFormState
 * @returns {Array}
 */
export default function useForm(initialFormState = {}) {
  const [data, setData] = useState(initialFormState);

  /**
   * Modifies a set of form data and updates the state with new modified value
   * @param {(d: Object, a: Array) => number} modifyObj - a function that modifies the data object and returns an updated version
   * @param {Array} additionalFields
   */
  const updateData = (modifyObj, additionalFields) => {
    setData(modifyObj(data, ...additionalFields));
  };

  return [data, updateData];
}
