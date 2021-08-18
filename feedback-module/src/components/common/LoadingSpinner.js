import React from "react";
import Loader from "react-loader-spinner";
import { useTranslation } from "react-i18next";

function LoadingSpinner({ className, overlay = false }) {
  const { t } = useTranslation();

  return overlay ? (
    <div className="overlay" aria-label={t("loading")}>
      <div className="overlay__wrapper">
        <Loader
          type="ThreeDots"
          height={60}
          width={60}
          className={`overlay__spinner ${className ?? ""}`}
        />
      </div>
    </div>
  ) : (
    <div>
      <Loader
        type="TailSpin"
        height={75}
        width={75}
        className={className ?? null}
        aria-label={t("loading")}
      />
    </div>
  );
}

export default LoadingSpinner;
