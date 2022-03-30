/** @format */

import React, { Component, Fragment } from "react";
import {
  FieldGroup,
  SelectFieldGroup,
  DateFieldGroup,
  CheckFieldGroup,
} from "../../utils/Input";
import { Row, Col } from "shards-react";
import { connect } from "react-redux";

import api from "../../api";

let listaInmobiliarias = [{ value: "", label: "--Seleccione--" }];

export class FormUsuarioAdd extends Component {
  constructor(props) {
    super(props);
    const { values } = this.props;
    this.state = {
      inmobiliaria: "",
      proyectosData: [],
      proyectos: "",
      estadoCarga: false,
      allCheck: [],
      isAdd: false,
      tipoCuenta: values.TipoCuenta,
    };
  }

  componentDidMount() {
    const { values, itemInmobiliarias } = this.props;
    const { isAdd } = this.state;
    let user = JSON.parse(localStorage.getItem("user"));
    if (values.InmobiliariaId) this.cargaListaProyectos(values.InmobiliariaId);

    if (
      !isAdd &&
      user &&
      user.tipoCuenta === 6 &&
      user.InmobiliariaId &&
      itemInmobiliarias.length > 0 &&
      !itemInmobiliarias[0].label
    ) {
      this.setState({ isAdd: true });
      const inmobiliaria = itemInmobiliarias.find(
        (inmo) => inmo.id === user.InmobiliariaId
      );
      listaInmobiliarias.push({
        value: inmobiliaria.id,
        label: inmobiliaria.nombre,
      });
    } else if (!isAdd && !itemInmobiliarias[0].label) {
      this.setState({ isAdd: true });
      itemInmobiliarias.map((i) =>
        listaInmobiliarias.push({ value: i.id, label: i.nombre })
      );
    } else {
      listaInmobiliarias = itemInmobiliarias;
    }

    this.setState({
      inmobiliaria: values.InmobiliariaId,
      allCheck: values.ProyectosInmobiliariosId,
    });
  }

  cargaListaProyectos = async (id) => {
    this.setState({
      estadoCarga: false,
    });
    try {
      const res = await api.getProyectos(id);
      if (res.estado === 1 && res.data.length !== 0) {
        let data = [];
        res.data.map((x) => {
          data.push({ value: x.id, label: x.nombre });
          return null;
        });
        this.setState({
          proyectosData: data,
        });
      } else {
        this.setState({
          proyectosData: [],
        });
      }
    } catch (error) {
      console.error("FormUsuarioAdd -> cargaListaProyectos -> error", error);
    } finally {
      this.setState({
        estadoCarga: true,
      });
    }
  };

  cargaCheck = (proyectoId, checked) => {
    const { allCheck } = this.state;
    const { values } = this.props;
    if (checked) {
      const check = [...allCheck, proyectoId];
      this.setState({
        allCheck: check,
      });
      values.ProyectosInmobiliariosId = check;
    } else {
      let data = [];
      allCheck.map((x) => x !== proyectoId && data.push(x));
      this.setState({
        allCheck: data,
      });
      values.ProyectosInmobiliariosId = data;
    }
  };

  onChangeTipoCuenta = (e, setFieldValueMethod) => {
    this.setState({
      tipoCuenta: e.target.value,
    });
    setFieldValueMethod("TipoCuenta", e.target.value);
  };

  onChangeBanco = (e, setFieldValueMethod) => {
    this.setState({
      banco: e.target.value,
    });
    setFieldValueMethod("Banco", e.target.value);
    //this.props.setBanco(e.target.value);
  };

  onChangeTipoCuentaBancaria = (e, setFieldValueMethod) => {
    this.setState({
      tipoCuentaBancaria: e.target.value,
    });
    setFieldValueMethod("TipoCuentaBancaria", e.target.value);
    //this.props.setTipoCuentaBancaria(e.target.value);
  };

  onChangeMedioPago = (e, setFieldValueMethod) => {
    this.setState({
      medioPago: e.target.value,
    });
    setFieldValueMethod("MedioPago", e.target.value);
    //this.props.setMedioPago(e.target.value);
  };

  onChangeNumeroCuenta = (e, setFieldValueMethod) => {
    this.setState({
      numeroCuenta: e.target.value,
    });
    setFieldValueMethod("NumeroCuenta", e.target.value);
    //this.props.setNumeroCuenta(e.target.value);
  };

