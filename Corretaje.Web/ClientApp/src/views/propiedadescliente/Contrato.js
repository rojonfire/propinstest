import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
  Row,
  Modal,
  Col,
  Button,
} from "react-bootstrap";
import { Form, Upload} from "antd";
import { connect } from "react-redux";
import { Field, Formik, ErrorMessage } from "formik";
import AccountSidebar from "../../components/AccountSidebar";


class Contrato extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPressedButton: false,
      show: false,
    };
  }

  manejarmodal = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const normFile = (e) => {
      console.log("Upload event:", e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };
    return (
      <div className="fondo-perfil bg-white">
        <AccountSidebar />
        <div className="hideWEB2">
          <div className="tituloperfilsinmargen">
            Formulario Promesa Compraventa
          </div>
        </div>
        <div className="hideMOBILE">
          <Row>
            <Col md="3"></Col>
            <Col md="8">
              {" "}
              <div className="tituloperfil">Formulario Promesa Compraventa</div>
              <div className="sub-titulo-perfil">
                Rellena este formulario para iniciar el proceso de compra de la
                propiedad
              </div>
              <div>
                <button
                  onClick={() => {
                    this.manejarmodal();
                  }}
                  className="btn-lohacemosporti2"
                >
                  Rellenar
                </button>
              </div>
              <div className="tituloperfil">Firma Contrato</div>
              <Row>
                <Col>
                  <div className="sub-titulo-perfil-flex">
                    Ambas partes interesadas en la compra y venta de la
                    propiedad han completado el formulario de la promesa
                    compraventa, tienes pendiente la firma del contrato.
                  </div>
                  <div>
                    Haz click en el botón a continuación y serás redirigido a la
                    plataforma de firmas digitales
                  </div>
                  <div>
                    <Button variant="suscrimod" className={"center"}>
                      Firmar
                    </Button>
                  </div>
                </Col>
                <Col>
                  <div className="sub-titulo-perfil-flex">
                    Ingresa el correo electrónico de las demás partes
                    involucradas en la firma de la compra de la propiedad para
                    que puedan recibir un link para realizar su firma.
                  </div>

                  <Formik
                    initialValues={{
                      TipoPropiedad: "",
                      Region: "",
                      Comuna1: "",
                      Comuna2: "",
                      Comuna3: "",
                      Dormitorio_Desde: "",
                      Dormitorio_Hasta: "",
                      Bano_Desde: "",
                      Bano_Hasta: "",
                      Estacionamiento: "",
                      M2Totales_Desde: "",
                      M2Totales_Hasta: "",
                      M2Utiles_Desde: "",
                      M2Utiles_Hasta: "",
                      tipo_moneda: "UF",
                      Nombre: "",
                      Mail: "",
                      Celular: "",
                      puntajesuscripcion: 0,
                    }}
                    onSubmit={this.submitSuscripcion}
                    validate={validate2}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue,
                      isSubmitting,
                      /* and other goodies */
                    }) => (
                      <Form>
                        <Row>
                          <Col>
                            <label>Contacto 1</label>
                            <Field
                              name="Nombre"
                              id="nombre"
                              className="color-border-modal2 form-control"
                            />
                          </Col>
                          <Col>
                            <label>Contacto 2</label>
                            <Field
                              name="Nombre"
                              id="nombre"
                              className="color-border-modal2 form-control"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <label>Contacto 3</label>
                            <Field
                              name="Nombre"
                              id="nombre"
                              className="color-border-modal2 form-control"
                            />
                          </Col>
                          <Col>
                            <label>Contacto 4</label>
                            <Field
                              name="Nombre"
                              id="nombre"
                              className="color-border-modal2 form-control"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <label>Contacto 5</label>
                            <Field
                              name="Nombre"
                              id="nombre"
                              className="color-border-modal2 form-control"
                            />
                          </Col>
                          <Col>
                            <label>Contacto 6</label>
                            <Field
                              name="Nombre"
                              id="nombre"
                              className="color-border-modal2 form-control"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-center center">
                            <Button variant="suscrimod" className={"center"}>
                              Enviar
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
              <Modal
                size="md"
                show={this.state.show}
                onHide={() => this.manejarmodal()}
              >
                <Modal.Header closeButton closeLabel="">
                  <Modal.Title>
                    <div className="center text-center formsustit">
                      Formulario Promesa de compraventa
                    </div>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Formik
                    initialValues={{
                      TipoPropiedad: "",
                      Region: "",
                      Comuna1: "",
                      Comuna2: "",
                      Comuna3: "",
                      Dormitorio_Desde: "",
                      Dormitorio_Hasta: "",
                      Bano_Desde: "",
                      Bano_Hasta: "",
                      Estacionamiento: "",
                      M2Totales_Desde: "",
                      M2Totales_Hasta: "",
                      M2Utiles_Desde: "",
                      M2Utiles_Hasta: "",
                      tipo_moneda: "UF",
                      Nombre: "",
                      Mail: "",
                      Celular: "",
                      puntajesuscripcion: 0,
                    }}
                    onSubmit={this.submitSuscripcion}
                    validate={validate2}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue,
                      isSubmitting,
                      /* and other goodies */
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <Row>
                          <Col>
                            <label>Carnet de identidad *</label>
                            <Form.Item
                              name=""
                              label=""
                              valuePropName="fileList"
                              getValueFromEvent={normFile}
                              extra="longggg"
                            >
                              <Upload
                                name="logo"
                                action="/upload.do"
                                listType="picture"
                              >
                                <Button variant="adjuntar">
                                  <div className="center-letra-adjutnar">
                                    Adjuntar
                                  </div>
                                </Button>
                              </Upload>
                            </Form.Item>
                          </Col>
                          <Col>
                            <label>Año de compra de la propiedad</label>
                            <Field
                              name="Año-prop"
                              id="Año-prop"
                              className="color-border-modal2 largo-opciones-select-suscri2"
                            />
                          </Col>
                        </Row>
                        <Row className="moverdomrs">
                          <Col>
                            <label>Dirección actual *</label>
                            <Field
                              name="Nombre"
                              id="nombre"
                              className="color-border-modal2 form-control"
                            />
                            <ErrorMessage
                              name="Nombre"
                              className="contact-error"
                              component="div"
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <label>Profesión u oficio</label>
                            <Field
                              name="Dormitorio_Desde"
                              id="Dormitorio_Desde"
                              className="color-border-modal2 form-control"
                            />
                            <ErrorMessage
                              name="numero_completar"
                              className="contact-error"
                              component="div"
                            />
                          </Col>

                          <Col>
                            <label>Estado civil</label>
                            <Field
                              as="select"
                              name="Estacionamiento"
                              id="Estacionamiento"
                              className="color-border-modal2 largo-opciones-select-suscri2"
                            >
                              <option value="00">Selecciona...</option>
                              <option value="0">Soltera/o</option>
                              <option value="1">Casada/o</option>
                              <option value="2">Viuda/o</option>
                            </Field>
                          </Col>
                        </Row>

                        <div className="center text-center">
                          <Button
                            variant="suscrimod"
                            className={"center"}
                            type="submit"
                          >
                            Enviar
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
const validate2 = (formValues) => {
  let errors = {};

  if (formValues.Celular === "") {
    errors.Celular = "Por favor ingrese su Celular";
  } else if (isNaN(formValues.Celular)) {
    errors.Celular = "Por favor ingrese solo números";
  }
  if (isNaN(formValues.M2Utiles_Desde)) {
    errors.numero_completar = "Por favor ingrese solo números";
  }

  if (formValues.Nombre === "") {
    errors.Nombre = "Por favor ingrese su Direacción Actual";
  }
  if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.Mail) &&
    formValues.Mail !== ""
  ) {
    errors.Mail = "Correo electrónico no valido";
  }

  return errors;
};
const mapStateToProps = (state) => ({
  ...state.app,
  ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

Contrato = connect(mapStateToProps, mapDispatchToProps)(Contrato);

export default Contrato;
