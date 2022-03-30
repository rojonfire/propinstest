import React, { Component } from "react";
import { Container, Card, Row, Col, Alert } from "react-bootstrap";
import { Formik, Field } from "formik";
import { connect } from "react-redux";
import {
  fetchAddTasacion,
  fetchCleanTasacion,
  setLoading,
  fetchOrdenesDeCompra,
} from "../../action";
import swal from "sweetalert";
import { Regiones } from "../../utils/Regiones";
import icon from "../../utils/images";
import { LoadingModal } from "../../components/Loading";
import api from "../../api";
import ReactGa from 'react-ga'



export const initGA = () => {
  console.log('GA init')
  ReactGa.initialize('UA-167957495-1')
  }

export const logPageView = () => {
  ReactGa.set({page: window.location.pathname})
  ReactGa.pageview(window.location.pathname)
}


const initialValues = {
  casa: "casa",
  departamento: "departamento",
  tipoPropiedad: "",
  estadoPropiedad: "",
  direccion: "",
  numero: "",
  nroDepto: "",
  region: "",
  comuna: "",
  ciudad: "",
  bodegas: 0,
  estacionamientos: 0,
  principal: "",
  metros: 0,
  dormitorios: 0,
  banios: 0,

  rolSII: "",
};

export class Tasaciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      tasaciones: [],
      Regiones,
      Comunas: [{}],
    };
  }

  componentDidMount = async () => {
    const { setLoad } = this.props;
    setLoad(false);
    initGA();
    logPageView();
  };

  componentWillUnmount() {
    const { cleanTasacion } = this.props;

    cleanTasacion();
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { tasacionUser, cleanTasacion, getOrdenes, userId } = this.props;

    if (tasacionUser && tasacionUser.value && tasacionUser.value.estado === 1) {
      const linkSource = `data:application/pdf;base64,${
        tasacionUser.value.data.referenciaDeMercado.informe
      }`;

      const u = await api.apiGetUsuarioById(userId);

      if (u && u.data && u.data.ordenesCompra) getOrdenes(u.data.ordenesCompra);

      const downloadLink = document.createElement("a");
      const fileName = "Tasacion.pdf";
      cleanTasacion();
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();

      swal({
        title: "Exito",
        text: "PDF generado exitosamente",
        icon: "success",
        dangerMode: true,
      }).then(value => {
        const { history } = this.props;
        history.push("/list-tasaciones");
      });
    } else if (
      tasacionUser &&
      tasacionUser.value &&
      tasacionUser.value.estado === 0
    ) {
      swal({
        title: "Precaución",
        text:
          "Ocurrio un error al obtener el pdf, intente nuevamente. Verifique que los datos enviados sean los correctos.",
        icon: "error",
        dangerMode: true,
      });
      cleanTasacion();
    }
  };

  addTasacion = p => {
    const { userId } = this.props;
    let data = {
      numeroSolicitud: 0,
      bien: {
        tipo: p.tipoPropiedad,
        antiguedad: p.estadoPropiedad,
        direccion: {
          calle: p.direccion,
          numero: p.numero,
          numeroDepartamento: p.nroDepto,
          comuna: p.comuna,
          ciudad: p.ciudad,
          region: p.region,
        },
        rolSII: [
          {
            id: p.rolSII,
            uso: p.principal,
          },
        ],
        metrosCuadrados: p.metros,
        bodegas: p.bodegas,
        estacionamientos: p.estacionamientos,
        dormitorios: p.dormitorios,
        banhos: p.banios,
      },
      solicitante: {
        nombre: "Propins",
        apellido: "Propins",
        rut: "17189131-0",
      },
      idUser: userId,
    };

    const { getTasacion } = this.props;
    getTasacion(data);
  };

  validate = values => {
    let errors = {};

    for (let value in values) {
      if (!values[value]) {
        errors[value] = "Campo Requerido";
      }
    }

    if (!values.direccion) {
      errors.direccion = "Campo Requerido";
    }
    if (!values.tipoPropiedad) {
      errors.tipoPropiedad = "Campo Requerido";
    }
    if (!values.estadoPropiedad) {
      errors.estadoPropiedad = "Campo Requerido";
    }
    if (!values.numero) {
      errors.numero = "Campo Requerido";
    }
    if (!values.region) {
      errors.region = "Campo Requerido";
    }
    if (!values.ciudad) {
      errors.ciudad = "Campo Requerido";
    }
    if (!values.comuna) {
      errors.comuna = "Campo Requerido";
    }
    if (!values.principal) {
      errors.principal = "Campo Requerido";
    }
    if (!values.metros) {
      errors.metros = "Campo Requerido";
    }
    if (!values.direccion) {
      errors.direccion = "Campo Requerido";
    }
    if (!values.dormitorios) {
      errors.dormitorios = "Campo Requerido";
    }
    if (!values.banios) {
      errors.banios = "Campo Requerido";
    }

    if (!values.rolSII) {
      errors.rolSII = "Campo Requerido";
    }

    return errors;
  };

  onChangeRegion = setFieldValue => params => {
    const value = params.currentTarget.value;
    setFieldValue("region", value);

    const { Regiones } = this.state;
    const Comunas = Regiones.filter(function(region) {
      return region.region === value;
    });

    this.setState({ Comunas });
  };

  render() {
    const { Regiones, Comunas } = this.state;

    const { loading, ordenescompra } = this.props;

    const Ordenes = ordenescompra ? ordenescompra : [];
    let estado = 1;

    let ordenUser = Ordenes[0];
    if (ordenUser.serviciosAdicionales.length > 0) {
      let newArray = ordenUser.serviciosAdicionales.filter(function(item) {
        return item.nombre.includes("Tasa");
      });

      if (newArray.length > 0) {
        estado = newArray[0].estado === 0 ? 0 : 1;
      }
    }

    return (
      <div>
        {loading && <LoadingModal />}

        {estado === 0 ? (
          <Container fluid="true" className="bg-light pa0 paMobile">
            <Container>
              <div className="sin-ofertas">
                <div className="cont-text">
                  <img src={icon.error} alt="" />
                  <h6 className="h6">
                    Actualmente no puedes tasar nuevamente.
                  </h6>
                </div>
              </div>
            </Container>
          </Container>
        ) : (
          <Formik
            initialValues={initialValues}
            validate={this.validate}
            onSubmit={values => {
              this.addTasacion(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Container fluid="true" className="bg-light pa0 paMobile">
                  <Container>
                    <Row className="justify-content-md-center ">
                      <Col md="8">
                        <section className="section-space">
                          <div className="title-section text-center">
                            <h4 className="h4">Tasaciones</h4>
                            <span className="h6">
                              Cubrimos la valoración de tu propiedad
                            </span>
                          </div>
                          <div className="circle-1" />
                          <div className="circle-2" />
                          <Card className="tasaciones shadow">
                            <Card.Body>
                              <Card.Title>Ubicación de propiedad</Card.Title>
                              <Row>
                                <Col md="12" sm="12">
                                  <Row>
                                    <Col>
                                      <label>Tipo de propiedad</label>
                                      <Alert className="alert-form">
                                        <Row>
                                          <Col>
                                            <div className="form-check form-check-inline">
                                              <input
                                                type="radio"
                                                label="Casa"
                                                value={values.casa}
                                                name="tipoPropiedad"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                              />{" "}
                                              <label className="form-check-label">
                                                Casa
                                              </label>
                                            </div>
                                          </Col>
                                          <Col>
                                            <div className="form-check form-check-inline">
                                              <input
                                                type="radio"
                                                label="Departamento"
                                                value={values.departamento}
                                                name="tipoPropiedad"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                              />
                                              <label className="form-check-label">
                                                Departamento
                                              </label>
                                            </div>
                                          </Col>
                                          <div className="contact-error">
                                            {errors.tipoPropiedad &&
                                              touched.tipoPropiedad &&
                                              errors.tipoPropiedad}
                                          </div>
                                        </Row>
                                      </Alert>
                                    </Col>
                                    <Col>
                                      <label>Propiedad Nueva / Usada</label>
                                      <Alert className="alert-form">
                                        <Row>
                                          <Col>
                                            <div className="form-check form-check-inline">
                                              <input
                                                type="radio"
                                                name="estadoPropiedad"
                                                value="Nueva"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                              />
                                              <label className="form-check-label">
                                                Nueva
                                              </label>
                                            </div>
                                          </Col>
                                          <Col>
                                            <div className="form-check form-check-inline">
                                              <input
                                                type="radio"
                                                label="Usada"
                                                name="estadoPropiedad"
                                                value="Usada"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                              />
                                              <label className="form-check-label">
                                                Usada
                                              </label>
                                            </div>
                                          </Col>
                                          <div className="contact-error">
                                            {errors.estadoPropiedad &&
                                              touched.estadoPropiedad &&
                                              errors.estadoPropiedad}
                                          </div>
                                        </Row>
                                      </Alert>
                                    </Col>

                                    <Col md="12">
                                      <div className="form-group">
                                        <label>Dirección</label>
                                        <input
                                          type="text"
                                          className="form-control"
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
                                      <div className="form-group">
                                        <label>Número</label>
                                        <input
                                          type="number"
                                          className="form-control"
                                          name="numero"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                        <div className="contact-error">
                                          {errors.numero &&
                                            touched.numero &&
                                            errors.numero}
                                        </div>
                                      </div>
                                    </Col>
                                    <Col md="3">
                                      <div className="form-group">
                                        <label>N° Departamento</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="nroDepto"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </div>
                                    </Col>
                                    <Col md="6">
                                      <div className="form-group">
                                        <label>Región</label>
                                        <div className="box-select">
                                          <Field
                                            className="form-control"
                                            name="region"
                                            onChange={this.onChangeRegion(
                                              setFieldValue,
                                            )}
                                            onBlur={handleBlur}
                                            component="select"
                                          >
                                            <option>Seleccione</option>
                                            {Regiones.map((item, i) => {
                                              return (
                                                <option
                                                  value={item.region}
                                                  key={i}
                                                >
                                                  {item.region}
                                                </option>
                                              );
                                            })}
                                          </Field>
                                        </div>
                                        <div className="contact-error">
                                          {errors.region &&
                                            touched.region &&
                                            errors.region}
                                        </div>
                                      </div>
                                    </Col>
                                    <Col md="6">
                                      <div className="form-group">
                                        <label>Ciudad</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="ciudad"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                        <div className="contact-error">
                                          {errors.ciudad &&
                                            touched.ciudad &&
                                            errors.ciudad}
                                        </div>
                                      </div>
                                    </Col>
                                    <Col md="6">
                                      <div className="form-group">
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
                                                  <option
                                                    key={item}
                                                    value={item}
                                                  >
                                                    {item}
                                                  </option>
                                                );
                                              })}
                                          </Field>
                                        </div>
                                        <div className="contact-error">
                                          {errors.comuna &&
                                            touched.comuna &&
                                            errors.comuna}
                                        </div>
                                      </div>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                              <hr />
                              <Card.Title>
                                Características principales
                              </Card.Title>

                              <Row>
                                <Col md="4">
                                  <div className="form-group">
                                    <label>Bodegas</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      name="bodegas"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                  </div>
                                </Col>
                                <Col md="4">
                                  <div className="form-group">
                                    <label>Estacionamientos</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      name="estacionamientos"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                  </div>
                                </Col>
                                <Col md="4">
                                  <div className="form-group">
                                    <label>Rol</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="rolSII"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                    <div className="contact-error">
                                      {errors.rolSII &&
                                        touched.rolSII &&
                                        errors.rolSII}
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col md="3">
                                  <div className="form-group">
                                    <label>Principal</label>
                                    <div className="box-select">
                                      <select
                                        className="form-control"
                                        name="principal"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option value="">Seleccione</option>
                                        <option value="principal">
                                          principal
                                        </option>
                                        <option value="estacionamiento">
                                          estacionamiento
                                        </option>
                                        <option value="departamento">
                                          departamento
                                        </option>
                                      </select>
                                    </div>
                                    <div className="contact-error">
                                      {errors.principal &&
                                        touched.principal &&
                                        errors.principal}
                                    </div>
                                  </div>
                                </Col>
                                <Col md="3">
                                  <div className="form-group">
                                    <label>Metros (m²)</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      name="metros"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                    <div className="contact-error">
                                      {errors.metros &&
                                        touched.metros &&
                                        errors.metros}
                                    </div>
                                  </div>
                                </Col>
                                <Col md="3">
                                  <div className="form-group">
                                    <label>Dormitorios</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      name="dormitorios"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                    <div className="contact-error">
                                      {errors.dormitorios &&
                                        touched.dormitorios &&
                                        errors.dormitorios}
                                    </div>
                                  </div>
                                </Col>
                                <Col md="3">
                                  <div className="form-group">
                                    <label>Baños</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      name="banios"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                    <div className="contact-error">
                                      {errors.banios &&
                                        touched.banios &&
                                        errors.banios}
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                              <hr />

                              <div className="text-center">
                                <button
                                  className="btn btn-primary"
                                  type="submit"
                                  variant="primary"
                                >
                                  Tasación
                                </button>
                              </div>
                            </Card.Body>
                          </Card>
                        </section>
                      </Col>
                    </Row>
                  </Container>
                </Container>
              </form>
            )}
          </Formik>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasacionUser: state.app.tasacionUser,
  loading: state.app.loading,
  ...state.auth,
});

const mapDispatchToProps = dispatch => ({
  getTasacion: values => dispatch(fetchAddTasacion(values)),
  cleanTasacion: () => dispatch(fetchCleanTasacion()),
  setLoad: value => dispatch(setLoading(value)),
  getOrdenes: ordenes => dispatch(fetchOrdenesDeCompra(ordenes)),
});

Tasaciones = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasaciones);

export default Tasaciones;
