/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Helmet from "react-helmet";

import Module from "./components/Module";

function App({ pagetitle, lang, endpoint }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/main.css" />
      </Helmet>
      <Module
        pageTitle={pagetitle}
        endpoint={endpoint}
        dir={i18n.dir(i18n.language)}
      />
    </>
  );
}

export default App;
