import React from "react";

import ModuleButton from "../common/Button";
import { SUBMISSION_TEXT } from "../../assets/constants";

function Screen3({ changePage }) {
  return (
    <>
      <h1>Thank you for your feedback!</h1>
      <ModuleButton
        buttonText={SUBMISSION_TEXT.button_text}
        isRight
        onClick={() => changePage}
      />
    </>
  );
}

export default Screen3;
