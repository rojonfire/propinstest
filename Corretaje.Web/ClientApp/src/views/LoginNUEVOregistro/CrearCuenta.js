import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { Row, Col, Container } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import { creaCuenta, setAccount } from "../../action";
import utils from "../../utils/utilsFunc";
import sweetalert from "sweetalert";
import KEYS from "../../utils/keys";
import { LoadingModal } from "../../components/Loading";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import utilsFunc from "../../utils/utilsFunc";

class CrearCuenta extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      captchaToken: null,
      submitted: false,
      acceptTerms: false,
      mostrarPassword: false,
      mostrarPassword2: false,
      esEmbajador: false
    };
  }

  componentDidMount(prevProps) {
    document.querySelector("body").scrollTo(0, 0);
    let esEmbajador = utilsFunc.getUrlParameter("esEmbajador");
    if (esEmbajador != null) {
      this.setState({
        esEmbajador: esEmbajador.toLowerCase() === 'true'
      });
    }
    
  }

  handleCaptcha = (captchaToken) => {
    this.setState({ captchaToken });
  };

  handleClickShowPassword = () => {
    this.setState({ mostrarPassword: !this.state.mostrarPassword });
  };
  handleClickShowPassword2 = () => {
    this.setState({ mostrarPassword2: !this.state.mostrarPassword2 });
  };
  handleMouseDownPassword = (event) => {
    event.preventDefault();
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
      const rut = values.rut.replace(/\./g, "");
      const data = {
        nombres: values.nombres,
        apellidos: values.apellidos,
        rut: rut,
        Email: values.mail,
        telefono: values.telefono,
        password: values.password,
        esEmbajador: values.esEmbajador
      };
      dispatch(creaCuenta(data));
      opts.resetForm({
        nombres: "",
        apellidos: "",
        rut: "",
        mail: "",
        telefono: "",
        password: "",
        esEmbajador: false
        //passwordConfirm: "",
      });
    });
  }

  feedback = () => {
    const { goToStep, dispatch, requestRegistro, errorMessage } = this.props;

    if (requestRegistro === "SUCCESS") {
      sweetalert({
        title: "Cuenta creada con éxito, ahora puedes iniciar sesión",
        icon: "success",
        dangerMode: false,
      });
      goToStep(2);
    }
    if (requestRegistro === "ERROR") {
      sweetalert({
        title: "Ups!",
        text: errorMessage,
        icon: "warning",
        dangerMode: true,
      });
    }
    dispatch(setAccount(null));
  };

  render() {
    const { text, title, goToStep, requestRegistro } = this.props;
    const { acceptTerms, captchaToken } = this.state;

    let email = utilsFunc.getUrlParameter("email");
    let nombre = utilsFunc.getUrlParameter("nombre");
    let telefono = utilsFunc.getUrlParameter("telefono");    
    let esEmbajador = utilsFunc.getUrlParameter("esEmbajador");

    return (
      <Container fluid={true}>
        {this.feedback()}
        {requestRegistro === "LOADING" && <LoadingModal />}
        <div id="login" className="cont-login cont-100vh">
          <div className="cont-info">
            <div className="title-section">
              <span className="h4 text-primary">{title}</span>
            </div>
            <p>{text}</p>
            <div>
              ¿Ya tienes cuenta?{" "}
              <span onClick={() => goToStep(2)} className="text-primary">
                Inicia sesión
              </span>
            </div>
          </div>
          <Row>
            <Col md="12" />
          </Row>
          <Formik
            initialValues={{
              nombres: nombre && nombre,
              apellidos: "",
              rut: "",
              mail: email && email,
              telefono: telefono && telefono,
              password: "",
              esEmbajador: esEmbajador && esEmbajador.toLowerCase() === 'true',
              //passwordConfirm: "",
            }}
            validate={validate}
            onSubmit={(e, opts) => this.onSubmit(e, opts)}
          >
            {({ values, isSubmitting, setFieldValue }) => (
              <Form>
                <Row className="moverizrowregi ">
                  <Col md="6" sm="12" className="center">
                    <div className="etiqueta-registro">Nombre</div>

                    <div className="input-group  marginentrecosas">
                      <Field className="reginorma " type="" name="nombres" />
                      <ErrorMessage
                        name="nombres"
                        className="contact-error"
                        component="div"
                      />
                    </div>

                    <div className="izquierda">
                      <label className="contact-proper2">Apellido </label>
                    </div>
                    <div className="input-group marginentrecosas">
                      <Field className="reginorma " type="" name="apellidos" />
                      <ErrorMessage
                        name="apellidos"
                        className="contact-error"
                        component="div"
                      />
                    </div>

                    <div className="izquierda">
                      <label className="contact-proper2"> Correo* </label>
                    </div>

                    <div className="input-group">
                      <Field
                        className="reginorma "
                        type=""
                        name="mail"
                        placeholder="nombre@ejemplo.com"
                      />
                    </div>
                    <ErrorMessage
                      name="mail"
                      className="contact-error"
                      component="div"
                    />
                    <div className="selperf">Selecciona tu perfil</div>
                    <Row>
                      <Col>
                        <Field type="checkbox" name="esEmbajador" onChange={(e) => setFieldValue("esEmbajador", !values.esEmbajador)} />
                        Embajador/a
                      </Col>
                      <Col>
                        Otros
                        <input
                          type="checkbox"
                          id="terminos"
                          label="Aceptar"
                          className={"chekiado"}
                        />{" "}
                      </Col>
                    </Row>
                  </Col>

                  <Col className="center">
                    <div className="izquierda">
                      <label className="contact-proper2">Rut*</label>
                    </div>
                    <div className="input-group marginentrecosas">
                      <Field
                        className="reginorma "
                        type=""
                        name="rut"
                        placeholder="17777555-4"
                        onChange={(e) =>
                          setFieldValue("rut", this.handleRut(e.target.value))
                        }
                      />
                      <ErrorMessage
                        name="rut"
                        className="contact-error"
                        component="div"
                      />
                    </div>

                    <div className="izquierda">
                      <label className="contact-proper2">Celular*</label>
                    </div>
                    <div className="input-group marginentrecosas">
                      <Field
                        className="reginorma "
                        type=""
                        name="telefono"
                        placeholder="569988776655"
                        maxLength="12"
                      />
                      <ErrorMessage
                        name="telefono"
                        className="contact-error"
                        component="div"
                      />
                    </div>

                    <div className="izquierda">
                      <label className="contact-proper2">Contraseña</label>
                    </div>
                    <div className="input-group">
                      <Field
                        className="reginorma"
                        type={
                          this.state.mostrarPassword == false
                            ? "password"
                            : "text"
                        }
                        name="password"
                      />
                      <Button
                        shape="circle"
                        type="text"
                        className=""
                        icon={
                          this.state.mostrarPassword == true ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )
                        }
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      />{" "}
                      <ErrorMessage
                        name="password"
                        className="contact-error"
                        component="div"
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md="6" className="movertermi45">
                    <Row className="">
                      <Col md="4" className={""}>
                        <input
                          type="checkbox"
                          id="terminos"
                          label="Aceptar"
                          className={"chekiado"}
                          onChange={this.handleTerms}
                        />{" "}
                        Aceptar
                      </Col>
                      <Col md="">
                        <text>
                          <a className="" href="/terminosycondiciones">
                            <div className="terminito22">
                              {" "}
                              Términos y condiciones
                            </div>
                          </a>
                        </text>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="5">
                    {" "}
                    <ReCAPTCHA
                      className="captcha feo"
                      sitekey={KEYS.GOOGLE_RECAPTCHA_API_KEY}
                      onChange={this.handleCaptcha}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <button
                      className=""
                      type="submit"
                      disabled={
                        isSubmitting || !acceptTerms || captchaToken === null
                      }
                    >
                      {isSubmitting ? "Enviando..." : "Registrarme"}
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

  if (utils.checkRut(formValues.rut)) {
    errors.rut = utils.checkRut(formValues.rut);
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
  if (formValues.telefono === "") {
    errors.telefono = "Por favor ingrese su Telefono";
  } else if (isNaN(formValues.telefono)) {
    errors.telefono = "Por favor solo agregue numeros";
  }
  // if (formValues.passwordConfirm === "") {
  //  errors.passwordConfirm = "Por favor ingrese nuevamente su contraseña";
  // }
  if (formValues.password === "") {
    errors.password = "Por favor ingrese una contraseña";
  }
  //if (
  //  formValues.password !== "" &&
  //  formValues.passwordConfirm !== "" &&
  // formValues.passwordConfirm !== formValues.password
  // ) {
  //  errors.passwordConfirm = "La contraseña no coincide";
  //}

  return errors;
};

const mapStateToProps = (state) => {
  const { app } = state;
  return {
    userAccount: app.userAccount,
    requestRegistro: app.requestRegistro,
    errorMessage: app.errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

CrearCuenta = connect(mapStateToProps, mapDispatchToProps)(CrearCuenta);

export default CrearCuenta;
