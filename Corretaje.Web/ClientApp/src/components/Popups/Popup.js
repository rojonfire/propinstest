import React from "react";

const Popup = props => {
  const { children, show, togglePopup } = props;

  if (!show) return null;

  return (
    <div id="popup">
      <div id="popup-x" onClick={togglePopup}>
        X
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Popup;
