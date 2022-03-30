/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import {
  fetchGetAllPropiedades,
  fetchGetAllClientes,
  fetchPostUpdatePropiedad,
  fetchClearAction,
  fetchDeletePropiedad,
  getAllProyectos,
  getPropiedadesPaginadas,
  initializeMensaje,
  getUsuariosFiltrados,
  getSuscripciones
} from "../../../action";
import Launch from "@material-ui/icons/Launch";
import TablaPropiedades from "./TablaPropiedades";
import IconButton from "@material-ui/core/IconButton";
import TablePagination from "@material-ui/core/TablePagination";
import swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  FormSelect,
  Card,
} from "shards-react";
import PageTitle from "../../../components/common/PageTitle";
import { ESTADOS_PROPIEDAD } from "../../../utils/constants";
import EditIcon from "@material-ui/icons/Edit";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import FaceIcon from "@material-ui/icons/Face";

export class IndexListarPropiedades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      editModal: false,
      idProp: "",
      cliente: "",
      filtro: "",
      rowsPerPage: 10,
      page: 0,
      totalResults: 0,
      modalCambioEstado: false,
      propiedadSeleccionada: {},
      filtroEstado: "",
      filtroCliente: "",
    };
    const { getUsuariosFiltrados, getSuscripciones } = this.props;
    //traemos los brokers
    getUsuariosFiltrados(10);
    getSuscripciones(1, 999);
  }

  componentDidMount() {
    const {
      getPropiedades,
      getCLientes,
      getProyectos,
      getPropiedadesPaginadas,
      initializeMensaje,
    } = this.props;
    const { page, rowsPerPage } = this.state;
    getPropiedades();
    getCLientes();
    getProyectos();

    getPropiedadesPaginadas("", "", page, rowsPerPage);

    initializeMensaje();
  }

  onClickProductSelected(cell, row, index) {
    this.setState({
      modal: true,
      idProp: row.propiedad,
      Cliente: row.Cliente,
    });
  }

  handleHide = () => {
    this.setState({ modal: false });
  };

  toggleModalCambioEstado = (e, propiedadSeleccionada) => {
    this.setState({
      modalCambioEstado: !this.state.modalCambioEstado,
    });

    if (propiedadSeleccionada != null) {
      this.setState({
        propiedadSeleccionada,
      });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { mensaje, getClearAction } = this.props;

    if (mensaje && mensaje.estado === 1) {
      alert("Propiedad Actualizada");
      getClearAction();
    }
  };

  handleChangePage = (event, newPage) => {
    const { filtroEstado, rowsPerPage } = this.state;
    this.setState({
      page: newPage,
    });
    
    const { getPropiedadesPaginadas } = this.props;
    getPropiedadesPaginadas(filtroEstado, "", newPage + 1, rowsPerPage);
  };

  handleChangeRowsPerPage = (event) => {
    const { filtroEstado } = this.state;
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
    
    const { getPropiedadesPaginadas } = this.props;
    getPropiedadesPaginadas(filtroEstado, "", 1, parseInt(event.target.value, 10));
  };

  selectEstadosPropiedad = () => {
    let optionsEstados = [];
    optionsEstados.push(
      <option key="" value="" default>
        - Filtrar por estado -
      </option>
    );
    const estadosNumero = Object.keys(ESTADOS_PROPIEDAD);
    estadosNumero.forEach((k, v) => {
      optionsEstados.push(
        <option key={k} value={k}>
          {ESTADOS_PROPIEDAD[k]}
        </option>
      );
    });
    return optionsEstados;
  };

  feedback = () => {
    const { requestPropiedadesPaginadas } = this.props;
    if (requestPropiedadesPaginadas == "LOADING") {
      swal.showLoading();
    } else {
      swal.close();
    }
  };

  tablePagination = (propiedades) => {
    if (propiedades) {
      return (
        <TablePagination
          count={propiedades.totalResults}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          rowsPerPage={this.state.rowsPerPage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          SelectProps={{
            inputProps: { "aria-label": "Cantidad" },
            native: true,
          }}
          labelRowsPerPage={"Resultados por página"}
        />
      );
    } else {
      return <div />;
    }
  };

  handleChangeEstado = (e) => {
    this.setState({
      filtroEstado: e.target.value,
    });
    
    const { getPropiedadesPaginadas } = this.props;
    getPropiedadesPaginadas(e.target.value, "", 1, this.state.rowsPerPage);
  };

  render() {
    const {
      propiedadesPaginadas,
      itemsClientes,
      usuariosFiltrados,
    } = this.props;

    const estadosOptions = this.selectEstadosPropiedad();
    return (
      <Container
        fluid
        className=" 
        main-content-container px-4"
      >
        {this.feedback()}
        {/* Page Header */}
        <Row noGutters className=" page-header py-4">
          <Col>
            <PageTitle
              sm="4"
              title="Lista de propiedades"
              subtitle="Propiedades"
              className="text-sm-left"
            />
          </Col>
          <Col md="8">
            <Card>
              <div className="titulo-acciones">Acciones</div>
              <Row>
                <Col md="3" className="acciones-nombre">
                  {" "}
                  <IconButton
                    color="primary"
                    aria-label="Editar"
                    component="span"
                  >
                    <EditIcon />
                  </IconButton>
                  Editar
                </Col>
                <Col md="4" className="acciones-nombre">
                  {" "}
                  <IconButton
                    color="primary"
                    aria-label="Generar tarjeta prop"
                    component="span"
                  >
                    <ArtTrackIcon />
                  </IconButton>
                  Generar tarjeta propiedad
                </Col>
                <Col md="3" className="acciones-nombre">
                  {" "}
                  <IconButton
                    color="primary"
                    aria-label="Cambiar estado"
                    component="span"
                  >
                    <Launch />
                  </IconButton>
                  Cambiar Estado
                </Col>
                <Col className="acciones-nombre">
                  <IconButton
                    color="primary"
                    aria-label="Cambiar estado"
                    component="span"
                  >
                    <FaceIcon />
                  </IconButton>
                  Brokers{" "}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row className="little-margin-bottom">
          <Col md={4}>
            <FormSelect onChange={(e) => this.handleChangeEstado(e)}>
              {estadosOptions}
            </FormSelect>
          </Col>
          <Col md={5} />
          <Col md={3}>
            <Link
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
              to={`/addpropiedad`}
            >
              <Button type="button" theme="primary form-control">
                Crear Propiedad
                <i
                  style={{
                    fontSize: 15,
                    color: "#fff",
                  }}
                  className="material-icons"
                >
                  home
                </i>
              </Button>
            </Link>
          </Col>
        </Row>
        <TablaPropiedades
          propiedades={propiedadesPaginadas}
          page={this.state.page}
          rowsPerPage={this.state.rowsPerPage}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          tablePagination={() => this.tablePagination(propiedadesPaginadas)}
          clientes={itemsClientes}
          brokers={usuariosFiltrados}
        />
      </Container>
    );
  }
}

const formConf = {
  form: "IndexListarPropiedades",
};

const mapStateToProps = (state) => ({
  itemPropiedades: state.app.itemPropiedades,
  itemsClientes: state.app.itemsClientes,
  mensaje: state.app.mensaje,
  propiedadesPaginadas: state.app.propiedadesPaginadas,
  requestPropiedadesPaginadas: state.app.requestPropiedadesPaginadas,
  usuariosFiltrados: state.app.usuariosFiltrados,
  requestUsuariosFiltrados: state.app.requestUsuariosFiltrados,
});

const mapDispatchToProps = (dispatch) => ({
  getPropiedades: () => dispatch(fetchGetAllPropiedades()),
  getCLientes: () => dispatch(fetchGetAllClientes()),
  postUpdatePropiedad: (obj) => dispatch(fetchPostUpdatePropiedad(obj)),
  getClearAction: () => dispatch(fetchClearAction()),
  deletePropiedad: (id, estado) => dispatch(fetchDeletePropiedad(id, estado)),
  getProyectos: () => dispatch(getAllProyectos()),
  getPropiedadesPaginadas: (estado, idBroker, page, pageSize) =>
    dispatch(getPropiedadesPaginadas(estado, idBroker, page, pageSize)),
  initializeMensaje: () => dispatch(initializeMensaje()),
  getUsuariosFiltrados: (tipoCuenta) =>
    dispatch(getUsuariosFiltrados(tipoCuenta)),
  getSuscripciones: (page, pageSize) =>
    dispatch(getSuscripciones(page, pageSize)),
});

IndexListarPropiedades = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexListarPropiedades);
IndexListarPropiedades = reduxForm(formConf)(IndexListarPropiedades);
export default IndexListarPropiedades;
