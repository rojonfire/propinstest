import React from "react";

export const LoadingModal = () => {
  return (
    <div className="modalLoad">
      <div className=" Letraloading">
        Estamos enviando la información de tu propiedad...
      </div>
      <div className="bodyboxloadinf">
        <div className="loadernuevo-p1 boxloading"></div>
      </div>
    </div>
  );
};

export const LoadSpinner = () => {
  return <div className="bodyboxloadinf loadernuevo-p1 boxloading" />;
};
