import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import AccountSidebar from "../../components/AccountSidebar";
import { connect } from "react-redux";
import { putActualizarDatosBancarios, getUsuario } from "../../action";
import { BANCOS, TIPOS_CUENTA_BANCARIA } from "../../utils/constants";
import { LoadingModal } from "../../components/Loading";
import swal from "sweetalert";
import { Field, Formik, ErrorMessage } from "formik";

class MisDatosBancarios extends React.Component {
  constructor(props) {
    super(props);

    const { getUsuario, userData } = this.props;

    this.state = {
      banco: userData && userData.datosBancarios && userData.datosBancarios.banco,
      tipoCuenta: userData && userData.datosBancarios && userData.datosBancarios.tipoCuenta,
      numeroCuenta: userData && userData.datosBancarios && userData.datosBancarios.numeroCuenta,
      medioPago: ""
    };
    
    getUsuario();
  }

  componentDidMount() {
    const { userData } = this.props;
    this.setState({
      banco: userData && userData.datosBancarios && userData.datosBancarios.banco,
      tipoCuenta: userData && userData.datosBancarios && userData.datosBancarios.tipoCuenta,
      numeroCuenta: userData && userData.datosBancarios && userData.datosBancarios.numeroCuenta,
    });
  }
  
  submit = (values) => {
    const { putActualizarDatosBancarios } = this.props;
    putActualizarDatosBancarios(values);
  }

  feedback = () => {
    const { errorMessage, requestActualizarDatosBancarios } = this.props;

    if (requestActualizarDatosBancarios === "LOADING") {
      return <LoadingModal porcentaje={0} finish={() => void 0} />;
    }

    if (requestActualizarDatosBancarios === "SUCCESS") {
      swal("Se han actualizado sus datos bancarios exitosamente", {
        icon: "success",
        buttons: {
          cancel: false,
          confirm: true,
        },
      }).then((value) => {
        window.location.reload();
      });
    }

    if (requestActualizarDatosBancarios === "ERROR") {
      swal(errorMessage, {
        icon: "error",
        buttons: {
          cancel: false,
          confirm: true,
        },
      });
    }

    return null;
  };

  render() {
    const { requestActualizarDatosBancarios, userData } = this.props;
    
    return (
      <div className="fondo-perfil">
        { this.feedback() }
        <AccountSidebar />
        <div className="hideMOBILE">
          <Row>
            <Col md="3"></Col>
            <Col md="5">
              <h2 className="font-weight-bold mt-4">
                Mis datos bancarios
              </h2>
              <Formik
                initialValues={{
                  banco: userData && userData.datosBancarios && userData.datosBancarios.banco,
                  tipoCuenta: userData && userData.datosBancarios && userData.datosBancarios.tipoCuenta,
                  numeroCuenta: userData && userData.datosBancarios && userData.datosBancarios.numeroCuenta,
                  medioPago: ""
                }}
                onSubmit={this.submit}
                validate={validate}
                onChange={this.onChange}
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
                    <Row className="mb-4">
                      <Col sm={7}>
                        <label>Banco</label>
                        <Field
                          name="banco"
                          id="banco"
                          className="w-100 form-control"
                          as="select"
                        >
                          <option value="">-- Seleccione --</option>
                          { BANCOS.map(c => (
                            <option value={c}>{c}</option>
                          )) }
                        </Field>
                        <ErrorMessage
                          name="banco"
                          className="contact-error"
                          component="div"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col sm={7}>
                        <label>Tipo cuenta</label>
                        <Field
                          name="tipoCuenta"
                          id="tipoCuenta"
                          className="w-100 form-control"
                          as="select"
                        >
                          <option value="">-- Seleccione --</option>
                          { TIPOS_CUENTA_BANCARIA.map(c => (
                            <option value={c}>{c}</option>
                          )) }
                        </Field>
                        <ErrorMessage
                          name="tipoCuenta"
                          className="contact-error"
                          component="div"
                        />
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col sm={7}>
                        <label>Número cuenta</label>
                        <Field
                          name="numeroCuenta"
                          id="numeroCuenta"
                          className="w-100 form-control"
                        />
                        <ErrorMessage
                          name="numeroCuenta"
                          className="contact-error"
                          component="div"
                        />
                      </Col>
                    </Row>                    
                    <Row className="mb-3">
                      <Col sm={7} className="text-center">
                        <Button
                          variant="primary"
                          type="submit"
                          disabled={requestActualizarDatosBancarios != "LOADING" ? false : true}
                        >
                          Actualizar
                        </Button>
                      </Col>
                    </Row>
                    
                  </Form>
                )}
              </Formik>
              
