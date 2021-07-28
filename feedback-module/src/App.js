/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Module from "./components/Module";

function App({ pagetitle, lang, endpoint }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <HelmetProvider>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://d2ttz3as5y3dj0.cloudfront.net/main.css"
        />
      </Helmet>
      <Module
        pagetitle={pagetitle}
        endpoint={endpoint}
        dir={i18n.dir(i18n.language)}
      />
    </HelmetProvider>
  );
}

export default App;