  render() {
    const { values, usuario } = this.props;
    console.log(values);

    let user = JSON.parse(localStorage.getItem("user"));

    return (
      <Fragment>
        <Row>
          <Col md={6}>
            <FieldGroup
              value={values.Nombres}
              id="txtNombres"
              type="text"
              name="Nombres"
              label="Nombres"
            />
          </Col>
          <Col md={6}>
            <FieldGroup
              value={values.Apellidos}
              id="txtApellidos"
              type="text"
              name="Apellidos"
              label="Apellidos"
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FieldGroup
              value={values.Rut}
              id="txtRut"
              type="text"
              name="Rut"
              label="Rut"
              //onChange={() => values.Rut && values.Rut != null && values.Rut != undefined && values.Rut != "" && this.props.setFieldValue("Rut", values.Rut.replace(".", ""))}
            />
          </Col>
          <Col md={6}>
            <DateFieldGroup
              value={values.FechaNacimiento}
              id="txtFechaNacimiento"
              name="FechaNacimiento"
              label="Fecha Nacimiento"
              max={new Date()}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FieldGroup
              value={values.Telefono}
              id="txtTelefono"
              type="text"
              name="Telefono"
              label="Telefono"
            />
          </Col>
          <Col md={6}>
            <FieldGroup
              value={values.Direccion}
              id="txtDireccion"
              type="text"
              name="Direccion"
              label="Direccion"
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <SelectFieldGroup
              value={this.state.tipoCuenta}
              label="Tipo Cuenta"
              name="TipoCuenta"
              arrayOps={
                user.tipoCuenta !== 10
                  ? [
                      { value: "", label: "--Seleccione--" },
                      { value: 0, label: "Administrador" },
                      { value: 1, label: "Usuario Web" },
                      { value: 3, label: "Fotografo" },
                      { value: 4, label: "Anfitrión" },
                      { value: 5, label: "Agente" },
                      { value: 6, label: "Administrador Inmobiliario" },
                      { value: 9, label: "Jefe de Ventas" },
                      { value: 10, label: "Broker" },
                    ]
                  : [
                      { value: "", label: "--Seleccione--" },

                      { value: 1, label: "Usuario Web" },
                    ]
              }
              onChange={(e) =>
                this.onChangeTipoCuenta(e, this.props.setFieldValue)
              }
            />
          </Col>
          <Col md={6}>
            <FieldGroup
              value={values.Email}
              id="txt"
              type="text"
              name="Email"
              label="Correo electrónico"
            />
          </Col>
        </Row>
        <Row>
          {values.TipoCuenta === 5 || values.TipoCuenta === 6 ? (
            <Col md={6}>
              <SelectFieldGroup
                value={this.state.inmobiliaria}
                onChange={(e) => {
                  this.cargaListaProyectos(e.target.value);
                  this.setState({
                    inmobiliaria: e.target.value,
                  });
                  values.InmobiliariaId = e.target.value;
                }}
                label="Inmobiliaria"
                id="txtInmobiliariaId"
                name="InmobiliariaId"
                arrayOps={listaInmobiliarias}
              />
            </Col>
          ) : (
            <Col md={6} />
          )}
          {(usuario == null ||
            usuario == undefined ||
            (usuario && !usuario.password)) && (
            <Col md={6}>
              <FieldGroup
                value={values.Password}
                id="txtPass"
                type="password"
                name="Password"
                label="Contraseña"
              />
            </Col>
          )}
        </Row>
        <h4>Datos bancarios</h4>
        <Row>
          <Col md={6}>
            <SelectFieldGroup
              name="Banco"
              label="Banco"
              onChange={(e) => this.onChangeBanco(e, this.props.setFieldValue)}
              arrayOps={opcionesBanco}
              value={values.Banco}
            />
          </Col>
          <Col md={6}>
            <SelectFieldGroup
              name="TipoCuentaBancaria"
              label="Tipo cuenta bancaria"
              onChange={(e) =>
                this.onChangeTipoCuentaBancaria(e, this.props.setFieldValue)
              }
              arrayOps={opcionesTipoCuentaBancaria}
              value={values.TipoCuentaBancaria}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <SelectFieldGroup
              name="MedioPago"
              label="Medio pago"
              onChange={(e) =>
                this.onChangeMedioPago(e, this.props.setFieldValue)
              }
              arrayOps={opcionesMedioPago}
              value={values.MedioPago}
            />
          </Col>
          <Col md={6}>
            <FieldGroup
              value={values.NumeroCuenta}
              onChange={(e) =>
                this.onChangeNumeroCuenta(e, this.props.setFieldValue)
              }
              type="text"
              name="NumeroCuenta"
              label="Numero cuenta"
            />
          </Col>
        </Row>

        {values.TipoCuenta === 5 &&
          this.state.inmobiliaria &&
          this.state.estadoCarga && (
            <Row>
              {this.state.proyectosData.length !== 0 ? (
                this.state.proyectosData.map((obj, num) => {
                  var isChecked = values.ProyectosInmobiliariosId.includes(
                    obj.value
                  );
                  if (num % 2 === 0) {
                    return (
                      <>
                        <Col sm={3}>
                          <CheckFieldGroup
                            checked={isChecked}
                            onChange={(e) => {
                              this.cargaCheck(obj.value, e.target.checked);
                            }}
                            label={obj.label}
                            name={obj.value}
                            value={values[obj.value]}
                          />
                        </Col>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <Col sm={3}>
                          <CheckFieldGroup
                            checked={isChecked}
                            onChange={(e) => {
                              this.cargaCheck(obj.value, e.target.checked);
                            }}
                            label={obj.label}
                            name={obj.value}
                            value={values[obj.value]}
                          />
                        </Col>
                        <Col sm={6} />
                      </>
                    );
                  }
                })
              ) : (
                <Col md={6}>
                  <button
                    type="button"
                    onClick={() => window.open("/addproyecto")}
                    style={{ marginBottom: "33px", marginTop: "20px" }}
                    className="form-control btn btn-success"
                  >
                    Crear Proyecto
                  </button>
                </Col>
              )}
            </Row>
          )}
        <FieldGroup
          type="hidden"
          label=""
          id="txtProyectosInmobiliariosId"
          name="ProyectosInmobiliariosId"
          value={values.ProyectosInmobiliariosId}
        />
      </Fragment>
    );
  }
}

