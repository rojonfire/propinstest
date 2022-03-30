import React from "react";
import { connect } from "react-redux";
import { Row, Button, Navbar, Col, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { login, cleanData, setLoading } from "../../action";
import icon from "../../utils/images";
import sweetalert from "sweetalert";
import { LoadingModal } from "../../components/Loading";
import { Link } from "react-router-dom";

class IniciarSesion extends React.Component {
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
      password: "",
    });
  };

  componentDidUpdate() {
    const { data, dispatch } = this.props;

    if (data && !data.isLoggedIn && Object.keys(data).length > 0) {
      sweetalert({
        title: "Error al iniciar sesión",
        text: data ? data.mensaje : "",
        icon: "warning",
        dangerMode: false,
      }).then(() => {
        dispatch(cleanData());
      });
    }
  }

  render() {
    const { text, title, goToStep, loading } = this.props;
    return (
      <section fluid={true}>
        {loading && <LoadingModal />}
        <div
          id="login"
          className="center text-center cont-login cont-100vh hideMOBILE"
        >
          <div className="cont-info">
            <div className="title-section">
              <span className="h4 text-primary">{title}</span>
            </div>
            <p>{text}</p>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={validate}
            onSubmit={(e, opts) => this.onSubmit(e, opts)}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label className="contact-label ">Correo electrónico</label>
                  <div>
                    <Field
                      className="reginorma center "
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
                  <label className="contact-label">Contraseña</label>

                  <div>
                    <Field
                      className="reginorma center marginbu"
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
                <Row className="center text-center">
                  <Col className="center text-center">
                    <button
                      className="btn btn-primary btn-margin5 btn-center largoboton"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Iniciar sesión
                    </button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
          <div className="text-center">
            <Card className="cuadradofinal center text-center s-margin">
              Si aún no eres parte de Propins{" "}
              <Link className="linkahome" to={"/registronormal"}>
                regístrate aquí
              </Link>
            </Card>
            <div>
              <a
                className=" center text-center abajito text-secondary tamanoLETRA s-margin"
                onClick={() => goToStep(3)}
              >
                ¿Olvidaste tu contraseña?
              </a>{" "}
            </div>
          </div>
        </div>
        <div id="login" className="hideWEB2">
          <Row>
            <Col className="mecentro">
              <LinkContainer to={"/"}>
                <Navbar.Brand>
                  <img className="mecentro" src={icon.logoColorGris} alt="" />
                </Navbar.Brand>
              </LinkContainer>
            </Col>
          </Row>
          <div className="cont-info">
            <div className="title-section">
              <span className="h4 text-primary">{title}</span>
            </div>
            <p>{text}</p>
          </div>

          <Row className="center text-center">
            <Col className="">
              <Formik
                initialValues={{ email: "", password: "" }}
                validate={validate}
                onSubmit={(e, opts) => this.onSubmit(e, opts)}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Row className="center text-center">
                      <Col className="center text-center">
                        <div className="center form-group cajota ">
                          <div className="form-group cajota">
                            <label className="contact-proper ">
                              Correo electrónico
                            </label>
                            <Field
                              className="contact-input cajata2"
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
                        <div className="center form-group cajota">
                          <div className="form-group cajota">
                            <label className="contact-proper">Contraseña</label>
                            <Field
                              className="contact-input cajata2"
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
                      </Col>
                    </Row>

                    <Row className="center text-center">
                      <Col>
                        <Button
                          className="btn btn-primary btn-margin6 btn-center  largoboton"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Iniciar sesión
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>

          <div className="center text-center">
            <Card className="cuadradofinal center text-center">
              Si aún no eres parte de Propins{" "}
              <Link className="linkahome" to={"/registronormal"}>
                regístrate aquí
              </Link>
            </Card>
          </div>
          <div className=" center">
            <a className="center abajito " onClick={() => goToStep(3)}>
              ¿ Olvidaste tu contraseña?
            </a>{" "}
          </div>
        </div>
      </section>
    );
  }
}

const validate = (formValues) => {
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

const mapStateToProps = (state) => {
  const { auth, app } = state;
  return {
    ...auth,
    data: app.data,
    loading: app.loading,
    datosPropiedadTasacion: app.datosPropiedadTasacion,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

IniciarSesion = connect(mapStateToProps, mapDispatchToProps)(IniciarSesion);

export default IniciarSesion;
