import React from "react";
import { connect } from "react-redux";
import icon from "../../utils/images";
import { Container, Navbar, Row, Col, Card } from "react-bootstrap";
import StepWizard from "react-step-wizard";
import { login, fetchValidaToken } from "../../action";
import CreaCuenta from "./CrearCuenta";
import CreaCuentareferido from "./CrearCuentareferido";
import CreaCuentaproper from "./CrearCuentaproper";
import IniciaSesion from "./IniciarSesion";
import CambiarContrasena from "./CambiarContrasena";
import Recuperar from "./Recuperar";
import utilfunc from "../../utils/utilsFunc";
import sweetalert from "sweetalert";
import ReactGa from "react-ga";
import { withLastLocation } from "react-router-last-location";
import { LinkContainer } from "react-router-bootstrap";

export const initGA = () => {
  console.log("GA init");
  ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
};

const Step = ({ title, text, tokenPassword, recover, ...props }) => {
  if (tokenPassword && !props.restablecer.data) {
    const id = utilfunc.getUrlParameter("id");
    if (tokenPassword.estado === 1 && id) {
      props.goToStep(4);
    } else if (
      props.currentStep !== 3 &&
      props.currentStep !== 5 &&
      props.currentStep !== 6 &&
      id &&
      tokenPassword.estado === 0 &&
      (!recover.estado || recover.estado === 0)
    ) {
      sweetalert({
        title: "Token Expirado!",
        text: "Su token expiró, haga click en 'olvidaste tu contraseña' y siga las instrucciones",
        icon: "warning",
        dangerMode: true,
      });
    }
  }
  return (
    <div>
      {props.currentStep === 1 ? (
        <IniciaSesion text={text} title={title} {...props} />
      ) : (
        ""
      )}

      {props.currentStep === 2 ? (
        <CreaCuenta text={text} title={title} {...props} />
      ) : (
        ""
      )}

      {props.currentStep === 3 ? (
        <Recuperar text={text} title={title} {...props} />
      ) : (
        ""
      )}

      {props.currentStep === 4 ? (
        <CambiarContrasena text={text} title={title} {...props} />
      ) : (
        ""
      )}
      {props.currentStep === 5 ? (
        <CreaCuentaproper text={text} title={title} {...props} />
      ) : (
        ""
      )}
      {props.currentStep === 6 ? (
        <CreaCuentareferido text={text} title={title} {...props} />
      ) : (
        ""
      )}
    </div>
  );
};

