import React from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";

import { Formik, Field, ErrorMessage } from "formik";
import icon from "../../utils/images";
import { Popover } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchGetUF, setDatosPropiedad } from "../../action";
import utilfunc from "../../utils/utilsFunc";

class PlansCaracteristicas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      total: 0,
      msj: "CONTINUAR SIN ADICIONALES",
      token: null,
      url: null,
      show: false,
      tipo: 1, // tipo 0 sin adicionales / tipo 1 con adicionales
      anchorEl: null,
      anchorEl2: null,
      open: false,
      open2: false,
      id: undefined,
      id2: undefined,
      currentStep: 3,
      numeroDormitorios: "",
      numeroBanios: "",
      tieneBodega: false,
      estacionamientos: 0,
      metrosUtiles: "",
      metrosTotales: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClose2 = this.handleClose2.bind(this);
  }

  componentDidMount(prevProps) {
    document.querySelector("body").scrollTo(0, 0);

    const tasacion = utilfunc.getUrlParameter("tasacion");
    const { datosPropiedadTasacion } = this.props;
    if (
      tasacion &&
      tasacion === "true" &&
      datosPropiedadTasacion &&
      datosPropiedadTasacion != null
    ) {
      this.setState({
        numeroDormitorios: datosPropiedadTasacion.dormitorios,
        numeroBanios: datosPropiedadTasacion.banos,
        tieneBodega: datosPropiedadTasacion.bodega > 0 ? "Si" : "No",
        estacionamientos: datosPropiedadTasacion.estacionamientos,
        metrosUtiles: datosPropiedadTasacion.metrosUtiles,
        metrosTotales: datosPropiedadTasacion.metrosTotales,
      });
    }
  }

  handleClick(event) {
    this.setState({
      anchorEl: event.currentTarget,
      open: Boolean(event.currentTarget),
      id: "simple-popover",
    });
  }

  onChangeNumeroDormitorios = (e) => {
    this.setState({
      numeroDormitorios: e.target.value,
    });
  };

  onChangeEstacionamientos = (e) => {
    this.setState({
      estacionamientos: e.target.value,
    });
  };

  onChangeNumeroBanios = (e) => {
    this.setState({
      numeroBanios: e.target.value,
    });
  };

  onChangeBodega = (e) => {
    this.setState({
      tieneBodega: e.target.value,
    });
  };

  onChangeMetrosUtiles = (e) => {
    this.setState({
      metrosUtiles: e.target.value,
    });
  };

  onChangeMetrosTotales = (e) => {
    this.setState({
      metrosTotales: e.target.value,
    });
  };

  handleClose(event) {
    this.setState({
      anchorEl: event.currentTarget,
      open: false,
      id: undefined,
    });
  }

  handleClick2(event) {
    this.setState({
      anchorEl2: event.currentTarget,
      open2: Boolean(event.currentTarget),
      id2: "simple-popover",
    });
  }

  handleClose2(event) {
    this.setState({
      anchorEl2: event.currentTarget,
      open2: false,
      id2: undefined,
    });
  }

  validate = (formValues) => {
    let errors = {};
    const {
      numeroDormitorios,
      numeroBanios,
      metrosUtiles,
      metrosTotales,
      tieneBodega,
      estacionamientos,
    } = this.state;

    if (formValues.ano_constru === "") {
      errors.ano_constru = "Por favor ingrese el año de su propiedad";
    } else if (isNaN(formValues.ano_constru)) {
      errors.ano_constru = "Por favor solo agregue numeros";
    }

    if (numeroDormitorios == null || numeroDormitorios == 0) {
      errors.numero_dorm = "Por favor ingrese los dormitorios de su propiedad";
    }

    if (tieneBodega == null || tieneBodega == "") {
      errors.bodega = "Por favor ingrese bodega de su propiedad";
    }
    if (formValues.orientacion === "") {
      errors.orientacion = "Por favor ingrese orientacion de su propiedad";
    }
    if (numeroBanios == null || numeroBanios === 0 || numeroBanios == "") {
      errors.numero_bano = "Por favor ingrese baños de su propiedad";
    }
    if (estacionamientos == null || estacionamientos == "") {
      errors.estacionamiento =
        "Por favor ingrese estacionamiento de su propiedad";
    }
    if (metrosUtiles == null || metrosUtiles == "") {
      errors.metros_utiles = "Por favor ingrese metros utiles de su propiedad";
    } else if (isNaN(metrosUtiles)) {
      errors.metros_utiles = "Por favor solo agregue numeros";
    }

    if (formValues.dorm_servicio === "") {
      errors.dorm_servicio = "Por favor ingrese servicio de su propiedad";
    }
    if (formValues.gastos_comunes === "") {
      errors.gastos_comunes =
        "Por favor ingrese gastos comunes de su propiedad";
    }

    if (metrosTotales == null || metrosTotales == "") {
      errors.metros_totales =
        "Por favor ingrese metros totales de su propiedad";
    } else if (isNaN(metrosTotales)) {
      errors.metros_totales = "Por favor solo agregue numeros";
    }
    if (formValues.bano_servicio === "") {
      errors.bano_servicio = "Por favor ingrese baño servicio de su propiedad";
    }
    if (formValues.contribuciones === "") {
      errors.contribuciones =
        "Por favor ingrese contribuciones de su propiedad";
    } else if (isNaN(formValues.contribuciones)) {
      errors.contribuciones = "Por favor solo agregue numeros";
    }

    return errors;
  };

  continuar = (values) => {
    const { updateStep } = this.props;

    const formattedValues = {
      ano_constru: values.ano_constru,
      numero_dorm: this.state.numeroDormitorios,
      bodega: this.state.tieneBodega,
      orientacion: values.orientacion,
      numero_bano: this.state.numeroBanios,
      estacionamiento: values.estacionamiento,
      metros_utiles: this.state.metrosUtiles,
      dorm_servicio: values.dorm_servicio,
      gastos_comunes: values.gastos_comunes,
      metros_totales: this.state.metrosTotales,
      bano_servicio: values.bano_servicio,
      contribuciones: values.contribuciones,
      escritorio: values.escritorio,
    };

    this.props.formData(this.state.currentStep, formattedValues);
    updateStep({});
  };

  render() {
    return (
      <Container>
        <section className={"hideMOBILE ubicacion-propiedad"}>
          <div className={"titulo-planes-formulario"}>
            Características de la propiedad
          </div>

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
              Excluir dormitorio de servicio.
            </Card>
          </Popover>

          <Popover
            id={this.id2}
            open={this.state.open2}
            anchorEl={this.state.anchorEl2}
            onClose={this.handleClose2}
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
              Excluir baño de servicio.
            </Card>
          </Popover>

          <Formik
            initialValues={{
              ano_constru: "",
              numero_dorm: this.state.numeroDormitorios,
              bodega: this.state.tieneBodega,
              orientacion: "",
              numero_bano: this.state.numeroBanios,
              estacionamiento: this.state.estacionamientos,
              metros_utiles: this.state.metrosUtiles,
              dorm_servicio: "",
              gastos_comunes: "",
              metros_totales: this.state.metrosTotales,
              bano_servicio: "",
              contribuciones: "",
              escritorio: "",
            }}
            validate={this.validate}
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
                <Row>
                  <Col md="4" className="">
                    <div>
                      <label className="contact-proper">
                        Año de construcción
                      </label>
                    </div>
                    <div>
                      <Field
                        className="largo-estatico-peque"
                        name="ano_constru"
                      />
                    </div>

                    <ErrorMessage
                      name="ano_constru"
                      className="contact-error"
                      component="div"
                    />
                  </Col>
                  <Col md="4">
                    <div className="contact-proper">
                      N° dormitorios
                      <Button
                        className="tamanopop"
                        aria-describedby={this.id}
                        variant="contained"
                        color="primary"
                        onClick={this.handleClick}
                      >
                        <img className="" src={icon.popover1} />
                      </Button>
                    </div>

                    <div>
                      <Field
                        className="largo-estatico-peque2"
                        name="numero_dorm"
                        component="select"
                        onBlur={handleBlur}
                        onChange={this.onChangeNumeroDormitorios}
                        value={this.state.numeroDormitorios}
                      >
                        <option key={0} value="">
                          Selecciona..
                        </option>
                        <option key={1} value="1">
                          1
                        </option>
                        <option key={2} value="2">
                          2
                        </option>
                        <option key={3} value="3">
                          3
                        </option>
                        <option key={4} value="4">
                          4
                        </option>
                        <option key={5} value="5">
                          5
                        </option>
                        <option key={6} value="6">
                          6
                        </option>
                        <option key={7} value="7">
                          7
                        </option>
                        <option key={8} value="8">
                          8
                        </option>
                      </Field>
                      <ErrorMessage
                        name="numero_dorm"
                        className="contact-error"
                        component="div"
                      />
                    </div>
                  </Col>
                  <Col md="4" className="">
                    <div>
                      <label className="contact-proper">Bodega </label>
                    </div>
                    <div>
                      <Field
                        className="largo-estatico-peque2"
                        component="select"
                        name="bodega"
                        onBlur={handleBlur}
                        onChange={this.onChangeBodega}
                        value={this.state.tieneBodega}
                      >
                        <option key={0} value="">
                          Selecciona...
                        </option>
                        <option key={1} value="Si">
                          Si
                        </option>
                        <option key={2} value="No">
                          No
                        </option>
                      </Field>
                      <ErrorMessage
                        name="bodega"
                        className="contact-error"
                        component="div"
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md="4" className="">
                    <div>
                      <label className="contact-proper">Orientación</label>
                    </div>
                    <div>
                      <Field
                        className="largo-estatico-peque"
                        name="orientacion"
                      />
                    </div>

                    <ErrorMessage
                      name="orientacion"
                      className="contact-error"
                      component="div"
                    />
                  </Col>
                  <Col md="4" className="">
                    <div>
                      <label className="contact-proper">
                        N° Baños
                        <Button
                          className="tamanopop"
                          aria-describedby={this.id}
                          variant="contained"
                          color="primary"
                          onClick={this.handleClick2}
                        >
                          <img src={icon.popover1} />
                        </Button>
                      </label>
                    </div>
                    <div>
                      <Field
                        className="largo-estatico-peque2"
                        name="numero_bano"
                        component="select"
                        onBlur={handleBlur}
                        onChange={this.onChangeNumeroBanios}
                        value={this.state.numeroBanios}
                      >
                        <option key={0} value="">
                          Selecciona..
                        </option>
                        <option key={1} value="1">
                          1
                        </option>
                        <option key={2} value="2">
                          2
                        </option>
                        <option key={3} value="3">
                          3
                        </option>
                        <option key={4} value="4">
                          4
                        </option>
                        <option key={5} value="5">
                          5
                        </option>
                        <option key={6} value="6">
                          6
                        </option>
                        <option key={7} value="7">
                          7
                        </option>
                        <option key={8} value="8">
                          8
                        </option>
                      </Field>
                      <ErrorMessage
                        name="numero_bano"
                        className="contact-error"
                        component="div"
                      />
                    </div>
                  </Col>
                  <Col md="4" className="">
                    <div>
                      <label className="contact-proper">Estacionamiento </label>
                    </div>
                    <div>
                      <Field
                        className="largo-estatico-peque2"
                        name="estacionamiento"
                        component="select"
                        onBlur={handleBlur}
                        onChange={this.onChangeEstacionamientos}
                        value={this.state.estacionamientos}
                      >
                        <option key={0} value="">
                          Selecciona..
                        </option>
                        <option key={1} value="0">
                          0
                        </option>
                        <option key={2} value="1">
                          1
                        </option>
                        <option key={3} value="2">
                          2
                        </option>
                        <option key={4} value="3">
                          3
                        </option>
                        <option key={5} value="4">
                          4
                        </option>
                        <option key={6} value="5">
                          5
                        </option>
                        <option key={7} value="6">
                          6
                        </option>
                        <option key={8} value="7">
                          7
                        </option>
                        <option key={9} value="8">
                          8
                        </option>
                      </Field>
                      <ErrorMessage
                        name="estacionamiento"
                        className="contact-error"
                        component="div"
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md="4" className="">
                    <div>
                      <label className="contact-proper">Metros Útiles</label>
                    </div>
                    <div>
                      <Field
                        className="largo-estatico-peque"
                        name="metros_utiles"
                        value={this.state.metrosUtiles}
                        onChange={this.onChangeMetrosUtiles}
                      />
                    </div>

                    <ErrorMessage
                      name="metros_utiles"
                      className="contact-error"
                      component="div"
                    />
                  </Col>
                  <Col md="4" className="">
                    <div>
                      <label className="contact-proper">
                        Dormitorio Servicio{" "}
                      </label>
                    </div>
                    <div>
                      <Field
                        className="largo-estatico-peque2"
                        name="dorm_servicio"
                        component="select"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        <option key={0} value="">
                          Selecciona..
                        </option>
                        <option key={1} value="Si">
                          Si
                        </option>
                        <option key={2} value="No">
                          No
                        </option>
                      </Field>

                      <ErrorMessage
                        name="dorm_servicio"
                        className="contact-error"
                        component="div"
                      />
                    </div>
                  </Col>
                  <Col md="4" className="">
                    <div>
                      <label className="contact-proper">Gastos Comunes</label>
                    </div>
                    <div>
                      <div>
                        <Field
                          className="largo-estatico-peque"
                          name="gastos_comunes"
                        />
                      </div>
                    </div>
                    <ErrorMessage
                      name="gastos_comunes"
                      className="contact-error"
                      component="div"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="4" className="">
                    <div>
                      <label className="contact-proper">Metros Totales</label>
                    </div>
                    <div>
                      <Field
                        className="largo-estatico-peque"
                        name="metros_totales"
                        value={this.state.metrosTotales}
                        onChange={this.onChangeMetrosTotales}
                      />
                    </div>

                    <ErrorMessage
                      name="metros_totales"
                      className="contact-error"
                      component="div"
                    />
                  </Col>
                  <Col md="4" className="">
                    <div>
                      <label className="contact-proper">Baño Servicio </label>
                    </div>
                    <div>
                      <Field
                        className="largo-estatico-peque2"
                        name="bano_servicio"
                        component="select"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        <option key={0} value="">
                          Selecciona..
                        </option>
                        <option key={1} value="Si">
                          Si
                        </option>
                        <option key={2} value="No">
                          No
                        </option>
                      </Field>
                      <ErrorMessage
                        name="bano_servicio"
                        className="contact-error"
                        component="div"
                      />
                    </div>
                  </Col>
                  <Col md="4" className="">
                    <div>
                      <label className="contact-proper">Contribuciones</label>
                    </div>
                    <div>
                      <div>
                        <Field
                          className="largo-estatico-peque"
                          name="contribuciones"
                        />
                      </div>
                    </div>
                    <ErrorMessage
                      name="contribuciones"
                      className="contact-error"
                      component="div"
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
          <div className={"titulo-planes-formulario"}>
            Características de la propiedad
          </div>
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
              Excluir dormitorio de servicio.
            </Card>
          </Popover>

          <Popover
            id={this.id2}
            open={this.state.open2}
            anchorEl={this.state.anchorEl2}
            onClose={this.handleClose2}
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
              Excluir baño de servicio.
            </Card>
          </Popover>

          <Formik
            initialValues={{
              ano_constru: "",
              numero_dorm: this.state.numeroDormitorios,
              bodega: this.state.tieneBodega,
              orientacion: "",
              numero_bano: this.state.numeroBanios,
              estacionamiento: this.state.estacionamientos,
              metros_utiles: this.state.metrosUtiles,
              dorm_servicio: "",
              gastos_comunes: "",
              metros_totales: this.state.metrosTotales,
              bano_servicio: "",
              contribuciones: "",
              escritorio: "",
            }}
            validate={this.validate}
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
                <div>
                  <label className="planes-label">Año de construcción</label>
                </div>
                <div>
                  <Field
                    className="largo-opciones-select-planes "
                    name="ano_constru"
                  />
                </div>

                <ErrorMessage
                  name="ano_constru"
                  className="contact-error"
                  component="div"
                />

                <div>
                  <label className="planes-label">
                    N° dormitorios
                    <Button
                      aria-describedby={this.id}
                      variant="contained"
                      color="primary"
                      onClick={this.handleClick}
                    >
                      <img src={icon.popover1} />
                    </Button>
                  </label>
                </div>
                <div>
                  <Field
                    className="largo-opciones-select-planes"
                    name="numero_dorm"
                    component="select"
                    onBlur={handleBlur}
                    onChange={this.onChangeNumeroDormitorios}
                    value={this.state.numeroDormitorios}
                  >
                    <option key={0} value="">
                      Selecciona..
                    </option>
                    <option key={1} value="1">
                      1
                    </option>
                    <option key={2} value="2">
                      2
                    </option>
                    <option key={3} value="3">
                      3
                    </option>
                    <option key={4} value="4">
                      4
                    </option>
                    <option key={5} value="5">
                      5
                    </option>
                    <option key={6} value="6">
                      6
                    </option>
                    <option key={7} value="7">
                      7
                    </option>
                    <option key={8} value="8">
                      8
                    </option>
                  </Field>

                  <ErrorMessage
                    name="numero_dorm"
                    className="contact-error"
                    component="div"
                  />
                </div>
                <div>
                  <label className="planes-label">Bodega </label>
                </div>
                <div>
                  <Field
                    className="largo-opciones-select-planes"
                    component="select"
                    name="bodega"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onChange={this.onChangeBodega}
                    value={this.state.tieneBodega}
                  >
                    <option key={0} value="">
                      Selecciona...
                    </option>
                    <option key={1} value="Si">
                      Si
                    </option>
                    <option key={2} value="No">
                      No
                    </option>
                  </Field>
                  <ErrorMessage
                    name="bodega"
                    className="contact-error"
                    component="div"
                  />
                </div>

                <div>
                  <label className="planes-label">Orientación</label>
                </div>
                <div>
                  <Field
                    className="largo-opciones-select-planes"
                    name="orientacion"
                  />
                </div>

                <ErrorMessage
                  name="orientacion"
                  className="contact-error"
                  component="div"
                />

                <label className="planes-label">
                  N° Baños
                  <Button
                    aria-describedby={this.id}
                    variant="contained"
                    color="primary"
                    onClick={this.handleClick2}
                  >
                    <img src={icon.popover1} />
                  </Button>
                </label>

                <Field
                  className="largo-opciones-select-planes"
                  name="numero_bano"
                  component="select"
                  onBlur={handleBlur}
                  onChange={this.onChangeNumeroBanios}
                  value={this.state.numeroBanios}
                >
                  <option key={0} value="">
                    Selecciona..
                  </option>
                  <option key={1} value="1">
                    1
                  </option>
                  <option key={2} value="2">
                    2
                  </option>
                  <option key={3} value="3">
                    3
                  </option>
                  <option key={4} value="4">
                    4
                  </option>
                  <option key={5} value="5">
                    5
                  </option>
                  <option key={6} value="6">
                    6
                  </option>
                  <option key={7} value="7">
                    7
                  </option>
                  <option key={8} value="8">
                    8
                  </option>
                </Field>

                <ErrorMessage
                  name="numero_bano"
                  className="contact-error"
                  component="div"
                />

                <div>
                  <label className="planes-label">Estacionamiento </label>
                </div>
                <div>
                  <Field
                    className="largo-opciones-select-planes"
                    name="estacionamiento"
                    component="select"
                    onBlur={handleBlur}
                    onChange={this.onChangeEstacionamientos}
                    value={this.state.estacionamientos}
                  >
                    <option key={0} value="">
                      Selecciona..
                    </option>
                    <option key={1} value="1">
                      1
                    </option>
                    <option key={2} value="2">
                      2
                    </option>
                    <option key={3} value="3">
                      3
                    </option>
                    <option key={4} value="4">
                      4
                    </option>
                    <option key={5} value="5">
                      5
                    </option>
                    <option key={6} value="6">
                      6
                    </option>
                    <option key={7} value="7">
                      7
                    </option>
                    <option key={8} value="8">
                      8
                    </option>
                  </Field>

                  <ErrorMessage
                    name="estacionamiento"
                    className="contact-error"
                    component="div"
                  />
                </div>

                <div>
                  <label className="planes-label">Metros Útiles</label>
                </div>
                <div>
                  <Field
                    className="largo-opciones-select-planes"
                    name="metros_utiles"
                    value={this.state.metrosUtiles}
                    onChange={this.onChangeMetrosUtiles}
                  />
                </div>

                <ErrorMessage
                  name="metros_utiles"
                  className="contact-error"
                  component="div"
                />

                <div>
                  <label className="planes-label">Dormitorio Servicio </label>
                </div>
                <div>
                  <Field
                    className="largo-opciones-select-planes"
                    name="dorm_servicio"
                    component="select"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <option key={8} value="">
                      Selecciona..
                    </option>
                    <option key={1} value="Si">
                      Si
                    </option>
                    <option key={2} value="No">
                      No
                    </option>

                    <ErrorMessage
                      name="dorm_servicio"
                      className="contact-error"
                      component="div"
                    />
                  </Field>
                </div>

                <div>
                  <label className="planes-label">Gastos Comunes</label>
                </div>
                <div>
                  <div>
                    <Field
                      className="largo-opciones-select-planes"
                      name="gastos_comunes"
                    />
                  </div>
                </div>
                <ErrorMessage
                  name="gastos_comunes"
                  className="contact-error"
                  component="div"
                />

                <div>
                  <label className="planes-label">Metros Totales</label>
                </div>
                <div>
                  <Field
                    className="largo-opciones-select-planes"
                    name="metros_totales"
                    value={this.state.metrosTotales}
                    onChange={this.onChangeMetrosTotales}
                  />
                </div>

                <ErrorMessage
                  name="metros_totales"
                  className="contact-error"
                  component="div"
                />

                <div>
                  <label className="planes-label">Baño Servicio </label>
                </div>
                <div>
                  <Field
                    className="largo-opciones-select-planes"
                    name="bano_servicio"
                    component="select"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <option key={8} value="">
                      Selecciona..
                    </option>
                    <option key={1} value="Si">
                      Si
                    </option>
                    <option key={2} value="No">
                      No
                    </option>
                  </Field>
                  <ErrorMessage
                    name="bano_servicio"
                    className="contact-error"
                    component="div"
                  />
                </div>

                <div>
                  <label className="planes-label">Contribuciones</label>
                </div>
                <div>
                  <div>
                    <Field
                      className="largo-opciones-select-planes"
                      name="contribuciones"
                    />
                  </div>
                </div>
                <ErrorMessage
                  name="contribuciones"
                  className="contact-error"
                  component="div"
                />

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

const mapStateToProps = (state) => ({
  data: state.app.data,
  uf: state.app.uf,
  datosPropiedadTasacion: state.app.datosPropiedadTasacion,
  ...state.app,
  ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  getUf: () => dispatch(fetchGetUF()),
  setDatosPropiedad: (datosProps) => dispatch(setDatosPropiedad(datosProps)),
});

PlansCaracteristicas = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlansCaracteristicas);

export default PlansCaracteristicas;
