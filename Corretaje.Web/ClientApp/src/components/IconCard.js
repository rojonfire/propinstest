import React from "react";

export default ({ selected, upperText, iconCardBallClass, icon, title, subtitle, subtitleClass, ...events }) => {
  const border = selected ? "iconCard selected" : "iconCard no-selected";
  const defaultIconCardBallClass = "iconCard-ball";
  return (
    <div className={border} {...events}>
      <div className={iconCardBallClass ? iconCardBallClass : defaultIconCardBallClass }>
        <div>{upperText}</div>
      </div>
      <div className="iconCard-body">
        <span className="iconImg">{icon}</span>
        <h4 className="iconCard-title h5 text-center">{title}</h4>
        <p className={`iconCard-subtitle text-center ${subtitleClass}`}>{subtitle}</p>
      </div>
    </div>
  );
};