            </Col>
          </Row>
          
        </div>
        <div className="hideWEB2">
          <div className="tituloperfilsinmargen">
            Mis datos bancarios
          </div>
          <div className="sm-box">
            <Row>
              <Col className="center">
                <Formik
                  initialValues={{
                    banco: userData && userData.datosBancarios && userData.datosBancarios.banco,
                    tipoCuenta: userData && userData.datosBancarios && userData.datosBancarios.tipoCuenta,
                    numeroCuenta: userData && userData.datosBancarios && userData.datosBancarios.numeroCuenta,
                    medioPago: ""
                  }}
                  onSubmit={this.submit}
                  validate={validate}
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
                      <Row className="mb-4">
                        <Col sm={12}>
                          <label>Banco</label>
                          <Field
                            name="banco"
                            id="banco"
                            className="w-100 form-control"
                            as="select"
                          >
                            <option value="">-- Seleccione --</option>
                            { BANCOS.map(c => (
                              <option value={c}>{c}</option>
                            )) }
                          </Field>
                          <ErrorMessage
                            name="banco"
                            className="contact-error"
                            component="div"
                          />
                        </Col>
                      </Row>

                      <Row className="mb-4">
                        <Col sm={12}>
                          <label>Tipo cuenta</label>
                          <Field
                            name="tipoCuenta"
                            id="tipoCuenta"
                            className="w-100 form-control"
                            as="select"
                          >
                            <option value="">-- Seleccione --</option>
                            { TIPOS_CUENTA_BANCARIA.map(c => (
                              <option value={c}>{c}</option>
                            )) }
                          </Field>
                          <ErrorMessage
                            name="tipoCuenta"
                            className="contact-error"
                            component="div"
                          />
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col sm={12}>
                          <label>Número cuenta</label>
                          <Field
                            name="numeroCuenta"
                            id="numeroCuenta"
                            className="w-100 form-control"
                          />
                          <ErrorMessage
                            name="numeroCuenta"
                            className="contact-error"
                            component="div"
                          />
                        </Col>
                      </Row>

                      
                      
                      <Row className="mb-3">
                        <Col sm={12} className="text-center">
                          <Button
                            variant="primary"
                            type="submit"
                            disabled={requestActualizarDatosBancarios != "LOADING" ? false : true}
                          >
                            Actualizar
                          </Button>
                        </Col>
                      </Row>
                      
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const validate = (formValues) => {
  let errors = {};
  
  if (formValues.banco == "" || formValues.banco == null) {
    errors.banco = "Por favor ingrese banco";
  }

  if (formValues.tipoCuenta == "") {
    errors.tipoCuenta = "Por favor ingrese tipo de cuenta bancaria";
  }

  if (formValues.numeroCuenta == "") {
    errors.numeroCuenta = "Por favor ingrese número de cuenta";
  }

  return errors;
};

const mapStateToProps = (state) => ({
  requestActualizarDatosBancarios: state.app.requestActualizarDatosBancarios,
  userData: state.app.userData
});

const mapDispatchToProps = (dispatch) => ({
  putActualizarDatosBancarios: (data) => dispatch(putActualizarDatosBancarios(data)),
  getUsuario: () => dispatch(getUsuario())
});

MisDatosBancarios = connect(mapStateToProps, mapDispatchToProps)(MisDatosBancarios);

export default MisDatosBancarios;