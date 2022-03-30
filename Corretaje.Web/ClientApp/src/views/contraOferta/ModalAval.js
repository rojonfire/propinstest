import React, { Component } from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";
import utilfunc from "../../utils/utilsFunc";
import swal from "sweetalert";
import { Formik } from "formik";
import api from "../../api";
import { nacionalidades } from "../../utils/nacionalidades";
import { estadosCivil } from "../../utils/nacionalidades";



export class IndexModalAval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  addAvalcontrato = async (values, { isSubmitting }) => {
    let data = {
      aval: {
        cedulaIdentidad: values.rut,
        correoElectronico: values.email,
        domicilio: values.domicilio,
        estadoCivil: values.estadocivil,
        nombre: values.nombre,
        nacionalidad: values.nacionalidad,
        profesionOficio: values.profesion,
      },

      idOferta: this.props.idOferta,
    };

    this.setState({ loading: true }, async () => {
      try {
        const res = await api.apiPostUpdateContratoAval(data);
        if (res && res.estado === 1) {
          swal({
            title: "Exito",
            text: "Aval ingresado exitosamente!",
            icon: "success",
            dangerMode: true,
          });
        } else {
          swal({
            title: "Error",
            text: "Ha ocurrido un error, intente nuevamente",
            icon: "danger",
            dangerMode: true,
          });
        }

        this.props.getOfertas(this.props.userId);
      } catch (error) {
        console.error("error: ", error);
      } finally {
        this.setState({
          loading: false,
        });
        this.props.onhide();
      }
    });
  };

  render() {
    const { loading } = this.state;

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onhide}
        size="lg"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>Datos Aval</Modal.Header>
        <Modal.Body className="paAll">
          <Container>
            <Formik
              initialValues={{
                email: "",
                nombre: "",
                rut: "",
                domicilio: "",
                nacionalidad: "",
                profesion: "",
                estadocivil: "",
              }}
              validate={values => {
                let errors = {};
                if (!values.email) {
                  errors.email = "Campo Requerido";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Email invalido";
                }
                if (!values.nombre) {
                  errors.nombre = "Campo Requerido";
                }
                if (!values.rut) {
                  errors.rut = "Campo Requerido";
                }
                if (utilfunc.checkRut(values.rut)) {
                  errors.rut = "Rut invalido";
                }
                if (!values.domicilio) {
                  errors.domicilio = "Campo Requerido";
                }
                if (!values.nacionalidad) {
                  errors.nacionalidad = "Campo Requerido";
                }
                if (!values.profesion) {
                  errors.profesion = "Campo Requerido";
                }
                if (!values.estadocivil) {
                  errors.estadocivil = "Campo Requerido";
                }
                return errors;
              }}
              onSubmit={this.addAvalcontrato}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <div className="form-group">
                        <label>Nombre</label>
                        <input
                          type="text"
                          name="nombre"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.nombre}
                          className="form-control"
                        />
                        <p style={{ color: "red" }}>
                          {errors.nombre && touched.nombre && errors.nombre}
                        </p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label>Rut</label>
                        <input
                          type="text"
                          name="rut"
                          maxLength={10}
                          placeholder="11111111-1"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.rut}
                          className="form-control"
                        />
                        <p style={{ color: "red" }}>
                          {errors.rut && touched.rut && errors.rut}
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          className="form-control"
                        />
                        <p style={{ color: "red" }}>
                          {errors.email && touched.email && errors.email}
                        </p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label>Domicilio</label>
                        <input
                          type="text"
                          name="domicilio"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.domicilio}
                          className="form-control"
                        />
                        <p style={{ color: "red" }}>
                          {errors.domicilio &&
                            touched.domicilio &&
                            errors.domicilio}
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className="form-group">
                        <label>Estado Civil</label>
                        <select
                          name="estadocivil"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.estadocivil}
                          className="form-control"
                        >
                          <option value="">Seleccione</option>
                          {estadosCivil.map(item => {
                            return (
                              <option key={item.name} value={item.name}>
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                        <p style={{ color: "red" }}>
                          {errors.estadocivil &&
                            touched.estadocivil &&
                            errors.estadocivil}
                        </p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label>Nacionalidad</label>
                        <select
                          name="nacionalidad"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.nacionalidad}
                          className="form-control"
                        >
                          <option value="">Seleccione</option>
                          {nacionalidades.map(item => {
                            return (
                              <option key={item.name} value={item.name}>
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                        <p style={{ color: "red" }}>
                          {errors.nacionalidad &&
                            touched.nacionalidad &&
                            errors.nacionalidad}
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className="form-group">
                        <label>Profesión</label>
                        <input
                          type="text"
                          name="profesion"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.profesion}
                          className="form-control"
                        />
                        <p style={{ color: "red" }}>
                          {errors.profesion &&
                            touched.profesion &&
                            errors.profesion}
                        </p>
                      </div>
                    </Col>
                    <Col>
                      <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={loading}
                      >
                        Aceptar
                      </button>
                    </Col>
                  </Row>
                </form>
              )}
            </Formik>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

export default IndexModalAval;
