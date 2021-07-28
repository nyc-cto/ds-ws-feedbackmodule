import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "@trussworks/react-uswds/lib/index.css";
import "./i18n";
import "./styles/index.scss";
import App from "./App";

const WidgetDivs = document.querySelectorAll("#feedback-widget");

const renderApp = (Div, lang, pagetitle, endpoint) => {
  Div.attributes.lang && (lang = Div.attributes.lang.value);
  Div.attributes.pagetitle && (pagetitle = Div.attributes.pagetitle.value);
  Div.attributes.endpoint && (endpoint = Div.attributes.endpoint.value);
  ReactDOM.render(
    <React.StrictMode>
      <Suspense fallback="... is loading">
        <App
          domElement={Div}
          lang={lang}
          pagetitle={pagetitle}
          endpoint={endpoint}
        />
      </Suspense>
    </React.StrictMode>,
    Div
  );
};

WidgetDivs.forEach((Div) => {
  let currentLang = "en";
  let pagetitle = "";
  let endpoint = "";
  renderApp(Div, currentLang, pagetitle, endpoint);

  let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type == "attributes") {
        renderApp(Div, currentLang, pagetitle, endpoint);
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
