import React from "react";

import ModuleButton from "./components/Button/Button";
import Header from "./components/Header/Header";

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
    </div>
  );
}

export default App;
