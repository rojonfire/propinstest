import React from "react";
import PageTitle from "../../components/common/PageTitle";
import {
  postUploadPropiedadesPI,
  postAddSuscripcion,
  getSuscripcionExport,
  setSuscripcionExcel,
  getSuscripcionLastUpdated,
} from "../../action";
import { connect } from "react-redux";
import { Container, Row, Col, Collapse, FormRadio } from "shards-react";
import FileUpload from "../../components/common/FileUpload";
import BackupOutlinedIcon from "@material-ui/icons/BackupOutlined";
import GetAppIcon from "@material-ui/icons/GetApp";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FieldGroup, SelectFieldGroup } from "../../utils/Input";
import moment from "moment";

class IndexProximasVisitas extends React.Component {
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
    };
    this.handleChange = this.handleChange.bind(this);

    const { dispatch, getSuscripcionLastUpdated } = this.props;
    dispatch(setSuscripcionExcel(null));
    getSuscripcionLastUpdated();
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

  handleChange = (tipo_moneda) => {
    this.setState({
      moneda_seleccionada: tipo_moneda,
    });
    console.log("tipomone", tipo_moneda);
    console.log("mone:select", this.state.moneda_seleccionada);
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

  feedback = () => {
    const {
      requestPostUploadPIPropiedades,
      requestPostAddSuscripcion,
      requestSuscripcionExcel,
    } = this.props;
    if (
      requestPostUploadPIPropiedades === "LOADING" ||
      requestPostAddSuscripcion === "LOADING" ||
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
    if (requestPostAddSuscripcion === "SUCCESS") {
      Swal.fire(
        "Suscripción",
        "Se ha añadido la suscripción exitosamente",
        "success"
      );
    }
    if (requestSuscripcionExcel === "SUCCESS") {
      Swal.fire("Archivo descargado", "Se ha descargado el archivo", "success");
    }

    if (requestPostUploadPIPropiedades === "ERROR") {
      Swal.fire("Error", "No se ha podido subir el archivo", "error");
    }

    if (requestPostAddSuscripcion === "ERROR") {
      Swal.fire("Error", "No se ha podido añadir la suscripción", "error");
    }

    if (requestSuscripcionExcel === "ERROR") {
      Swal.fire("Error", "No se ha podido descargar el archivo", "error");
    }
  };

  submitSuscripcion = (values) => {
    let val = 0;

    val = values.Comuna1 !== "" ? val + 3 : val;
    val = values.Comuna2 !== "" ? val + 2 : val;
    val = values.Comuna3 !== "" ? val + 1 : val;
    val = values.Dormitorio_Desde !== "" ? val + 1 : val;
    val = values.Dormitorio_Hasta !== "" ? val + 1 : val;
    val = values.Bano_Desde !== "" ? val + 1 : val;
    val = values.Bano_Hasta !== "" ? val + 1 : val;
    val = values.Estacionamiento !== "" ? val + 1 : val;
    val = values.Valor_Desde !== "" ? val + 1 : val;
    val = values.Valor_Hasta !== "" ? val + 1 : val;
    val = values.M2Totales_Desde !== "" ? val + 1 : val;
    val = values.M2Totales_Hasta !== "" ? val + 1 : val;
    val = values.M2Utiles_Desde !== "" ? val + 1 : val;
    val = values.M2Utiles_Hasta !== "" ? val + 1 : val;

    const data = {
      nombreUsuario: values.Nombre,
      emailUsuario: values.Correo,
      telefono: values.Celular,
      idUsuario: null,
      idCliente: null,
      comunaUno: values.Comuna1,
      comunaDos: values.Comuna2,
      comunaTres: values.Comuna3,
      tipoPropiedad: values.TipoPropiedad,
      cantidadDormitoriosDesde: values.Dormitorio_Desde
        ? values.Dormitorio_Desde
        : 0,
      cantidadDormitoriosHasta: values.Dormitorio_Hasta
        ? values.Dormitorio_Hasta
        : 0,
      cantidadBanosDesde: values.Bano_Desde ? values.Bano_Desde : 0,
      cantidadBanosHasta: values.Bano_Hasta ? values.Bano_Hasta : 0,
      cantidadEstacionamientos: values.Estacionamiento
        ? values.Estacionamiento
        : 0,
      valorDesde: values.Valor_Desde ? values.Valor_Desde : 0,
      valorHasta: values.Valor_Hasta ? values.Valor_Hasta : 0,
      metrosTotalesDesde: values.M2Totales_Desde ? values.M2Totales_Desde : 0,
      metrosTotalesHasta: values.M2Totales_Hasta ? values.M2Totales_Hasta : 0,
      metrosUtilesDesde: values.M2Utiles_Desde ? values.M2Utiles_Desde : 0,
      metrosUtilesHasta: values.M2Utiles_Hasta ? values.M2Utiles_Hasta : 0,
      puntaje: val,
    };

    const { postAddSuscripcion } = this.props;
    postAddSuscripcion(data);
  };

  validate = (formValues) => {
    const errors = {};

    if (!formValues.Nombre) {
      errors.Nombre = "Por favor ingrese sus nombres";
    }

    return errors;
  };

  render() {
    const {
      suscripcionExcel,
      requestSuscripcionExcel,
      dispatch,
      suscripcionLastUpdated,
    } = this.props;
    console.log(this.props);
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
    return (
      <Container fluid className="main-content-container px-4">
        hola
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    requestPostUploadPIPropiedades: state.app.requestPostUploadPIPropiedades,
    requestPostAddSuscripcion: state.app.requestPostAddSuscripcion,
    suscripcionExcel: state.app.suscripcionExcel,
    requestSuscripcionExcel: state.app.requestSuscripcionExcel,
    suscripcionLastUpdated: state.app.suscripcionLastUpdated,
    requestSuscripcionLastUpdated: state.app.requestSuscripcionLastUpdated,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postUploadPropiedadesPI: (tipo, file) =>
    dispatch(postUploadPropiedadesPI(tipo, file)),
  postAddSuscripcion: (data) => dispatch(postAddSuscripcion(data)),
  getSuscripcionExport: () => dispatch(getSuscripcionExport()),
  getSuscripcionLastUpdated: () => dispatch(getSuscripcionLastUpdated()),
  dispatch: (action) => {
    dispatch(action);
  },
});

IndexProximasVisitas = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexProximasVisitas);

export default IndexProximasVisitas;
