import React from "react";
import { connect } from "react-redux";
import { Container, Row, Card, Col } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { Formik, Form, Field, ErrorMessage } from "formik";
import api from "../../api";
import sweetalert from "sweetalert";
import KEYS from "../../utils/keys";
import utilsFunc from "../../utils/utilsFunc";
import ReactGa from "react-ga";

export const initGA = () => {
  console.log("GA init");
  ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
};

class IndexContacto extends React.Component {
  constructor(props) {
    super(props);

    const codProp = utilsFunc.getUrlParameter("codprop");

    this.state = {
      captchaToken: null,
      counterWordsGrat: 250,
      disablePhone: true,
      disableEmail: true,
      defaultMessage: codProp
        ? `Necesito más información respecto a la propiedad ${codProp}`
        : ``,
    };
    this.setCounter = this.setCounter.bind(this);
    this.enableEmail = this.enableEmail.bind(this);
    this.enablePhone = this.enablePhone.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params && match.params.idprop) {
      this.setState({
        txtSaberMas:
          "Quisiera saber mas información sobre la propiedad " +
          match.params.idprop,
      });
    }
    console.log(localStorage['Props'])
    initGA();
    logPageView();
  }

  handleCaptcha = (captchaToken) => {
    this.setState({ captchaToken });
  };

  async onSubmit(values, opts) {
    try {
      await api.apiPostTicket(values);

      sweetalert({
        title: "Enviado con éxito",
        text:
          "Uno de nuestros ejecutivos se comunicará a la brevedad con usted.",
        icon: "success",
        dangerMode: false,
      });
    } catch (error) {
      console.error("error: ", error);

      sweetalert({
        title: "Ups!",
        text: "Algo no resulto del todo bién, intentelo nuevamente",
        icon: "warning",
        dangerMode: true,
      });
    } finally {
      opts.resetForm({
        EMail: "",
        Telefono: "",
        Pregunta: "",
      });
    }
  }

  setCounter(e) {
    const {
      target: { value },
    } = e;
    const counterWordsGrat = 250 - value.length;
    this.setState({
      counterWordsGrat,
    });
  }

  enablePhone() {
    this.setState({
      disablePhone: false,
      disableEmail: true,
    });
  }

  enableEmail() {
    this.setState({
      disablePhone: true,
      disableEmail: false,
    });
  }

  render() {
    const { captchaToken, defaultMessage } = this.state;
    const { user } = this.props;

    let mail = user && user.email ? user.email : "";

    return (
      <Container fluid={true} className="pa01">
        <Row className=" justify-content-md-center  container-contact">
          <Formik
            initialValues={{
              EMail: mail,
              Telefono: "",
              canal: "",
              Pregunta: defaultMessage,
            }}
            validate={validate}
            onSubmit={(e, opts) => this.onSubmit(e, opts)}
          >
            {({ isSubmitting }) => (
              <Col md={3} className="">
                <Card className="contacto w-200 web-conta ">
                  <Form>
                    <div className="yol1o hideMOBILE">Contáctate con nosotros</div>
                    <div className="yol1o hideWEB2"> Contáctate con nosotros</div>
                    <p className="contact-paragraph2">
                      Indícanos cuales son tus dudas.
                    </p>
                    <Field
                      name="Pregunta"
                      component="textarea"
                      type="text"
                      className="contact-input caca textarea-height"
                      maxLength="250"
                    />
                    <ErrorMessage
                      name="Pregunta"
                      className="contact-error"
                      component="div"
                    />
                    {/* <p className="contact-paragraph">
                      Selecciona cómo te gustaría que te contactaran.
                    </p> */}
                    <label className="contact-label45">
                      Teléfono de contacto
                    </label>
                    <Field
                      type="text"
                      name="Telefono"
                      className="contact-input caca"
                      maxLength="9"
                    />
                    <ErrorMessage
                      name="Telefono"
                      className="contact-error"
                      component="div"
                    />
                    <label className="contact-label45">
                      Correo Electrónico
                    </label>
                    <Field
                      type="email"
                      name="EMail"
                      className="contact-input caca"
                    />
                    <ErrorMessage
                      name="EMail"
                      className="contact-error"
                      component="div"
                    />
                    <ReCAPTCHA
                      className="captcha"
                      sitekey={KEYS.GOOGLE_RECAPTCHA_API_KEY}
                      onChange={this.handleCaptcha}
                    />
                    <button
                      className="hideMOBILE btn btn-primary contact-btn1 "
                      type="submit"
                      disabled={isSubmitting || !captchaToken}
                      style={{ color: "white" }}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar"}
                    </button>
                    <button
                        className="hideWEB2 btn btn-primary contact-btn1 "
                        type="submit"
                        disabled={isSubmitting}
                        style={{ color: "white" }}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar"}
                    </button>
                  </Form>
                </Card>
              </Col>
            )}
          </Formik>
        </Row>
      </Container>
    );
  }
}

const validate = (values) => {
  let errors = {};
  if (values.Pregunta === "") {
    errors.Pregunta = "Completa este campo";
  }

  if (values.EMail === "" && values.Telefono === "") {
    errors.EMail = "Debe seleccionar al menos un medio de contacto.";
    return errors;
  }
  if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.EMail) &&
    values.EMail !== ""
  ) {
    errors.EMail = "Correo electrónico no valido";
  }
  if (!/^\d+$/.test(values.Telefono) && values.Telefono !== "") {
    errors.Telefono = "Número de teléfono no válido";
  }

  return errors;
};

const mapStateToProps = (state) => {
  const { app } = state;

  return { ticket: app.ticket, user: app.user };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

IndexContacto = connect(mapStateToProps, mapDispatchToProps)(IndexContacto);

export default IndexContacto;
