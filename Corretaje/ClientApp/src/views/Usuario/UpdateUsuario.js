/** @format */

import React from "react";
import { FormUsuarioAdd } from "./FormUsuarioAdd";
import { Container, Row } from "shards-react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import util from "../../utils/utilsFunctions";
import swal from "sweetalert2";
import { initializeMensaje, updateUsuario } from "../../action";
import PageTitle from "../../components/common/PageTitle";

let listaInmobiliarias = [{ value: "", label: "--Seleccione--" }];

class IndexUsuario extends React.Component {
  constructor(props) {
    super(props);   
    this.state = {
      success: false,
      usuario: null,
      disabled: false,
      isAdd: false,
    };
  }
    

  componentDidMount() {
    const { match, itemsUsuarios, initMensaje, itemInmobiliarias } = this.props;
    const { isAdd } = this.state;
    let user = JSON.parse(localStorage.getItem("user"));
    initMensaje();
    if (match.params && match.params.id) {
      let usuario = itemsUsuarios.find((cl) => cl.id === match.params.id);
      this.setState({ usuario });
    }

    if (!isAdd && user && user.tipoCuenta === 6 && user.InmobiliariaId && itemInmobiliarias.length > 0) {
      this.setState({isAdd:true})
      const inmobiliaria = itemInmobiliarias.find((inmo) => inmo.id === user.InmobiliariaId);
      listaInmobiliarias.push({ value: inmobiliaria.id, label: inmobiliaria.nombre });
    }
    else if (!isAdd) {  
      this.setState({isAdd:true})   
      if (listaInmobiliarias.length-1 !== itemInmobiliarias.length)
        itemInmobiliarias.map((i) =>
          listaInmobiliarias.push({ value: i.id, label: i.nombre })
        );
    }
  }

  updateUsuario = (values) => {
    this.setState({ disabled: true });
    
    const { match } = this.props;
    let data = {
      fechaNacimiento: values.FechaNacimiento,
      tipoCuenta: values.TipoCuenta,
      apellidos: values.Apellidos,
      direccion: values.Direccion,
      estadoCivil: values.Telefono,
      nacionalidad: "",
      nombres: values.Nombres,
      oficio: values.Oficio,
      inmobiliariaId: values.InmobiliariaId,
      proyectosInmobiliariosId: values.ProyectosInmobiliariosId,
      rut: values.Rut,
      telefono: values.Telefono,
      idString: match.params.id,
      email: values.Email,
      datosBancarios: {
        banco: values.Banco,
        tipoCuenta: values.TipoCuentaBancaria,
        numeroCuenta: values.NumeroCuenta,
        medioPago: values.MedioPago
      }
    };
    const { updateUsuario } = this.props;
    updateUsuario(data);
  };

  feedback = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    const { requestUpdateUsuario, match, history, errorMessage } = this.props;
    if (requestUpdateUsuario === "LOADING") {
      swal.showLoading();
    } 
    if (requestUpdateUsuario === "SUCCESS") {
      swal.fire({
        title: 'Usuario actualizado',
        text: 'Se han actualizado los datos del usuario exitosamente',
        icon: 'success',
        onAfterClose: () => {
          history.push(user && user.tipoCuenta === 6 ? "/agentes" : "/usuarios");
        },
      });
      
    }
    if (requestUpdateUsuario === "ERROR") {
      swal.fire(
        'Error',
        errorMessage,
        'error'
      );
    }
  }

  render() {
    const { usuario } = this.state;
    const { requestUpdateUsuario } = this.props;
    let user = JSON.parse(localStorage.getItem("user"));
    return (
      <Container className="main-content-container px-4">
        {usuario && (
          <>
            <Row noGutters className="page-header py-4">
              <PageTitle 
                sm="4" 
                title= {user && user.tipoCuenta === 6 ? "Actualizar Agente" : "Actualizar Usuario" }
                subtitle= {user && user.tipoCuenta === 6 ? "Agente" : "Usuario" }
              />
            </Row>
            <Formik
              initialValues={{
                Nombres: usuario.nombres,
                Apellidos: usuario.apellidos,
                Rut: usuario.rut,
                FechaNacimiento: new Date(usuario.fechaNacimiento),
                Telefono: usuario.telefono,
                Direccion: usuario.direccion,
                Email: usuario.email,
                Oficio: usuario.oficio,
                Password: usuario.password,
                ProyectosInmobiliariosId: usuario.proyectosInmobiliariosId,
                InmobiliariaId: usuario.inmobiliariaId,
                TipoCuenta: usuario.tipoCuenta,
                Banco: usuario.datosBancarios && usuario.datosBancarios.banco,
                TipoCuentaBancaria: usuario.datosBancarios && usuario.datosBancarios.tipoCuenta,
                NumeroCuenta: usuario.datosBancarios && usuario.datosBancarios.numeroCuenta,
                MedioPago: usuario.datosBancarios && usuario.datosBancarios.medioPago,
              }}
              validate={validate}
              onSubmit={(values) => {
                this.updateUsuario(values);
              }}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form className="form-container">
                  <FormUsuarioAdd
                    usuario={usuario}
                    values={values}
                    showPass={false}
                    itemInmobiliarias={listaInmobiliarias}
                    setFieldValue={setFieldValue}
                  />
                  { this.feedback() }

                  <button
                    className="btn btn-primary"
                    disabled={requestUpdateUsuario === "LOADING" ? true : false}
                    type="submit"
                  >
                    Actualizar Usuario
                  </button>
                </Form>
              )}
            </Formik>
          </>
        )}
      </Container>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (formValues.Nombres === "") {
    errors.Nombres = "Por favor ingrese sus nombres";
  }
  if (formValues.Apellidos === "") {
    errors.Apellidos = "Por favor ingrese sus apellidos";
  }

  if (util.checkRut(formValues.Rut)) {
    errors.Rut = util.checkRut(formValues.Rut);
  }
  // if (formValues.FechaNacimiento === "") {
  //   errors.FechaNacimiento = "Por favor ingrese su Fecha de Nacimiento";
  // }
  if (formValues.Telefono === "") {
    errors.Telefono = "Por favor ingrese su Telefono";
  } else if (isNaN(formValues.Telefono)) {
    errors.Telefono = "Por favor solo agregue numeros";
  }
  if (formValues.Direccion === "") {
    errors.Direccion = "Por favor ingrese su Direccion";
  }
  if (formValues.Email === "") {
    errors.Email = "Por favor ingrese su Mail";
  }
  if (formValues.TipoCuenta === "") {
    errors.TipoCuenta = "Por favor ingrese su TipoCuenta";
  }

  return errors;
};

const mapStateToProps = (state) => ({
  itemsUsuarios: state.app.itemsUsuarios,
  itemInmobiliarias: state.app.itemInmobiliarias,
  requestUpdateUsuario: state.app.requestUpdateUsuario,
  errorMessage: state.app.errorMessage
});

const mapDispatchToProps = (dispatch) => ({
  initMensaje: () => dispatch(initializeMensaje()),
  dispatch: (action) => {
    dispatch(action);
  },
  updateUsuario: (data) => dispatch(updateUsuario(data)),
});

IndexUsuario = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexUsuario);

export default IndexUsuario;
