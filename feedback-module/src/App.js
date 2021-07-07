import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Module from "./components/common/Module";

function App({ lang }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <div className="App">
      <Module />
    </div>
  );
}

export default App;
