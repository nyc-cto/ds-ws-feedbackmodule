import React from "react";
import Loader from "react-loader-spinner";

import styles from "../../styles/export.module.scss";

function LoadingSpinner({ className, overlay = false }) {
  return overlay ? (
    <div className="overlay">
      <div className="overlay__wrapper">
        <Loader
          type="TailSpin"
          color={styles.primaryColor}
          height={75}
          width={75}
          className={`overlay__spinner ${className ?? ""}`}
        />
      </div>
    </div>
  ) : (
    <div>
      <Loader
        type="TailSpin"
        color={styles.primaryColor}
        height={75}
        width={75}
        className={className ?? ""}
      />
    </div>
  );
}

export default LoadingSpinner;
