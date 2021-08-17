import React from "react";
import Loader from "react-loader-spinner";

function LoadingSpinner({ className, overlay = false }) {
  return overlay ? (
    <div className="overlay">
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
      />
    </div>
  );
}

export default LoadingSpinner;
