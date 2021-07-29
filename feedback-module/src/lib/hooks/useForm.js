import { useState } from "react";

export default function useForm(initialFormState = {}) {
  const [data, setData] = useState(initialFormState);

  // modifyObj is a function that modifies the data object and returns an updated version
  const updateData = (modifyObj, additionalFields) => {
    setData(modifyObj(data, ...additionalFields));
  };

  return [data, updateData];
}
