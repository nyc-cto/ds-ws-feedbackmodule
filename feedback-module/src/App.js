import React from "react";

import ModuleButton from "./components/common/Button";
// import Module from "./components/common/Module";
import Textbox from "./components/common/Textbox";
import ModuleCheckbox from "./components/common/Checkbox";
import Screen2 from "./components/pages/Screen2";
import { MISSING_INFO } from "./assets/constants";

function App() {
  return (
    <div className="App">
      <ModuleButton
        onClick={() => {
          alert("Feedback button has been pressed");
        }}
        style={{ cursor: "pointer" }}
        buttonText="Give Feedback"
      />
      <Textbox id="test" size="area" />
      <Textbox id="test2" size="input" type="text" />
      <ModuleCheckbox label="Checkbox" id="checkbox" />
      {/* <Module /> */}
      <Screen2 feedbackType={MISSING_INFO} />
    </div>
  );
}

export default App;
