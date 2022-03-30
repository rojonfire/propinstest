/** @format */

import React from "react";
import { FormUsuarioAdd } from "./FormUsuarioAdd";
import { Container, Row } from "shards-react";
import util from "../../utils/utilsFunctions";
import PageTitle from "../../components/common/PageTitle";

import swal from "sweetalert2";

import Dialog from "react-bootstrap-dialog";

import { connect } from "react-redux";

import {
  fetchAddUsuario,
  fetchClearAction,
  initializeMensaje,
  fetchGetAllInmobiliarias,
} from "../../action";
import { Formik, Form } from "formik";

class IndexUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };
  }

  componentDidMount() {
    const { initMensaje, dispatch } = this.props;
    initMensaje();
    dispatch(fetchGetAllInmobiliarias());
  }

  addUsuario = (values) => {
    let data = {
      fechaNacimiento: values.FechaNacimiento,
      tipoCuenta: values.TipoCuenta,
      apellidos: values.Apellidos,
      direccion: values.Direccion,
      nombres: values.Nombres,
      oficio: values.Oficio,
      inmobiliariaId: values.InmobiliariaId,
      proyectosInmobiliariosId: values.ProyectosInmobiliariosId,
      rut: values.Rut,
      telefono: values.Telefono,
      email: values.Email,
      datosBancarios: {
        banco: values.Banco,
        tipoCuenta: values.TipoCuentaBancaria,
        numeroCuenta: values.NumeroCuenta,
        medioPago: values.MedioPago,
      },
      password: values.Password,
    };
    const { addUsuario } = this.props;
    addUsuario(data);
  };

  userFeedBack = () => {
    const { requestAddUsuario, errorMessage, history } = this.props;

    if (requestAddUsuario === "LOADING") swal.showLoading();

    if (requestAddUsuario === "SUCCESS") {
      swal.fire({
        icon: "success",
        title: "Bien...",
        text: "Agregado Correctamente!",
        onAfterClose: () => {
          history.push("/usuarios");
        },
      });
    }
    if (requestAddUsuario === "ERROR") {
      swal.fire({
        icon: "error",
        title: "Error...",
        text: errorMessage
      });
    }

    return null;
  };

  render() {
    const { itemInmobiliarias } = this.props;

    let user = JSON.parse(localStorage.getItem("user"));
    return (
      <Container className="main-content-container px-4">
        {this.userFeedBack()}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title={
              user && user.tipoCuenta === 6 ? "Crear Agente" : "Crear Usuario"
            }
            subtitle={user && user.tipoCuenta === 6 ? "Agente" : "Usuario"}
          />
        </Row>
        <Formik
          initialValues={{
            Nombres: "",
            Apellidos: "",
            Rut: "",
            FechaNacimiento: null,
            Telefono: "",
            Direccion: "",
            Email: "ejemplo@gmail.com",
            Oficio: "",
            Password: "",
            ProyectosInmobiliariosId: [],
            InmobiliariaId: "",
            TipoCuenta: "",
            Banco: "",
            TipoCuentaBancaria: "",
            NumeroCuenta: "",
            MedioPago: "",
          }}
          validate={validate}
          onSubmit={(values) => {
            this.addUsuario(values);
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="form-container">
              <FormUsuarioAdd
                values={values}
                show={true}
                itemInmobiliarias={itemInmobiliarias}
                setFieldValue={setFieldValue}
              />

              <button className="btn btn-primary" type="submit">
                {user && user.tipoCuenta === 6
                  ? "Crear Agente"
                  : "Crear Usuario"}
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

const validate = (formValues) => {
  const errors = {};

  if (!formValues.Nombres) {
    errors.Nombres = "Por favor ingrese sus nombres";
  }

  if (!formValues.Apellidos) {
    errors.Apellidos = "Por favor ingrese sus apellidos";
  }

  if (util.checkRut(formValues.Rut)) {
    errors.Rut = util.checkRut(formValues.Rut);
  }
  // if (!formValues.FechaNacimiento) {
  //   errors.FechaNacimiento = "Por favor ingrese su Fecha de Nacimiento";
  // }
  if (!formValues.Telefono) {
    errors.Telefono = "Por favor ingrese su Telefono";
  } else if (isNaN(formValues.Telefono)) {
    errors.Telefono = "Por favor solo agregue numeros";
  }
  if (!formValues.Direccion) {
    errors.Direccion = "Por favor ingrese su Direccion";
  }
  if (!formValues.Email) {
    errors.Email = "Por favor ingrese su Email";
  }
  if (!formValues.TipoCuenta) {
    errors.TipoCuenta = "Por favor ingrese su TipoCuenta";
  }
  if (!formValues.Password) {
    errors.Password = "Por favor ingrese su Password";
  }

  return errors;
};

const mapStateToProps = (state) => {
  const {
    app: { mensaje, loading, itemInmobiliarias, requestAddUsuario, errorMessage },
  } = state;
  return { mensaje, loading, itemInmobiliarias, requestAddUsuario, errorMessage };
};

const mapDispatchToProps = (dispatch) => ({
  addUsuario: (user) => dispatch(fetchAddUsuario(user)),
  getClearAction: () => dispatch(fetchClearAction()),
  initMensaje: () => dispatch(initializeMensaje()),
  dispatch: (action) => {
    dispatch(action);
  },
});

IndexUsuario = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexUsuario);

export default IndexUsuario;
