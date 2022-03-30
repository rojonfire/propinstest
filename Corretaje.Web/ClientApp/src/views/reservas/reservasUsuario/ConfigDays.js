import React from "react";
import { Button } from "react-bootstrap";
import moment from "moment";

const firts3Button = (callback, daysNombre) => {
  let buttonFirts = [];
  let days = [];
  let diasOfweek = Object.keys(daysNombre.bloques);

  for (let item of diasOfweek) {
    if (item === "Lunes") days.push(1);
    if (item === "Martes") days.push(2);
    if (item === "Miercoles") days.push(3);
    if (item === "Jueves") days.push(4);
    if (item === "Viernes") days.push(5);
    if (item === "Sabado") days.push(6);
    if (item === "Domingo") days.push(7);
  }

  for (let item = 0; item < days.length; item++) {
    let DayEvl = days[item];
    let DaySum = null;

    if (moment().isoWeekday() < DayEvl) {
      DaySum = moment().day(DayEvl);
    } else {
      DaySum = moment()
        .day(DayEvl)
        .add({ days: 7 });
    }

    buttonFirts.push(
      <Button
      key={moment(DaySum)}
      onClick={() => callback(moment(DaySum), daysNombre)}
      variant="primary"
      block
      className={"mb-1"}
      >
        {moment(DaySum).format("LL")}
      </Button>,
    );
  }
  
  return buttonFirts.sort((a, b) =>
    a.key > b.key ? 1 : b.key > a.key ? -1 : 0,
  );
};

export default {
  firts3Button,
};
