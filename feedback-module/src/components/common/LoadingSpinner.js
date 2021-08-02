import React from "react";
import Loader from "react-loader-spinner";

import styles from "../../styles/_export.module.scss";

function LoadingSpinner() {
  return (
    <Loader
      type="Puff"
      color={styles.primaryColor}
      height={100}
      width={100}
      className="text-center"
    />
  );
}

export default LoadingSpinner;
