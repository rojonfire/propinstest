import React from "react";
import { connect } from "react-redux";
import { Row, Navbar, Col, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import FacebookLogin from "react-facebook-login";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { creaCuenta, loginGoogle } from "../../action";
import icon from "../../utils/images";
import utils from "../../utils/utilsFunc";
import sweetalert from "sweetalert";
import { GoogleLogin } from "react-google-login";
import api from "../../api";

class CrearCuentaLive extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      captchaToken: null,
      submitted: false,
      acceptTerms: false,
    };
  }

  componentDidUpdate() {
    const { userAccount, goToStep } = this.props;
    const { submitted } = this.state;

    if (submitted) {
      if (userAccount && userAccount.estado === 1) {
        sweetalert({
          title: "Cuenta creada con éxito",
          icon: "success",
          dangerMode: false,
        });
        goToStep(1);
      } else if (userAccount && userAccount.estado === 0) {
        sweetalert({
          title: "Ups!",
          text: userAccount.mensaje,
          icon: "warning",
          dangerMode: true,
        });
      } else if (!userAccount) {
        sweetalert({
          title: "Ups!",
          text: "Ha ocurrido un error inesperado",
          icon: "warning",
          dangerMode: true,
        });
      }
    }
  }

  responseGoogle = async (response) => {
    const { dispatch } = this.props;
    if (response && response.profileObj && response.profileObj.email) {
      try {
        await api.apiPostCreaCuenta({
          nombres: response.profileObj.givenName,
          apellidos: response.profileObj.familyName,
          rut: response.profileObj.googleId,
          mail: response.profileObj.email,
          telefono: "",
          password: "x15897623vb",
          tipoCuenta: 1,
        });
        const dato = await api.apiGetUsuarioByGmail(
          response.profileObj.email,
          response.tokenId,
        );

        dispatch(
          loginGoogle(
            response.profileObj.email,
            response.profileObj.name,
            response.profileObj.imageUrl,
            dato.data.userId,
            dato.data.token,
            dato.data.rut,
            dato.clienteId,
          ),
        );
      } catch (e) {
        try {
          const dato = await api.apiGetUsuarioByGmail(
            response.profileObj.email,
            response.profileObj.tokenId,
          );
          dispatch(
            loginGoogle(
              response.profileObj.email,
              response.profileObj.name,
              response.profileObj.imageUrl,
              dato.data.userId,
              dato.data.token,
              dato.data.rut,
              dato.clienteId,
            ),
          );
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  handleCaptcha = (captchaToken) => {
    this.setState({ captchaToken });
  };

  handleTerms = () => {
    this.setState({ acceptTerms: !this.state.acceptTerms });
  };

  handleRut = (value) => {
    return utils.formatRut(value);
  };

  onSubmit(values, opts) {
    const { dispatch } = this.props;

    this.setState({ submitted: true }, () => {
      const rut = values.rut.replace(/\./g, "").replace(/-/g, "");
      const data = {
        nombres: values.nombres,
        apellidos: values.apellidos,
        rut: rut,
        mail: values.mail,
        telefono: values.telefono,
        password: values.password,
        tipoCuenta: 1,
      };
      dispatch(creaCuenta(data));
      opts.resetForm({
        nombres: "",
        apellidos: "",
        rut: "",
        mail: "",
        telefono: "",
        password: "",
        passwordConfirm: "",
      });
    });
  }

  render() {
    const { text, title, goToStep } = this.props;
    return (
        <Container fluid={true}>
        <div id="login" className="cont-login cont-100vh">
          <div className="cont-info">
            <LinkContainer to={"/live"}>
              <Navbar.Brand>
                {/* <img className="nav-global" src={icon.logoColor} alt=":p" /> */}
                <img className="nav-global" src={icon.logoLive} alt="" />
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
          <Row>
            <Col md="12">
              <GoogleLogin
                clientId="1093081405824-bf3duk1e5hgrtudcbd1hhuo17km2i6bk.apps.googleusercontent.com"
                onSuccess={this.responseGoogle}
                // isSignedIn={true}
                onFailure={this.responseGoogle}
                buttonText="Entrar con Google"
                className="col-12 google-button"
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <div className="border-bottom cont-facebook">
                <FacebookLogin
                  appId="362670194589310"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={this.responseFacebook}
                  cssClass="my-facebook-button-class btn btn-facebook btn-block text-uppercase"
                  textButton="ENTRAR CON FACEBOOK"
                  icon="fa-facebook"
                />
              </div>
            </Col>
          </Row>
          <Formik
            initialValues={{
              nombres: "",
              apellidos: "",
              rut: "",
              mail: "",
              telefono: "",
              password: "",
              passwordConfirm: "",
            }}
            validate={validate}
            onSubmit={(e, opts) => this.onSubmit(e, opts)}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="form-group">
                  <div className="input-group">
                    <label className="contact-label">Correo electrónico</label>
                    <Field
                      className="form-control"
                      type="mail"
                      name="mail"
                    />
                  </div>
                  <ErrorMessage
                    name="mail"
                    className="contact-error"
                    component="div"
                  />
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <label className="contact-label">Nombre</label>
                    <Field
                      className="form-control"
                      type="text"
                      name="nombres"
                    />
                  </div>
                  <ErrorMessage
                    name="nombres"
                    className="contact-error"
                    component="div"
                  />
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <label className="contact-label">Apellido</label>
                    <Field
                      className="form-control"
                      type="text"
                      name="apellidos"
                    />
                  </div>
                  <ErrorMessage
                    name="apellidos"
                    className="contact-error"
                    component="div"
                  />
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <label className="contact-label">Teléfono (Opcional)</label>
                    <Field
                      className="form-control"
                      type="tel"
                      name="telefono"
                      maxlength="12"
                    />
                  </div>
                  <ErrorMessage
                    name="telefono"
                    className="contact-error"
                    component="div"
                  />
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <label className="contact-label">RUT (Opcional)</label>
                    <Field
                      className="form-control"
                      type="text"
                      name="rut"
                      onChange={(e) =>
                        setFieldValue("rut", this.handleRut(e.target.value))
                      }
                    />
                  </div>
                  <ErrorMessage
                    name="rut"
                    className="contact-error"
                    component="div"
                  />
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <label className="contact-label">Contraseña</label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
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
                      Confirmar Contraseña
                    </label>
                    <Field
                      className="form-control"
                      type="password"
                      name="passwordConfirm"
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
                      className="btn btn-primary purple-button btn-block text-uppercase"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Regístrar ahora
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

  if (formValues.nombres === "") {
    errors.nombres = "Por favor ingrese sus nombres";
  }
  if (formValues.apellidos === "") {
    errors.apellidos = "Por favor ingrese sus apellidos";
  }
  if (formValues.mail === "") {
    errors.mail = "Por favor ingrese su correo electrónico";
  }
  if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.mail) &&
    formValues.mail !== ""
  ) {
    errors.mail = "Correo electrónico no valido";
  }
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
  return { userAccount: app.userAccount };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

CrearCuentaLive = connect(mapStateToProps, mapDispatchToProps)(CrearCuentaLive);

export default CrearCuentaLive;
