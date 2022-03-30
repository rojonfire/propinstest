import React from "react";
import { connect } from "react-redux";
import { Row, Navbar, Col, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { restablecerPassword } from "../../action";
import icon from "../../utils/images";
import sweetalert from "sweetalert";

class CambiarContrasenaLive extends React.Component {
  componentDidUpdate() {
    const { restablecer, goToStep } = this.props;
    if (restablecer && restablecer.estado === 1) {
      goToStep(1);
      sweetalert({
        title: "Su contraseña ha sido modificada con exito",
        text: restablecer.mensaje,
        icon: "success",
        dangerMode: false,
      });
    } else if (restablecer && restablecer.estado === 0) {
      sweetalert({
        title: "Ups!",
        text: restablecer.mensajes,
        icon: "warning",
        dangerMode: true,
      });
    } else if (!restablecer) {
      sweetalert({
        title: "Ups!",
        text: "ha ocurrido un error inesperado",
        icon: "warning",
        dangerMode: true,
      });
    }
  }
  onSubmit(values, opts) {
    const { dispatch, tokenPassword } = this.props;
    if (tokenPassword) {
      const data = {
        password: values.password,
        email: tokenPassword.usuarioEmail,
      };
      dispatch(restablecerPassword(data));
      opts.resetForm({
        passwordConfirm: "",
        password: "",
      });
    }
  }

  render() {
    const { text, title, goToStep } = this.props;
    return (
      <Container fluid={true}>
        <div id="login" className="cont-login cont-100vh">
          <div className="cont-info">
            <LinkContainer to={"/"}>
              <Navbar.Brand>
                {/* <img className="nav-global" src={icon.logoColor} alt="" /> */}
                <img className="nav-global" src={icon.logoColorGris} alt="" />
              </Navbar.Brand>
            </LinkContainer>
            <div className="title-section">
              <span className="h4">{title}</span>
            </div>
            <p>{text}</p>
          </div>
          <Formik
            initialValues={{ passwordConfirm: "", password: "" }}
            validate={validate}
            onSubmit={(e, opts) => this.onSubmit(e, opts)}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <div className="input-group">
                    <label className="contact-label">Nueva contraseña</label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder=""
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    className="contact-error"
                    component="div"
                  />
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <label className="contact-label">
                      Repetir nueva contraseña
                    </label>
                    <Field
                      className="form-control"
                      type="password"
                      name="passwordConfirm"
                      placeholder=""
                    />
                  </div>
                  <ErrorMessage
                    name="passwordConfirm"
                    className="contact-error"
                    component="div"
                  />
                </div>
                <Row>
                  <Col md="12">
                    <button
                      className="btn btn-primary btn-block text-uppercase"
                      //onClick={props.goToStep(1)}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Confirmar
                    </button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
          <div className="cont-info text-center">
            <span>
              ¿Quieres crear una{" "}
              <a onClick={() => goToStep(2)} className="text-primary">
                cuenta nueva
              </a>
              ?
            </span>
          </div>
        </div>
      </Container>
    );
  }
}

const validate = (formValues) => {
  let errors = {};

  if (formValues.passwordConfirm === "") {
    errors.passwordConfirm = "Por favor ingrese nuevamente su contraseña";
  }
  if (formValues.password === "") {
    errors.password = "Por favor ingrese una contraseña";
  }
  if (
    formValues.password !== "" &&
    formValues.passwordConfirm !== "" &&
    formValues.passwordConfirm !== formValues.password
  ) {
    errors.passwordConfirm = "La contraseña no coincide";
  }

  return errors;
};

const mapStateToProps = (state) => {
  const { app } = state;
  return { restablecer: app.restablecer, tokenPassword: app.tokenPassword };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

CambiarContrasenaLive = connect(
  mapStateToProps,
  mapDispatchToProps
)(CambiarContrasenaLive);

export default CambiarContrasenaLive;
