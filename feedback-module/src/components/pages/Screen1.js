import React from "react";

import ModuleButton from "../common/Button";
import { SCREEN1_BUTTONS } from "../../assets/constants";

function Screen1({ changePage, page }) {
  const buttons = SCREEN1_BUTTONS.map(({ text, data }, index) => {
    const handleClick = (e) => {
      changePage(data);
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
