import React from "react";

import ModuleButton from "./components/Button/Button";

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
    </div>
  );
}

export default App;
