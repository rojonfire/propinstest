import React from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";
import { Formik, Field } from "formik";
import { Regiones } from "../utils/Regiones";

export class IngresoDireccionPropiedad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Regiones,
      Comunas: [{}]
    };
  }

  onChangeRegion = setFieldValue => params => {
    const value = params.currentTarget.value;
    setFieldValue("region", value);

    const { Regiones } = this.state;
    const Comunas = Regiones.filter(function(region) {
      return region.region === value;
    });

    this.setState({ Comunas });
  };

  datosPropiedad = values => {
    const { continuar, conWebpay, continuarConWebpay } = this.props;
    if (conWebpay === 0) {
      continuar(values);
    } else {
      continuarConWebpay(values);
    }
  };

  render() {
    const { show, onhide } = this.props;
    const { Regiones, Comunas } = this.state;
    return (
      <Modal
        show={show}
        onHide={onhide}
        size="lg"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>Ingresar Dirección Propiedad</Modal.Header>
        <Modal.Body>
          <Container>
            <Formik
              initialValues={{
                direccion: "",
                comuna: "",
                region: "",
                numero: "",
                TipoPropiedad: "",
                nroDepto: ""
              }}
              validate={values => {
                let errors = {};

                if (!values.direccion) {
                  errors.direccion = "Campo Requerido";
                }

                if (!values.comuna) {
                  errors.comuna = "Campo Requerido";
                }

                if (!values.region) {
                  errors.region = "Campo Requerido";
                }

                if (!values.numero) {
                  errors.numero = "Campo Requerido";
                }

                if (!values.TipoPropiedad) {
                  errors.TipoPropiedad = "Campo Requerido";
                }

                if (values.TipoPropiedad === 1 || values.TipoPropiedad === 2) {
                  if (!values.nroDepto) {
                    errors.nroDepto = "Campo Requerido";
                  }
                }

                return errors;
              }}
              onSubmit={this.datosPropiedad}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                isSubmitting
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <Row className="cajota">
                    <Col md="6">
                      <div className="cajota">
                        <label>Tipo Propiedad</label>
                        <Field
                          className="form-control cajata2 "
                          name="TipoPropiedad"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          component="select"
                        >
                          <option value="">Seleccione</option>
                          <option value="0">Casa</option>
                          <option value="1">Departamento</option>
                          <option value="2">Oficina</option>
                        </Field>
                        <div className="contact-error">
                          {errors.TipoPropiedad &&
                            touched.TipoPropiedad &&
                            errors.TipoPropiedad}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="cajota ">
                        <label>Dirección</label>
                        <Field
                          type=""
                          className="form-control cajata2"
                          name="direccion"
                          value={values.direccion}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div className="contact-error">
                          {errors.direccion &&
                            touched.direccion &&
                            errors.direccion}
                        </div>
                      </div>
                    </Col>
                    <Col md="3">
                      <div className="cajota">
                        <label>Número</label>
                        <Field
                          type="number"
                          className="form-control"
                          name="numero"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div className="contact-error">
                          {errors.numero && touched.numero && errors.numero}
                        </div>
                      </div>
                    </Col>
                    <Col md="3">
                      <div className="cajota">
                        <label>N° Departamento</label>
                        <Field
                          type="text"
                          className="form-control"
                          name="nroDepto"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div className="contact-error">
                          {errors.nroDepto &&
                            touched.nroDepto &&
                            errors.nroDepto}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="cajota">
                        <label>Región</label>
                        <div className="box-select">
                          <Field
                            className="form-control"
                            name="region"
                            onChange={this.onChangeRegion(setFieldValue)}
                            onBlur={handleBlur}
                            component="select"
                          >
                            <option>Seleccione</option>
                            {Regiones.map((item, i) => {
                              return (
                                <option value={item.region} key={i}>
                                  {item.region}
                                </option>
                              );
                            })}
                          </Field>
                        </div>
                        <div className="contact-error">
                          {errors.region && touched.region && errors.region}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="cajota">
                        <label>Comuna</label>
                        <div className="box-select">
                          <Field
                            className="form-control"
                            name="comuna"
                            component="select"
                          >
                            <option>Seleccione</option>
                            {Comunas[0].comunas &&
                              Comunas[0].comunas.map(item => {
                                return (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                );
                              })}
                          </Field>
                        </div>
                        <div className="contact-error">
                          {errors.comuna && touched.comuna && errors.comuna}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Modal.Footer className="pa0 paMobile">
                    <input
                      className="btn btn-primary"
                      type="submit"
                      value="Aceptar"
                    />
                  </Modal.Footer>
                </form>
              )}
            </Formik>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

export default IngresoDireccionPropiedad;
