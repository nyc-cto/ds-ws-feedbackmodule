import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "@trussworks/react-uswds/lib/index.css";
import "./i18n";
import "./styles/index.scss";
import App from "./App";

const WidgetDivs = document.querySelectorAll("#feedback-widget");
WidgetDivs.forEach((Div) => {
  ReactDOM.render(
    <React.StrictMode>
      <Suspense fallback="... is loading">
        <App domElement={Div} />
      </Suspense>
    </React.StrictMode>,
    Div
  );
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
