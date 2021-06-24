import React from "react";

import ModuleButton from "./components/Button/Button";
import Header from "./components/Header/Header";
import Textbox from "./components/Textbox/Textbox";

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
      <Textbox id="test" size="long" />
      <Textbox id="test2" size="short" type="text" />
    </div>
  );
}

export default App;
