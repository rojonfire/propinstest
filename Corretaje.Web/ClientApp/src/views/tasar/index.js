import React from "react";
import { connect } from "react-redux";
import { Container, Spinner } from "react-bootstrap";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Row, Col, Form, Input, Button, Select, Checkbox, Divider } from "antd";
import {
  setDatosPropiedadTasacion,
  postGetValoresPreliminaresTasacion,
  setValoresPreliminaresTasacion,
  logout,
  setRegistered
} from "../../action";
import swal from "sweetalert";
import ReactGa from "react-ga";
import { SuperSEO } from "react-super-seo";
import jwt from "jsonwebtoken";
import { BARRIOS_COMUNAS } from "../../utils/constants.js";

export const initGA = () => {
  console.log("GA init");
  ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
};

class Tasar extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      barrios: [],
      esVenta: false,
      esArriendo: false,
      tipoVivienda: "",
      ready: false
    };
    const { setValoresPreliminaresTasacion, data, history, dispatch, setRegistered } = this.props;

    setValoresPreliminaresTasacion(null);

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
    setRegistered(true);
  }

  componentDidMount() {
    const { setDatosPropiedadTasacion } = this.props;
    setDatosPropiedadTasacion(null);
    initGA();
    logPageView();
    document.querySelector("body").scrollTo(0, 0);
  }

  onFinish = (values) => {
    const { setDatosPropiedadTasacion, history, isLoggedIn } = this.props;
    const data = {      
      ...values,
      tipo: this.state.esVenta ? "venta" : "arriendo",
      tipoVivienda: this.state.tipoVivienda
    };
    setDatosPropiedadTasacion(data);
    if (isLoggedIn) {
      history.push("/resultadostasacion");
    } else {
      history.push("/signin");
    }
  };

  onChangeComuna = (e) => {
    let barrios = [];
    if (e in BARRIOS_COMUNAS) {
      BARRIOS_COMUNAS[e].map((p) => barrios.push(p));
    }
    this.setState({
      barrios
    });
  }

  getBarriosOptions = () => {
    const { barrios } = this.state;
    let options = [];
    barrios && barrios.length > 0 && barrios.forEach(b => options.push(<Select.Option value={b}>{b}</Select.Option>));
    return options;
  }

  onChangeTipoVivienda = (e) => {
    this.setState({
      tipoVivienda: e.target.value
    });
    this.getValoresPreliminares();
  }

  onClickArriendo = () => {
    this.setState({
      esArriendo: true,
      esVenta: false
    });
    this.getValoresPreliminares();
  }

  onClickVenta = () => {
    this.setState({
      esArriendo: false,
      esVenta: true
    });
    this.getValoresPreliminares();
  }

  getValoresPreliminares = () => {
    const { postGetValoresPreliminaresTasacion, setValoresPreliminaresTasacion } = this.props;
    const { tipoVivienda, esVenta, esArriendo } = this.state;
    setValoresPreliminaresTasacion(null);

    const data = {
      comuna: this.formRef.current.getFieldValue("comuna"),
      sector: this.formRef.current.getFieldValue("sector"),
      tipoVivienda: tipoVivienda,
      numeroDormitorios: 0,
      numeroEstacionamientos: 0,
      metrosUtiles: 0,
      metrosTotales: 0,
    };
    
    if (data.comuna != null && data.sector != null && tipoVivienda != null && (esVenta || esArriendo)) {
      this.setState({
        ready: true
      })
      
      postGetValoresPreliminaresTasacion(data, this.state.esVenta ? "venta" : "arriendo");
    } else {
      this.setState({
        ready: false
      })
    }
    
  }

  onValuesChange = (changedValues, allValues) => {
    const { postGetValoresPreliminaresTasacion, setValoresPreliminaresTasacion } = this.props;
    const { tipoVivienda, esVenta, esArriendo } = this.state;
    if (Object.keys(changedValues).includes("comuna")) {
      this.formRef.current.setFieldsValue({ sector: undefined });
      this.setState({
        ready: false
      });

    } else if (
      Object.keys(changedValues).includes("direccion") ||
      Object.keys(changedValues).includes("metrosTotales") ||
      Object.keys(changedValues).includes("metrosUtiles") ||
      Object.keys(changedValues).includes("rol") ||
      Object.keys(changedValues).includes("piso") ||
      Object.keys(changedValues).includes("dormitorios") ||
      Object.keys(changedValues).includes("banos") ||
      Object.keys(changedValues).includes("estacionamientos") ||
      Object.keys(changedValues).includes("bodega") ||
      Object.keys(changedValues).includes("motivo")
    ) {
    } else {
      if (allValues.comuna != undefined && allValues.sector != null && tipoVivienda != null && (esVenta || esArriendo)) {
        this.setState({
          ready: true
        });

        const data = {
          comuna: allValues.comuna,
          sector: allValues.sector,
          tipoVivienda: tipoVivienda,
          numeroDormitorios: 0,
          numeroEstacionamientos: 0,
          metrosUtiles: 0,
          metrosTotales: 0,
        };

        this.formRef.current.setFieldsValue(
          { metrosTotales: undefined },
          { metrosUtiles: undefined },
          { rol: undefined },
          { piso: undefined },
          { dormitorios: undefined },
          { banos: undefined },
          { estacionamientos: undefined },
          { bodega: undefined },
          { motivo: undefined },
        );

        setValoresPreliminaresTasacion(null);
        postGetValoresPreliminaresTasacion(data, esVenta ? "venta" : "arriendo");        
      }
    }    
  };

  feedback = () => {
    const { requestStateValoresPreliminaresTasacion, errorMessage } = this.props;
    if (requestStateValoresPreliminaresTasacion === "ERROR") {
      swal({
        title: "Error",
        text: errorMessage,
        icon: "error",
        dangerMode: true,
      });
    }
  };

  render() {
    const {
      valoresPreliminaresTasacion,
      requestStateValoresPreliminaresTasacion,
    } = this.props;
    const { esArriendo, esVenta, tipoVivienda, ready } = this.state;

    return (
      <Container>
        <SuperSEO
          title="Tasa tu propiedad sin costo"
          description="Tasa tu propiedad con inteligencia artificial"
          lang="en"
        />
        {this.feedback()}
        <Row justify="center">
          { /* smartphone, tablet chica, tablet grande/monitor chico, monitor normal/wide, monitor ultrawide */ }
          <Col xs={18} sm={16} md={14} lg={11} xl={11}>          
            <div className="titulo-real-tasacion">Tasación</div>
            <div className="sub-real-tasacion">
              Ingresa la información correspondiente a la propiedad que deseas tasar
            </div>
            <Form
              layout="vertical"
              ref={this.formRef}
              name="control-ref"
              onFinish={this.onFinish}
              initialValues={{
                tipoVivienda: tipoVivienda,
                comuna: undefined,
                direccion: this.state.address,
                sector: undefined
              }}
              onValuesChange={this.onValuesChange}
            >
              <Row className="text-center mb-4">
                <Col span={11}>
                  <button type="button" className={`btn-arrendar-vender-base btn-arrendar-vender-${esArriendo ? 'active' : 'inactive'}`} onClick={this.onClickArriendo}>
                    Arrendar
                  </button>
                </Col>
                <Col span={2} />
                <Col span={11}>
                  <button type="button" className={`btn-arrendar-vender-base btn-arrendar-vender-${esVenta ? 'active' : 'inactive'}`} onClick={this.onClickVenta}>
                    Vender
                  </button>
                </Col>
              </Row>
              <Row className="mb-4">                
                <Col span={11}>
                  <Checkbox checked={tipoVivienda === "Casa"} value={"Casa"} onChange={this.onChangeTipoVivienda}>
                    Casa
                  </Checkbox>
                </Col>
                <Col span={2} />
                <Col span={11}>
                  <Checkbox checked={tipoVivienda === "Departamento"} value={"Departamento"} onChange={this.onChangeTipoVivienda}>
                    Departamento
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col flex="auto">
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "La comuna es requerida",
                      },
                    ]}
                    name="comuna"                    
                  >
                    <Select 
                      onChange={this.onChangeComuna} 
                      placeholder="Seleccione una comuna"
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Select.Option value="Las Condes">Las Condes</Select.Option>
                      <Select.Option value="La Reina">La Reina</Select.Option>
                      <Select.Option value="Lo Barnechea">
                        Lo Barnechea
                      </Select.Option>
                      <Select.Option value="Vitacura">Vitacura</Select.Option>
                      <Select.Option value="Macul">Macul</Select.Option>
                      <Select.Option value="Peñalolen">Peñalolen</Select.Option>
                      <Select.Option value="Colina">Colina</Select.Option>
                      <Select.Option value="Santiago">Santiago</Select.Option>
                      <Select.Option value="Providencia">Providencia</Select.Option>
                      <Select.Option value="La Florida">La Florida</Select.Option>
                      <Select.Option value="Ñuñoa">Ñuñoa</Select.Option>
                      <Select.Option value="San Miguel">San Miguel</Select.Option>
                      <Select.Option value="Estación Central">
                        Estación Central
                      </Select.Option>
                      <Select.Option value="Huechuraba">Huechuraba</Select.Option>
                      <Select.Option value="Independencia">Independencia</Select.Option>
                      <Select.Option value="La Cisterna">La Cisterna</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col flex="auto">
                  <Form.Item name="direccion">
                    <Input size="default" placeholder="Ingresa una dirección" className="antd-form-input-size-fix" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col flex="auto">
                  <Form.Item
                    name="sector"
                    rules={[
                      {
                        required: true,
                        message: "El barrio es requerido",
                      },
                    ]}
                  >
                    <Select 
                      showSearch
                      placeholder="Selecciona un barrio"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {  this.getBarriosOptions()  }
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              
              {requestStateValoresPreliminaresTasacion === "LOADING" && (
                <div className="text-center">
                  <Spinner animation="border" />
                </div>
              )}
              {(requestStateValoresPreliminaresTasacion !== "LOADING" && requestStateValoresPreliminaresTasacion !== "ERROR") &&
                ready &&
                valoresPreliminaresTasacion !== undefined &&
                valoresPreliminaresTasacion !== null &&
                valoresPreliminaresTasacion.data !== undefined && (
                  <div>
                    <Row justify="space-between">
                      <Col xs={24} sm={11}>
                        <Form.Item
                          name="metrosTotales"
                          label="M2 Totales"
                          tooltip={`Ingrese valor entre ${valoresPreliminaresTasacion.data.minMetrosTotales} y ${valoresPreliminaresTasacion.data.maxMetrosTotales}`}
                          type="number"
                          rules={[
                            {
                              required: true,
                              message: "Valor inválido",
                            },
                            () => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  (valoresPreliminaresTasacion.data
                                    .minMetrosTotales <= value &&
                                    valoresPreliminaresTasacion.data
                                      .maxMetrosTotales >= value)
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error(
                                    `Ingrese valor entre ${valoresPreliminaresTasacion.data.minMetrosTotales} y ${valoresPreliminaresTasacion.data.maxMetrosTotales}`
                                  )
                                );
                              },
                            }),
                          ]}
                        >
                          <Input
                            className="antd-form-input-size-fix"
                            placeholder={`Ingrese valor entre ${valoresPreliminaresTasacion.data.minMetrosTotales} y ${valoresPreliminaresTasacion.data.maxMetrosTotales}`}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={11}>
                        <Form.Item
                          name="metrosUtiles"
                          label="M2 Útiles"
                          rules={[
                            {
                              required: true,
                              message: "Metros útiles son requeridos",
                            },
                          ]}
                        >
                          <Input className="antd-form-input-size-fix" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row justify="space-between">
                      <Col xs={24} sm={11}>
                        <Form.Item name="piso" label="Piso">
                          <Input className="antd-form-input-size-fix" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={11}>
                        <Form.Item
                          tooltip={{
                            title: "Este campo es opcional",
                            icon: <InfoCircleOutlined />,
                          }}
                          label="Rol"
                          name="rol"
                        >
                          <Input className="antd-form-input-size-fix" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row justify="space-between">
                      <Col xs={24} sm={11}>
                        <Form.Item
                          name="dormitorios"
                          label="Dormitorios"
                          tooltip={`Ingrese valor entre ${valoresPreliminaresTasacion.data.minDormitorios} y ${valoresPreliminaresTasacion.data.maxDormitorios}`}
                          type="number"
                          rules={[
                            {
                              required: true,
                              message: "Valor inválido",
                            },
                            () => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  (valoresPreliminaresTasacion.data
                                    .minDormitorios <= value &&
                                    valoresPreliminaresTasacion.data
                                      .maxDormitorios >= value)
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error(
                                    `Ingrese valor entre ${valoresPreliminaresTasacion.data.minDormitorios} y ${valoresPreliminaresTasacion.data.maxDormitorios}`
                                  )
                                );
                              },
                            }),
                          ]}
                        >
                          <Input
                            className="antd-form-input-size-fix"
                            placeholder={`Ingrese valor entre ${valoresPreliminaresTasacion.data.minDormitorios} y ${valoresPreliminaresTasacion.data.maxDormitorios}`}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={11}>
                        <Form.Item
                          name="banos"
                          label="Baños"
                          rules={[
                            {
                              required: true,
                              message: "Cantidad baños es requerido",
                            },
                          ]}
                        >
                          <Select>
                            <Select.Option value="1">1</Select.Option>
                            <Select.Option value="2">2</Select.Option>
                            <Select.Option value="3">3</Select.Option>
                            <Select.Option value="4">4</Select.Option>
                            <Select.Option value="5">5</Select.Option>
                            <Select.Option value="6">6</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row justify="space-between">
                      <Col xs={24} sm={11}>
                        <Form.Item
                          name="estacionamientos"
                          label="Estacionamiento"
                          rules={[
                            {
                              required: true,
                              message: "Cantidad estacionamientos es requerido",
                            },
                          ]}
                        >
                          <Select>
                            <Select.Option value="0">0</Select.Option>
                            <Select.Option value="1">1</Select.Option>
                            <Select.Option value="2">2</Select.Option>
                            <Select.Option value="3">3</Select.Option>
                            <Select.Option value="4">4</Select.Option>
                            <Select.Option value="5">5</Select.Option>
                            <Select.Option value="6">6</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={11}>
                        <Form.Item name="bodega" label="Bodega">
                          <Select>
                            <Select.Option value="0">0</Select.Option>
                            <Select.Option value="1">1</Select.Option>
                            <Select.Option value="2">2</Select.Option>
                            <Select.Option value="3">3</Select.Option>
                            <Select.Option value="4">4</Select.Option>
                            <Select.Option value="5">5</Select.Option>
                            <Select.Option value="6">6</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row justify="center">
                      <Col flex="auto">
                      <Divider className="divider-tasacion" />
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col>
                        <div className="subtitle-secondary">
                          Cuéntanos el motivo de tu tasación
                        </div>
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col span={24}>
                        <Form.Item name="motivo">
                          <Checkbox.Group defaultValue={['corredor']}>
                            <Row>
                              <Col>
                                <Checkbox value={"corredor"}>
                                  Soy corredor y quiero tasar
                              </Checkbox>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Checkbox value={"propietario"}>
                                  Soy propietario y quiero saber a que precio vender
                                </Checkbox>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Checkbox value={"comprador"}>
                                  Soy comprador y quiero tasación
                                </Checkbox>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Checkbox value={"otro"}>
                                  Otro motivo
                                </Checkbox>
                              </Col>
                            </Row>
                          </Checkbox.Group>
                        </Form.Item>
                      </Col>
                    </Row>                    

                    <div className="center text-center">
                      <Form.Item>
                        <Button
                          htmlType="submit"
                          className="center text-center tasacion-submit w-100"
                        >
                          Comencemos
                        </Button>
                      </Form.Item>
                    </div>
                  </div>
                )}
              </Form>
            </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.app.data,
  datosPropiedadTasacion: state.app.datosPropiedadTasacion,
  ...state.app,
  ...state.auth,
  valoresPreliminaresTasacion: state.app.valoresPreliminaresTasacion,
  requestStateValoresPreliminaresTasacion:
    state.app.requestStateValoresPreliminaresTasacion,
});

const mapDispatchToProps = (dispatch) => ({
  setRegistered: (data) => dispatch(setRegistered(data)),
  setDatosPropiedadTasacion: (data) =>
    dispatch(setDatosPropiedadTasacion(data)),
  postGetValoresPreliminaresTasacion: (data, tipo) =>
    dispatch(postGetValoresPreliminaresTasacion(data, tipo)),
  setValoresPreliminaresTasacion: (data) =>
    dispatch(setValoresPreliminaresTasacion(data)),
  dispatch: (action) => {
    dispatch(action);
  },
});

Tasar = connect(mapStateToProps, mapDispatchToProps)(Tasar);

export default Tasar;
