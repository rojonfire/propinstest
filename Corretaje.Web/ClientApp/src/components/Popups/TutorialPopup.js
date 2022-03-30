import React from "react";
import Popup from "./Popup";

const Tutorial = props => {
  return (
    <Popup {...props}>
      <div id="popup-tutorial">
        <iframe
          title="tutorial"
          width="949"
          height="534"
          src="https://www.youtube.com/embed/n9i4tmpN4jA?rel=0&controls=0"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </Popup>
  );
};

export default Tutorial;
