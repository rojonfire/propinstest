/** @format */

import React from "react";
import { FormClienteAdd } from "./FormClienteAdd";
import { Container, Row } from "shards-react";

import Dialog from "react-bootstrap-dialog";

import PageTitle from "../../components/common/PageTitle";

import { connect } from "react-redux";
import { Formik, Form } from "formik";
import {
  fetchAddCliente,
  fetchClearAction,
  initializeMensaje,
} from "../../action";

import swal from "sweetalert2";
import { validateValues } from "./formValidation";

class AddCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };
  }

  componentDidMount() {
    const { initialMensaje } = this.props;
    initialMensaje();
  }

  userFeedBack = () => {
    const { mensaje, loading } = this.props;

    if (loading) swal.showLoading();

    if (loading && typeof mensaje === "string") {
      mensaje === "Elemento Ingresado"
        ? swal.fire({
            icon: "success",
            title: "Bien...",
            text: "Agregado Correctamente!",
            onAfterClose: () => {
              window.location.reload();
            },
          })
        : swal.fire({
            icon: "info",
            title: "Atención",
            text: "Ocurrio un error",
          });
    }

    return null;
  };

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {this.userFeedBack()}
        <Formik
          initialValues={{
            nombres: "",
            apellidos: "",
            estadoCivil: "",
            fechaNacimiento: "",
            rut: "",
            mail: "",
            telefono: "",
            direccion: "",
          }}
          validate={validateValues}
          onSubmit={(values, { resetForm }) => {
            const { addCliente, onSubmit } = this.props;

            if (values.fechaNacimiento === "") {
              values.fechaNacimiento = new Date();
            }

            addCliente(values);
            resetForm();
            onSubmit && onSubmit();
          }}
        >
          {({ values }) => (
            <>
              <Row noGutters className="page-header py-4">
                <PageTitle
                  sm="4"
                  title="Crear cliente"
                  subtitle="Usuario"
                  className="text-sm-left"
                  // to="/addusuario"
                  // namebutton="Crear usuario"
                  // show={true}
                />
              </Row>
              <Form className="form-container">
                <FormClienteAdd values={values} />
                <button className="btn btn-primary" type="submit">
                  Crear Cliente
                </button>
              </Form>
            </>
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

const mapStateToProps = (state) => {
  const {
    app: { mensaje, loading },
  } = state;
  return { mensaje, loading };
};

const mapDispatchToProps = (dispatch) => ({
  addCliente: (cliente) => dispatch(fetchAddCliente(cliente)),
  getClearAction: () => dispatch(fetchClearAction()),
  initialMensaje: () => dispatch(initializeMensaje()),
});

AddCliente = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCliente);

export default AddCliente;
