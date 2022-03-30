import React from "react";
import { connect } from "react-redux";
import { Row, Navbar, Col, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import FacebookLogin from "react-facebook-login";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { login, loginFacebook, loginGoogle, cleanData, setLoading } from "../../action";
import icon from "../../utils/images";
import sweetalert from "sweetalert";
import { LoadingModal } from "../../components/Loading";
import {GoogleLogin} from 'react-google-login';
import api from "../../api";


class IniciarSesionLive extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch(setLoading(false));
  }

  onSubmit = async (values, opts) => {
    const { dispatch } = this.props;
    await dispatch(login(values));
    opts.resetForm({
      email: values ? values.email : "",
      password: ""
    });
  };

  componentDidUpdate() {
    const { data, dispatch } = this.props;

    if (data && !data.isLoggedIn && Object.keys(data).length > 0) {
      sweetalert({
        title: "Error al iniciar sesión",
        text: data ? data.mensaje : "",
        icon: "warning",
        dangerMode: false
      }).then(() => {
        dispatch(cleanData());
      });
    }
  }

  responseGoogle = async response => {  
    const { dispatch } = this.props;  
    if (response.profileObj && response.profileObj.email) {
      try {  
              await api.apiPostCreaCuenta({
                nombres: response.profileObj.givenName,
                apellidos: response.profileObj.familyName,
                rut: response.profileObj.googleId,
                mail: response.profileObj.email,
                telefono: "",
                password: "x15897623vb",
                tipoCuenta: 1
              }); 
              const dato = await api.apiGetUsuarioByGmail(
                response.profileObj.email,
                response.tokenId
              );
    
              dispatch(
                loginGoogle(
                  response.profileObj.email,
                  response.profileObj.name,
                  response.profileObj.imageUrl,
                  dato.data.userId,
                  dato.data.token,
                  dato.data.rut,
                  dato.clienteId
                )
              );         
      } catch (e) {
        try {
          const dato = await api.apiGetUsuarioByGmail(
            response.profileObj.email,
            response.profileObj.tokenId
          );
          dispatch(
            loginGoogle(
              response.profileObj.email,
              response.profileObj.name,
              response.profileObj.imageUrl,
              dato.data.userId,
              dato.data.token,
              dato.data.rut,
              dato.clienteId
            )
          );
        } catch (e) {
          console.error(e);
        }
      }
    } 
  }

  responseFacebook = async params => {
    if (params.email && params.email !== "") {
      try {       

        await api.apiPostCreaCuenta({
          nombres: params.name,
          apellidos: "",
          rut: "",
          mail: params.email,
          telefono: "",
          password: "x15897623vb",
          tipoCuenta: 1
        }); 
        
        const dato = await api.apiGetUsuarioByMail(
          params.email,
          params.accessToken
        );

        this.props.dispatch(
          loginFacebook(
            params.email,
            params.name,
            params.picture.data.url,
            dato.data.userId,
            dato.data.token,
            dato.data.rut,
            dato.data.ordenCompra,
            dato.data.verificaCedula,
            ""
          )
        );
      } catch (e) {
        try {
          const data = await api.apiGetUsuarioByMail(
            params.email,
            params.accessToken
          );

          this.props.dispatch(
            loginFacebook(
              params.email,
              params.name,
              params.picture.data.url,
              data.data.userId,
              data.data.token,
              data.data.rut,
              data.data.ordenCompra,
              data.data.verificaCedula,
              ""
            )
          );
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  render() {
    const { text, title, goToStep, loading, inmobiliariaId} = this.props;
    return (
      <Container fluid={true}>
        {loading && <LoadingModal />}
        <div id="login" className="cont-login cont-100vh">
          <div className="cont-info">
            <LinkContainer to={inmobiliariaId ? `/live?id=${inmobiliariaId}` : "/live"} >
              <Navbar.Brand>
                {/* <img className="nav-global" src={icon.logoColor} alt="" /> */}
                <img className="nav-global" src={icon.logoLive} alt="" />
              </Navbar.Brand>
            </LinkContainer>
            <div className="title-section">
              <span className="h4">{title}</span>
            </div>
            <p>{text}</p>
          </div>
          <Row>
            <Col md="12">
                  <GoogleLogin
                    clientId="1093081405824-bf3duk1e5hgrtudcbd1hhuo17km2i6bk.apps.googleusercontent.com"
                    onSuccess={this.responseGoogle}
                    // isSignedIn={true}
                    onFailure = {this.responseGoogle}
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
            initialValues={{ email: "", password: "" }}
            validate={validate}
            onSubmit={(e, opts) => this.onSubmit(e, opts)}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <div className="input-group">
                    <label className="contact-label">Correo electrónico</label>
                    <Field
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="nombre@ejemplo.com"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
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
                <Row>
                  <Col md="6" sm="12">
                    <button
                      className="btn btn-primary purple-button btn-block text-uppercase"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Iniciar sesión
                    </button>
                  </Col>
                  <Col md="6" sm="12">
                    <button
                      className="btn btn-light btn-block text-uppercase"
                      onClick={() => goToStep(1)}
                    >
                      Crear cuenta
                    </button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
          <div className="text-center">
            <span>
              <a className="text-secondary" onClick={() => goToStep(3)}>
                ¿Olvidaste tu contraseña?
              </a>{" "}
            </span>
          </div>
        </div>
      </Container>
    );
  }
}

const validate = formValues => {
  let errors = {};

  if (formValues.email === "") {
    errors.email = "Por favor ingrese su correo electrónico";
  }
  if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email) &&
    formValues.email !== ""
  ) {
    errors.email = "Correo electrónico no valido";
  }
  if (formValues.password === "") {
    errors.password = "Por favor ingrese una contraseña";
  }

  return errors;
};

const mapStateToProps = state => {
  const { auth, app } = state;
  return { 
    ...auth, 
    data: app.data, 
    loading: app.loading,
    inmobiliariaId: app.inmobiliariaId,
    proyectoId: app.proyectoId 
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch: action => {
    dispatch(action);
  }
});

IniciarSesionLive = connect(
  mapStateToProps,
  mapDispatchToProps
)(IniciarSesionLive);

export default IniciarSesionLive;
