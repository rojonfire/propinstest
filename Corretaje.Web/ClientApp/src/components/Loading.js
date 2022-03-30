import React from "react";
import icon from "../utils/images";

export const LoadingModal = () => {
  return (
    <div className="modalLoad">
      <div className="d-box">
        <div className="loader">
          <img src={icon.loading} alt="" />
        </div>
      </div>
    </div>
  );
};

export const LoadSpinner = () => {
  return <div className="lds-dual-ring" />;
};
