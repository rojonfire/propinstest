import React from "react";
import { connect } from "react-redux";
import { Row, Navbar, Col, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { fetchRecuperaPassword } from "../../action";
import icon from "../../utils/images";
import sweetalert from "sweetalert";
import { LoadingModal } from "../../components/Loading";

class Recuperar extends React.Component {
  componentDidUpdate() {
    const { recover, goToStep } = this.props;
    if (recover && recover.data && recover.data.estado === 1) {
      sweetalert({
        title: "Recuperación realizada con éxito",
        text:
          "Uno correo electrónico de recuperación ha sido enviado a su casilla electrónica.",
        icon: "success",
        dangerMode: false,
      });
      goToStep(2);
    } else if (recover && recover.estado === 0) {
      sweetalert({
        title: "Error!",
        text: recover.mensaje,
        icon: "error",
        dangerMode: true,
      });
    }
  }
  onSubmit(values, opts) {
    const { dispatch } = this.props;
    dispatch(fetchRecuperaPassword(values));
    opts.resetForm({
      usuarioEMail: "",
    });
  }

  render() {
    const { text, title, goToStep, loading } = this.props;
    return (
      <Container >
        {loading && <LoadingModal />}
        <div id="login" className="cont-login cont-100vh">
          <div className="cont-info">
            <LinkContainer to={"/"}>
              <Navbar.Brand>
                <img className="nav-global" src={icon.logoColorGris} alt="" />
              </Navbar.Brand>
            </LinkContainer>
            <div className="title-section">
              <span className="h4">{title}</span>
            </div>
            <p>{text}</p>
            <span>
              ¿Ya tienes una cuenta?{" "}
              <a onClick={() => goToStep(2)} className="text-primary">
                Iniciar sesión
              </a>
            </span>
          </div>
          <Formik
            initialValues={{ usuarioEMail: "" }}
            validate={validate}
            onSubmit={(e, opts) => this.onSubmit(e, opts)}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="text-center center form-group">
                  <div md="12" className="input-group  text-center center">
                    <label className="contact-label">Correo electrónico</label>
                    <Field
                      className="text-center center form-control casilla2"
                      type="email"
                      name="usuarioEMail"
                      placeholder="nombre@ejemplo.com"
                    />
                  </div>
                  <ErrorMessage
                    name="usuarioEMail"
                    className="contact-error"
                    component="div"
                  />
                </div>
                <Row>
                  <Col md="12">
                    <button
                      disabled={isSubmitting}
                      className="btn btn-primary btn-block center btn-restable text-uppercase"
                      type="submit"
                    >
                      Restablecer Cuenta Propins
                    </button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    );
  }
}

const validate = (formValues) => {
  let errors = {};

  if (formValues.usuarioEMail === "") {
    errors.usuarioEMail = "Por favor ingrese su correo electrónico";
  }
  if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.usuarioEMail) &&
    formValues.usuarioEMail !== ""
  ) {
    errors.usuarioEMail = "Correo electrónico no valido";
  }
  return errors;
};

const mapStateToProps = (state) => {
  const { app } = state;
  return { recover: app.recover, loading: app.loading };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

Recuperar = connect(mapStateToProps, mapDispatchToProps)(Recuperar);

export default Recuperar;
