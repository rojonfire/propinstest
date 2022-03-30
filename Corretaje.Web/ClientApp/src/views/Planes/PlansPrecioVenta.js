import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import Schedule from "../../components/Schedule";
import { connect } from "react-redux";
import { fetchGetUF, setDatosPropiedad } from "../../action";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  getVisitasFotografoByFecha,
  getAgendaFotografo,
  setAgendaCliente,
} from "../../action";
import DatePicker from "react-date-picker";
import moment from "moment";

class PlansPrecioVenta extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      total: 0,
      msj: "CONTINUAR SIN ADICIONALES",
      token: null,
      url: null,
      show: false,
      tipo: 1, // tipo 0 sin adicionales / tipo 1 con adicionales
      anchorEl: null,
      open: false,
      id: undefined,
      currentStep: 5,
      tipo_moneda: "CLP",
      schedule: undefined,
      valor: 0,
      idFotografo: undefined,
      bloques: undefined,
      bloqueSeleccionado: undefined,
      tramoSeleccionado: undefined,
      tramosDisponiblesOptions: undefined,
      currentDate: new Date(moment().add(2, "days").format("YYYY-MM-DD")),
      startDate: new Date(moment().add(2, "days").format("YYYY-MM-DD")),
      msjFecha: "Seleccione fecha...",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handlePhotographerId = this.handlePhotographerId.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    const { getAgendaFotografo, dispatch } = this.props;
    getAgendaFotografo();
    dispatch(setAgendaCliente(null));
  }

  componentDidMount(prevProps) {
    document.querySelector("body").scrollTo(0, 0);

    const { agendaFotografo } = this.props;

    if (agendaFotografo !== undefined) {
      this.setState({
        bloques: agendaFotografo,
        datesAvailable: this.parseDaysAvailable(agendaFotografo),
      });
    }
  }

  parseDaysAvailable = (daysNombre) => {
    let diasFoto = [];
    if (daysNombre !== undefined) {
      daysNombre.forEach((item) => {
        diasFoto = { ...diasFoto, ...item.bloques };
      });

      let buttonFirts = [];
      let days = [];
      let diasOfweek = Object.keys(diasFoto);

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
          DaySum = moment().day(DayEvl).add({ days: 7 });
        }

        buttonFirts.push(moment(DaySum));
      }

      buttonFirts = buttonFirts.sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));
      this.handleDateChange(this.state.currentDate);

      return buttonFirts;
    }
  };

  handleClick(event) {
    this.setState({
      anchorEl: event.currentTarget,
      open: Boolean(event.currentTarget),
      id: "simple-popover",
    });
  }

  handleClose(event) {
    this.setState({
      anchorEl: event.currentTarget,
      open: false,
      id: undefined,
    });
  }

  handleChangeValor = (event) => {
    this.setState({ valor: event.target.value });
  };

  handleCheck = (val) => {
    this.setState({ schedule: val });
  };

  continuar = (values) => {
    const { updateStep } = this.props;
    const { idFotografo, currentDate, tramoSeleccionado } = this.state;

    const precioVentaData = {
      valorPropiedad: values.Valor_prop,
      tipoMoneda: values.tipo_moneda,
      photographerVisitDate: moment(currentDate).format("YYYY-MM-DD"),
      photographerVisitTime: tramoSeleccionado,
      photographerId: idFotografo,
      schedule: this.state.schedule,
    };
    this.props.formData(this.state.currentStep, precioVentaData);
    updateStep({});
  };

  handleChange(tipoMoneda) {
    this.setState({
      tipo_moneda: tipoMoneda,
    });
  }

  handlePhotographerId = (photographerId) => {
    this.setState({
      photographerId,
    });
  };

  handleDateChange = (selectedDate) => {
    const { getVisitasFotografoByFecha } = this.props;
    if (selectedDate === null) {
      selectedDate = this.state.startDate;
    }

    getVisitasFotografoByFecha(moment(selectedDate).format("YYYY-MM-DD"));

    this.setState({
      currentDate: selectedDate,
      msjFecha: "No se encontraron horas para la fecha seleccionada",
    });
  };

  getTramosDisponibles = (selectedDate) => {
    const { visitaFotografo, agendaFotografo } = this.props;

    const diasSemana = [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo",
    ];

    let dayNumber = 0;
    dayNumber = moment(new Date(selectedDate)).isoWeekday();

    const getDayText = (diaTexto) => {
      if (diaTexto === 1) return "Lunes";
      if (diaTexto === 2) return "Martes";
      if (diaTexto === 3) return "Miercoles";
      if (diaTexto === 4) return "Jueves";
      if (diaTexto === 5) return "Viernes";
      if (diaTexto === 6) return "Sabado";
      if (diaTexto === 7) return "Domingo";
    };

    const getDayNumber = (diaTexto) => {
      if (diaTexto === "Lunes") return 1;
      if (diaTexto === "Martes") return 2;
      if (diaTexto === "Miercoles") return 3;
      if (diaTexto === "Jueves") return 4;
      if (diaTexto === "Viernes") return 5;
      if (diaTexto === "Sabado") return 6;
      if (diaTexto === "Domingo") return 7;
    };

    let data = [];

    if (agendaFotografo != null) {
      agendaFotografo.forEach((item) => {
        diasSemana.forEach((it) => {
          if (item.bloques[it] && item.bloques[it].length > 0) {
            data.push({
              tramos: item.bloques[it],
              dia: it,
              diaNumero: getDayNumber(it),
              idFotografo: item.id,
            });
          }
        });
      });
    }

    let BloquesForChooseDay = [];

    let bloquesChoose = data.filter(function (diaFoto) {
      return diaFoto.dia === getDayText(dayNumber);
    });

    bloquesChoose.forEach((item) => {
      item.tramos.forEach((t) => {
        BloquesForChooseDay.push({
          tramo: t.tramo,
          id: item.idFotografo,
        });
      });
    });

    if (visitaFotografo != undefined && visitaFotografo != null) {
      visitaFotografo.map((t) => {
        BloquesForChooseDay = BloquesForChooseDay.filter(
          (item) => item.tramo !== t
        );
        return null;
      });
    }

    return BloquesForChooseDay;
  };

  renderOptions = (tramosDisponibles) => {
    let options = [];
    options.push(
      <option key={""} value={""}>
        Seleccione...
      </option>
    );

    let unsorted = [];
    let sorted = [];
    let numHours = [];
    tramosDisponibles.forEach((p) => {
      let numHour = parseInt(p.tramo.split(":")[0]);
      let obj = {
        tramo: parseInt(p.tramo.split(":")[0]),
        idFotografo: p.id,
      };
      if (!numHours.includes(numHour)) {
        unsorted.push(obj);
        numHours.push(numHour);
      }
    });

    unsorted.sort(function (a, b) {
      return a.tramo - b.tramo;
    });

    unsorted.forEach((k) => {
      let hour = "";
      if (String(k.tramo).length === 1) {
        hour = "0" + String(k.tramo);
      } else {
        hour = String(k.tramo);
      }

      hour += ":00";

      let tramoOrdenado = {
        tramo: hour,
        idFotografo: k.idFotografo,
      };

      sorted.push(tramoOrdenado);
    });

    sorted.forEach((p) => {
      options.push(
        <option key={p.tramo} value={`${p.idFotografo};${p.tramo}`}>
          {p.tramo}
        </option>
      );
    });

    return options;
  };

  handleTimeChange = (value) => {
    let horaSeleccionada = value.target.value.split(";");
    let idFotografo = horaSeleccionada[0];
    let tramoSeleccionado = horaSeleccionada[1];
    this.setState({
      tramoSeleccionado,
      idFotografo,
      bloqueSeleccionado: value.target.value,
    });
  };

  validarTramoError = () => {
    if (
      this.state.bloqueSeleccionado === undefined ||
      this.state.bloqueSeleccionado === ""
    ) {
      return (
        <div className="contact-error">
          Por favor, ingrese una hora de visita de fotógrafo
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  renderTimePicker = (options, timePickerClass) => {
    const { requestLoadingVisitaFotografo } = this.props;
    if (requestLoadingVisitaFotografo) {
      return <div>Cargando horas...</div>;
    }
    if (options !== undefined && options.length > 1) {
      return (
        <Field
          className={timePickerClass}
          component="select"
          name="horaVisitaFotografo"
          //onBlur={handleBlur}
          onChange={this.handleTimeChange}
          value={this.state.bloqueSeleccionado}
        >
          {options}
        </Field>
      );
    } else {
      return <div>{this.state.msjFecha}</div>;
    }
  };

  render() {
    const { currentDate, bloqueSeleccionado } = this.state;
    const tramosDisponibles = this.getTramosDisponibles(currentDate);
    const timeOptions = this.renderOptions(tramosDisponibles);
    let canContinue = false;
    if (bloqueSeleccionado !== undefined && bloqueSeleccionado !== "") {
      canContinue = true;
    }

    return (
      <Container>
        <section className={"Precioventatitulo"}>
          <div className={"titulo-planes-formulario"}>Precio</div>
        </section>

        <section className={"hideMOBILE precio-venta-form"}>
          <Formik
            initialValues={{
              Valor_prop: this.state.valor,
              tipo_moneda: this.state.tipo_moneda,
              fechaVisitaFotografo: this.state.currentDate,
              horaVisitaFotografo: this.state.horaVisitaFotografo,
            }}
            validate={validate}
            onSubmit={this.continuar}
            enableReinitialize={true}
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
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col sm={"3"}>
                    <div className="">
                      <label className="contact-proper">Valor</label>
                    </div>
                    <div>
                      <Field
                        className="largo-estatico-peque"
                        name="Valor_prop"
                        onChange={(event) => this.handleChangeValor(event)}
                        value={this.state.valor}
                      />
                    </div>

                    <ErrorMessage
                      name="Valor_prop"
                      className="contact-error"
                      component="div"
                    />
                  </Col>
                  <Col sm={"2"} className="pt-4">
                    <FormControlLabel
                      value="UF"
                      control={<Checkbox color="default" />}
                      label="UF"
                      labelPlacement="end"
                      name="tipo_moneda"
                      onBlur={handleBlur}
                      checked={this.state.tipo_moneda === "UF" ? true : false}
                      onChange={() => this.handleChange("UF")}
                    />
                  </Col>
                  <Col sm={"2"} className="pt-4">
                    <FormControlLabel
                      value="CLP"
                      control={<Checkbox color="default" />}
                      label="CLP"
                      labelPlacement="end"
                      name="tipo_moneda"
                      onBlur={handleBlur}
                      checked={this.state.tipo_moneda === "CLP" ? true : false}
                      onChange={() => this.handleChange("CLP")}
                    />
                  </Col>
                  <ErrorMessage
                    name="tipo_moneda"
                    className="contact-error"
                    component="div"
                  />
                </Row>
                <div className={"titulo-planes-formulario horario-fot-titulo"}>
                  Horario Fotógrafo
                </div>
                <div className={"sub-titulo-horario-fotografo"}>
                  Selecciona el horario que más te acomode para que nuestro
                  fotógrafo visite tu propiedad
                </div>

                <div>
                  <section className="hideMOBILE">
                    <Row>
                      <Col sm={"3"}>
                        <div className="contact-proper">Fecha</div>
                        <DatePicker
                          name="fechaVisitaFotografo"
                          value={this.state.currentDate}
                          onChange={this.handleDateChange}
                          minDate={this.state.startDate}
                          //maxDate={this.state.endDate}
                        />
                        <ErrorMessage
                          name="fechaVisitaFotografo"
                          className="contact-error"
                          component="div"
                        />
                      </Col>
                      <Col sm={"3"}>
                        <div className="contact-proper">Hora</div>
                        {this.renderTimePicker(
                          timeOptions,
                          "largo-estatico-peque2"
                        )}
                        {this.validarTramoError()}
                      </Col>
                    </Row>
                  </section>
                </div>

                <div className={"titulo-planes-formulario horario-fot-titulo"}>
                  Horario Preferente de visitas
                </div>

                <div className={"sub-titulo-horario-fotografo"}>
                  Selecciona los horario que tienes disponible para que visiten
                  tu propiedad
                </div>
                <div className="mover-calendario-cliente">
                  <Schedule hideButton={true} onCheck={this.handleCheck} />
                </div>

                <div className={"mover-boton-derecha marginbor"}>
                  <Button
                    className={"center"}
                    type="submit"
                    disabled={!canContinue}
                  >
                    Continuar
                  </Button>
                </div>
                <div className={"center hideWEB2"}>
                  <Button
                    className={"center continuarMOBILE"}
                    type="submit"
                    disabled={!canContinue}
                  >
                    Continuar
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </section>

        <section className={"hideWEB2 precio-venta-form"}>
          <Formik
            initialValues={{
              Valor_prop: this.state.valor,
              tipo_moneda: this.state.tipo_moneda,
              fechaVisitaFotografo: this.state.currentDate,
              horaVisitaFotografo: this.state.bloqueSeleccionado,
            }}
            validate={validate}
            onSubmit={this.continuar}
            enableReinitialize={true}
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
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col sm={"3"}>
                    <div className="">
                      <label className="planes-label">Valor</label>
                    </div>
                    <div>
                      <Field
                        className="largo-opciones-select-planes"
                        name="Valor_prop"
                        onChange={(event) => this.handleChangeValor(event)}
                        value={this.state.valor}
                      />
                    </div>

                    <ErrorMessage
                      name="Valor_prop"
                      className="contact-error"
                      component="div"
                    />
                  </Col>
                  <Col className="uff">
                    <FormControlLabel
                      value="UF"
                      control={<Checkbox color="default" />}
                      label="UF"
                      labelPlacement="end"
                      name="tipo_moneda"
                      onBlur={handleBlur}
                      checked={this.state.tipo_moneda === "UF" ? true : false}
                      onChange={(e) => this.handleChange(e, "UF", values)}
                    />
                  </Col>
                  <Col className="uff2">
                    <FormControlLabel
                      value="CLP"
                      control={<Checkbox color="default" />}
                      label="CLP"
                      labelPlacement="end"
                      name="tipo_moneda"
                      onBlur={handleBlur}
                      checked={this.state.tipo_moneda === "CLP" ? true : false}
                      onChange={(e) => this.handleChange(e, "CLP", values)}
                    />
                  </Col>
                  <ErrorMessage
                    name="tipo_moneda"
                    className="contact-error"
                    component="div"
                  />
                </Row>
                <div className={"titulo-planes-formulario horario-fot-titulo"}>
                  Horario Fotógrafo
                </div>
                <div className={"sub-titulo-horario-fotografo"}>
                  Selecciona el horario que más te acomode para que nuestro
                  fotógrafo visite tu propiedad
                </div>

                <div>
                  <section className="hideWEB2">
                    <Row>
                      <Col sm={"3"}>
                        <div className="planes-label">Fecha</div>
                        <DatePicker
                          name="fechaVisitaFotografo"
                          value={this.state.currentDate}
                          onChange={this.handleDateChange}
                          minDate={this.state.startDate}
                          //maxDate={this.state.endDate}
                        />
                        <ErrorMessage
                          name="fechaVisitaFotografo"
                          className="contact-error"
                          component="div"
                        />
                      </Col>
                      <Col sm={"3"}>
                        <div className="planes-label">Hora</div>
                        {this.renderTimePicker(
                          timeOptions,
                          "largo-opciones-select-planes"
                        )}
                        {this.validarTramoError()}
                      </Col>
                    </Row>
                  </section>
                </div>

                <div className={"titulo-planes-formulario horario-fot-titulo"}>
                  Horario Preferente de visitas
                </div>

                <div className={"sub-titulo-horario-fotografo"}>
                  Selecciona los horario que tienes disponible para que visiten
                  tu propiedad
                </div>
                <div className="mover-calendario-cliente">
                  <Schedule hideButton={true} onCheck={this.handleCheck} />
                </div>

                <div className={"hideMOBILE mover-boton-derecha marginbor"}>
                  <Button
                    className={"center"}
                    type="submit"
                    disabled={!canContinue}
                  >
                    Continuar
                  </Button>
                </div>
                <div className={"center hideWEB2"}>
                  <Button
                    className={"center continuarMOBILE"}
                    type="submit"
                    disabled={!canContinue}
                  >
                    Continuar
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </section>
      </Container>
    );
  }
}

const validate = (formValues) => {
  let errors = {};

  if (formValues.Valor_prop === "") {
    errors.Valor_prop = "Por favor ingrese un valor de la propiedad";
  } else if (isNaN(formValues.Valor_prop)) {
    errors.Valor_prop = "Por favor ingrese solo números";
  } else if (!isNaN(formValues.Valor_prop) && formValues.Valor_prop <= 0) {
    errors.Valor_prop = "Por favor ingrese un valor mayor o igual a cero";
  }
  if (formValues.tipo_moneda === undefined || formValues.tipo_moneda === "") {
    errors.tipo_moneda = "Por favor ingrese un tipo de moneda";
  }
  if (
    formValues.fechaVisitaFotografo === undefined ||
    formValues.fechaVisitaFotografo === ""
  ) {
    errors.fechaVisitaFotografo =
      "Por favor ingrese una fecha de visita de fotógrafo";
  }

  return errors;
};

const mapStateToProps = (state) => ({
  requestLoadingVisitaFotografo: state.app.requestLoadingVisitaFotografo,
  visitaFotografo: state.app.visitaFotografo,
  requestLoadingAgendaFotografo: state.app.requestLoadingAgendaFotografo,
  agendaFotografo: state.app.agendaFotografo,
  data: state.app.data,
  uf: state.app.uf,
  ...state.app,
  ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  getUf: () => dispatch(fetchGetUF()),
  setDatosPropiedad: (datosProps) => dispatch(setDatosPropiedad(datosProps)),
  getVisitasFotografoByFecha: (fecha) =>
    dispatch(getVisitasFotografoByFecha(fecha)),
  getAgendaFotografo: () => dispatch(getAgendaFotografo()),
  dispatch: (action) => {
    dispatch(action);
  },
});

PlansPrecioVenta = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlansPrecioVenta);

export default PlansPrecioVenta;
