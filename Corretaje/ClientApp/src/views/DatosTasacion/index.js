import React from "react";
import { connect } from "react-redux";
import {
  postUploadDatosTasacion,
  deleteAllDatosTasacion
} from "../../action";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import FileUpload from '../../components/common/FileUpload'
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import { FormRadio } from "shards-react";

class IndexDatosTasacion extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      ready: false,
      message: "",
      hasInteracted: false,
      file: null,
      esVenta: true
    };
  }

  handleChange = (bool) => {
    this.setState({
      esVenta: bool
    });
  }

  onDrop = (ready, file) => {
    let message = "Archivo válido";
    if (!ready) {
      message = "Archivo inválido. Solo se acepta formato .xlsx y archivos con un peso igual o menor a 5 mb";
    }
    this.setState({
      ready,
      message,
      hasInteracted: true,
      file
    })
  }

  onSubmit = (ready) => {
    if (ready) {
      const { postUploadDatosTasacion } = this.props;
      let formData = new FormData();
      formData.append("file", this.state.file[0]);
      postUploadDatosTasacion(formData, this.state.esVenta ? "venta" : "arriendo");
    }
  }

  showConfirmationDialog = () => {
    Swal.fire({
      title: 'Eliminar datos de colección',
      text: "Confirma que desea eliminar los datos de la colección Datos Tasación",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      footer: 'Atención! Este proceso puede tardar varios minutos'
    }).then((result) => {
      if (result.value) {
        const { deleteAllDatosTasacion } = this.props;
        deleteAllDatosTasacion();
      }
    })
  }

  feedback = () => {
    const { requestPostUploadDatosTasacion, errorMessage } = this.props;
    if (requestPostUploadDatosTasacion === "LOADING") {
      Swal.showLoading();
    } 
    if (requestPostUploadDatosTasacion === "SUCCESS") {
      Swal.fire(
        'Archivo cargado',
        `Se ha subido el archivo a la colección Datos Tasación ${!this.state.esVenta ? "Arriendo" : ""}  exitosamente`,
        'success'
      );
    }
    if (requestPostUploadDatosTasacion === "ERROR") {
      Swal.fire(
        'Error',
        errorMessage,
        'error'
      );
    }
  }

  render() {
    const { ready, message, hasInteracted, esVenta } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        { this.feedback() }
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Datos tasación"
            subtitle="Tasación"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col md={2}>
            <FormRadio
              name="esVenta"
              checked={esVenta}
              onChange={() => {
                this.handleChange(true);
              }}
            >
              Venta
            </FormRadio>
          </Col>
          <Col md={2}>
            <FormRadio
              name="esVenta"
              checked={!esVenta}
              onChange={() => {
                this.handleChange(false);
              }}
            >
              Arriendo
            </FormRadio>
          </Col>
        </Row>        
        <Row>
          <Col>
            <ul>
              <li>
                Sólo se aceptan archivos con formato .xlsx
              </li>
              <li>
                Archivos con tamaño inferior a 5 mb
              </li>
              <li>
                Cabeceras requeridas: Comuna, Precio, SuperficieTotal, SuperficieUtil, Dormitorios, TipoPropiedad, Estacionamientos, Barrio, Link, UF_m2 { !esVenta ? ", PrecioUF" : "" }
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <FileUpload 
              onDrop={this.onDrop}
              sizeLimit={5000000}
              maxFiles={1}
             />
          </Col>
        </Row>
        <Row className={"pt-4 pb-2"}>
          <Col>
          { hasInteracted && (
          <div className={ready ? "success px-3 py-2 text-white" : "danger px-3 py-2 text-white" }>
            { message }
          </div>
        ) }
          </Col>
        </Row>
        <Row className={"pb-4"}>
          <Col>
          { hasInteracted && (
          <div className={"warning px-3 py-2 text-black" }>
            ¡Atención! Este proceso puede tardar varios minutos.
          </div>
        ) }
          </Col>
        </Row>
        <Row>
          <Col md={9}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<BackupOutlinedIcon />}
              disabled={!ready}
              onClick={() => this.onSubmit(ready)}
            >
              Subir archivo
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    requestPostUploadDatosTasacion: state.app.requestPostUploadDatosTasacion,
    requestDeleteAllDatosTasacion: state.app.requestDeleteAllDatosTasacion,
    errorMessage: state.app.errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  postUploadDatosTasacion: (file, tipo) => dispatch(postUploadDatosTasacion(file, tipo)),
  deleteAllDatosTasacion : () => dispatch(deleteAllDatosTasacion())
});

IndexDatosTasacion = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexDatosTasacion);

export default IndexDatosTasacion;
