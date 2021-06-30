import React from "react";

import ModuleButton from "../common/Button";
// import { SCREEN1_BUTTONS } from "../../assets/constants";

function Screen3({ changePage }) {
  return (
    <>
      <h1>Thank you for your feedback!</h1>
      <ModuleButton buttonText="Yes, sign me up!" onClick={() => changePage} />
    </>
  );
}

export default Screen3;
