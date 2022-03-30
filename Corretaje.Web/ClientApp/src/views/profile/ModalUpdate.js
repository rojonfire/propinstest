import React, { Component } from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";
import utilfunc from "../../utils/utilsFunc";
import swal from "sweetalert";
import { Formik } from "formik";
import api from "../../api";
import { nacionalidades } from "../../utils/nacionalidades";
import { estadosCivil } from "../../utils/nacionalidades";
import moment from "moment";

export class IndexModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      date: new Date()
    };
  }

  updateUser = async values => {
    const { user, fetchUser } = this.props;

    let data = {
      nombres: values.nombre,
      apellidos: values.apellido,
      direccion: values.domicilio,
      rut: values.rut,
      estadoCivil: values.estadocivil,
      fechaNacimiento: values.fechaNacimiento,
      oficio: values.oficio,
      mail: values.email,
      nacionalidad: values.nacionalidad,
      telefono: values.telefono,
      IdString: user.userId
    };

    this.setState({ loading: true }, async () => {
      try {
        const res = await api.apiPostUpdateUser(data);
        if (res && res.mensaje) {
          await fetchUser();
          swal({
            title: "Exito",
            text: "Datos Actualizados!",
            icon: "success",
            dangerMode: false
          });
        } else {
          swal({
            title: "Error",
            text: "Ha ocurrido un error, intente nuevamente",
            icon: "error",
            dangerMode: true
          });
        }
      } catch (error) {
        console.error("error: ", error);
      } finally {
        this.setState({
          loading: false
        });
        this.props.onhide();
      }
    });
  };

  onChange = (e, setFieldValue) => {
    this.setState({ date: e });

    setFieldValue("fechaNacimiento", e);
  };

  render() {
    const { loading } = this.state;

    const { user } = this.props;

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onhide}
        size="lg"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>Actualizar Datos</Modal.Header>
        <Modal.Body>
          <Container>
            <Formik
              initialValues={{
                rut: user.rut,
                domicilio: user.domicilio,
                estadocivil: user.estadoCivil,
                nombre: user.nombres,
                apellido: user.apellidos,
                fechaNacimiento: user.fechaNacimiento
                  ? moment(user.fechaNacimiento).format("YYYY-MM-DD")
                  : new Date(),
                oficio: user.oficio,
                telefono: user.telefono,
                nacionalidad: user.pais,
                email: user.mail,
                IdString: user.userId
              }}
              validate={values => {
                let errors = {};

                if (!values.rut) {
                  errors.rut = "Campo Requerido";
                }
                if (utilfunc.checkRut(values.rut)) {
                  errors.rut = "Rut invalido";
                }
                if (!values.telefono) {
                  errors.telefono = "Campo Requerido";
                }

                if (!/^([0-9])*$/.test(values.telefono)) {
                  errors.telefono = "Campo solo texto, no utilizar números";
                }

                if (!values.nombre) {
                  errors.nombre = "Campo Requerido";
                }

                if (!/^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s]+$/.test(values.nombre)) {
                  errors.nombre = "Campo solo texto, no utilizar números";
                }

                if (!values.apellido) {
                  errors.apellido = "Campo Requerido";
                }
                if (!/^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s]+$/.test(values.apellido)) {
                  errors.apellido = "Campo solo texto, no utilizar números";
                }
                if (
                  !values.fechaNacimiento &&
                  values.fechaNacimiento !== "mm/dd/yyy"
                ) {
                  errors.fechaNacimiento = "Campo Requerido";
                }

                return errors;
              }}
              onSubmit={this.updateUser}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit
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
                          disabled={user.verificaCedula}
                        />
                        <p className="contact-error">
                          {errors.nombre && touched.nombre && errors.nombre}
                        </p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label>Apellidos</label>
                        <input
                          type="text"
                          name="apellido"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.apellido}
                          className="form-control"
                          disabled={user.verificaCedula}
                        />
                        <p style={{ color: "red" }}>
                          {errors.apellido &&
                            touched.apellido &&
                            errors.apellido}
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
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
                          disabled={user.verificaCedula}
                          className="form-control"
                        />
                        <p className="contact-error">
                          {errors.rut && touched.rut && errors.rut}
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
                        <p className="contact-error">
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
                        <div className="box-select">
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
                        </div>
                        <p className="contact-error">
                          {errors.estadocivil &&
                            touched.estadocivil &&
                            errors.estadocivil}
                        </p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label>País Origen</label>
                        <div className="box-select">
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
                        </div>
                        <p className="contact-error">
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
                        <label>Oficio</label>
                        <input
                          type="text"
                          name="oficio"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.oficio}
                          className="form-control"
                        />
                        <p className="contact-error">
                          {errors.oficio && touched.oficio && errors.oficio}
                        </p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label>Telefono</label>
                        <input
                          type="text"
                          name="telefono"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.telefono}
                          className="form-control"
                          maxLength="11"
                        />
                        <p className="contact-error">
                          {errors.telefono &&
                            touched.telefono &&
                            errors.telefono}
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className="form-group">
                        <label>Fecha Nacimiento</label>
                        <div className="box-select">
                          <input
                            type="date"
                            name="fechaNacimiento"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.fechaNacimiento}
                            className="form-control unstyled"
                          />
                        </div>
                        <p className="contact-error">
                          {errors.fechaNacimiento &&
                            touched.fechaNacimiento &&
                            errors.fechaNacimiento}
                        </p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          disabled={true}
                          className="form-control"
                        />
                        <p className="contact-error">
                          {errors.email && touched.email && errors.email}
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Modal.Footer className="pa0 paMobile">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Cargando..." : "Aceptar"}
                    </button>
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

export default IndexModalUser;
