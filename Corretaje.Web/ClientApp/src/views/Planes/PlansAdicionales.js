import React from "react";
import { Row, Col, Modal, Card, Button, Container } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { Popover } from "@material-ui/core";
import { connect } from "react-redux";
import {
  fetchGetUF,
  setDatosPropiedad,
  contratarPlan,
  setLoading,
  setEstadoRequest,
} from "../../action";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { LoadingModal } from "../../components/Loading";

class PlansAdicionales extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      msj: "CONTINUAR SIN ADICIONALES",
      token: null,
      url: null,
      show: false,
      show2: false,
      tipo: 1, // tipo 0 sin adicionales / tipo 1 con adicionales
      anchorEl: null,
      open: false,
      id: undefined,
      currentStep: 4,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);

    const { dispatch } = this.props;
    dispatch(setLoading(false));
    dispatch(setEstadoRequest(null));
  }

  componentDidMount(prevProps) {
    document.querySelector("body").scrollTo(0, 0);
  }

  handleClick(event) {
    this.setState({
      anchorEl: event.currentTarget,
      open: Boolean(event.currentTarget),
      id: "simple-popover",
    });
  }

  handleClose(event) {
    this.setState({
      anchorEl: event.currentTarget,
      open: false,
      id: undefined,
    });
  }

  continuar = (values) => {
    const { updateStep, fastPlan } = this.props;
    this.setState(() => {
      // setDatosPropiedad(this.mapperDatosPropiedad(values));
      console.log("form data", values);
    });

    if (fastPlan) {
      this.completarContratacion(values);
    } else {
      // si viene de plan fast tiene que terminar aqui, enviarlo a la pagina de gracias
      // y  enviar mail respectivo de a el vendedor y propins
      // si viene desde plan normal tiene que continuar a next step
      this.props.formData(this.state.currentStep, values);
      updateStep({});
    }
  };

  completarContratacion = async (formValues) => {
    this.manejarmodal();
    const { idPlan, ubicacionData, caracteristicasData } = this.props;

    let dataContrato = {
      fechaContratacion: new Date(),
      tipoProyecto: ubicacionData.Tipo_Propiedad === "Casa" ? 0 : 1,
      direccion: ubicacionData.Direccion,
      numero: ubicacionData.Numero,
      numeroDepartamento: ubicacionData.Numero_depto
        ? ubicacionData.Numero_depto
        : 0,
      comuna: ubicacionData.Comuna,
      barrio: ubicacionData.Barrio,
      idPlan: idPlan,
      valor: 0,
      tipoMoneda: 0,
      fechaVisitaFotografo: undefined,
      horaVisitaFotografo: undefined,
      horarioVisitas: undefined,
      serviciosAdicionales: undefined,
      caracteristicasPropiedad: {
        anioConstruccion: caracteristicasData.ano_constru,
        orientacion: caracteristicasData.orientacion,
        metrosUtiles: caracteristicasData.metros_utiles,
        metrosTotales: caracteristicasData.metros_totales,
        numeroDormitorios: caracteristicasData.numero_dorm,
        numeroBanios: caracteristicasData.numero_bano,
        dormitorioServicio:
          caracteristicasData.dorm_servicio === "Si" ? true : false,
        banioServicio:
          caracteristicasData.bano_servicio === "Si" ? true : false,
        bodega: caracteristicasData.Bodega === "Si" ? true : false,
        estacionamiento: caracteristicasData.estacionamiento,
        gastosComunes: caracteristicasData.gastos_comunes,
        contribuciones: caracteristicasData.contribuciones,
      },
      caracteristicasComunidad: {
        accesoControlado: formValues.caracteristicas_comunidad.includes(
          "accesoControlado"
        )
          ? true
          : false,
        areasVerdes: formValues.caracteristicas_comunidad.includes(
          "areasVerdes"
        )
          ? true
          : false,
        salaDeCine: formValues.caracteristicas_comunidad.includes("salaDeCine")
          ? true
          : false,
        salaDeJuegos: formValues.caracteristicas_comunidad.includes(
          "salaDeJuegos"
        )
          ? true
          : false,
        bicicletero: formValues.caracteristicas_comunidad.includes(
          "bicicletero"
        )
          ? true
          : false,
        ascensor: formValues.caracteristicas_comunidad.includes("ascensor")
          ? true
          : false,
        sauna: formValues.caracteristicas_comunidad.includes("sauna")
          ? true
          : false,
        juegosInfantiles: formValues.caracteristicas_comunidad.includes(
          "juegosInfantiles"
        )
          ? true
          : false,
        portonElectrico: formValues.caracteristicas_comunidad.includes(
          "portonElectrico"
        )
          ? true
          : false,
        citofono: formValues.caracteristicas_comunidad.includes("citofono")
          ? true
          : false,
        quincho: formValues.caracteristicas_comunidad.includes("quincho")
          ? true
          : false,
        piscina: formValues.caracteristicas_comunidad.includes("piscina")
          ? true
          : false,
        salaDeEventos: formValues.caracteristicas_comunidad.includes(
          "salaDeEventos"
        )
          ? true
          : false,
        estacionamientoVisitas: formValues.caracteristicas_comunidad.includes(
          "estacionamientoVisitas"
        )
          ? true
          : false,
        camaraSeguridad: formValues.caracteristicas_comunidad.includes(
          "camaraSeguridad"
        )
          ? true
          : false,
      },
      caracteristicasAdicionales: {
        tipoCalefaccion: formValues.calefaccion,
        escritorio: formValues.caracteristicas_prop.includes("escritorio")
          ? true
          : false,
        alarma: formValues.caracteristicas_prop.includes("alarma")
          ? true
          : false,
        logia: formValues.caracteristicas_prop.includes("logia") ? true : false,
        salaDeEstar: formValues.caracteristicas_prop.includes("salaDeEstar")
          ? true
          : false,
        cocinaAmoblada: formValues.caracteristicas_prop.includes(
          "cocinaAmoblada"
        )
          ? true
          : false,
        portonAutomatico: formValues.caracteristicas_prop.includes(
          "portonAutomatico"
        )
          ? true
          : false,
      },
    };
    this.props.contratarPlan(dataContrato);
  };
  manejarmodal = async () => {
    this.setState({ show2: !this.state.show2 });
  };
  userFeedBack = () => {
    const { estado, loading, updateStep } = this.props;
    if (loading) {
      return <LoadingModal porcentaje={0} finish={() => void 0} />;
    }
    if (estado === 1 && !loading) {
      updateStep({});

      //const { history } = this.props;
      //history.push("/PlanFastContratado");
    }
    return null;
  };

  render() {
    return (
      <Container>
        <Modal show={this.state.show2} onHide={() => this.manejarmodal()}>
          <Modal.Header closeLabel=" " closeButton>
            <Row className="center text-center">
              <Col>
                <div className="modal-misreferidos">¡Importante!</div>
              </Col>
            </Row>
          </Modal.Header>
          <Modal.Body>
            <Row>
              La informacion de tu propiedad es muy importante para nosotros,
              por seguridad podria demorar unos minutos en cargar
            </Row>
          </Modal.Body>
        </Modal>
        {this.userFeedBack()}

        <section className={"hideMOBILE ubicacion-propiedad"}>
          <Popover
            id={this.id}
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Card className={"caja-popover-planes"}>
              Por el momento solo tenemos cobertura en la Región Excluir
              dormitorio de servicio.
            </Card>
          </Popover>

          <Formik
            initialValues={{
              caracteristicas_comunidad: "",
              caracteristicas_prop: "",
              calefaccion: "",
            }}
            validate={validate}
            onSubmit={this.continuar}
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
              <form onSubmit={handleSubmit}>
                <div className={"titulo-planes-formulario"}>
                  Características Adicionales
                </div>
                <Row>
                  <Col>
                    <div className="">
                      <label className="contact-proper">Calefacción</label>
                    </div>
                    <div>
                      <Field
                        className="largo-estatico-peque2"
                        component="select"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="calefaccion"
                      >
                        <option value="">Selecciona..</option>
                        <option value="losa"> Losa</option>
                        <option value="electrica"> Radiador</option>
                        <option value="radiador"> Eléctrica</option>
                        <option value="otro"> Otra</option>
                      </Field>

                      <ErrorMessage
                        name="calefaccion"
                        className="contact-error"
                        component="div"
                      />
                    </div>
                  </Col>
                  <Col>
                    <Row>
                      <Col>
                        <FormControlLabel
                          value="escritorio"
                          control={<Checkbox color="default" />}
                          label="Escritorio"
                          labelPlacement="end"
                          name="caracteristicas_prop"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col>
                        <FormControlLabel
                          value="logia"
                          control={<Checkbox color="default" />}
                          label="Logia"
                          labelPlacement="end"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="caracteristicas_prop"
                        />
                      </Col>
                      <Col>
                        <FormControlLabel
                          value="cocinaAmoblada"
                          control={<Checkbox color="default" />}
                          label="Cocina amoblada"
                          labelPlacement="end"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="caracteristicas_prop"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormControlLabel
                          value="alarma"
                          control={<Checkbox color="default" />}
                          label="Alarma"
                          labelPlacement="end"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="caracteristicas_prop"
                        />
                      </Col>
                      <Col>
                        <FormControlLabel
                          value="salaDeEstar"
                          control={<Checkbox color="default" />}
                          label="Sala de estar"
                          labelPlacement="end"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="caracteristicas_prop"
                        />
                      </Col>
                      <Col>
                        <FormControlLabel
                          value="portonAutomatico"
                          control={<Checkbox color="default" />}
                          label="Portón Automatico"
                          labelPlacement="end"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="caracteristicas_prop"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <div className={"titulo-planes-formulario"}>
                  Características Comunidad
                </div>

                <Row>
                  <Col>
                    <FormControlLabel
                      value="accesoControlado"
                      name={"caracteristicas_comunidad"}
                      control={<Checkbox color="default" />}
                      label="Acceso Controlado"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col>
                    <FormControlLabel
                      value="salaDeJuegos"
                      control={<Checkbox color="default" />}
                      label="Sala de juegos"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </Col>
                  <Col>
                    <FormControlLabel
                      value="sauna"
                      control={<Checkbox color="default" />}
                      label="Sauna"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </Col>
                  <Col>
                    <FormControlLabel
                      value="citofono"
                      control={<Checkbox color="default" />}
                      label="Citófono"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </Col>
                  <Col>
                    <FormControlLabel
                      value="salaDeEventos"
                      control={<Checkbox color="default" />}
                      label="Sala de eventos"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormControlLabel
                      value="areasVerdes"
                      control={<Checkbox color="default" />}
                      label="Áreas verdes"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </Col>
                  <Col>
                    <FormControlLabel
                      value="bicicletero"
                      control={<Checkbox color="default" />}
                      label="Bicicletero"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </Col>
                  <Col>
                    <FormControlLabel
                      value="juegosInfantiles"
                      control={<Checkbox color="default" />}
                      label="Juegos infantiles"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </Col>
                  <Col>
                    <FormControlLabel
                      value="quincho"
                      control={<Checkbox color="default" />}
                      label="Quincho"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </Col>
                  <Col>
                    <FormControlLabel
                      value="estacionamientoVisitas"
                      control={<Checkbox color="default" />}
                      label="Estacionamiento visitas"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormControlLabel
                      value="salaDeCine"
                      control={<Checkbox color="default" />}
                      label="Sala de cine"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </Col>
                  <Col>
                    <FormControlLabel
                      value="ascensor"
                      control={<Checkbox color="default" />}
                      label="Ascensor"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </Col>
                  <Col>
                    <FormControlLabel
                      value="portonElectrico"
                      control={<Checkbox color="default" />}
                      label="Portón eléctrico"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </Col>
                  <Col>
                    <FormControlLabel
                      value="piscina"
                      control={<Checkbox color="default" />}
                      label="Piscina"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </Col>
                  <Col>
                    <FormControlLabel
                      value="camaraDeSeguridad"
                      control={<Checkbox color="default" />}
                      label="Cámara de seguridad"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </Col>
                </Row>
                <div className={"mover-boton-derecha"}>
                  <Button className={"center"} type="submit">
                    Continuar
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </section>
        <section className={"hideWEB2"}>
          <Popover
            id={this.id}
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Card className={"caja-popover-planes"}>
              Por el momento solo tenemos cobertura en la Región Excluir
              dormitorio de servicio.
            </Card>
          </Popover>
          <Formik
            initialValues={{
              caracteristicas_comunidad: "",
              caracteristicas_prop: "",
              calefaccion: "",
            }}
            validate={validate}
            onSubmit={this.continuar}
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
              <form onSubmit={handleSubmit}>
                <div className={"titulo-planes-formulario"}>
                  Características Adicionales
                </div>
                <div className="">
                  <label className="planes-label">Calefacción</label>
                </div>
                <div>
                  <Field
                    className="largo-opciones-select-planes"
                    component="select"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="calefaccion"
                  >
                    <option value="">Selecciona..</option>
                    <option value="losa"> Losa</option>
                    <option value="electrica"> Radiador</option>
                    <option value="radiador"> Eléctrica</option>
                    <option value="otro"> Otra</option>
                  </Field>

                  <ErrorMessage
                    name="calefaccion"
                    className="contact-error"
                    component="div"
                  />
                </div>
                <div className={"mover-checkboxs"}>
                  <div>
                    <FormControlLabel
                      value="escritorio"
                      control={<Checkbox color="default" />}
                      label="Escritorio"
                      labelPlacement="end"
                      name="caracteristicas_prop"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="logia"
                      control={<Checkbox color="default" />}
                      label="Logia"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="caracteristicas_prop"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="cocinaAmoblada"
                      control={<Checkbox color="default" />}
                      label="Cocina amoblada"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="caracteristicas_prop"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="portonAutomatico"
                      control={<Checkbox color="default" />}
                      label="Portón Automatico"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="caracteristicas_prop"
                    />
                  </div>
                </div>
                <div className={"titulo-planes-formulario"}>
                  Características Comunidad
                </div>
                <div className={"mover-checkboxs"}>
                  <div>
                    <FormControlLabel
                      value="accesoControlado"
                      name={"caracteristicas_comunidad"}
                      control={<Checkbox color="default" />}
                      label="Acceso Controlado"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="salaDeJuegos"
                      control={<Checkbox color="default" />}
                      label="Sala de juegos"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </div>

                  <div>
                    <FormControlLabel
                      value="sauna"
                      control={<Checkbox color="default" />}
                      label="Sauna"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </div>

                  <div>
                    <FormControlLabel
                      value="citofono"
                      control={<Checkbox color="default" />}
                      label="Citófono"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </div>

                  <div>
                    <FormControlLabel
                      value="salaDeEventos"
                      control={<Checkbox color="default" />}
                      label="Sala de eventos"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="areasVerdes"
                      control={<Checkbox color="default" />}
                      label="Áreas verdes"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </div>

                  <div>
                    <FormControlLabel
                      value="bicicletero"
                      control={<Checkbox color="default" />}
                      label="Bicicletero"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="juegosInfantiles"
                      control={<Checkbox color="default" />}
                      label="Juegos infantiles"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="quincho"
                      control={<Checkbox color="default" />}
                      label="Quincho"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </div>

                  <div>
                    <FormControlLabel
                      value="estacionamientoVisitas"
                      control={<Checkbox color="default" />}
                      label="Estacionamiento visitas"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="salaDeCine"
                      control={<Checkbox color="default" />}
                      label="Sala de cine"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="ascensor"
                      control={<Checkbox color="default" />}
                      label="Ascensor"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="portonElectrico"
                      control={<Checkbox color="default" />}
                      label="Portón eléctrico"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="piscina"
                      control={<Checkbox color="default" />}
                      label="Piscina"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="camaraDeSeguridad"
                      control={<Checkbox color="default" />}
                      label="Cámara de seguridad"
                      labelPlacement="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"caracteristicas_comunidad"}
                    />
                  </div>
                </div>
                <div className={"center"}>
                  <Button className={"center continuarMOBILE"} type="submit">
                    Continuar
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </section>
      </Container>
    );
  }
}

const validate = (formValues) => {
  let errors = {};
  if (formValues.calefaccion === "") {
    errors.Valor_prop = "Por favor ingrese tipo de calefacción";
  }
  return errors;
};

const mapStateToProps = (state) => ({
  loading: state.app.loading,
  planContratado: state.app.planContratado,
  estado: state.app.estado,
  data: state.app.data,
  uf: state.app.uf,
  ...state.app,
  ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  getUf: () => dispatch(fetchGetUF()),
  setDatosPropiedad: (datosProps) => dispatch(setDatosPropiedad(datosProps)),
  contratarPlan: (planContratado) => dispatch(contratarPlan(planContratado)),
  dispatch: (action) => {
    dispatch(action);
  },
});

PlansAdicionales = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlansAdicionales);

export default PlansAdicionales;