class Login3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevLocationInfo: {},
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount = () => {
    const { history, isLoggedIn, dispatch, lastLocation, location } =
      this.props;
    const pathname = lastLocation ? lastLocation.pathname : "";
    this.setState({
      prevLocationInfo:
        location.reinfo && location.reinfo.prevURL
          ? location.reinfo.prevURL
          : "",
    });

    const id = utilfunc.getUrlParameter("id");
    if (id) {
      dispatch(fetchValidaToken(id));
    }

    if (isLoggedIn) {
      history.push(pathname);
    }
    initGA();
    logPageView();
  };

  componentDidUpdate = () => {
    const {
      history,
      isLoggedIn,
      dispatch,
      tokenPassword,
      lastLocation,
      tipoCuenta,
    } = this.props;

    const pathname = lastLocation ? lastLocation.pathname : "";
    const id = utilfunc.getUrlParameter("id");
    const tasacion = utilfunc.getUrlParameter("tasacion");
    if (id && tokenPassword.length > 0) {
      dispatch(fetchValidaToken(id));
    }

    if (isLoggedIn) {
      if (tasacion && tasacion === "true") {
        setTimeout(function () {
          history.push("/resultadostasacion");
        }, 1500);
      } else {
        if (pathname === "/planes") {
          history.push("/planes");
        } else if (pathname === "/reofertar") {
          history.push(pathname);
        } else if (pathname === "/contraoferta") {
          history.push(pathname);
        } else if (pathname === "/referir") {
          history.push("/properHome");
        } else if (pathname === "/info-propiedad") {
          history.push(`/info-propiedad${lastLocation.search}`);
        } else if (tipoCuenta !== 7 && tipoCuenta !== 8) {
          setTimeout(function () {
            history.push("/perfil");
          }, 1500);
        } else if (tipoCuenta === 7) {
          setTimeout(function () {
            history.push("/proper-home");
          }, 1500);
        }
        // falta el de referido
        // else if (pathname === "/") {
        //   history.push(si es referido a referido home, si es proper a proper home y si es normal a /profile);
        // }
        else {
          history.push("/");
        }
      }
    }

    return null;
  };

  onSubmit(values) {
    const { login } = this.props;

    login({ ...values });
  }
  componentDidMount(prevProps) {
    document.querySelector("body").scrollTo(0, 0);
  }

  render() {
    const { tokenPassword, recover, restablecer } = this.props;

    return (
      <div>
        <div className="hideMOBILE cont-foto-login cont-100vh">
          <Container fluid="true" className="centro-pa-entro">
            <Row className="imagen-new-login center text-center">
              <LinkContainer to={"/"}>
                <div className="hideMOBILE">
                  <Navbar.Brand>
                    <img
                      className="iconoregistro"
                      src={icon.logoColor}
                      alt=":p"
                    />
                  </Navbar.Brand>
                </div>
              </LinkContainer>
              <Col className="center text-center">
                <Card className="card-loginn center bg-white paMobile">
                  <StepWizard>
                    <Step
                      onSubmitForm={this.onSubmit}
                      title="¡Hola!"
                      text="Inicia sesión para acceder a tu cuenta Propins"
                      tokenPassword={tokenPassword}
                      recover={recover}
                      restablecer={restablecer}
                    />
                    <Step
                      title="¡Bienvenido!"
                      text="Vamos a crear tu cuenta, necesitamos algunos detalles básicos de ti "
                    />
                    <Step
                      onSubmitForm={this.onSubmit}
                      title="¿Olvidaste tu contraseña?"
                      text="Ingresa la dirección de correo electrónico vinculada a tu cuenta y te enviaremos instrucciones para restablecer tu contraseña."
                      tokenPassword={tokenPassword}
                      recover={recover}
                      restablecer={restablecer}
                    />
                    <Step
                      onSubmitForm={this.onSubmit}
                      title="Cambiar contraseña"
                      tokenPassword={tokenPassword}
                      recover={recover}
                      restablecer={restablecer}
                    />
                    <Step
                      title="¡Bienvenido Proper!"
                      text="Vamos a crear tu cuenta, necesitamos algunos detalles básicos de ti "
                    />
                    <Step
                      title="¡Bienvenido Referido!"
                      text="Vamos a crear tu cuenta, necesitamos algunos detalles básicos de ti "
                    />
                  </StepWizard>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="hideWEB2">
          <section className="center section-mobile123 section-space-p1ex text-center bg-light">
            <Row>
              <Col md="12" className="bg-light pa0 center widemobile2 paMobile">
                <StepWizard>
                  <Step
                    onSubmitForm={this.onSubmit}
                    title="¡Hola!"
                    text="Inicia sesión para acceder a tu cuenta Propins"
                    tokenPassword={tokenPassword}
                    recover={recover}
                    restablecer={restablecer}
                  />
                  <Step
                    title="¡Bienvenido!"
                    text="Vamos a crear tu cuenta, necesitamos algunos detalles básicos de ti"
                  />
                  <Step
                    onSubmitForm={this.onSubmit}
                    title="¿Olvidaste tu contraseña?"
                    text="Ingresa la dirección de correo electrónico vinculada a tu cuenta y te enviaremos instrucciones para restablecer tu contraseña."
                    tokenPassword={tokenPassword}
                    recover={recover}
                    restablecer={restablecer}
                  />
                  <Step
                    onSubmitForm={this.onSubmit}
                    title="Cambiar contraseña"
                    tokenPassword={tokenPassword}
                    recover={recover}
                    restablecer={restablecer}
                  />
                </StepWizard>
              </Col>
            </Row>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, app } = state;
  return {
    ...auth,
    tokenPassword: app.tokenPassword,
    recover: app.recover,
    restablecer: app.restablecer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  login: ({ email, password }) => dispatch(login(email, password)),
  dispatch: (action) => {
    dispatch(action);
  },
});

Login3 = connect(mapStateToProps, mapDispatchToProps)(Login3);
Login3 = withLastLocation(Login3);

export default Login3;
