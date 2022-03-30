import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import { Modal, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { postCambiarContraseña } from "../../action";
import { LoadingModal } from "../../components/Loading";
import swal from "sweetalert";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      loading: false,
    };
  }

  save = (formValues, e) => {
    const { postCambiarContraseña } = this.props;
    const data = {
      contraseñaAntigua: formValues.oldPassword,
      contraseñaNueva: formValues.newPassword
    }
    postCambiarContraseña(data);
  };

  updateFeedback = () => {
    const { requestCambioContraseña, errorMessage } = this.props;
    if (requestCambioContraseña === "LOADING") {
      return <LoadingModal porcentaje={0} finish={() => void 0} />;
    }
    if (requestCambioContraseña === "ERROR") {
      swal({
        icon: "error",
        text: errorMessage,
        title: "Error"
      });
    }
    if (requestCambioContraseña === "SUCCESS") {
      swal("Se ha cambiado su contraseña exitosamente", {
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
    const { errorMessage } = this.props;
    return (
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: ""
        }}
        validate={validate}
        enableReinitialize={true}
      >
        {({ values, isValid }) => (
          <form>
            <Modal show={this.props.show} onHide={this.props.onHide}>
              {this.updateFeedback()}
              <Modal.Header closeLabel=" " closeButton>
                <Modal.Title>Cambiar contraseña</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="px-5">
                  <label className="contact-proper small-font">Contraseña antigua</label>
                  <Field
                    className="form-control form-control-sm"
                    type="password"
                    name="oldPassword"
                  />
                  <ErrorMessage
                    name="oldPassword"
                    className="contact-error"
                    component="div"
                  />
                </div>

                <div className="px-5">
                  <label className="contact-proper small-font">Nueva contraseña</label>
                  <Field
                    className="form-control form-control-sm"
                    type="password"
                    name="newPassword"
                  />
                  <ErrorMessage
                    name="newPassword"
                    className="contact-error"
                    component="div"
                  />
                </div>

                <div className="px-5">
                  <label className="contact-proper small-font">Confirmar nueva contraseña</label>
                  <Field
                    className="form-control form-control-sm"
                    type="password"
                    name="confirmNewPassword"
                  />
                  <ErrorMessage
                    name="confirmNewPassword"
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
  if (!formValues.oldPassword) {
    errors.oldPassword = "Por favor ingrese su contraseña";
  }

  if (!formValues.newPassword) {
    errors.newPassword = "Por favor ingrese nueva contraseña";
  } else if (formValues.newPassword.length < 8) {
    errors.newPassword = "La contraseña debe ser de al menos 8 caracteres de largo";
  }

  if (!formValues.confirmNewPassword) {
    errors.confirmNewPassword = "Por favor ingrese su contraseña";
  } else if (formValues.newPassword !== formValues.confirmNewPassword) {
    errors.confirmNewPassword = "Las contraseñas no coinciden";
  }
  return errors;
};

const mapStateToProps = (state) => ({
  ...state.app,
  ...state.auth,
  requestCambioContraseña: state.app.requestCambioContraseña,
  errorMessage: state.app.errorMessage
});

const mapDispatchToProps = (dispatch) => ({
  postCambiarContraseña: (userData) => dispatch(postCambiarContraseña(userData)),
  dispatch: (action) => {
    dispatch(action);
  },
});

ChangePassword = connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

export default ChangePassword;
