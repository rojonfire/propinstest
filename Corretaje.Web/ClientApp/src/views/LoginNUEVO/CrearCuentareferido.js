import React from "react";
import { connect } from "react-redux";
import { Row, Navbar, Col, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import api from "../../api";
import icon from "../../utils/images";
import utils from "../../utils/utilsFunc";
import sweetalert from "sweetalert";
import utilsFunc from "../../utils/utilsFunc";
import { creaCuenta, login } from "../../action";
import { LoadingModal } from "../../components/Loading";

class CrearCuentareferido extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      captchaToken: null,
      submitted: false,
      acceptTerms: false,
      referido: {
        nombre: "",
        apellido: "",
        mail: "",
      },
    };
  }

  componentDidMount = async () => {
    const idRef = utilsFunc.getUrlParameter("idref");
    let referidoDatos;
    if (idRef !== undefined) {
      referidoDatos = await api.GetReferidoById(idRef);
      this.setState({ referido: referidoDatos });
    }
  };

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

  handleCaptcha = (captchaToken) => {
    this.setState({ captchaToken });
  };

  handleRut = (value) => {
    return utils.formatRut(value);
  };

  handleTerms = () => {
    this.setState({ acceptTerms: !this.state.acceptTerms });
  };
  onSubmit = async (values, opts) => {
    const idRef = utilsFunc.getUrlParameter("idref");
    const { dispatch } = this.props;
    console.log(values);
    // this.setState({submitted: true}, () => {
    const rut = values.rut.replace(/\./g, "").replace(/\-/g, "");
    const data = {
      nombres: values.nombre,
      apellido: values.apellido,
      rut: rut,
      id: idRef,
      UsuarioReferidoId: "",
      edad: values.edad,
      comuna: values.comuna,
      mail: values.mail,
      telefono: values.telefono,
      password: values.password,
    };

    const resultRef = await api.apiUpdateReferido(data);
    data.UsuarioReferidoId = resultRef.id;
    dispatch(creaCuenta(data))

    const userLogin = {
      email: values.mail,
      password: values.password
    }
    await setTimeout(() => dispatch(login(userLogin)), 5000)
    opts.resetForm({
      nombres: "",
      apellidos: "",
      rut: "",
      mail: "",
      telefono: "",
      password: "",
      passwordConfirm: "",
    });
    // });
  };

  render() {
    const { text, title, loading,goToStep } = this.props;
    const { referido } = this.state;

    return (
        <Container fluid={true}>
          <div id="login" className="cont-login cont-100vh">
            <div className="cont-info">
              <div className="izquierda"><LinkContainer to={"/"}>
                <Navbar.Brand>
                  <img className="nav-global" src={icon.logoColorGris} alt=":p"/>
                </Navbar.Brand>
              </LinkContainer></div>
              <div>
                <div className="bien-registro text-center">{title}</div>
              </div>
              <p className="bien-registro-p">{text}</p>
              <span>
              ¿Ya tienes una cuenta?{" "}
                <a onClick={() => goToStep(1)} className="color-referir">
                Iniciar sesión
              </a>
            </span>
            </div>

            <Formik
                initialValues={{
                  nombre: referido.nombre,
                  apellido: referido.apellido,
                  mail: referido.mail,
                  telefono: "",
                  rut: "",
                  edad: "",
                  comuna: "",
                  password: "",
                  passwordConfirm: ""
                }}
                validate={validate}
                onSubmit={(e, opts) => this.onSubmit(e, opts)}
                enableReinitialize={true}
            >
              {({isSubmitting, setFieldValue}) => (
                  <Form>
                    <Row>
                      <Col></Col>
                      <Col>
                    <div className="form-group-proper cajaynombre">
                      <div className="izquierda"><label className="contact-proper2">  Nombre o Razón Social*{" "}</label></div>
                      <div className="input-group">
                        <Field
                            className="reginorma"
                            type=""
                            name="nombre"
                            value={referido.nombre}
                            readOnly
                        />
                      </div>
                      <ErrorMessage
                          name="nombre"
                          className="contact-error"
                          component="div"
                      />
                    </div>
                    <div className="form-group-proper cajaynombre">
                      <div className="izquierda"><label className="contact-proper2">Apellido{" "}</label></div>
                      <div className="input-group">
                        
                        <Field
                            className="reginorma"
                            type=""
                            name="apellido"
                            value={referido.apellido}
                            readOnly
                        />
                      </div>
                      <ErrorMessage
                          name="apellido"
                          className="contact-error"
                          component="div"
                      />
                    </div>

                    <div className="form-group-proper cajaynombre">
                      <div className="izquierda"><label className="contact-proper2">Corro Electrónico*{" "}</label></div>
                      <div className="input-group">
                        
                        <Field
                            className="reginorma"
                            name="mail"
                            type=""
                            value={referido.mail}
                            readOnly
                        />
                      </div>
                      <ErrorMessage
                          name="mail"
                          className="contact-error"
                          component="div"
                      />
                    </div>
                    <div className="form-group-proper cajaynombre">
                      <div className="izquierda"><label className="contact-proper2">Celular*{" "}</label></div>
                      <div className="input-group">
                        <Field
                            className="reginorma"
                            type=""
                            name="telefono"
                            maxLength="12"
                        />
                      </div>
                      <ErrorMessage
                          name="telefono"
                          className="contact-error"
                          component="div"
                      />
                    </div>
                        <div className="form-group-proper form-check terminos">
                          <Field
                              type="checkbox"
                              className="form-check-input"
                              id="terminos"
                              onChange={this.handleTerms}
                          />
                          <label className="form-check-label" htmlFor="terminos">
                            Aceptar{" "}
                            <a
                                className="text-primary-propers"
                                href="/terminosycondiciones"
                            >
                              términos y condiciones
                            </a>
                          </label>
                        </div>
                      </Col>
                      <Col>
                    
                    <div className="form-group-proper cajaynombre">
                      <div className="izquierda"><label className="contact-proper2">Rut*{" "}</label></div>
                      <div className="input-group">
                        
                        <Field
                            className="reginorma"
                            type=""
                            name="rut"
                            onChange={(e) => setFieldValue("rut", this.handleRut(e.target.value))}
                        />
                      </div>
                      <ErrorMessage
                          name="rut"
                          className="contact-error"
                          component="div"
                      />
                    </div>
                    <div className="form-group-proper cajaynombre">
                      <div className="izquierda"><label className="contact-proper2">Edad*{" "}</label></div>
                      <div className="input-group">
                        <Field
                            className="reginorma"
                            type=""
                            name="edad"
                        />
                      </div>
                      <ErrorMessage
                          name="edad"
                          className="contact-error"
                          component="div"
                      />
                    </div>
                    <div className="form-group-proper cajaynombre">
                      <div className="izquierda"><label className="contact-proper2">Comuna de residencia*{" "}</label></div>
                      <div className="input-group">
                        <Field
                            className="reginorma"
                            type=""
                            name="comuna"
                        />
                      </div>
                      <ErrorMessage
                          name="comuna"
                          className="contact-error"
                          component="div"
                      />
                    </div>
                    <div className="form-group-proper cajaynombre">
                      <div className="izquierda"><label className="contact-proper2"> Contraseña*{" "}</label></div>
                      <div className="input-group">
                       
                        <Field
                            className="reginorma"
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
                    <div className="form-group-proper cajaynombre">
                      <div className="izquierda"><label className="contact-proper2">Confirmar Contraseña*{" "}</label></div>
                      <div className="input-group">
                        <Field
                            className="reginorma"
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

                    
                    {loading && <LoadingModal />}
                    <div id="form-group">
                      {/*<ReCAPTCHA*/}
                      {/*    className="captcha"*/}
                      {/*    sitekey={KEYS.GOOGLE_RECAPTCHA_API_KEY}*/}
                      {/*    onChange={this.handleCaptcha}*/}
                      {/*    size="normal"*/}
                      {/*/>*/}
                    </div>
                      </Col>
                      <Col></Col>
                    </Row>
                    <Row className="center text-center">
                      <Col md="12">
                        <button
                            className="btn-referir-proper center text-center"
                            type="submit"
                            disabled={isSubmitting}
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
  if (formValues.passwordConfirm === "") {
    errors.passwordConfirm = "Por favor ingrese nuevamente su contraseña";
  }
  if (formValues.password === "") {
    errors.password = "Por favor ingrese una contraseña";
  }
  if (formValues.password !== "" && formValues.password.length < 8) {
    errors.password = "Debe tener un mínimo de 8 caracteres";
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
  return { userAccount: app.userAccount, loading: app.loading };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

CrearCuentareferido = connect(mapStateToProps, mapDispatchToProps)(CrearCuentareferido);

export default CrearCuentareferido;
