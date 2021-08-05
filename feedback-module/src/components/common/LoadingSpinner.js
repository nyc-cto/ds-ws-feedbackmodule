import React from "react";
import Loader from "react-loader-spinner";

import styles from "../../styles/export.module.scss";

function LoadingSpinner({ className }) {
  return (
    <div className="overlay">
      <div className="overlay__wrapper">
        <Loader
          type="TailSpin"
          color={styles.primaryColor}
          height={75}
          width={75}
          className={`overlay__spinner text-center ${className}`}
        />
      </div>
    </div>
  );
}

export default LoadingSpinner;
