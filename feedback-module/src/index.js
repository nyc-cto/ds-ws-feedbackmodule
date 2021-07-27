import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "@trussworks/react-uswds/lib/index.css";
import "./i18n";
import "./styles/index.scss";
import App from "./App";
import GA4React from "ga-4-react";

const WidgetDivs = document.querySelectorAll("#feedback-widget");

const renderApp = (Div, lang, pageTitle, endpoint, gaID) => {
  Div.attributes.lang && (lang = Div.attributes.lang.value);
  Div.attributes.pageTitle && (pageTitle = Div.attributes.pageTitle.value);
  Div.attributes.endpoint && (endpoint = Div.attributes.endpoint.value);
  Div.attributes.gaID && (gaID = Div.attributes.gaID.value);
  const ga4react = new GA4React(gaID);
  (async () => {
    await ga4react
      .initialize()
      .then((res) => console.log(`Analytics Success: ${res} ${gaID}`))
      .catch((err) => console.log(`Analytics Failure: ${err}`))
      .finally(() => {
        ReactDOM.render(
          <React.StrictMode>
            <Suspense fallback="... is loading">
              <App
                domElement={Div}
                lang={lang}
                pageTitle={pageTitle}
                endpoint={endpoint}
              />
            </Suspense>
          </React.StrictMode>,
          Div
        );
      });
  })();
};

WidgetDivs.forEach((Div) => {
  let currentLang = "en";
  let pageTitle = "";
  let endpoint = "";
  let gaID = "";
  renderApp(Div, currentLang, pageTitle, endpoint, gaID);

  let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type == "attributes") {
        renderApp(Div, currentLang, pageTitle, endpoint, gaID);
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
