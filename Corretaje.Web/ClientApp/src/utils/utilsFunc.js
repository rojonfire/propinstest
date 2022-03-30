import { validate as rutValidation, format } from "rut.js";
import { OutlookCalendar, GoogleCalendar } from 'datebook'
import moment from "moment";

const formatRut = rut => {
  if (rut) {
    return format(rut);
  }
  return rut;
};

const checkRut = rut => {
  if (rut) {
    return rutValidation(rut) ? null : "RUT no valido";
  }

  return "Por favor ingrese su rut";
};

const checkEmail = email => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
};

const formatNumeros = input => {
  var num = input;
  if (!isNaN(num)) {
    num = num
      .toString()
      .split("")
      .reverse()
      .join("")
      .replace(/(?=\d*\.?)(\d{3})/g, "$1.");
    num = num
      .split("")
      .reverse()
      .join("")
      .replace(/^[.]/, "");
    return num;
  } else {
    return input;
  }
};

const getUrlParameter = sParam => {
  let sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
};

const array_move = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
};

const mobilecheck = () => {
  var check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

const downloadPDFfromBase64 = ({ base64, filename }) => {
  const linkSource = `data:application/pdf;base64,${base64}`;
  const downloadLink = document.createElement("a");

  downloadLink.setAttribute("href", linkSource);
  downloadLink.setAttribute("download", `${filename}.pdf`);

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

const getNombreEstadoPropiedad = (number) => {
  let nombreEstado = "";
  switch(number) {
    case 1:
      nombreEstado = "Propiedad publicada";
      break;
    case 2:
      nombreEstado = "Oferta Vigente";
      break;
    case 3:
      nombreEstado = "Promesa Compraventa Firmada";
      break;
    case 4:
      nombreEstado = "Escritura Compraventa Firmada";
      break;
    case 5:
      nombreEstado = "Propiedad entregada";
      break;
    case 6:
      nombreEstado = "Propiedad no disponible";
      break;
    default:
      nombreEstado = "Plan contratado";
  }

  return nombreEstado;
}

const formatToThousandSeparator = (number) => (number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));

const getDayNumber = (dayString) => {
  let dayNumber = 0;
  switch(dayString) {
    case "Lunes":
      dayNumber = 1;
      break;
    case "Martes":
      dayNumber = 2;
      break;
    case "Miercoles":
      dayNumber = 3;
      break;
    case "Jueves":
      dayNumber = 4;
      break;
    case "Viernes":
      dayNumber = 5;
      break;
    case "Sabado":
      dayNumber = 6;
      break;
    default:
      dayNumber = 0;
  }

  return dayNumber;
}

const getWeekday = (dayNumber) => {
  let weekday = "Domingo";
  switch(dayNumber) {
    case 1:
      weekday = "Lunes";
      break;
    case 2:
      weekday = "Martes";
      break;
    case 3:
      weekday = "Miercoles";
      break;
    case 4:
      weekday = "Jueves";
      break;
    case 5:
      weekday = "Viernes";
      break;
    case 6:
      weekday = "Sabado";
      break;
    default:
      weekday = "Domingo";
  }

  return weekday;
}

const getMonthName = (monthNumber) => {
  let monthName = "Diciembre";
  switch(monthNumber) {
    case 0:
      monthName = "Enero";
      break;
    case 1:
      monthName = "Febrero";
      break;
    case 2:
      monthName = "Marzo";
      break;
    case 3:
      monthName = "Abril";
      break;
    case 4:
      monthName = "Mayo";
      break;
    case 5:
      monthName = "Junio";
      break;
    case 6:
      monthName = "Julio";
      break;
    case 7:
      monthName = "Agosto";
      break;
    case 8:
      monthName = "Septiembre";
      break;
    case 9:
      monthName = "Octubre";
      break;
    case 10:
      monthName = "Noviembre";
      break;
    default:
      monthName = "Diciembre";
  }

  return monthName;
}

const getNombreEstadoOferta = (estado) => {
  let nombreEstado = "Contrato Finalizado";
  switch(estado) {
    case 0:
      nombreEstado = "Aceptada";
      break;
    case 1:
      nombreEstado = "Declinada";
      break;
    case 2:
      nombreEstado = "Null";
      break;
    case 3:
      nombreEstado = "Rechazada";
      break;
    case 4:
      nombreEstado = "Contrato Borrador";
      break;
    default:
      nombreEstado = "Contrato Finalizado";
  }
      
  return nombreEstado;
}

const getVisitEventCalendarLink = (direccion, fecha, horaInicio, horaTermino, tipoCalendario) => {
  let startDateTime = `${fecha}T${horaInicio}:00`;
  let finishDateTime = `${fecha}T${horaTermino}:00`;
  const config = {
    title: `Visita propiedad Propins`,
    location: direccion,
    description: `Visita a la propiedad ubicada en ${direccion} agendada a través de Propins`,
    start: new Date(startDateTime),
    end: new Date(finishDateTime),
  }

  let calendar;
  if (tipoCalendario === "google") {
    calendar = new GoogleCalendar(config);
  } else {
    calendar = new OutlookCalendar(config);
  }
  
  return calendar.render();
}

export default {
  formatNumeros,
  getUrlParameter,
  mobilecheck,
  checkRut,
  checkEmail,
  downloadPDFfromBase64,
  array_move,
  formatRut,
  getNombreEstadoPropiedad,
  formatToThousandSeparator,
  getDayNumber,
  getWeekday,
  getMonthName,
  getVisitEventCalendarLink,
  getNombreEstadoOferta
};
