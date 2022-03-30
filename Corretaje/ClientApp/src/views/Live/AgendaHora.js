/** @format */

import React from "react";
import { Card } from "shards-react";
import { CheckFieldGroup } from "../../utils/Input";

const AgendaHora = (props) => {
  const { values, onActionChange, allUnavailable } = props;

  const renderTable = () => {
    const diasSemana = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ];

    const bloques = [];

    for (let i = 8; i < 20; i++) {
      let index = i + 1;
      let index1 =
        i.toString().length === 1 ? `0${i}:00-0${i}:30` : `${i}:00-${i}:30`;
      let index2 =
        i.toString().length === 1
          ? `0${i}:30-${
              index.toString().length === 1 ? `0${i + 1}` : `${i + 1}`
            }:00`
          : `${i}:30-${i + 1}:00`;
      bloques.push(index1);
      bloques.push(index2);
    }

    // console.log("bloques agendaHora", bloques);

    return (
      <Card
        style={{
          maxHeight: "50vh",
          overflowX: "auto",
          marginTop: "20px",
          width: "100%",
        }}
        small
      >
        <table className="table mb-0">
          <thead className="bg-light">
            <tr>
              <th>Horas</th>
              {diasSemana.map((dia) => {
                return <th key={dia}>{dia}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {bloques.map((bloque) => {
              return (
                <tr key={bloque}>
                  <td>{bloque}</td>
                  {diasSemana.map((diaSemana, index) => {
                    let estado = false;
                    let estadoBlocked = false;
                    const jsonValue = { index: index, bloque: bloque };
                    // console.log("jsonValue:", jsonValue)
                    const filtro = values.filter((o) => {
                      return o.index === index && o.bloque === bloque;
                    });
                    if (filtro.length !== 0) {
                      estado = true;
                    }
                    const filtroBlocked = allUnavailable.filter((o) => {
                      return o.index === index && o.bloque === bloque;
                    });
                    // console.log("jsonValue", jsonValue)
                    if (filtroBlocked.length !== 0) {
                      estadoBlocked = true;
                    }
                    return (
                      <td key={index}>
                        <CheckFieldGroup
                          name="bloques"
                          value={jsonValue}
                          checked={estado}
                          disabled={estadoBlocked}
                          onChange={(e) => {
                            const bool = e.currentTarget.checked;
                            onActionChange(bool, index, bloque);
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    );
  };

  return renderTable();
};

export default AgendaHora;
