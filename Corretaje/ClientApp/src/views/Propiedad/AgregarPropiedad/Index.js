/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { AddCliente } from '../../Cliente';

import {
  fetchAddPropiedad,
  fetchGetAllClientes,
  fetchAllRegiones,
  fetchClearAction,
  initializeMensaje,
  fetchPostUpdatePropiedad,
  getPropiedadById,
  fetchGetAllPlanes,
  getVisitasFotografoByFecha,
  getAgendaFotografo
} from '../../../action';

import swal from 'sweetalert2';

import { Container, Modal, ModalBody } from 'shards-react';

import FormPropiedad from './FormPropiedad';
import moment from "moment";
import { Field } from "formik";
import {
  SelectFieldGroup
} from '../../../utils/Input';

class FormModal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Modal
          open={this.props.showModal}
          backdrop={true}
          toggle={this.props.handleClose}
          size="lg"
        >
          <ModalBody>{this.props.children}</ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

class IndexAgregarPropiedad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 4,
      position: { lat: 0, lng: 0 },
      fechaterm: new Date(),
      fechadisp: new Date(),
      comunaId: [],
      marker: {
        title: 'Santiago',
        name: 'Chile',
        position: { lat: -33.43616371280176, lng: -70.63379790744193 }
      },
      imagenes: [],
      fileError: '',
      showModal: false,
      showCoord: false,
      propiedad: {},
      imagenesProp: [],
      currentDate: new Date(moment().add(2, 'days').format("YYYY-MM-DD")),
      msjFecha: '',
      idFotografo: undefined,
      bloques: undefined,
      bloqueSeleccionado: undefined,
      tramoSeleccionado: undefined,
      tramosDisponiblesOptions: undefined,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    const { getPropiedadById, match, fetchGetAllPlanes, getAgendaFotografo } = this.props;
    if (match != undefined && match.params != undefined && match.params.id != undefined) {
      getPropiedadById(match.params.id);
    }
    getAgendaFotografo();
    fetchGetAllPlanes();
  }

  componentDidMount() {
    const {
      getCLientes,
      getRegiones,
      initMensaje,
      match,
      propiedad
    } = this.props;
    let imagenes = [];
    getCLientes();
    getRegiones();
    if (this.state.imagenes.length === 0) {
      this.setState({ fileError: 'Seleccione al menos una imagen' });
    }
    initMensaje();

    if (match && match.params && match.params.id && propiedad != undefined && propiedad.imagenes != undefined) {
      propiedad.imagenes.map(function(i, file) {
        imagenes.push({
          name: i.name,
          downloadLink: i.downloadLink,
          esPortada: i.esPortada,
          value: i.value,
          orden: file
        });
        return null;
      });

      this.setState({ propiedad, imagenesProp: imagenes });
    }
  }

  parseDaysAvailable = (daysNombre) => {
    let diasFoto = [];
    if (daysNombre != undefined) {
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
      //this.handleDateChange(new Date());

      return buttonFirts;
    }
  };

  handlePhotographerId = (photographerId) => {
    this.setState({
      photographerId,
    });
  };

  handleDateChange = (selectedDate) => {
    const { getVisitasFotografoByFecha } = this.props;
    if (selectedDate === null) {
      selectedDate = new Date();
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

    if (agendaFotografo != undefined) {
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
      {value: null, label: ' - Seleccione -'}
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
      if (String(k.tramo).length == 1) {
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
        {
          value: `${p.idFotografo};${p.tramo}`,
          label: p.tramo
        }
      );
    });
    return options;
  };

  handleTimeChange = (value) => {
    if (value && value.target && value.target.value && value.target.value.includes(";")) {
      let horaSeleccionada = value.target.value.split(";");
      let idFotografo = horaSeleccionada[0];
      let tramoSeleccionado = horaSeleccionada[1];
      this.setState({
        tramoSeleccionado,
        idFotografo,
        bloqueSeleccionado: value.target.value,
      });
    }
  };

  validarTramoError = () => {
    if (
      this.state.bloqueSeleccionado == undefined ||
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

  userFeedBack = () => {
    const { mensaje, history } = this.props;

    if (!mensaje) {
      return null;
    }

    if (!mensaje.value) {
      return null;
    }
    if (mensaje.value && mensaje.value.estado && mensaje.value.estado === 1) {
      swal.fire({
        type: 'success',
        title: 'Bien...',
        text: 'Datos guardados!',
        onAfterClose: () => {
          history.push("/propiedades");
        }
      });
    } else {
      swal.fire({
        type: 'info',
        title: 'Atención',
        text: 'Ocurrio un error'
      });
    }
  };

  setStep = step => {
    this.setState({ step });
  };

  handleClose = () => {
    this.setState({ showModal: false });
    this.props.getCLientes();
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  onClickMapHelper = (lat, lng) => {
    this.setState({
      marker: {
        title: '',
        name: '',
        position: { lat, lng }
      }
    });
  };

  setCoordsHelper = (lat, lng, callback) => {
    this.setState(
      {
        marker: {
          title: '',
          name: '',
          position: { lat, lng }
        }
      },
      () => {
        callback();
      }
    );
  };

  onChangeFechaTermino = params => {
    this.setState({
      fechaterm: params
    });
  };

  onChangeFechaDisponible = params => {
    this.setState({
      fechadisp: params
    });
  };

  onChangeComunaId = e => {
    const { itemRegiones } = this.props;

    let com;
    itemRegiones.map(
      num =>
        (com = filter(num.regiones, {
          numero: parseInt(e.currentTarget.value)
        }))
    );

    let comunas = [{ value: '', label: '--Seleccione--' }];

    com.map(c => c.comunas.map(i => comunas.push({ value: i, label: i })));

    this.setState({
      comunaId: comunas
    });
  };

  listErrors = errors => {
    const errorsArray = [];
    Object.entries(errors).forEach(error => {
      return errorsArray.push(error);
    });

    return (
      <ul>
        {errorsArray.map(error => {
          return <li key={error[0]}>{error[0] + ',' + error[1]}</li>;
        })}
      </ul>
    );
  };

  render() {
    const { itemsClientes, itemRegiones, usuario, requestLoadingVisitaFotografo } = this.props;
    if (usuario.length < 1) {
      return (
        <Container fluid className="main-content-container px-4">
          Sesión Caducada, Intente Loguearse nuevamente
        </Container>
      );
    }

    const itemComunas = {};

    const items = [{ value: '', label: '--Seleccione--' }];

    if (itemsClientes) {
      itemsClientes.map((num, i) =>
        items.push({ value: num.id, label: num.nombres + ' ' + num.apellidos })
      );
    }

    const regionesArr = [{ value: '', label: '--Seleccione--' }];

    if (itemRegiones && itemRegiones.length > 0) {
      if (Array.isArray(itemRegiones)) {
        const { regiones } = itemRegiones[0];
        regiones.forEach(reg => {
          regionesArr.push({ value: reg.numero, label: reg.region });
          itemComunas[reg.numero] = [{ value: '', label: '--Seleccione--' }];
          itemComunas[reg.numero] = [
            ...itemComunas[reg.numero],
            ...reg.comunas.map(com => ({
              value: com,
              label: com
            }))
          ];
        });
      }
    }

    return (
      <Container fluid className="main-content-container px-4">
        {this.userFeedBack()}
        <FormModal
          showModal={this.state.showModal}
          handleClose={this.handleClose}
          headerTitle={'Agregar Cliente'}
        >
          <AddCliente onSubmit={this.handleClose} />
        </FormModal>

        <FormPropiedad
          items={items}
          regionesArr={regionesArr}
          itemComunas={itemComunas}
          imagenesProp={this.state.imagenesProp}
          getTramosDisponibles={this.getTramosDisponibles}
          renderOptions={this.renderOptions}
          handleDateChange={this.handleDateChange}
          requestLoadingVisitaFotografo={requestLoadingVisitaFotografo}
          validarTramoError={this.validarTramoError}
          currentDate={this.state.currentDate}
          handleTimeChange={this.handleTimeChange}
          {...this.props}
          {...this.state}
          {...this}
          in
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    respuesta: state.app.respuesta,
    itemsClientes: state.app.itemsClientes,
    itemRegiones: state.app.itemRegiones,
    imagenesPropiedad: state.app.imagenesPropiedad,
    mensaje: state.app.mensaje,
    listPropiedades: state.app.itemPropiedades,
    usuario: state.app.itemUsuario,
    propiedad: state.app.propiedad,
    requestGetPropiedad: state.app.requestGetPropiedad,
    requestLoadingVisitaFotografo: state.app.requestLoadingVisitaFotografo,
    visitaFotografo: state.app.visitaFotografo,
    requestLoadingAgendaFotografo: state.app.requestLoadingAgendaFotografo,
    agendaFotografo: state.app.agendaFotografo,
  };
};

const mapDispatchToProps = dispatch => ({
  addPropiedad: propiedad => dispatch(fetchAddPropiedad(propiedad)),
  getPropiedadById: id => dispatch(getPropiedadById(id)),
  getCLientes: () => dispatch(fetchGetAllClientes()),
  getRegiones: () => dispatch(fetchAllRegiones()),
  getClearAction: () => dispatch(fetchClearAction()),
  initMensaje: () => dispatch(initializeMensaje()),
  updatePropiedad: propiedad => dispatch(fetchPostUpdatePropiedad(propiedad)),
  fetchGetAllPlanes: () => dispatch(fetchGetAllPlanes()),
  getVisitasFotografoByFecha: (fecha) =>  dispatch(getVisitasFotografoByFecha(fecha)),
  getAgendaFotografo: () => dispatch(getAgendaFotografo()),
});

// IndexAgregarPropiedad = withFormik(IndexAgregarPropiedad);
IndexAgregarPropiedad = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexAgregarPropiedad);

export default IndexAgregarPropiedad;
