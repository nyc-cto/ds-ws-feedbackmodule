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
      {process.env.REACT_APP_CSS_PATH && (
        <Helmet>
          <link rel="stylesheet" href={process.env.REACT_APP_CSS_PATH} />
        </Helmet>
      )}
      <Module
        pagetitle={pagetitle}
        endpoint={endpoint}
        dir={i18n.dir(i18n.language)}
      />
    </HelmetProvider>
  );
}

export default App;
