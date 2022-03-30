import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import { Modal, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { updateUsuario } from "../../action";
import { LoadingModal } from "../../components/Loading";
import swal from "sweetalert";

class EditPerfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      loading: false,
    };
  }

  save = (formValues, e) => {
    const { updateUsuario } = this.props;
    this.setState({
      userData: formValues,
    });
    updateUsuario(formValues);
  };

  updateFeedback = () => {
    const { requestStateUpdateUser, errorMessage } = this.props;
    if (requestStateUpdateUser === "LOADING") {
      return <LoadingModal porcentaje={0} finish={() => void 0} />;
    }
    if (requestStateUpdateUser === "ERROR") {
      swal(errorMessage, {
        icon: "error",
        buttons: {
          cancel: false,
          confirm: true,
        },
      })
    }
    if (requestStateUpdateUser === "SUCCESS") {
      swal("Se han actualizado sus datos exitosamente", {
        icon: "success",
        buttons: {
          cancel: false,
          confirm: true,
        },
      }).then((value) => {
        window.location.reload();
      });
    }
    return null;
  };

  render() {
    const { userData } = this.props;
    return (
      <Formik
        initialValues={{
          nombres: userData && userData.nombres,
          apellidos: userData && userData.apellidos,
          rut: userData && userData.rut,
          email: userData && userData.mail,
          telefono: userData && userData.telefono,
        }}
        validate={validate}
        enableReinitialize={true}
      >
        {({ values, isValid }) => (
          <form>
            <Modal show={this.props.show} onHide={this.props.onHide}>
              {this.updateFeedback()}
              <Modal.Header closeLabel=" " closeButton>
                <Modal.Title>Editar datos personales</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="px-5">
                  <label className="contact-proper small-font">Nombres</label>
                  <Field
                    className="form-control form-control-sm"
                    type="text"
                    name="nombres"
                  />
                  <ErrorMessage
                    name="nombres"
                    className="contact-error"
                    component="div"
                  />
                </div>

                <div className="px-5">
                  <label className="contact-proper small-font">Apellidos</label>
                  <Field
                    className="form-control form-control-sm"
                    type="text"
                    name="apellidos"
                  />
                  <ErrorMessage
                    name="apellidos"
                    className="contact-error"
                    component="div"
                  />
                </div>

                <div className="px-5">
                  <label className="contact-proper small-font">Rut</label>
                  <Field
                    className="form-control form-control-sm"
                    type="text"
                    name="rut"
                  />
                  <ErrorMessage
                    name="rut"
                    className="contact-error"
                    component="div"
                  />
                </div>

                <div className="px-5">
                  <label className="contact-proper small-font">Email</label>
                  <Field
                    className="form-control form-control-sm"
                    type="text"
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    className="contact-error"
                    component="div"
                  />
                </div>
                <div className="px-5 pb-5">
                  <label className="contact-proper small-font">Telefono</label>
                  <Field
                    className="form-control form-control-sm"
                    type="text"
                    name="telefono"
                  />
                  <ErrorMessage
                    name="telefono"
                    className="contact-error"
                    component="div"
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.props.onHide}>
                  Cancelar
                </Button>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={(e) => this.save(values, e)}
                  disabled={!isValid}
                >
                  Guardar cambios
                </button>
              </Modal.Footer>
            </Modal>
          </form>
        )}
      </Formik>
    );
  }
}

const validate = (formValues) => {
  let errors = {};
  if (formValues.nombres === "") {
    errors.nombres = "Por favor, ingrese sus nombres";
  }
  if (formValues.apellidos === "") {
    errors.apellidos = "Por favor, ingrese sus apellidos";
  }
  if (formValues.rut === "") {
    errors.rut = "Por favor, ingrese su rut";
  }
  if (formValues.email === "") {
    errors.email = "Por favor, ingrese su email";
  }
  if (formValues.telefono === "") {
    errors.telefono = "Por favor, ingrese su telefono";
  }
  return errors;
};

const mapStateToProps = (state) => ({
  ...state.app,
  ...state.auth,
  requestStateUpdateUser: state.app.requestStateUpdateUser,
  errorMessage: state.app.errorMessage
});

const mapDispatchToProps = (dispatch) => ({
  updateUsuario: (userData) => dispatch(updateUsuario(userData)),
  dispatch: (action) => {
    dispatch(action);
  },
});

EditPerfil = connect(mapStateToProps, mapDispatchToProps)(EditPerfil);

export default EditPerfil;
