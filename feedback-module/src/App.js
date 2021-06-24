import React from "react";

function App() {
  return (
    <div className="App">
      <button
        onClick={() => {
          alert("Feedback button has been pressed");
        }}
        style={{ cursor: "pointer" }}
      >
        Give Feedback
      </button>
    </div>
  );
}

export default App;
