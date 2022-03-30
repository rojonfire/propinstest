/** @format */

import * as Yup from "yup";

import swal from "sweetalert2";

export const diasSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

export const schema = Yup.object().shape({
  bloques: Yup.array()
    .of(Yup.string())
    .required("Seleccione al menos un bloque"),
});

export const initialValues = (agenda) => {
  let tramosHelper = [];
  if (agenda && agenda.id) {
    diasSemana.forEach((dia, index) => {
      if (agenda.bloques[dia]) {
        const tramosDia = [
          ...agenda.bloques[dia].map((tramoDiario) => {
            return JSON.stringify({
              index,
              bloque: tramoDiario.tramo,
            });
          }),
        ];
        tramosHelper = [...tramosHelper, ...tramosDia];
      }
    });
  }
  return tramosHelper;
};

export const userFeedBack = (mensaje) => {
  if (!mensaje || Object.keys(mensaje).length === 0) {
    return null;
  }

  if (mensaje === "Secuencia correcta") {
    swal.fire({
      icon: "success",
      title: "Bien...",
      text: "Horario agregado",
    });
  } else {
    swal.fire({
      icon: "info",
      title: "Atención",
      text: "Ocurrio un error",
    });
  }
};
