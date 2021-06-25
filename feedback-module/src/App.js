import React from "react";

import ModuleButton from "./components/Button/Button";
import Header from "./components/Header/Header";
import Module from "./components/Module/Module";
import Textbox from "./components/Textbox/Textbox";
import ModuleCheckbox from "./components/Checkbox/Checkbox";

function App() {
  return (
    <div className="App">
      <Header />
      <ModuleButton
        onClick={() => {
          alert("Feedback button has been pressed");
        }}
        style={{ cursor: "pointer" }}
        buttonText="Give Feedback"
      />
      <Textbox id="test" size="area" />
      <Textbox id="test2" size="input" type="text" />
      <ModuleCheckbox label="Checkbox" />
      <Module />
    </div>
  );
}

export default App;
