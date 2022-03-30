import React from "react";
import { connect } from "react-redux";
import "../../css/style-propins.css";
import ReactGa from "react-ga";
import { Col, Row, Image, Card, Container } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import icon from "../../utils/images";
import ReCAPTCHA from "react-google-recaptcha";
import KEYS from "../../utils/keys";
import sweetalert from "sweetalert";
import api from "../../api";
import utilFunc from "../../utils/utilsFunc";

export const initGA = () => {
  console.log("GA init");
  ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
};

class tour extends React.Component {
  constructor(props) {
    super(props);

    const codProp = utilFunc.getUrlParameter("codProp");

    this.state = {
      defaultMessage: codProp
        ? `Necesito más informacion respecto a la propiedad ${codProp}`
        : ``,
      captchaToken: null,
    };
  }
  componentDidMount() {
    initGA();
    logPageView();
    document.querySelector("body").scrollTo(0, 0);
  }
  handleCaptcha = (captchaToken) => {
    this.setState({ captchaToken });
  };

  async onSubmit(values, opts) {
    try {
      await api.apiPostTicket(values);

      sweetalert({
        title: "Enviado con éxito",
        text: "Uno de nuestros ejecutivos se comunicará a la brevedad con usted.",
        icon: "success",
        dangerMode: false,
      });
    } catch (error) {
      console.log("error: ", error);
      sweetalert({
        title: "Ups!",
        text: "Algo no resulto del todo bien, intentelo nuevamente",
        icon: "warning",
        dangerMode: true,
      });
    } finally {
      opts.resetForm({
        Empresa: "",
        Email: "",
        Telefono: "",
        Pregunta: "",
      });
    }
  }

