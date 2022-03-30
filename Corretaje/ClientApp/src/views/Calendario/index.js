import React from "react";
import PageTitle from "../../components/common/PageTitle";
import {
  setUsuario,
  setPropiedadesPaginadas,
  getPropiedadesPaginadas,
  getSuscripciones,
  getAgendaClienteByPropiedadId,
  getVisitasClienteByFechaAndId,
  postAgendarVisitaBrokerSuscriptor,
  getVisitasFiltradas,
  getPropiedadById,
  getSuscripcion,
  setPropiedad,
  setSuscripcion,
  setAgendaCliente,
  postAgendarVisitaUsuario,
  getUsuario
} from "../../action";
import { connect } from "react-redux";
import { Container, Row, Col } from "shards-react";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import moment from "moment";
import { Formik, Form } from "formik";
import { SelectFieldGroup } from "../../utils/Input";
import "moment/locale/es";
import util from "../../utils/utilsFunctions";

class IndexCalendario extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      idPropiedad: "",
      diaElegido: null,
      bloquesDia: null,
      idClientePropiedad: null,
      idSuscripcion: "",
      fechaSeleccionada: "",
      fechaSeleccionadaMoment: null,
      horaSeleccionada: "",
      idBroker: ""
    };

    const {
      setUsuario,
      setPropiedadesPaginadas,
      getSuscripciones,
      setPropiedad,
      setAgendaCliente,
      getUsuario
    } = this.props;
    setUsuario(null);
    setPropiedadesPaginadas(null);
    getSuscripciones(1, 999);
    getUsuario();
    setPropiedad(null);
    setAgendaCliente(null);
  }

  componentDidUpdate(prevProps, newProps) {
    const { getPropiedadesPaginadas, usuario } = this.props;
    if (usuario != prevProps.usuario) {
      if (usuario && usuario.userId != null) {
        if (usuario.tipoCuenta == 10) {
          getPropiedadesPaginadas("", usuario.userId, 1, 999);
        } else {
          getPropiedadesPaginadas("", "", 1, 999);
        }
      }
    }
  }

  getSuscripcionesOptions = (suscripciones) => {
    let options = [];
    options.push({ value: "", label: "Seleccione..." });
    suscripciones.forEach((s) => {
      let nombre = `${s.nombreUsuario} - ${s.emailUsuario}`;
      options.push({
        value: s.id,
        label: nombre,
      });
    });
    return options;
  };

  getPropiedadesOptions = (propiedades) => {
    let options = [];
    options.push({ value: "", label: "Seleccione..." });

    propiedades
      .filter((items) => items.planContratado !== null)
      .filter((items) => items.planContratado.nombre !== "FAST")
      //.filter((items) => items.horarioVisitas !== null)

      .forEach((p) => {
        let direccion = "";
        if (p.tipoPropiedad == "Casa" && p.nombreCalle == null) {
          direccion = `${p.direccionReferencial} ${p.numero}, ${p.comuna}`;
        }

        if (p.tipoPropiedad == "Casa" && p.nombreCalle !== null) {
          direccion = `${p.nombreCalle} ${p.numero}, ${p.comuna}`;
        }

        if (p.tipoPropiedad !== "Casa" && p.nombreCalle == null) {
          direccion = `${p.direccionReferencial} ${p.numero} departamento ${
            p.numeroDepartamento
          }, ${p.comuna}`;
        }
        if (p.tipoPropiedad !== "Casa" && p.nombreCalle !== null) {
          direccion = `${p.nombreCalle} ${p.numero} departamento ${
            p.numeroDepartamento
          }, ${p.comuna}`;
        }
        options.push({
          value: p.id,
          label: direccion,
        });
      });
    return options;
  };

  onChangePropiedad = (e) => {
    this.setState({
      idPropiedad: e.target.value,
      fechaSeleccionada: "",
      fechaSeleccionadaMoment: null,
    });
    const { getAgendaClienteByPropiedadId, getPropiedadById } = this.props;
    getAgendaClienteByPropiedadId(e.target.value);
    getPropiedadById(e.target.value);
  };

  onChangeSuscriptor = (e) => {
    const { getSuscripcion } = this.props;
    getSuscripcion(e.target.value);
    this.setState({
      idSuscripcion: e.target.value,
    });
  };

  onChangeFechaVisita = (e) => {
    const {
      getVisitasClienteByFechaAndId,
      getVisitasFiltradas,
      propiedad,
    } = this.props;
    if (
      propiedad != null &&
      propiedad.data != null &&
      propiedad.data.idCliente != null &&
      propiedad.data.idBroker != null
    ) {
      getVisitasClienteByFechaAndId(e.target.value, propiedad.data.idCliente);
      //getVisitasBrokerSuscriptor(e.target.value, "", "", this.state.idSuscripcion, false, true, false, false);
      getVisitasFiltradas(e.target.value, "", propiedad.data.idBroker, "", false, true, false, false);
    }

    this.setState({
      fechaSeleccionada: e.target.value,
      fechaSeleccionadaMoment: moment(e.target.value),
    });
  };

  onChangeHoraVisita = (e) => {
    this.setState({
      horaSeleccionada: e.target.value,
    });
  };

  getFechasDisponibles = (daysNombre) => {
    let days = [];
    let diasOfweek = Object.keys(daysNombre.bloques);
    let options = [];

    options.push({
      label: "--Seleccione--",
      value: "",
    });

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

      options.push({
        label: moment(DaySum).format("LL"),
        value: moment(DaySum).format("YYYY-MM-DD"),
      });
    }

    return options.sort((a, b) =>
      a.value > b.kvalueey ? 1 : b.value > a.value ? -1 : 0
    );
  };

  renderHorasDisponibles = () => {
    const {
      agendaCliente,
      visitasCliente,
      visitasBrokerSuscriptor,
    } = this.props;
    const { fechaSeleccionada } = this.state;

    let dayNumber = 0;
    let bloquesDay = [];
    let tramosDisponibles = [];
    tramosDisponibles.push({
      label: "--Seleccione--",
      value: "",
    });
    dayNumber = moment(fechaSeleccionada).isoWeekday();

    if (agendaCliente != null) {
      if (dayNumber === 1) bloquesDay = agendaCliente.bloques["Lunes"];
      if (dayNumber === 2) bloquesDay = agendaCliente.bloques["Martes"];
      if (dayNumber === 3) bloquesDay = agendaCliente.bloques["Miercoles"];
      if (dayNumber === 4) bloquesDay = agendaCliente.bloques["Jueves"];
      if (dayNumber === 5) bloquesDay = agendaCliente.bloques["Viernes"];
      if (dayNumber === 6) bloquesDay = agendaCliente.bloques["Sabado"];
      if (dayNumber === 7) bloquesDay = agendaCliente.bloques["Domingo"];

      if (bloquesDay != null && bloquesDay.length > 0) {
        visitasCliente !== null &&
          visitasCliente.map((t) => {
            bloquesDay = bloquesDay.filter((item) => item.tramo !== t);
            return null;
          });

        visitasBrokerSuscriptor !== null &&
          visitasBrokerSuscriptor.map((t) => {
            bloquesDay = bloquesDay.filter((item) => item.tramo !== t);
            return null;
          });

        bloquesDay.forEach((b) => {
          tramosDisponibles.push({
            label: b.tramo,
            value: b.tramo,
          });
        });
      }

      return tramosDisponibles;
    }
  };

  onSubmit = (data) => {
    const {
      idPropiedad,
      idSuscripcion,
      fechaSeleccionada,
      fechaSeleccionadaMoment,
      horaSeleccionada,
    } = this.state;
    const {
      propiedad,
      postAgendarVisitaUsuario,
    } = this.props;

    let horaInicio = horaSeleccionada.split("-")[0];
    let horaTermino = horaSeleccionada.split("-")[1];

    let ubicacion = "";
    if (
      propiedad &&
      propiedad != null &&
      propiedad.data != null &&
      propiedad.data.tipoPropiedad == "Casa"
    ) {
      ubicacion = `${propiedad.data.nombreCalle} ${propiedad.data.numero}, ${
        propiedad.data.comuna
      }`;
    } else {
      ubicacion = `${propiedad.data.nombreCalle} ${
        propiedad.data.numero
      } departamento ${propiedad.data.numeroDepartamento}, ${
        propiedad.data.comuna
      }`;
    }

    let linkAddToGoogleCalendar = util.getVisitEventCalendarLink(
      ubicacion,
      fechaSeleccionada,
      horaInicio,
      horaTermino,
      "google"
    );
    let linkAddToOutlookCalendar = util.getVisitEventCalendarLink(
      ubicacion,
      fechaSeleccionada,
      horaInicio,
      horaTermino,
      "outlook"
    );

    /*
      let ubicacion = propiedad && `${propiedad.direccionReferencial}, ${propiedad.comuna}`;
      let linkAddToGoogleCalendar = getVisitEventCalendarLink(ubicacion, moment(dayShowcalendar).format("YYYY-MM-DD"), horaInicio, horaTermino, "google");
      let linkAddToOutlookCalendar = getVisitEventCalendarLink(ubicacion, moment(dayShowcalendar).format("YYYY-MM-DD"), horaInicio, horaTermino, "outlook");

      let datos = {
        fecha: new Date(moment(dayShowcalendar)),
        clienteId: funcs.getUrlParameter("idCliente"),
        usuarioId: userId,
        dia: moment(dayShowcalendar).isoWeekday(),
        tramo: hora,
        propiedadId: funcs.getUrlParameter("idprop"),
        linkAgregarEventoAGoogleCalendar: linkAddToGoogleCalendar,
        linkAgregarEventoAOutlookCalendar: linkAddToOutlookCalendar
      };

      let res = await api.apiPostAgendaVisitaUsuario(datos);
      */
    let datos = {
      fecha: new Date(fechaSeleccionadaMoment),
      clienteId:
        propiedad && propiedad.data && propiedad.data.idCliente
          ? propiedad.data.idCliente
          : null,
      idBroker: propiedad.data.idBroker,
      idSuscripcion,
      dia: fechaSeleccionadaMoment.isoWeekday(),
      tramo: horaSeleccionada,
      propiedadId: idPropiedad,
      linkAgregarEventoAGoogleCalendar: linkAddToGoogleCalendar,
      linkAgregarEventoAOutlookCalendar: linkAddToOutlookCalendar,
      //propiedadDireccion: ubicacion,
      tipoPropiedad: propiedad && propiedad.data && propiedad.data.tipoPropiedad
      ? propiedad.data.tipoPropiedad
      : ""
    };
    
    postAgendarVisitaUsuario(datos);
  };

  feedback = () => {
    const {
      requestAgendarVisita,
      requestPropiedadesPaginadas,
      errorMessage
    } = this.props;
    if (
      requestAgendarVisita === "LOADING" ||
      requestPropiedadesPaginadas === "LOADING"
    ) {
      Swal.showLoading();
    }
    if (requestAgendarVisita === "SUCCESS") {
      Swal.fire({
        icon: "success",
        title: "Visita agendada",
        text: "Se ha agendado la visita exitosamente",
        onAfterClose: () => {
          window.location.reload();
        },
      });
    }
    if (requestPropiedadesPaginadas === "SUCCESS") {
      Swal.close();
    }

    if (requestAgendarVisita === "ERROR") {
      Swal.fire("Error", errorMessage, "error");
    }
  };

  render() {
    const {
      idPropiedad,
      idSuscripcion,
      fechaSeleccionada,
      horaSeleccionada,
    } = this.state;
    let propiedadesOptions = [];
    let suscriptoresOptions = [];
    let fechasOptions = [];
    let horasOptions = [];
    const {
      propiedad,
      propiedadesPaginadas,
      suscripciones,
      agendaCliente,
      requestVisitasBrokerSuscriptor,
      requestVisitasCliente,
      requestAgendaCliente
    } = this.props;

    if (
      propiedadesPaginadas !== null &&
      propiedadesPaginadas.results !== null &&
      propiedadesPaginadas.results.length > 0
    ) {
      propiedadesOptions = this.getPropiedadesOptions(
        propiedadesPaginadas.results //aqui tenemos que solo meter las no fast
      );
    }    

    if (suscripciones != null && suscripciones.results) {
      suscriptoresOptions = this.getSuscripcionesOptions(suscripciones.results);
    }

    if (agendaCliente != null && agendaCliente.bloques != null) {
      fechasOptions = this.getFechasDisponibles(agendaCliente);
    }

    horasOptions = this.renderHorasDisponibles();

    return (
      <Container fluid className="main-content-container px-4">
        {this.feedback()}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Agendar Visita a Propiedades"
            subtitle="Calendario"
            className="text-sm-left"
          />
        </Row>
        <Formik
          initialValues={{
            idPropiedad: idPropiedad,
            idSuscripcion: idSuscripcion,
            fechaVisita: fechaSeleccionada,
            horaVisita: horaSeleccionada,
          }}
          validate={validate}
          onSubmit={this.onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => (
            <>
              <Form onSubmit={handleSubmit} className="form-container">
                <Row>
                  <Col>
                    <SelectFieldGroup
                      label="Selecciona una Propiedad:"
                      name="idPropiedad"
                      arrayOps={propiedadesOptions}
                      onChange={this.onChangePropiedad}
                      value={idPropiedad}
                      className="select-visitas"
                    />
                  </Col>
                  <Col>
                    <SelectFieldGroup
                      label="Selecciona un Cliente para que visite la propiedad (Suscriptor):"
                      name="idSuscripcion"
                      arrayOps={suscriptoresOptions}
                      onChange={this.onChangeSuscriptor}
                      value={idSuscripcion}
                    />
                  </Col>
                </Row>
                {requestAgendaCliente == "LOADING" && <div>Cargando...</div>}

                {requestAgendaCliente !== "LOADING" &&
                  propiedad &&
                  propiedad.data.idBroker == "" && (
                    <div>
                      La propiedad seleccionada no tiene un broker a
                      cargo,porfavor vuelve a "Propiedades" selecciona un broker
                      y vuelve a intentar {propiedad.data.idBroker}
                    </div>
                  )}

                {requestAgendaCliente !== "LOADING" &&
                  propiedad &&
                  fechasOptions &&
                  fechasOptions.length <= 1 && (
                    <div>
                      La propiedad seleccionada no tiene fechas disponibles,
                      regrese a agenda cliente y seleccione dias y horas para
                      que visiten la propiedad
                    </div>
                  )}

                {requestAgendaCliente !== "LOADING" &&
                  fechasOptions &&
                  fechasOptions.length > 1 && (
                    <Row>
                      <Col md={6}>
                        <SelectFieldGroup
                          label="Selecciona el día de la visita:"
                          name="fechaVisita"
                          arrayOps={fechasOptions}
                          onChange={this.onChangeFechaVisita}
                          value={fechaSeleccionada}
                        />
                      </Col>
                      <Col md={6}>
                        {requestVisitasCliente === "LOADING" ||
                          (requestVisitasBrokerSuscriptor === "LOADING" && (
                            <div>Cargando...</div>
                          ))}

                        {fechaSeleccionada &&
                          requestVisitasCliente !== "LOADING" &&
                          requestVisitasBrokerSuscriptor !== "LOADING" &&
                          propiedad &&
                          horasOptions &&
                          horasOptions.length <= 1 && (
                            <div>
                              La propiedad seleccionada no tiene horas
                              disponibles, esto puede pasar porque ya tiene
                              todas las horas tomadas, regresa a agenda cliente
                              y selecciona mas horas para que tenga mas opciones
                            </div>
                          )}

                        {(requestVisitasCliente !== "LOADING" ||
                          requestVisitasBrokerSuscriptor !== "LOADING") &&
                          horasOptions &&
                          horasOptions.length > 1 && (
                            <SelectFieldGroup
                              label="Selecciona la Hora de la visita:"
                              name="horaVisita"
                              arrayOps={horasOptions}
                              onChange={this.onChangeHoraVisita}
                              value={horaSeleccionada}
                              disabled={!fechaSeleccionada}
                            />
                          )}
                      </Col>
                    </Row>
                  )}
                <div className="center text-center">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={
                      !(
                        idPropiedad &&
                        idSuscripcion &&
                        fechaSeleccionada &&
                        horaSeleccionada
                      )
                    }
                  >
                    Enviar
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </Container>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  /*
  if (!formValues.idPropiedad) {
    errors.idPropiedad = "Por favor seleccione una propiedad";
  }
  if (!formValues.idSuscripcion) {
    errors.idSuscripcion = "Por favor seleccione un suscriptor";
  }
  if (!formValues.fechaVisita) {
    errors.fechaVisita = "Por favor seleccione una fecha";
  }
  if (!formValues.horaVisita) {
    errors.horaVisita = "Por favor seleccione una hora";
  }
  */
  return errors;
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.app.errorMessage,
    propiedadesPaginadas: state.app.propiedadesPaginadas,
    requestPropiedadesPaginadas: state.app.requestPropiedadesPaginadas,
    suscripciones: state.app.suscripciones,
    agendaCliente: state.app.agendaCliente,
    requestAgendaCliente: state.app.requestAgendaCliente,
    visitasCliente: state.app.visitasCliente,
    requestVisitasCliente: state.app.requestVisitasCliente,
    requestAgendarVisita: state.app.requestAgendarVisita,
    visitasBrokerSuscriptor: state.app.visitasBrokerSuscriptor,
    requestVisitasBrokerSuscriptor: state.app.requestVisitasBrokerSuscriptor,
    propiedad: state.app.propiedad,
    requestGetPropiedad: state.app.requestGetPropiedad,
    suscripcion: state.app.suscripcion,
    usuario: state.app.usuario
  };
};

const mapDispatchToProps = (dispatch) => ({
  setUsuario: (value) => dispatch(setUsuario(value)),
  setPropiedadesPaginadas: (value) => dispatch(setPropiedadesPaginadas(value)),
  getPropiedadesPaginadas: (estado, idBroker, page, pageSize) =>
    dispatch(getPropiedadesPaginadas(estado, idBroker, page, pageSize)),
  getSuscripciones: (page, pageSize) =>
    dispatch(getSuscripciones(page, pageSize)),
  getAgendaClienteByPropiedadId: (idPropiedad) =>
    dispatch(getAgendaClienteByPropiedadId(idPropiedad)),
  getVisitasClienteByFechaAndId: (fecha, id) =>
    dispatch(getVisitasClienteByFechaAndId(fecha, id)),
  postAgendarVisitaBrokerSuscriptor: (data) =>
    dispatch(postAgendarVisitaBrokerSuscriptor(data)),
  getVisitasFiltradas: (fechaInicial, fechaFinal, idBroker, idSuscripcion, mostrarSoloSinConfirmar, mostrarSoloTramos, incluirVisitasPasadas, incluirVisitasFuturas) =>
    dispatch(getVisitasFiltradas(fechaInicial, fechaFinal, idBroker, idSuscripcion, mostrarSoloSinConfirmar, mostrarSoloTramos, incluirVisitasPasadas, incluirVisitasFuturas)),
  getPropiedadById: (id) => dispatch(getPropiedadById(id)),
  getSuscripcion: (id) => dispatch(getSuscripcion(id)),
  setPropiedad: (propiedad) => dispatch(setPropiedad(propiedad)),
  setSuscripcion: (suscripcion) => dispatch(setSuscripcion(suscripcion)),
  setAgendaCliente: (agendaCliente) =>
    dispatch(setAgendaCliente(agendaCliente)),
  postAgendarVisitaUsuario: (data) => dispatch(postAgendarVisitaUsuario(data)),
  getUsuario: () => dispatch(getUsuario()),
  dispatch: (action) => {
    dispatch(action);
  },
});

IndexCalendario = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexCalendario);

export default IndexCalendario;
