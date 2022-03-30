import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { creaCuenta, setAccount, setRegistered, setRequestRegistro } from "../../action";
import utils from "../../utils/utilsFunc";
import sweetalert from "sweetalert";
import KEYS from "../../utils/keys";
import { LoadingModal } from "../../components/Loading";
import utilsFunc from "../../utils/utilsFunc";
import { Row, Col, Form, Input, Checkbox, Button } from "antd";
import icon from "../../utils/images";
import { Link } from "react-router-dom";

class CrearCuenta extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      captchaToken: null,
      acceptTerms: false,
      esEmbajador: false,
      formSubmitted: false
    };

    const { setRequestRegistro, registered, goToStep } = this.props; 
    setRequestRegistro("IDLE");
    //const isSigningUp = utilsFunc.getUrlParameter("register");
    
    if (registered) {
      goToStep(2); 
    }
    
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

  handleTerms = () => {
    this.setState({ acceptTerms: !this.state.acceptTerms });
  };

  handleRut = (value) => {
    return utils.formatRut(value);
  };

  onChangeEsEmbajador = (e) => {
    this.setState({
      esEmbajador: e.target.checked
    });
  }

  goToLogin = () => {
    const { goToStep, setRegistered } = this.props;
    setRegistered(true);
    goToStep(2);
  }
  
  onSubmit = (values) => {
    const { creaCuenta } = this.props;
    const rut = values.rut.replace(/\./g, "");
    const data = {
      nombres: values.nombres,
      apellidos: values.apellidos,
      rut: rut,
      Email: values.mail,
      telefono: values.telefono,
      password: values.password,
      esEmbajador: this.state.esEmbajador
    };
    creaCuenta(data);
  }

  feedback = () => {
    const { goToStep, dispatch, requestRegistro, errorMessage, setRegistered } = this.props;

    if (requestRegistro === "SUCCESS") {
      sweetalert({
        title: "Cuenta creada con éxito, ahora puedes iniciar sesión",
        icon: "success",
        dangerMode: false,
      });
      setRegistered(true);
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
    const { text, title, requestRegistro } = this.props;
    const { captchaToken } = this.state;

    let email = utilsFunc.getUrlParameter("email");
    let nombre = utilsFunc.getUrlParameter("nombre");
    let telefono = utilsFunc.getUrlParameter("telefono");    
    //let esEmbajador = utilsFunc.getUrlParameter("esEmbajador");

    return (
      <Container fluid={true} className="login-horizontal-padding">
        {this.feedback()}
        {requestRegistro === "LOADING" && <LoadingModal />}
        <div className="cont-login">
          <div className="hideWEB hide-md hide-lg hide-xl display-block-xs display-block-sm">
            <Row justify="space-between">
              <Col span={8}>
                <Link
                  to={{
                    pathname: `/`
                  }}
                >
                  <img
                    className="w-100"
                    src={icon.logoColorGris}
                    alt=""     
                  />
                </Link>
              </Col>
              <Col span={9}>
                ¿Ya tienes cuenta?{" "}
                <span onClick={() => this.goToLogin()} className="text-primary">
                  Inicia sesión
                </span>
              </Col>
            </Row>
          </div>
          
          <Row justify="center">
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className="py-1rem line-height-3rem register-text">
                <span className="h4 text-primary title-primary text-transform-capitalize">{title}</span>
                <p className="description">{text}</p>
              </div>
              <Form
                layout="vertical"
                ref={this.formRef}
                name="control-ref"
                onFinish={this.onSubmit}
                initialValues={{
                  nombres: nombre && nombre,
                  mail: email && email,
                  telefono: telefono && telefono,
                  esEmbajador: this.state.esEmbajador,
                  rut: "",
                  password: ""
                }}
                onValuesChange={this.onValuesChange}
              >
                <Row justify="space-between">
                  <Col xs={24} sm={24} md={24} lg={11}>
                    <Form.Item 
                      name="nombres" 
                      label="Nombre"
                      rules={[
                        {
                          required: true,
                          message: "El nombre es requerido",
                        },
                      ]}
                    >
                      <Input size="default" className="antd-form-input-size-fix registro-input" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={11}>
                    <Form.Item 
                      name="apellidos" 
                      label="Apellido"
                      rules={[
                        {
                          required: true,
                          message: "El apellido es requerido",
                        },
                      ]}
                    >
                      <Input size="default" className="antd-form-input-size-fix registro-input" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col xs={24} sm={24} md={24} lg={11}>
                    <Form.Item 
                      name="rut" 
                      label="Rut"
                      rules={[
                        {
                          required: true,
                          message: "El rut es requerido",
                        },
                        {
                          message: "Ingrese su rut sin puntos y con guión",
                          pattern: new RegExp(/^[0-9]+-[0-9kK]{1}$/)
                        }
                      ]}
                    >
                      <Input size="default" className="antd-form-input-size-fix registro-input" />
                    </Form.Item>
                  </Col>                  
                  <Col xs={24} sm={24} md={24} lg={11}>
                    <Form.Item 
                      name="telefono" 
                      label="Celular"
                      rules={[
                        {
                          required: true,
                          message: "El celular es requerido",
                        }
                      ]}
                    >
                      <Input size="default" className="antd-form-input-size-fix registro-input" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col xs={24} sm={24} md={24} lg={11}>
                    <Form.Item 
                      name="mail" 
                      label="Correo"
                      rules={[
                        {
                          required: true,
                          message: "El email es requerido",
                        },
                        {
                          message: "El email ingresado no es válido",
                          pattern: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
                        }
                      ]}
                    >
                      <Input size="default" className="antd-form-input-size-fix registro-input" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={11}>
                    <Form.Item 
                      name="password" 
                      label="Contraseña"
                      rules={[
                        {
                          required: true,
                          message: "La contraseña es requerida",
                        },
                        { min: 8, message: 'La contraseña debe contener al menos 8 caracteres' }
                      ]}
                    >
                      <Input.Password size="default" className="antd-form-input-size-fix registro-input" />
                    </Form.Item>
                  </Col>
                </Row>
                <div className="hide-xs hide-sm display-block-md display-block-lg display-block-lg">
                  <Row className="hide-xs hide-sm" justify="start">
                    <Col>
                      <span className="h5 text-primary subtitle-primary ">
                        Selecciona tu perfil
                      </span>                    
                    </Col>
                  </Row>
                </div>                
                <Row justify="start">
                  <Col>
                    <Form.Item
                      name="esCompradorOVendedor"
                    >
                      <Checkbox>
                        Comprador/vendedor
                      </Checkbox>

                    </Form.Item>
                    
                  </Col>
                  <Col span={2} />
                  <Col>
                    <Form.Item
                      name="esEmbajador"
                    >
                      <Checkbox checked={this.state.esEmbajador} onChange={this.onChangeEsEmbajador}>
                        Embajador
                      </Checkbox>

                    </Form.Item>
                    
                  </Col>
                </Row>
                <Row justify="start">
                  <Col>
                    <Form.Item
                      className="text-left"
                      name="aceptarTerminos"
                      valuePropName="checked"
                      rules={[{
                        validator: (_, value) =>
                          value ? Promise.resolve() : Promise.reject(new Error('Debe aceptar los términos y condiciones para registrarse'))
                      }]}  
                    >
                      <Checkbox>
                        Acepto {" "}
                        <text>
                          <a className="" href="/terminosycondiciones">
                            <div className="terminito22">
                              {" "}
                              Términos y condiciones
                            </div>
                          </a>
                        </text>
                      </Checkbox>
                    </Form.Item>                    
                  </Col>                  
                </Row>
                <Row justify="center">
                  <Col>
                    <ReCAPTCHA
                      sitekey={KEYS.GOOGLE_RECAPTCHA_API_KEY}
                      onChange={this.handleCaptcha}
                    />
                  </Col>
                </Row>
                <Row justify="center" className="captcha-error-fix">
                  <Col>
                    <Form.Item
                      className="text-left"
                      name="captcha"
                      rules={[{
                        required: captchaToken === null,
                        message: "Debe resolver el captcha para registrarse"
                      }]}  
                    />   
                  </Col>
                </Row>
                <Row justify="center">
                  <Col>
                    <Button
                      htmlType="submit"
                      className="register-btn"
                      disabled={
                        requestRegistro === "LOADING"  //|| captchaToken === null //|| !acceptTerms
                      }
                    >
                      Registrarme
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { app } = state;
  return {
    userAccount: app.userAccount,
    requestRegistro: app.requestRegistro,
    errorMessage: app.errorMessage,
    registered: app.registered
  };
};

const mapDispatchToProps = (dispatch) => ({
  setRequestRegistro: (requestState) => dispatch(setRequestRegistro(requestState)),
  creaCuenta: (data) => dispatch(creaCuenta(data)),
  setRegistered: (data) => dispatch(setRegistered(data)),
  dispatch: (action) => {
    dispatch(action);
  },
});

CrearCuenta = connect(mapStateToProps, mapDispatchToProps)(CrearCuenta);

export default CrearCuenta;