  render() {

    return (
      <div>
        <div className="section-tour pa0">
          <Container className="title-section text-center">
            <div className="hP">
              Te presentamos una nueva forma de recorrer las propiedades.
            </div>
            <span className="h6 text-white">
              Incorpora herramientas virtuales e interactivas para entregar
              experiencia únicas a tus clientes
            </span>
          </Container>

          <Container className=" pa0B ">
            <div className="hideWEB2">
              <Row>
                <Col>
                  <Card className="card-360 text-center center  ">
                    <Row className="image-titulo text-center">
                      {" "}
                      <Col>Visita Virtual 360</Col>
                    </Row>
                    <Row className="image-descri text-center center ">
                      <Col className="center ">
                        {" "}
                        Experiencia interactiva que te permite recorrer todo el
                        interior de una vivienda y cada uno de sus espacios en
                        detalle, como si estuvieras en el lugar, pero desde la
                        comodidad de tu casa.
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card className="card-4k center text-center">
                    <Row className="image-titulo ">
                      <Col>Fotografía de alta calidad</Col>
                    </Row>
                    <Row className="image-descri center ">
                      <Col>
                        Contenido visual 4K, HD y con formato Web para potenciar
                        la imagen de tu empresa.
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card className="center card-plano text-center">
                    <Row className="image-titulo ">
                      <Col>Plano virtual</Col>{" "}
                    </Row>
                    <Row className="image-descri center ">
                      <Col>
                        Forma de visualización en 2D y 3D que permiten una
                        visión general y en detalle de la distribución de una
                        vivienda y sus espacios.
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card className="card-digi center text-center">
                    <Row className="image-titulo ">
                      {" "}
                      <Col>Contenido digital</Col>
                    </Row>
                    <Row className="image-descri center ">
                      <Col>
                        Material promocional para aumentar la visibilidad de tu
                        empresa y atraer a más clientes através de tus canales.
                        digitales
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </div>
            <Row className="HOMEE hideMOBILE HOMEE1">
              <Col md="3">
                <Card className="card-360 text-center center  ">
                  <Row className="image-titulo text-center">
                    {" "}
                    <Col>Visita Virtual 360</Col>
                  </Row>
                  <Row className="image-descri text-center center ">
                    <Col className="center ">
                      {" "}
                      Experiencia interactiva que te permite recorrer todo el
                      interior de una vivienda y cada uno de sus espacios en
                      detalle, como si estuvieras en el lugar, pero desde la
                      comodidad de tu casa.
                    </Col>
                  </Row>
                </Card>
              </Col>

              <Col md="3">
                <Card className="card-4k center text-center">
                  <Row className="image-titulo ">
                    <Col>Fotografía de alta calidad</Col>
                  </Row>
                  <Row className="image-descri center ">
                    <Col>
                      Contenido visual 4K, HD y con formato Web para potenciar
                      la imagen de tu empresa.
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md="3">
                <Card className="center card-plano text-center">
                  <Row className="image-titulo ">
                    <Col>Plano virtual</Col>{" "}
                  </Row>
                  <Row className="image-descri center ">
                    <Col>
                      Forma de visualización en 2D y 3D que permiten una visión
                      general y en detalle de la distribución de una vivienda y
                      sus espacios.
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md="3">
                <Card className="card-digi center text-center">
                  <Row className="image-titulo ">
                    {" "}
                    <Col>Contenido digital</Col>
                  </Row>
                  <Row className="image-descri center ">
                    <Col>
                      Material promocional para aumentar la visibilidad de tu
                      empresa y atraer a más clientes através de tus canales.
                      digitales
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="section-projects">
          <h2 className="h2 font-weight-bold color-pri">
            Conoce algunos de nuestros proyectos
          </h2>
          <Container className="projects-images">
            <Row>
              <Col md="3">
                <div>
                  <a href="https://my.matterport.com/show/?m=2Sz3FznDCeQ">
                    <Image src="https://my.matterport.com/api/v1/player/models/2Sz3FznDCeQ/thumb" />
                    <Image
                      className="imgPlay"
                      src={icon.imgPlayTour}
                      style={{ width: "25%" }}
                    />
                  </a>
                </div>
              </Col>
              <Col md="3">
                <a href="https://my.matterport.com/show/?m=ZXSS8CfEnyi">
                  <Image src="https://my.matterport.com/api/v1/player/models/ZXSS8CfEnyi/thumb" />
                  <Image
                    className="imgPlay"
                    src={icon.imgPlayTour}
                    style={{ width: "25%" }}
                  />
                </a>
              </Col>
              <Col md="3">
                <a href="https://my.matterport.com/show/?m=McXHNQxQrri">
                  <Image src="https://my.matterport.com/api/v1/player/models/McXHNQxQrri/thumb" />
                  <Image
                    className="imgPlay"
                    src={icon.imgPlayTour}
                    style={{ width: "25%" }}
                  />
                </a>
              </Col>
              <Col md="3">
                <a href="https://my.matterport.com/show/?m=i1LprLtBoV4">
                  <Image src="https://my.matterport.com/api/v1/player/models/i1LprLtBoV4/thumb" />
                  <Image
                    className="imgPlay"
                    src={icon.imgPlayTour}
                    style={{ width: "25%" }}
                  />
                </a>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="section hideMOBILE">
          <div className="container-fluid">
            <Row className="justify-content-md-center">
              <div className="container-contactanos container-contactanosmobil">
                <div className="title-section text-center">
                  <h4 className="h4 font-weight-bold color-pri">Contáctanos</h4>
                  <Formik
                    initialValues={{
                      Empresa: "",
                      Email: "",
                      Telefono: "",
                      Pregunta: "",
                    }}
                    validate={validate}
                    onSubmit={(e, opts) => this.onSubmit(e, opts)}
                  >
                    {({ isSubmitting }) => (
                      <Form className="con2">
                        <Row>
                          <Col md="6">
                            <div className="form-group">
                              <label className="contact-label3">
                                Nombre de la empresa
                              </label>
                              <Field
                                name="Empresa"
                                type=""
                                className="contact-input "
                              />
                            </div>
                            <div className="form-group">
                              <label className="contact-label3">
                                Correo Electrónico
                              </label>
                              <Field
                                name="Email"
                                type="email"
                                className="contact-input "
                              />
                            </div>
                            <div className="form-group">
                              <label className="contact-label3">
                                Teléfono de contacto
                              </label>
                              <Field
                                name="Telefono"
                                type=""
                                maxLength="9"
                                className="contact-input "
                              />
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="form-group up10 ">
                              <p className="contact-label3">
                                Indícanos en qué podemos ayudarte
                              </p>
                              <Field
                                name="Pregunta"
                                component="textarea"
                                type=""
                                className="contact-input textarea-height"
                                maxLength="800"
                              />
                            </div>
                            <div className="form-group">
                              <ReCAPTCHA
                                className="captcha"
                                sitekey={KEYS.GOOGLE_RECAPTCHA_API_KEY}
                                onChange={this.handleCaptcha}
                              />
                            </div>
                          </Col>
                          <div className="center text-center">
                            {" "}
                            <button
                              className="btn center text-center btn-primary contact-btn111 contact-btn-mob"
                              type="submit"
                              style={{ color: "white" }}
                            >
                              {isSubmitting ? "Enviando..." : "Enviar"}
                            </button>
                          </div>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </Row>
          </div>
        </div>

        <div className=" title-section guapi text-center center hideWEB2">
          <h4 className="h4 font-weight-bold text-center center color-pri">
            Contáctanos
          </h4>
          <Formik
            initialValues={{
              Empresa: "",
              Email: "",
              Telefono: "",
              Pregunta: "",
            }}
            validate={validate}
            onSubmit={(e, opts) => this.onSubmit(e, opts)}
          >
            {({ isSubmitting }) => (
              <Form className="">
                <Row className="form-group cajota">
                  <Col>
                    <label className="contact-label3">Empresa</label>
                    <Field
                      name="Empresa"
                      type=""
                      className="contact-input cajata2 "
                    />
                  </Col>
                </Row>
                <Row className="form-group cajota">
                  <Col>
                    <label className="center text-center contact-label3">
                      Correo Electrónico
                    </label>
                    <Field
                      name="Email"
                      type="email"
                      className="contact-input cajota2 "
                    />
                  </Col>
                </Row>
                <Row className="form-group cajota">
                  <Col>
                    <label className="center text-center contact-label3">
                      Teléfono de contacto
                    </label>
                    <Field
                      name="Telefono"
                      type=""
                      maxLength="9"
                      className="contact-input cajata2 "
                    />
                  </Col>
                </Row>

                <Col md="6">
                  <div className="form-group up10 cajota ">
                    <p className="center text-center contact-label3">
                      Comentarios
                    </p>
                    <Field
                      name="Pregunta"
                      component="textarea"
                      type=""
                      className="contact-input cajota2 textarea-height"
                      maxLength="800"
                    />
                  </div>
                </Col>
                <Row className="center text-center ">
                  <Col className="center text-center ">
                    <div className="center text-center ">
                      <button
                        type="submit"
                        style={{ color: "white" }}
                        className="btn btn-primary center text-center contact-btn666"
                      >
                        {isSubmitting ? "Enviando..." : "Enviar"}
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { app } = state;

  return { ticket: app.ticket, user: app.user };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

const validate = (values) => {
  let errors = {};
  if (values.Pregunta === "") {
    errors.Pregunta = "Completa este campo";
  }
};

tour = connect(mapStateToProps, mapDispatchToProps)(tour);

export default tour;
