import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Module from "./components/Module";

function App({ lang, pageTitle }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <div className="App">
      <Module pageTitle={pageTitle} />
    </div>
  );
}

export default App;
