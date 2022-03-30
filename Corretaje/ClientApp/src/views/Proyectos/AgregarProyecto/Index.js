/** @format */

import React from "react";
import { connect } from "react-redux";
import { filter } from "lodash";
import { AddCliente } from "../../Cliente";

import {
  postProyecto,
  fetchGetAllClientes,
  fetchGetAllInmobiliarias,
  fetchAllRegiones,
  fetchClearAction,
  initializeMensaje,
  putProyecto,
} from "../../../action";

import swal from "sweetalert2";

import { Container, Modal, ModalBody } from "shards-react";

import FormProyecto from "./FormProyecto";

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

class IndexAgregarProyecto extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchGetAllInmobiliarias());
    this.state = {
      step: 4,
      position: { lat: 0, lng: 0 },
      fechaterm: new Date(),
      fechadisp: new Date(),
      comunaId: [],
      marker: {
        title: "Santiago",
        name: "Chile",
        position: { lat: -33.43616371280176, lng: -70.63379790744193 },
      },
      imagenes: [],
      fileError: "",
      showModal: false,
      showCoord: false,
      proyecto: {},
      imagenesProp: [],
      rowsNumber: [0],
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addNewRow = this.addNewRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
  }

  addNewRow = () => {
    const { rowsNumber } = this.state;
    rowsNumber.push(0);
    this.setState({
      rowsNumber: rowsNumber,
    });
  };

  removeRow = () => {
    const { rowsNumber } = this.state;
    rowsNumber.splice(-1, 1);
    this.setState({
      rowsNumber: rowsNumber,
    });
  };

  componentDidMount() {
    const {
      getCLientes,
      getRegiones,
      initMensaje,
      match,
      listProyectos,
      dispatch,
    } = this.props;

    let imagenes = [];
    getCLientes();
    getRegiones();
    dispatch(fetchGetAllInmobiliarias());
    if (this.state.imagenes.length === 0) {
      this.setState({ fileError: "Seleccione al menos una imagen" });
    }
    initMensaje();

    if (match && match.params && match.params.id) {
      const proyectos = listProyectos;
      const proyecto = proyectos.find((pro) => pro.id === match.params.id);
      proyecto.imagenes.map(function(i, file) {
        imagenes.push({
          name: i.name,
          downloadLink: i.downloadLink,
          esPortada: i.esPortada,
          value: i.value,
          orden: file,
        });
        return null;
      });

      this.setState({ proyecto, imagenesProp: imagenes });
    }
  }

  userFeedBack = () => {
    const { mensaje, history, initMensaje } = this.props;

    if (!mensaje) {
      return null;
    }

    if (!mensaje.status) {
      return null;
    }
    if (mensaje && mensaje.status === 201 || mensaje && mensaje.status === 200) {
      swal.fire({
        icon: "success",
        // title: "Bien...",
        text: "Datos guardados exitosamente!"
      });
      history.push("/proyectos");
      initMensaje()
    } else {
      swal.fire({
        icon: "info",
        title: "Atención",
        text: "Ocurrio un error",
      });
    }
  };

  setStep = (step) => {
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
        title: "",
        name: "",
        position: { lat, lng },
      },
    });
  };

  setCoordsHelper = (lat, lng, callback) => {
    this.setState(
      {
        marker: {
          title: "",
          name: "",
          position: { lat, lng },
        },
      },
      () => {
        callback();
      }
    );
  };

  onChangeFechaTermino = (params) => {
    this.setState({
      fechaterm: params,
    });
  };

  onChangeFechaDisponible = (params) => {
    this.setState({
      fechadisp: params,
    });
  };

  onChangeComunaId = (e) => {
    const { itemRegiones } = this.props;

    let com;
    itemRegiones.map(
      (num) =>
        (com = filter(num.regiones, {
          numero: parseInt(e.currentTarget.value),
        }))
    );

    let comunas = [{ value: "", label: "--Seleccione--" }];

    com.map((c) => c.comunas.map((i) => comunas.push({ value: i, label: i })));

    this.setState({
      comunaId: comunas,
    });
  };

  listErrors = (errors) => {
    const errorsArray = [];
    Object.entries(errors).forEach((error) => {
      return errorsArray.push(error);
    });

    return (
      <ul>
        {errorsArray.map((error) => {
          return <li key={error[0]}>{error[0] + "," + error[1]}</li>;
        })}
      </ul>
    );
  };

  render() {
    const {
      itemsClientes,
      itemRegiones,
      usuario,
      itemInmobiliarias,
    } = this.props;

    if (usuario.length < 1) {
      return (
        <Container fluid className="main-content-container px-4">
          Sesión Caducada, Intente Loguearse nuevamente
        </Container>
      );
    }

    const itemComunas = {};

    const items = [{ value: "", label: "--Seleccione--" }];

    if (itemsClientes) {
      itemsClientes.map((num, i) =>
        items.push({ value: num.id, label: num.nombres + " " + num.apellidos })
      );
    }

    const regionesArr = [{ value: "", label: "--Seleccione--" }];

    if (itemRegiones && itemRegiones.length > 0) {
      if (Array.isArray(itemRegiones)) {
        const { regiones } = itemRegiones[0];
        regiones.forEach((reg) => {
          regionesArr.push({ value: reg.numero, label: reg.region });
          itemComunas[reg.numero] = [{ value: "", label: "--Seleccione--" }];
          itemComunas[reg.numero] = [
            ...itemComunas[reg.numero],
            ...reg.comunas.map((com) => ({
              value: com,
              label: com,
            })),
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
          headerTitle={"Agregar Cliente"}
        >
          <AddCliente onSubmit={this.handleClose} />
        </FormModal>

        <FormProyecto
          addNewRow={this.addNewRow}
          removeRow={this.removeRow}
          rowsNumber={this.state.rowsNumber}
          items={items}
          regionesArr={regionesArr}
          itemComunas={itemComunas}
          imagenesProp={this.state.imagenesProp}
          itemInmobiliarias={itemInmobiliarias}
          rowsNumberProps={this.props.rowsNumberProps}
          {...this.props}
          {...this.state}
          {...this}
          in
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    respuesta: state.app.respuesta,
    itemsClientes: state.app.itemsClientes,
    itemRegiones: state.app.itemRegiones,
    imagenesProyecto: state.app.imagenesProyecto,
    mensaje: state.app.mensaje,
    listProyectos: state.app.itemProyectos,
    usuario: state.app.itemUsuario,
    itemInmobiliarias: state.app.itemInmobiliarias,
    rowsNumberProps: state.app.rowsNumberProps
  };
};

const mapDispatchToProps = (dispatch) => ({
  addProyecto: (proyecto) => dispatch(postProyecto(proyecto)),
  getCLientes: () => dispatch(fetchGetAllClientes()),
  getRegiones: () => dispatch(fetchAllRegiones()),
  getClearAction: () => dispatch(fetchClearAction()),
  initMensaje: () => dispatch(initializeMensaje()),
  updateProyecto: (proyecto) => dispatch(putProyecto(proyecto)),
  dispatch: (action) => {
    dispatch(action);
  },
});

// IndexAgregarProyecto = withFormik(IndexAgregarProyecto);
IndexAgregarProyecto = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexAgregarProyecto);

export default IndexAgregarProyecto;
