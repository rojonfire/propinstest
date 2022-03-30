/** @format */
import { OutlookCalendar, GoogleCalendar } from 'datebook'

const getTipoCuenta = (num) => {
  let tipoCuenta = "";
  switch (num) {
    case 0:
      tipoCuenta = "Administrador";
      break;
    case 1:
      tipoCuenta = "Usuario Web";
      break;
    case 3:
      tipoCuenta = "Fotografo";
      break;
    case 4:
      tipoCuenta = "Anfitrión";
      break;
    case 5:
      tipoCuenta = "Agente";
      break;
    case 6:
      tipoCuenta = "Administrador Inmobiliario";
      break;
    case 9:
      tipoCuenta = "Jefe de Ventas";
      break;
    case 10:
      tipoCuenta = "Broker";
      break;
    default:
      break;
  }
  return tipoCuenta;
};

const clean = (rut) => {
  return typeof rut === "string"
    ? rut.replace(/^0+|[^0-9kK]+/g, "").toUpperCase()
    : "";
};

const validate = (rut) => {
  if (typeof rut !== "string") {
    return false;
  }
  if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut)) {
    return false;
  }

  rut = clean(rut);

  var t = parseInt(rut.slice(0, -1), 10);
  var m = 0;
  var s = 1;

  while (t > 0) {
    s = (s + (t % 10) * (9 - (m++ % 6))) % 11;
    t = Math.floor(t / 10);
  }

  var v = s > 0 ? "" + (s - 1) : "K";
  return v === rut.slice(-1);
};

const checkRut = (rut) => {
  if (rut) {
    if (validate(rut)) {
      return null;
    }
    return "Rut no valido";
  }

  return "Por favor ingrese su rut";
};

const getWeekday = (dayNumber) => {
  let weekday = "Domingo";
  switch (dayNumber) {
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
};

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
  if (tipoCalendario == "google") {
    calendar = new GoogleCalendar(config);
  } else {
    calendar = new OutlookCalendar(config);
  }
  
  return calendar.render();
}

export default {
  getTipoCuenta,
  checkRut,
  getWeekday,
  getVisitEventCalendarLink
};
