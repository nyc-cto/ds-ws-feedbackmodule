import React from "react";
import Loader from "react-loader-spinner";

import styles from "../../styles/_export.module.scss";

function LoadingSpinner() {
  return (
    <div>
      <Loader
        type="TailSpin"
        color={styles.primaryColor}
        height={75}
        width={75}
        className="text-center"
      />
    </div>
  );
}

export default LoadingSpinner;
