import React from "react";
import PageTitle from "../../components/common/PageTitle";
import {
  postUploadPropiedadesPI,
  fetchGetAllUsuarios,
  getSuscripcionExport,
  setSuscripcionExcel,
  getSuscripcionLastUpdated,
  getSuscripciones,
  setSuscripcion,
} from "../../action";
import { connect } from "react-redux";
import { Container, Row, Col, Collapse, FormRadio } from "shards-react";
import FileUpload from "../../components/common/FileUpload";
import BackupOutlinedIcon from "@material-ui/icons/BackupOutlined";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import moment from "moment";
import TablaSuscripciones from "./TablaSuscripciones";
import TablePagination from "@material-ui/core/TablePagination";
import { Link } from "react-router-dom";

class IndexSuscripcion extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      validated: false,
      collapse: false,
      collapse1: false,
      collapse2: false,
      selected: null,
      moneda_seleccionada: "CLP",
      file: null,
      ready: false,
      rowsPerPage: 10,
      page: 0,
      totalResults: 0,
    };

    const {
      dispatch,
      getSuscripcionLastUpdated,
      getSuscripciones,
      fetchGetAllUsuarios,
    } = this.props;
    dispatch(setSuscripcionExcel(null));
    getSuscripcionLastUpdated();
    getSuscripciones(1, 10);
    fetchGetAllUsuarios();
  }

  toggleUpload = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  };
  toggleUpload1 = () => {
    this.setState({
      collapse1: !this.state.collapse1,
    });
  };
  toggleUpload2 = () => {
    this.setState({
      collapse2: !this.state.collapse2,
    });
  };

  changeTipo = (tipo) => {
    this.setState({
      selected: tipo,
    });
  };

  onDrop = (ready, file) => {
    let message = "Archivo válido";
    if (!ready) {
      message =
        "Archivo inválido. Solo se acepta formato .xlsx y archivos con un peso igual o menor a 5 mb";
    }
    this.setState({
      ready,
      file,
    });
  };

  onSubmitFile = (value) => {
    if (value) {
      const { postUploadPropiedadesPI } = this.props;
      let formData = new FormData();
      formData.append("file", this.state.file[0]);
      postUploadPropiedadesPI(this.state.selected, formData);
    }
  };

  export = () => {
    const { getSuscripcionExport } = this.props;
    getSuscripcionExport();
  };

  tablePagination = (suscripciones) => {
    if (suscripciones) {
      return (
        <TablePagination
          count={suscripciones.totalResults}
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

  handleChangePage = (event, newPage) => {
    const { rowsPerPage } = this.state;
    this.setState({
      page: newPage,
    });
    const { getSuscripciones } = this.props;
    getSuscripciones(newPage + 1, rowsPerPage);
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
    const { getSuscripciones } = this.props;
    getSuscripciones(1, parseInt(event.target.value, 10));
  };

  feedback = () => {
    const {
      requestPostUploadPIPropiedades,
      requestSuscripcionExcel,
      requestSuscripciones,
      errorMessage,
    } = this.props;
    if (
      requestPostUploadPIPropiedades === "LOADING" ||
      requestSuscripcionExcel === "LOADING"
    ) {
      Swal.showLoading();
    }
    if (requestPostUploadPIPropiedades === "SUCCESS") {
      Swal.fire(
        "Archivo cargado",
        "Se ha subido el archivo a la colección exitosamente",
        "success"
      );
    }

    if (requestSuscripcionExcel === "SUCCESS") {
      Swal.fire("Archivo descargado", "Se ha descargado el archivo", "success");
    }

    if (requestPostUploadPIPropiedades === "ERROR") {
      Swal.fire("Error", errorMessage, "error");
    }

    if (requestSuscripcionExcel === "ERROR") {
      Swal.fire("Error", "Ha habido un error descargando el archivo", "error");
    }

    if (requestSuscripciones === "ERROR") {
      //Swal.fire("Error", "No se ha podido cargar el listado de suscripciones", "error");
    }
  };

  render() {
    const {
      suscripcionExcel,
      requestSuscripcionExcel,
      dispatch,
      suscripcionLastUpdated,
      suscripciones,
      setSuscripcion,
    } = this.props;
    if (
      suscripcionExcel != null &&
      suscripcionExcel != undefined &&
      requestSuscripcionExcel != "IDLE" &&
      requestSuscripcionExcel != "ERROR"
    ) {
      const url = window.URL.createObjectURL(new Blob([suscripcionExcel]));
      const link = document.createElement("a");
      link.href = url;
      let fileName = "file";
      if (
        suscripcionLastUpdated != null &&
        suscripcionLastUpdated.data != null &&
        suscripcionLastUpdated.data.updatedAt != null
      ) {
        fileName = moment(suscripcionLastUpdated.data.updatedAt).format(
          "DD/MM/YYYY HH:mm:ss"
        );
      }
      link.setAttribute("download", `${fileName}.xlsx`);
      document.body.appendChild(link);
      link.click();
      dispatch(setSuscripcionExcel(null));
    }

    const { ready, selected } = this.state;
    const urlweb = window.location.pathname;

    return (
      <Container fluid className="main-content-container px-4">
        {this.feedback()}
        {urlweb !== "/referir" ? (
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title="Personal Broker"
              subtitle="Personal Broker"
              className="text-sm-left"
            />
          </Row>
        ) : null}
        {urlweb !== "/referir" ? (
          <Row>
            <Col md={12}>
              <Button variant="contained" onClick={this.toggleUpload}>
                Subir archivo propiedades portal inmobiliario
              </Button>
              <Collapse open={this.state.collapse}>
                <div className="p-3 mt-3 border rounded">
                  <ul>
                    <li>Sólo se aceptan archivos con formato .xlsx</li>
                    <li>Archivos con tamaño inferior a 5 mb</li>
                    <li>
                      Cabeceras requeridas: Comuna, Precio, SuperficieTotal,
                      SuperficieUtil, Dormitorios, TipoPropiedad, Banios,
                      Estacionamientos, Barrio, Link, UF_m2
                      {selected == "arriendo" && ", PrecioUF"}
                    </li>
                  </ul>
                  <p className="mb-2">Tipo Propietario</p>
                  <FormRadio
                    inline
                    name="tipo"
                    checked={selected === "natural"}
                    onChange={() => {
                      this.changeTipo("natural");
                    }}
                  >
                    Persona natural
                  </FormRadio>
                  <FormRadio
                    inline
                    name="tipo"
                    checked={selected === "inmobiliaria"}
                    onChange={() => {
                      this.changeTipo("inmobiliaria");
                    }}
                  >
                    Inmobiliaria
                  </FormRadio>
                  <FormRadio
                    inline
                    name="tipo"
                    checked={selected === "arriendo"}
                    onChange={() => {
                      this.changeTipo("arriendo");
                    }}
                  >
                    Arriendo
                  </FormRadio>
                  <FileUpload
                    onDrop={this.onDrop}
                    sizeLimit={5000000}
                    maxFiles={1}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<BackupOutlinedIcon />}
                    disabled={!ready || selected == null}
                    onClick={() =>
                      this.onSubmitFile(ready && selected !== null)
                    }
                  >
                    Subir archivo
                  </Button>
                </div>
              </Collapse>
            </Col>
          </Row>
        ) : null}
        <Row>
          <Col md={6} />
          <Col md={3} className={"text-right float-right"}>
            <Link
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
              to={`/addsuscripcion`}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={setSuscripcion(null)}
                color="primary"
              >
                Agregar Búsqueda
              </Button>
            </Link>
          </Col>
          <Col md={3}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<GetAppIcon />}
              onClick={this.export}
            >
              Descargar Resultados
            </Button>
            <Collapse open={this.state.collapse2} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div>
              Última actualización:{" "}
              {suscripcionLastUpdated &&
                suscripcionLastUpdated.data &&
                moment(suscripcionLastUpdated.data.updatedAt).format(
                  "DD/MM/YYYY HH:mm:ss"
                )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <TablaSuscripciones
              suscripcionesResultados={suscripciones && suscripciones.results}
              page={this.state.page}
              rowsPerPage={this.state.rowsPerPage}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              tablePagination={() => this.tablePagination(suscripciones)}
              feedback={this.tablaFeedback}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    requestPostUploadPIPropiedades: state.app.requestPostUploadPIPropiedades,
    suscripcionExcel: state.app.suscripcionExcel,
    requestSuscripcionExcel: state.app.requestSuscripcionExcel,
    suscripcionLastUpdated: state.app.suscripcionLastUpdated,
    requestSuscripcionLastUpdated: state.app.requestSuscripcionLastUpdated,
    suscripciones: state.app.suscripciones,
    requestSuscripciones: state.app.requestSuscripciones,
    suscripcion: state.app.suscripcion,
    itemsUsuarios: state.app.itemsUsuarios,
    errorMessage: state.app.errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postUploadPropiedadesPI: (tipo, file) =>
    dispatch(postUploadPropiedadesPI(tipo, file)),
  getSuscripcionExport: () => dispatch(getSuscripcionExport()),
  getSuscripcionLastUpdated: () => dispatch(getSuscripcionLastUpdated()),
  getSuscripciones: (page, pageSize) =>
    dispatch(getSuscripciones(page, pageSize)),
  dispatch: (action) => {
    dispatch(action);
  },
  setSuscripcion: (suscripcion) => dispatch(setSuscripcion(suscripcion)),
  fetchGetAllUsuarios: () => dispatch(fetchGetAllUsuarios()),
});

IndexSuscripcion = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexSuscripcion);

export default IndexSuscripcion;
