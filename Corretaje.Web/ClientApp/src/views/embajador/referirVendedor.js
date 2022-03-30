import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import AccountSidebar from "../../components/AccountSidebar";
import { connect } from "react-redux";
import { postReferirVendedor } from "../../action";
import { Field, Formik, ErrorMessage } from "formik";
import { BARRIOS_COMUNAS } from "../../utils/constants";
import swal from "sweetalert";
import { LoadingModal } from "../../components/Loading";

class ReferirVendedor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.state !== this.props.location.state) {
      this.setState(this.props.location.state);
    }
  }

  submit = (values) => {
    const { postReferirVendedor } = this.props;
    postReferirVendedor(values);
  }

  feedback = () => {
    const { errorMessage, requestReferirVendedor } = this.props;

    if (requestReferirVendedor === "LOADING") {
      return <LoadingModal porcentaje={0} finish={() => void 0} />;
    }

    if (requestReferirVendedor === "SUCCESS") {
      swal("Se ha referido al vendedor exitosamente", {
        icon: "success",
        buttons: {
          cancel: false,
          confirm: true,
        },
      }).then((value) => {
        window.location.reload();
      });
    }

    if (requestReferirVendedor === "ERROR") {
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
    const { requestReferirVendedor } = this.props;
    
    return (
      <div className="fondo-perfil">
        { this.feedback() }
        <AccountSidebar />
        <div className="hideMOBILE">
          <Row>
            <Col md="3"></Col>
            <Col md="5">
              <h2 className="font-weight-bold mt-4">
                Referir vendedor
              </h2>
              <Formik
                initialValues={{
                  nombres: "",
                  telefono: "",
                  email: "",
                  comuna: ""
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
                    <Row className="mb-3">
                      <Col sm={7}>
                        <label>Nombre</label>
                        <Field
                          name="nombres"
                          id="nombres"
                          className="w-100 form-control"
                        />
                        <ErrorMessage
                          name="nombres"
                          className="contact-error"
                          component="div"
                        />
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col sm={7}>
                        <label>Teléfono</label>
                        <Field
                          name="telefono"
                          id="telefono"
                          className="w-100 form-control"
                        />
                        <ErrorMessage
                          name="telefono"
                          className="contact-error"
                          component="div"
                        />
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col sm={7}>
                        <label>Correo</label>
                        <Field
                          name="email"
                          id="email"
                          className="w-100 form-control"
                        />
                        <ErrorMessage
                          name="email"
                          className="contact-error"
                          component="div"
                        />
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      <Col sm={7}>
                        <label>Comuna</label>
                        <Field
                          name="comuna"
                          id="comuna"
                          className="w-100 form-control"
                          as="select"
                        >
                          <option value="">-- Seleccione --</option>
                          { Object.keys(BARRIOS_COMUNAS).map(c => (
                            <option value={c}>{c}</option>
                          )) }
                        </Field>
                        <ErrorMessage
                          name="comuna"
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
                          disabled={requestReferirVendedor != "LOADING" ? false : true}
                        >
                          Referir
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
            Referir vendedor
          </div>
          <div className="sm-box">
            <Row>
              <Col className="center">
                <Formik
                  initialValues={{
                    nombres: "",
                    telefono: "",
                    email: "",
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
                      <Row className="mb-3">
                        <Col sm={12}>
                          <label>Nombre</label>
                          <Field
                            name="nombres"
                            id="nombres"
                            className="w-100 form-control"
                          />
                          <ErrorMessage
                            name="nombres"
                            className="contact-error"
                            component="div"
                          />
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col sm={12}>
                          <label>Teléfono</label>
                          <Field
                            name="telefono"
                            id="telefono"
                            className="w-100 form-control"
                          />
                          <ErrorMessage
                            name="telefono"
                            className="contact-error"
                            component="div"
                          />
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col sm={12}>
                          <label>Correo</label>
                          <Field
                            name="email"
                            id="email"
                            className="w-100 form-control"
                          />
                          <ErrorMessage
                            name="email"
                            className="contact-error"
                            component="div"
                          />
                        </Col>
                      </Row>

                      <Row className="mb-4">
                        <Col sm={12}>
                          <label>Comuna</label>
                          <Field
                            name="comuna"
                            id="comuna"
                            className="w-100 form-control"
                            as="select"
                          >
                            <option value="">-- Seleccione --</option>
                            { Object.keys(BARRIOS_COMUNAS).map(c => (
                              <option value={c}>{c}</option>
                            )) }
                          </Field>
                          <ErrorMessage
                            name="comuna"
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
                            disabled={requestReferirVendedor != "LOADING" ? false : true}
                          >
                            Referir
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
  
  if (formValues.nombres == "") {
    errors.nombres = "Por favor ingrese nombre";
  }

  if (formValues.telefono == "") {
    errors.telefono = "Por favor ingrese teléfono";
  }

  if (formValues.email == "") {
    errors.email = "Correo electrónico no válido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)) {
    errors.email = "Por favor ingrese correo electrónico";
  } else {

  }

  if (formValues.comuna == "" || formValues.comuna == null || formValues.comuna == undefined) {
    errors.comuna = "Por favor ingrese comuna";
  }

  return errors;
};

const mapStateToProps = (state) => ({
  requestReferirVendedor: state.app.requestReferirVendedor,
  errorMessage: state.app.errorMessage
});

const mapDispatchToProps = (dispatch) => ({
  postReferirVendedor: (data) => dispatch(postReferirVendedor(data)),
});

ReferirVendedor = connect(mapStateToProps, mapDispatchToProps)(ReferirVendedor);

export default ReferirVendedor;
