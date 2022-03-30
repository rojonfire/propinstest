import React from "react";
import { connect } from "react-redux";
import { withLastLocation } from "react-router-last-location";
import { Container, Row, Col } from "react-bootstrap";
import StepWizard from "react-step-wizard";
import { login, fetchValidaToken } from "../../action";
import CrearCuentaLive from "./CrearCuentaLive";
import IniciaSesionLive from "./IniciarSesionLive";
import CambiarContrasenaLive from "./CambiarContrasenaLive";
import RecuperarLive from "./RecuperarLive";
import utilfunc from "../../utils/utilsFunc";
import sweetalert from "sweetalert";
import ReactGa from 'react-ga'



export const initGA = () => {
  console.log('GA init')
  ReactGa.initialize('UA-167957495-1')
  }

export const logPageView = () => {
  ReactGa.set({page: window.location.pathname})
  ReactGa.pageview(window.location.pathname)
}

const Step = ({ title, text, tokenPassword, recover, ...props }) => {
  if (tokenPassword && !props.restablecer.data) {
    const id = utilfunc.getUrlParameter("id");
    if (tokenPassword.estado === 1 && id) {
      props.goToStep(4);
    } else if (
      props.currentStep !== 3 &&
      id &&
      tokenPassword.estado === 0 &&
      (!recover.estado || recover.estado === 0)
    ) {
      sweetalert({
        title: "Token Expirado!",
        text:
          "Su token expiró, haga click en 'olvidaste tu contraseña' y siga las instrucciones",
        icon: "warning",
        dangerMode: true
      });
    }
  }
  return (
    <div>
      {props.currentStep === 1 ? (
        <CrearCuentaLive text={text} title={title} {...props} />
      ) : (
        ""
      )}

      {props.currentStep === 2 ? (
        <IniciaSesionLive text={text} title={title} {...props} />
      ) : (
        ""
      )}

      {props.currentStep === 3 ? (
        <RecuperarLive text={text} title={title} {...props} />
      ) : (
        ""
      )}

      {props.currentStep === 4 ? (
        <CambiarContrasenaLive text={text} title={title} {...props} />
      ) : (
        ""
      )}
    </div>
  );
};

class LoginLive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevLocationInfo: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount = () => {
    const { history, isLoggedIn, dispatch, lastLocation, location } = this.props;
    const pathname = lastLocation ? lastLocation.pathname : "";
    this.setState({
      prevLocationInfo: location.reinfo && location.reinfo.prevURL ? location.reinfo.prevURL : "",
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
    } = this.props;
    const { prevLocationInfo } = this.state
    const pathname = lastLocation ? lastLocation.pathname : "";
    console.log(pathname);
    const id = utilfunc.getUrlParameter("id");
    if (id && tokenPassword.length > 0) {
      dispatch(fetchValidaToken(id));
    }

    if (isLoggedIn) {
      if (pathname === "/Planes") {
        history.push("/Planes");
      } else if (pathname === "/reofertar") {
        history.push(pathname);
      } else if (pathname === "/contraoferta") {
        history.push(pathname);
      } else if (prevLocationInfo !== "" && pathname.includes('/live')){
        history.push(prevLocationInfo);
      } else {
        history.push("");
      }
    }

    return null;
  };

  onSubmit(values) {
    const { login } = this.props;

    login({ ...values });
  }

  render() {
    const { tokenPassword, recover, restablecer,} = this.props;
    
    return (
      <Container fluid="true">
        <Row>
          <Col md="4" className="bg-light pa0 paMobile">
            <StepWizard>
              <Step
                title="¡Bienvenido!"
                text="Vamos a crear tu cuenta. Para un servicio personalizado necesitamos tus datos básicos. Si lo prefieres, crea tu cuenta con tu usuario de Google o Facebook en un solo click."
              />
              <Step
                onSubmitForm={this.onSubmit}
                title="¡Bienvenido!"
                text="Inicie sesión, en el caso que no tenga cuenta, haga clic en crear cuenta. También puede crear una cuenta con su usuario facebook o Google."
                tokenPassword={tokenPassword}
                recover={recover}
                restablecer={restablecer}
              />             
              <Step
                onSubmitForm={this.onSubmit}
                title="¿Olvidó su contraseña?"
                text="Ingrese la dirección de correo electrónico que usó cuando se unió y le enviaremos instrucciones para restablecer su contraseña."
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
          <Col md="8" id="login-img" className="pa0 paMobile onTopZ">
            <div className="cont-foto-login cont-100vh">
              <img
                alt="login"
                src="https://static.dezeen.com/uploads/2017/08/clifton-house-project-architecture_dezeen_hero-1.jpg"
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { auth, app } = state;
  return {
    ...auth,
    tokenPassword: app.tokenPassword,
    recover: app.recover,
    restablecer: app.restablecer,
    inmobiliariaId: app.inmobiliariaId,
    proyectoId: app.proyectoId
  };
};

const mapDispatchToProps = dispatch => ({
  login: ({ email, password }) => dispatch(login(email, password)),
  dispatch: action => {
    dispatch(action);
  }
});

LoginLive = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginLive);
LoginLive = withLastLocation(LoginLive);

export default LoginLive;
