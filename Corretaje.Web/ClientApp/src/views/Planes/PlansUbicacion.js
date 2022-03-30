import React from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import icon from "../../utils/images";
import { Popover } from "@material-ui/core";
import { connect } from "react-redux";
import {
  fetchGetUF,
  setDatosPropiedad,
  setEstadoRequest,
  logout,
} from "../../action";
import PlacesAutocomplete from "react-places-autocomplete";
import { BARRIOS_COMUNAS } from "../../utils/constants.js";
import jwt from "jsonwebtoken";
import utilfunc from "../../utils/utilsFunc";

class PlansUbicacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      total: 0,
      selectedCards: {},
      msj: "CONTINUAR SIN ADICIONALES",
      token: null,
      url: null,
      show: false,
      tipo: 1, // tipo 0 sin adicionales / tipo 1 con adicionales
      anchorEl: null,
      open: false,
      id: undefined,
      address: "",
      currentStep: 2,
      comuna: "",
      barrios: [],
      tipoPropiedad: "",
      numero: "",
      numeroDepto: "",
      barrio: "",
    };
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    const { dispatch, userId, updateStep, history, data } = this.props;
    dispatch(setEstadoRequest(null));
    if (userId === undefined && updateStep !== undefined) {
      updateStep({ goBack: true });
    }

    if (data != null && data.isLoggedIn) {
      console.log("LoggedIn");
      try {
        var decoded = jwt.verify(
          data.accessToken,
          "CleveritPhygyjuhukyhkijijijliliugjgkihhjklojikhkhujilarking"
        );
        //console.log(decoded);
        if (Date.now() >= decoded.exp * 1000) {
          console.log("Token expired");
          dispatch(logout());
          history.push("/");
        }
      } catch (error) {
        console.error(error);
        dispatch(logout());
        history.push("/");
      }
    }
  }

  handleClick2(event) {
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
    const { updateStep } = this.props;
    this.props.formData(this.state.currentStep, values);
    updateStep({});
  };

  handleSelect = async (value) => {
    const results = value;
    return results;
  };

  handleChangeComuna = (e) => {
    let barrios = [];
    if (e.target.value in BARRIOS_COMUNAS) {
      BARRIOS_COMUNAS[e.target.value].map((p) => barrios.push(p));
    }
    this.setState({
      address: this.state.address,
      comuna: e.target.value,
      barrios,
    });
  };

  handleTipoPropiedad = (e) => {
    this.setState({ tipoPropiedad: e.target.value });
  };

  handleChange = (address) => {
    this.setState({ address });
  };

  handleClick(address) {
    this.setState({ address });
  }

  changeNumero = (e) => {
    this.setState({ numero: e.target.value });
  };

  changeNumeroDepto = (e) => {
    this.setState({ numeroDepto: e.target.value });
  };

  handleChangeBarrio = (e) => {
    this.setState({ barrio: e.target.value });
  };

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
      let barrios = [];
      if (datosPropiedadTasacion.comuna in BARRIOS_COMUNAS) {
        BARRIOS_COMUNAS[datosPropiedadTasacion.comuna].map((p) =>
          barrios.push(p)
        );
      }

      this.setState({
        barrios,
        address: datosPropiedadTasacion.Direccion,
        comuna: datosPropiedadTasacion.comuna,
        tipoPropiedad: datosPropiedadTasacion.tipoVivienda,
        barrio: datosPropiedadTasacion.barrio,
      });
    }
  }

  render() {
    const { barrios } = this.state;
    return (
      <Container>
        <section className={"ubicacion-propiedad"}>
          <div className={"titulo-planes-formulario"}>
            Ubicación de la propiedad
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
              Por el momento solo tenemos cobertura en la Región Excluir
              dormitorio de servicio.
            </Card>
          </Popover>

          <section className={"hideMOBILE"}>
            <Formik
              initialValues={{
                Tipo_Propiedad: this.state.tipoPropiedad,
                Direccion: this.state.address,
                Numero: this.state.numero,
                Numero_depto: this.state.numeroDepto,
                Comuna: this.state.comuna,
                Barrio: this.state.barrio,
              }}
              validate={validate}
              onSubmit={this.continuar}
              enableReinitialize={true}
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
                  <div className="formulario-propiedades-planes">
                    <label className="contact-proper">Dirección</label>
                    <PlacesAutocomplete
                      onSelect={this.handleSelect}
                      onChange={this.handleChange}
                      value={this.state.address}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading,
                      }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: "",
                              className: "largo-opciones-select-planes2",
                            })}
                          />
                          <div className="largodropdowngoogle">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                              const style = suggestion.active
                                ? {
                                    backgroundColor: "#fafafa",
                                    cursor: "pointer",
                                  }
                                : {
                                    backgroundColor: "#ffffff",
                                    cursor: "pointer",
                                  };

                              return (
                                <div
                                  {...getSuggestionItemProps(suggestions, {
                                    style,
                                  })}
                                  onClick={(e) => {
                                    this.handleClick(suggestion.description);
                                  }}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>

                    <ErrorMessage
                      name="Direccion"
                      className="contact-error"
                      component="div"
                    />
                  </div>
                  <div className="formulario-propiedades-planes">
                    <label className="contact-proper">Tipo de Propiedad</label>
                    <Field
                      component="select"
                      name="Tipo_Propiedad"
                      onBlur={handleBlur}
                      onChange={this.handleTipoPropiedad}
                      className="largo-opciones-select-planes "
                    >
                      <option key={0} value=" ">
                        Selecciona...
                      </option>
                      <option key={1} value="Casa">
                        Casa
                      </option>
                      <option key={2} value="Departamento">
                        Departamento
                      </option>
                    </Field>

                    <ErrorMessage
                      name="Tipo_Propiedad"
                      className="contact-error"
                      component="div"
                    />
                  </div>
                  <Row className={"center"}>
                    <Col className={"campo-planes-pequeno"}>
                      <div className="">
                        <label className="contact-proper">Número</label>
                      </div>
                      <div>
                        <Field
                          className="largo-estatico-peque"
                          type=""
                          name="Numero"
                          onChange={this.changeNumero}
                          value={this.state.numero}
                        />
                      </div>

                      <ErrorMessage
                        name="Numero"
                        className="contact-error"
                        component="div"
                      />
                    </Col>

                    <Col className={"center"}>
                      <div className="">
                        <label className="contact-proper">
                          N° Departamento
                        </label>
                      </div>
                      <div>
                        <Field
                          className="largo-estatico-peque"
                          type=""
                          name="Numero_depto"
                          onChange={this.changeNumeroDepto}
                          value={this.state.numeroDepto}
                        />
                      </div>

                      <ErrorMessage
                        name="Numero_depto"
                        className="contact-error"
                        component="div"
                      />
                    </Col>
                  </Row>
                  <div className="formulario-propiedades-planes">
                    <label className="contact-proper">
                      Comuna
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
                      className="largo-opciones-select-planes "
                      component="select"
                      id="Comuna"
                      name={"Comuna"}
                      onBlur={handleBlur}
                      onChange={this.handleChangeComuna}
                      value={this.state.comuna}
                    >
                      <option key={0} value="">
                        Selecciona...
                      </option>
                      <option key={1} value="Las Condes">
                        Las Condes
                      </option>
                      <option key={2} value="Lo Barnechea">
                        Lo Barnechea
                      </option>
                      <option key={3} value="Vitacura">
                        Vitacura
                      </option>
                      <option key={4} value="Santiago">
                        Santiago
                      </option>
                      <option key={5} value="Providencia">
                        Providencia
                      </option>
                      <option key={6} value="Ñuñoa">
                        Ñuñoa
                      </option>
                      <option key={7} value="La Reina">
                        La Reina
                      </option>
                      <option key={8} value="Peñalolen">
                        Peñalolen
                      </option>
                      <option key={9} value="Macul">
                        Macul
                      </option>
                      <option key={10} value="Colina">
                        Colina
                      </option>
                      <option key={11} value="La Florida">
                        La Florida
                      </option>
                      <option key={12} value="San Miguel">
                        San Miguel
                      </option>
                      <option key={13} value="Estación Central">
                        Estación Central
                      </option>
                      <option key={14} value="Huechuraba">
                        Huechuraba
                      </option>
                      <option key={15} value="Independencia">
                        Independencia
                      </option>
                      <option key={16} value="La Cisterna">
                        La Cisterna
                      </option>
                    </Field>

                    <ErrorMessage
                      name="Comuna"
                      className="contact-error"
                      component="div"
                    />
                  </div>
                  <div className="formulario-propiedades-planes">
                    <label className="contact-proper">Barrio</label>

                    <Field
                      className="largo-opciones-select-planes "
                      component="select"
                      id="Barrio"
                      name={"Barrio"}
                      onBlur={handleBlur}
                      onChange={this.handleChangeBarrio}
                      value={this.state.barrio}
                    >
                      {barrios.map((item, i) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </Field>

                    <ErrorMessage
                      name="Barrio"
                      className="contact-error"
                      component="div"
                    />
                  </div>
                  <div className="mover-boton-derecha">
                    <Button className={"center"} type="submit">
                      Continuar
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </section>
          <section className={"hideWEB2"}>
            <Formik
              initialValues={{
                Tipo_Propiedad: this.state.tipoPropiedad,
                Direccion: this.state.address,
                Numero: this.state.numero,
                Numero_depto: this.state.numeroDepto,
                Comuna: this.state.comuna,
                Barrio: this.state.barrio,
              }}
              validate={validate}
              onSubmit={this.continuar}
              enableReinitialize={true}
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
                  <div className="">
                    <label className="planes-label">Dirección</label>
                    <PlacesAutocomplete
                      onSelect={this.handleSelect}
                      onChange={this.handleChange}
                      value={this.state.address}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading,
                      }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: "",
                              className: "largo-opciones-select-planes2",
                            })}
                          />
                          <div className="largodropdowngoogle">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                              const style = suggestion.active
                                ? {
                                    backgroundColor: "#fafafa",
                                    cursor: "pointer",
                                  }
                                : {
                                    backgroundColor: "#ffffff",
                                    cursor: "pointer",
                                  };

                              return (
                                <div
                                  {...getSuggestionItemProps(suggestions, {
                                    style,
                                  })}
                                  onClick={(e) => {
                                    this.handleClick(suggestion.description);
                                  }}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>

                    <ErrorMessage
                      name="Direccion"
                      className="contact-error"
                      component="div"
                    />
                  </div>
                  <div className=" ">
                    <label className="planes-label">Tipo de Propiedad</label>
                  </div>
                  <div className="">
                    <Field
                      component="select"
                      name="Tipo_Propiedad"
                      onBlur={handleBlur}
                      onChange={this.handleTipoPropiedad}
                      value={this.state.tipoPropiedad}
                      className="largo-opciones-select-planes "
                    >
                      <option key={0} value=" ">
                        Selecciona...
                      </option>
                      <option key={1} value="Casa">
                        Casa
                      </option>
                      <option key={2} value="Departamento">
                        Departamento
                      </option>
                    </Field>
                  </div>

                  <Row className={""}>
                    <Col className={""}>
                      <div className="">
                        <label className="planes-label">Número</label>
                      </div>
                      <div>
                        <Field
                          className="largo-estatico-peque"
                          type=""
                          name="Numero"
                          onChange={this.changeNumero}
                          value={this.state.numero}
                        />
                      </div>

                      <ErrorMessage
                        name="Numero"
                        className="contact-error"
                        component="div"
                      />
                    </Col>
                    <Col className={""}>
                      <div className="">
                        <label className="planes-label">N° Departamento</label>
                      </div>
                      <div>
                        <Field
                          className="largo-estatico-peque"
                          type=""
                          name="Numero_depto"
                          onChange={this.changeNumeroDepto}
                          value={this.state.numeroDepto}
                        />
                      </div>

                      <ErrorMessage
                        name="Numero_depto"
                        className="contact-error"
                        component="div"
                      />
                    </Col>
                  </Row>

                  <div className="">
                    <label className="planes-label">
                      Comuna
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
                      className="largo-opciones-select-planes "
                      component="select"
                      id="Comuna"
                      name={"Comuna"}
                      onBlur={handleBlur}
                      onChange={this.handleChangeComuna}
                      value={this.state.comuna}
                    >
                      <option key={0} value="">
                        Selecciona...
                      </option>
                      <option key={1} value="Las Condes">
                        Las Condes
                      </option>
                      <option key={2} value="Lo Barnechea">
                        Lo Barnechea
                      </option>
                      <option key={3} value="Vitacura">
                        Vitacura
                      </option>
                      <option key={4} value="Santiago">
                        Santiago
                      </option>
                      <option key={5} value="Providencia">
                        Providencia
                      </option>
                      <option key={6} value="Ñuñoa">
                        Ñuñoa
                      </option>
                      <option key={7} value="La Reina">
                        La Reina
                      </option>
                      <option key={8} value="Peñalolen">
                        Peñalolen
                      </option>
                      <option key={9} value="Macul">
                        Macul
                      </option>
                      <option key={10} value="Colina">
                        Colina
                      </option>
                      <option key={11} value="La Florida">
                        La Florida
                      </option>
                      <option key={12} value="San Miguel">
                        San Miguel
                      </option>
                      <option key={13} value="Estación Central">
                        Estación Central
                      </option>
                      <option key={14} value="Huechuraba">
                        Huechuraba
                      </option>
                      <option key={15} value="Independencia">
                        Independencia
                      </option>
                      <option key={16} value="La Cisterna">
                        La Cisterna
                      </option>
                    </Field>
                  </div>

                  <ErrorMessage
                    name="Comuna"
                    className="contact-error"
                    component="div"
                  />

                  <div className="">
                    <label className="planes-label">Barrio</label>
                  </div>
                  <div>
                    <Field
                      className="largo-opciones-select-planes "
                      component="select"
                      id="Barrio"
                      name={"Barrio"}
                      onBlur={handleBlur}
                      onChange={this.handleChangeBarrio}
                      value={this.state.barrio}
                    >
                      {barrios.map((item, i) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </Field>
                  </div>

                  <ErrorMessage
                    name="Barrio"
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
        </section>
      </Container>
    );
  }
}
const validate = (formValues) => {
  let errors = {};

  if (formValues.Direccion === "") {
    errors.Direccion = "Por favor ingrese la dirección de su propiedad";
  }
  if (formValues.Tipo_Propiedad === "") {
    errors.Tipo_Propiedad = "Por favor ingrese el tipo de propiedad";
  } else if (
    formValues.Tipo_Propiedad === "Departamento" &&
    (formValues.Numero_depto === "" || formValues.Numero_depto == null)
  ) {
    errors.Numero_depto = "Por favor ingrese el número de departamento";
  }
  if (formValues.Numero === "") {
    errors.Numero = "Por favor ingrese el número";
  } else if (isNaN(formValues.Numero)) {
    errors.Numero = "Por favor ingrese solo números";
  }
  if (
    formValues.Comuna === "" ||
    formValues.Comuna === null ||
    formValues.Comuna === undefined
  ) {
    errors.Comuna = "Por favor ingrese la comuna de su propiedad";
  }
  if (
    formValues.Barrio === "" ||
    formValues.Barrio === null ||
    formValues.Barrio === undefined
  ) {
    errors.Barrio = "Por favor ingrese el barrio de su propiedad";
  }

  return errors;
};
const mapStateToProps = (state) => ({
  data: state.app.data,
  estado: state.app.estado,
  uf: state.app.uf,
  datosPropiedadTasacion: state.app.datosPropiedadTasacion,
  ...state.app,
  ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  getUf: () => dispatch(fetchGetUF()),
  setDatosPropiedad: (datosProps) => dispatch(setDatosPropiedad(datosProps)),
  dispatch: (action) => {
    dispatch(action);
  },
});

PlansUbicacion = connect(mapStateToProps, mapDispatchToProps)(PlansUbicacion);

export default PlansUbicacion;

//<div className={"mover-boton-derecha"}>
//           <Button
//             onClick={() => updateStep({goBack: true})}
//           variant="light"
//         className={"volver-espacio"}
//   >
//     Volver
//</Button>
//<Button
//  className={"center"}
//type="submit"
//>
//  Continuar
//</Button>
//</div>
