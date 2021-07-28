/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Helmet from "react-helmet";

import Module from "./components/Module";

function App({ pageTitle, lang, endpoint }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://d2ttz3as5y3dj0.cloudfront.net/main.css"
        />
        {/* <link rel="stylesheet" href="/main.css" /> */}
      </Helmet>
      <Module
        pageTitle={pageTitle}
        endpoint={endpoint}
        dir={i18n.dir(i18n.language)}
      />
    </>
  );
}

export default App;
