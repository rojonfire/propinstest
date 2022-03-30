import React from "react";

export const VideoCover = ({ url, ...props }) => {
  return (
    <div className="video-cover">
      {/* <iframe
        title="tutorial"
        width="1280"
        height="720"
        src="https://www.youtube.com/embed/fJSC8rf9VD8?rel=0&showinfo=0&controls=0&autoplay=1&loop=1&mute=1&playlist=fJSC8rf9VD8"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      /> */}
      <video loop autoPlay muted>
        <source src={url} type="video/mp4" />
      </video>
    </div>
  );
};
