/** @format */

import React from "react";
import { FormInmobiliariaAdd } from "./FormInmobiliariaAdd";
import { Container } from "shards-react";
import swal from "sweetalert2";
import Dialog from "react-bootstrap-dialog";
import { connect } from "react-redux";
import {
  fetchAddInmobiliaria,
  fetchClearAction,
  initializeMensaje,
  fetchUpdateInmobiliaria,
} from "../../../action";
import { Formik, Form } from "formik";
import { fileToBase64 } from "../../../utils/parsers";

class AgregarInmobiliaria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      base64files: [],
      filesInitialized: false,
      inmobiliaria: {},
      imagen: {}
    };
  }

  componentDidMount() {
    const { initMensaje, match, itemInmobiliarias } = this.props;
    let imagen = {};
    initMensaje();
    if (match && match.params && match.params.id) {
      const inmobiliarias = itemInmobiliarias;
      const inmobiliaria = inmobiliarias.find((inmo) => inmo.id === match.params.id);
      this.setState({ inmobiliaria});
    }
  }

  userFeedBack = () => {
    const { mensaje, loading, history } = this.props;
    
    if (loading) swal.showLoading();
    if (loading && typeof mensaje === "string") {      
      mensaje === "Secuencia correcta" || mensaje === "Elemento Ingresado"
        ? swal.fire({
            icon: "success",
            title: "Bien...",
            text: "Agregada Correctamente!"
          })
        : swal.fire({
            icon: "info",
            title: "Atención",
            text: mensaje,
          });
          history.push("/inmobiliarias");
    }    
    return null;
  };

  handleselectedFile = (selectedFile) => {
    let { base64files } = this.state;
    let isAlreadySelected = false;

    for (let i = 0; i < base64files.length; i++) {
      if (base64files[i].name === selectedFile.name) {
        isAlreadySelected = true;
        break;
      }
    }

    if (isAlreadySelected) return;

    fileToBase64(selectedFile).then((file64) => {
      file64 = {
        name: selectedFile.name,
        value: file64,
      };

      base64files = [...base64files, file64];

      this.setState({
        base64files,
      });
    });
  };

  render() {
    const {inmobiliaria} = this.state
    console.log("AgregarInmobiliaria -> render -> inmobiliaria", inmobiliaria)
    return (
      <Container fluid className="main-content-container px-4">
        {this.userFeedBack()}
        <Formik
          enableReinitialize="true"
          initialValues={{
            Nombre: inmobiliaria.nombre,
            Telefono: inmobiliaria.telefono,
            Direccion: inmobiliaria.direccion,
            Mail: inmobiliaria.mail,
            Logo: inmobiliaria.logo,
            UrlInmobiliaria: inmobiliaria.urlInmobiliaria,
          }}
          validate={validate}
          onSubmit={(values, { resetForm }) => {
            const { addInmobiliaria, updateInmobiliaria, onSubmit, history } = this.props;
            const { inmobiliaria } = this.state;
            if (inmobiliaria.id){
              updateInmobiliaria(inmobiliaria.id, values);
            }else{
              addInmobiliaria(values);
            }            
            resetForm();
            onSubmit && onSubmit();
            // history.push("/inmobiliarias");
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className="form-container">
              <br />
              <h4 className="m-0">
              {values.Nombre && ("Editar Inmobiliaria")}
              {!values.Nombre && ("Crear Inmobiliaria")}
                </h4>
              <FormInmobiliariaAdd
                values={values}
                show={true}
                handleselectedFile={this.handleselectedFile}
              />
              <button className="btn btn-primary" type="submit">
              {values.Nombre && ("Guardar")}
              {!values.Nombre && ("Crear Inmobiliaria")}
              </button>
            </Form>
          )}
        </Formik>

        <Dialog
          ref={(el) => {
            this.dialog = el;
          }}
        />
      </Container>
    );
  }
}

const requiredFields = [
  "Nombre",
  "Telefono",
  "Direccion",
  "Mail",
  "UrlInmobiliaria",
];

const validate = (values) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (
      (!values[field] && values[field] !== 0) ||
      values[field] === "" ||
      values[field] === "false" ||
      values[field] === "Seleccione" ||
      values[field] === undefined ||
      values[field] === null
    ) {
      errors[field] = "Este campo es requerido.";
    }
  });
  return errors;
};

const mapStateToProps = (state) => {
  const {
    app: { mensaje, loading, itemInmobiliarias },
  } = state;
  return { mensaje, loading, itemInmobiliarias };
};

const mapDispatchToProps = (dispatch) => ({
  addInmobiliaria: (inmobiliaria) =>
    dispatch(fetchAddInmobiliaria(inmobiliaria)),
  updateInmobiliaria: (id, inmobiliaria) => 
    dispatch(fetchUpdateInmobiliaria(id,inmobiliaria)),
  getClearAction: () => dispatch(fetchClearAction()),
  initMensaje: () => dispatch(initializeMensaje()),
});

AgregarInmobiliaria = connect(
  mapStateToProps,
  mapDispatchToProps
)(AgregarInmobiliaria);

export default AgregarInmobiliaria;
