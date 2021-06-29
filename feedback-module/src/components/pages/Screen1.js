import React from "react";

import ModuleButton from "../common/Button";
import { SCREEN1_BUTTONS } from "../../assets/constants";
import axios from "axios";

function Screen1({ setData, page }) {
  const getFeedback = (text) => {
    axios
      .post("/api/feedback", { feedback: text })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const buttons = SCREEN1_BUTTONS.map(({ text, data }, index) => {
    const handleClick = (e) => {
      setData(data);
      getFeedback(text);
      e.preventDefault();
    };

    return <ModuleButton buttonText={text} onClick={handleClick} key={index} />;
  });

  return (
    <>
      <h1>Do you have any feedback on {page}?</h1>
      {buttons}
    </>
  );
}

export default Screen1;
