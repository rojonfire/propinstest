import React from "react";
import { Map } from "google-maps-react";
import { GoogleApiWrapper } from "google-maps-react";
import KEYS from "../utils/keys";

let GoogleMap = props => {
  const { children, ...params } = props;
  return <Map {...params}>{children}</Map>;
};

GoogleMap = GoogleApiWrapper({
  apiKey: KEYS.GOOGLE_MAPS_API_KEY,
  libraries: ["places", "visualization"],
  LoadingContainer: () => <div style={{ fontSize: "2em" }}>Loading...</div>,
})(GoogleMap);

export default GoogleMap;
