import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "@trussworks/react-uswds/lib/index.css";
import "./i18n";
import "./styles/index.scss";
import App from "./App";

const WidgetDivs = document.querySelectorAll("#feedback-widget");

WidgetDivs.forEach((Div) => {
  let currentLang = "en";
  let pageTitle = "";
  Div.attributes.lang && (currentLang = Div.attributes.lang.value);
  Div.attributes.pageTitle && (pageTitle = Div.attributes.pageTitle.value);
  ReactDOM.render(
    <React.StrictMode>
      <Suspense fallback="... is loading">
        <App domElement={Div} lang={currentLang} pageTitle={pageTitle} />
      </Suspense>
    </React.StrictMode>,
    Div
  );
  let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type == "attributes") {
        Div.attributes.lang && (currentLang = Div.attributes.lang.value);
        Div.attributes.pageTitle &&
          (pageTitle = Div.attributes.pageTitle.value);
        console.log("currentLang", currentLang);
        ReactDOM.render(
          <React.StrictMode>
            <Suspense fallback="... is loading">
              <App domElement={Div} lang={currentLang} pageTitle={pageTitle} />
            </Suspense>
          </React.StrictMode>,
          Div
        );
      }
    });
  });

  observer.observe(Div, {
    attributes: true,
  });
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
