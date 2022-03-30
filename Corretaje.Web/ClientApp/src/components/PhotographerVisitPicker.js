import React from "react";
import {
    Row,
    Col,
} from "react-bootstrap";
import api from "../api";
import DatePicker from 'react-date-picker';
import moment from "moment";
import { Formik, Field, ErrorMessage } from "formik";

class PhotographerVisitPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bloques: undefined,
      currentDate: new Date(),
      startDate: undefined,
      endDate: undefined,
      datesAvailable: undefined,
      tramosDisponibles: undefined,
      tramosDisponiblesOptions: undefined, 
      tramoSeleccionado: undefined,
      idFotografo: undefined
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount = async () => {
    const bloques = await api.apiGetAgendaFotografo();
    this.setState({
      bloques: bloques.data,
      datesAvailable: this.parseDaysAvailable(bloques.data),
    });
    if (this.state.datesAvailable && this.state.datesAvailable.length > 0) {
      this.setState({
        currentDate: new Date(this.state.datesAvailable[0]),
        startDate: new Date(this.state.datesAvailable[0]),
        endDate: new Date(this.state.datesAvailable[this.state.datesAvailable.length - 1])
      });
      this.handleChange(this.state.startDate);
    }

  }

  parseDaysAvailable = (daysNombre) => {
    let diasFoto = [];
    daysNombre.forEach(item => {
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
        DaySum = moment()
          .day(DayEvl)
          .add({ days: 7 });
      }

      buttonFirts.push(moment(DaySum));

    }

    buttonFirts = buttonFirts.sort((a, b) =>
      a > b ? 1 : b > a ? -1 : 0,
    );

    return buttonFirts;
  };

  handleChange = async selectedDate => {
    this.setState({
      currentDate: selectedDate
    });
    
    const visitasFotografoPorFecha = await api.apiGetVisitasFotografoByFecha(
      moment(selectedDate).format("YYYY-MM-DD")
    );
    
    const diasSemana = [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo"
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
    }

    let data = [];

    if (this.state.bloques) {
      this.state.bloques.forEach(item => {
        diasSemana.forEach(it => {
          if (item.bloques[it] && item.bloques[it].length > 0) {
            data.push({
              tramos: item.bloques[it],
              dia: it,
              diaNumero: getDayText(it),
              idFotografo: item.id
            });
          }
        });
      });
    }

    let BloquesForChooseDay = [];

    if (visitasFotografoPorFecha != undefined && visitasFotografoPorFecha.data != undefined) {
      let tramosOcupados = visitasFotografoPorFecha.data;

      let bloquesChoose = data.filter(function(diaFoto) {
        return diaFoto.dia === getDayText(dayNumber);
      });
  
      bloquesChoose.forEach(item => {
        item.tramos.forEach(t => {
          BloquesForChooseDay.push({
            tramo: t.tramo,
            id: item.idFotografo
          });
        });
      });
  
      tramosOcupados !== null &&
        tramosOcupados.map(t => {
          BloquesForChooseDay = BloquesForChooseDay.filter(
            item => item.tramo !== t
          );
          return null;
        }
      );
      
      this.setState({
        tramosDisponibles: BloquesForChooseDay
      });
  
      this.renderOptions(this.state.tramosDisponibles);
  
      this.props.photographerVisitDate(this.state.currentDate);
    }
  }

  renderOptions = tramosDisponibles => {
    let options = [];
    options.push(
      <option key={""} value={""}>
        Seleccione...
      </option>
    )

    let unsorted = [];
    let sorted = []
    tramosDisponibles.forEach(p => {
      let obj = parseInt(p.tramo.split(":")[0]);
      if (!unsorted.includes(obj)) {
        unsorted.push(obj);
      }
    });

    unsorted.sort(function(a, b){return a-b});

    unsorted.forEach(k => {
      var hour = "";

      if (String(k).length == 1) {
          hour = "0";
        }
      sorted.push(hour + String(k)+":00");
    });

    sorted.forEach(p => {
      options.push(
        <option key={p} value={p}>{p}</option>
      )
    })
    this.setState({
      tramosDisponiblesOptions: options
    });
  }

  handleTimeChange = value => {
    let currentOptions = [];
    this.state.tramosDisponiblesOptions.forEach((c, index) => {
      if (c.key !== "") {
        currentOptions.push(c);
      }
    })
    this.state.tramosDisponibles.forEach(i => {
      if (i.tramo == value.target.value) {
        this.props.photographerId(i.id);
        this.setState({
          tramoSeleccionado: i.tramo,
          idFotografo: i.id,
          tramosDisponiblesOptions: currentOptions
        });
      }
    });

    this.props.photographerVisitTime(value.target.value);
    
  }

  validate = (formValues) => {
    let errors = {};
    if (formValues.fechaVisitaFotografo === "") {
      errors.fechaVisitaFotografo = "Por favor ingrese fecha de visita de fotógrafo";
    }
    if (formValues.horaVisitaFotografo === "") {
      errors.fechaVisitaFotografo = "Por favor ingrese hora de visita de fotógrafo";
    }
    return errors;
  }

  render() {
    return (
      <div>
        <section className="hideMOBILE">
      <Formik
        initialValues={{
          fechaVisitaFotografo: this.state.startDate,
          horaVisitaFotografo: this.state.tramoSeleccionado
        }}
        validate={this.validate}
        enableReinitialize={true}
      >
        {({}) => (
          <form>
            <Row>
              <Col sm={"3"}>
                <div className="contact-proper">
                  Fecha
                </div>
                <DatePicker
                  name="fechaVisitaFotografo"
                  value={this.state.currentDate}
                  onChange={this.handleChange}
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
                <div className="contact-proper">
                  Hora
                </div>
                <Field
                  className="largo-estatico-peque2"
                  component="select"
                  name="horaVisitaFotografo"
                  //onBlur={handleBlur}
                  onChange={this.handleTimeChange}
                  value={this.state.tramoSeleccionado}
                >
                    {this.state.tramosDisponiblesOptions}
                </Field>
                <ErrorMessage
                  name="horaVisitaFotografo"
                  className="contact-error"
                  component="div"
                />
              </Col>
            </Row>
          </form>
          )
        }
      </Formik>
    </section>

    <section className="hideWEB2">
      <Formik
      initialValues={{
        fechaVisitaFotografo: this.state.startDate,
        horaVisitaFotografo: this.state.tramoSeleccionado
      }}
      validate={this.validate}
      enableReinitialize={true}
    >
      {({}) => (
        <form>
          <div className="planes-label">
            Fecha
          </div>
          <DatePicker
            name="fechaVisitaFotografo"
            value={this.state.currentDate}
            onChange={this.handleChange}
            minDate={this.state.startDate}
            //maxDate={this.state.endDate}
          />
          <ErrorMessage
            name="fechaVisitaFotografo"
            className="contact-error"
            component="div"
          />

          <div className="planes-label">
            Hora
          </div>
          <Field
            className="largo-opciones-select-planes"
            component="select"
            name="horaVisitaFotografo"
            //onBlur={handleBlur}
            onChange={this.handleTimeChange}
            value={this.state.tramoSeleccionado}
          >
              {this.state.tramosDisponiblesOptions}
          </Field>
          <ErrorMessage
            name="horaVisitaFotografo"
            className="contact-error"
            component="div"
          />
        </form>
        )}
      </Formik>
    </section>
  </div>
    );
  }
}

export default PhotographerVisitPicker;