const opcionesBanco = [
  { value: "", label: "-- Seleccione --" },
  { value: "Banco Santander", label: "Banco Santander" },
  { value: "Scotiabank Azul", label: "Scotiabank Azul" },
  { value: "Banco BICE", label: "Banco BICE" },
  { value: "Banco Internacional", label: "Banco Internacional" },
  { value: "Banco Itaú", label: "Banco Itaú" },
  {
    value: "Banco de Chile / Edwards-Citi",
    label: "Banco de Chile / Edwards-Citi",
  },
  { value: "Corpbanca", label: "Corpbanca" },
  {
    value: "Banco Crédito e Inversiones",
    label: "Banco Crédito e Inversiones",
  },
  { value: "Banco Estado", label: "Banco Estado" },
  { value: "Banco Falabella", label: "Banco Falabella" },
  { value: "Banco Security", label: "Banco Security" },
  { value: "Scotiabank", label: "Scotiabank" },
  { value: "Rabobank", label: "Rabobank" },
  { value: "HSBC Bank", label: "HSBC Bank" },
  { value: "Banco Ripley", label: "Banco Ripley" },
  { value: "Banco Paris", label: "Banco Paris" },
  { value: "Banco Consorcio", label: "Banco Consorcio" },
  { value: "Coopeuch", label: "Coopeuch" },
  { value: "Prepago Los Heroes", label: "Prepago Los Heroes" },
  { value: "Tenpo Prepago S.A", label: "Tenpo Prepago S.A" },
];

const opcionesTipoCuentaBancaria = [
  { value: "", label: "-- Seleccione --" },
  { value: "Cuenta Corriente", label: "Cuenta Corriente" },
  { value: "Cuenta Vista", label: "Cuenta Vista" },
  { value: "Chequera Electrónica", label: "Chequera Electrónica" },
  { value: "Cuenta de Ahorro", label: "Cuenta de Ahorro" },
];

const opcionesMedioPago = [
  { value: "", label: "-- Seleccione --" },
  { value: "Boleta", label: "Boleta" },
  { value: "Factura", label: "Factura" },
];

const mapStateToProps = (state) => {
  const {
    app: { broker },
  } = state;
  return { broker };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

FormUsuarioAdd = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormUsuarioAdd);

export default FormUsuarioAdd;
