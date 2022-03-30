import React from "react";
import { connect } from "react-redux";
import { postAddSuscripcion } from "../action";
import swal from "sweetalert";
import { LoadingModal } from "../components/Loading";
import { Row, Col, Form, Input, Button, Select, Radio, Tooltip } from "antd";
import { BARRIOS_COMUNAS } from "../utils/constants";

class FormularioSuscripcion extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      tipoPropiedad: ""
    };
  }

  onChangeTipoPropiedad = (e) => {
    this.setState({
      tipoPropiedad: e
    });
  }

  onFinish = (values) => {
    let val = 0;

    val = values.comunaUno !== "" ? val + 3 : val;
    val = values.comunaDos !== "" ? val + 2 : val;
    val = values.comunaTres !== "" ? val + 1 : val;
    val = values.dormitorioDesde !== "" ? val + 1 : val;
    val = values.dormitorioHasta !== "" ? val + 1 : val;
    val = values.banoDesde !== "" ? val + 1 : val;
    val = values.banoHasta !== "" ? val + 1 : val;
    val = values.estacionamiento !== "" ? val + 1 : val;
    val = values.valorDesde !== "" ? val + 1 : val;
    val = values.valorHasta !== "" ? val + 1 : val;
    val = values.superficieTotalDesde !== "" ? val + 1 : val;
    val = values.superficieTotalHasta !== "" ? val + 1 : val;
    val = values.superficieUtilDesde !== "" ? val + 1 : val;
    val = values.superficieUtilHasta !== "" ? val + 1 : val;

    const data = {
      nombreUsuario: values.nombre,
      emailUsuario: values.email,
      telefono: values.telefono,
      esVenta: values.tipo == "venta" ? true : false,
      idUsuario: null,
      idCliente: null,
      comunaUno: values.comunaUno,
      comunaDos: values.comunaDos,
      comunaTres: values.comunaTres,
      tipoPropiedad: values.tipoPropiedad,
      cantidadDormitoriosDesde: values.dormitorioDesde
        ? values.dormitorioDesde
        : 0,
      cantidadDormitoriosHasta: values.dormitorioHasta
        ? values.dormitorioHasta
        : 0,
      cantidadBanosDesde: values.banoDesde ? values.banoDesde : 0,
      cantidadBanosHasta: values.banoHasta ? values.banoHasta : 0,
      cantidadEstacionamientos: values.estacionamiento
        ? values.estacionamiento
        : 0,
      valorDesde: values.valorDesde ? values.valorDesde : 0,
      valorHasta: values.valorHasta ? values.valorHasta : 0,
      metrosTotalesDesde: values.superficieTotalDesde ? values.superficieTotalDesde : 0,
      metrosTotalesHasta: values.superficieTotalHasta ? values.superficieTotalHasta : 0,
      metrosUtilesDesde: values.superficieUtilDesde ? values.superficieUtilDesde : 0,
      metrosUtilesHasta: values.superficieUtilHasta ? values.superficieUtilHasta : 0,
      puntaje: val,
    };

    const { postAddSuscripcion } = this.props;
    postAddSuscripcion(data);
  }

  feedback = () => {
    const { errorMessage, requestPostAddSuscripcion } = this.props;

    if (requestPostAddSuscripcion === "LOADING") {
      return <LoadingModal porcentaje={0} finish={() => void 0} />;
    }

    if (requestPostAddSuscripcion === "SUCCESS") {
      swal("Se ha agregado la suscripción exitosamente", {
        icon: "success",
        buttons: {
          cancel: false,
          confirm: true,
        },
      }).then(() => {
        this.formRef.current.resetFields();
      });
    }

    if (requestPostAddSuscripcion === "ERROR") {
      swal(errorMessage ? errorMessage : "Ha habido un error, verifique los campos solicitados e inténtelo de nuevo", {
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
    const { title, submitButtonText } = this.props;
    return (
      <div>
        { this.feedback() }
        {title && (
          <Row>
            <Col>
              <h2 className="font-weight-bold mt-4">
                { title }
              </h2>
            </Col>
          </Row>          
        )}        
        <Form
          layout="vertical"
          ref={this.formRef}
          name="control-ref"
          onFinish={this.onFinish}
          initialValues={{
            tipoPropiedad: "",
            region: "",
            comunaUno: "",
            comunaDos: "",
            comunaTres: "",
            dormitorioDesde: "",
            dormitorioHasta: "",
            banoDesde: "",
            banoHasta: "",
            estacionamiento: "",
            superficieTotalDesde: "",
            superficieTotalHasta: "",
            superficieUtilDesde: "",
            superficieUtilHasta: "",
            valorDesde: "",
            valorHasta: "",
            tipoMoneda: "UF",
            tipo: "",
            nombre: "",
            telefono: "",
            email: "",
            puntajesuscripcion: 0,
          }}
        >
          <Row className="mb-3">
            <Col>
              <h3>Datos propiedad</h3>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col span={11}>
              <Form.Item
                label="Tipo propiedad"
                name="tipoPropiedad"
              >
                <Select onChange={this.onChangeTipoPropiedad}>
                  <Select.Option value="Casa">Casa</Select.Option>
                  <Select.Option value="Departamento">Departamento</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Región"                
                name="region"
              >
                <Select onChange={this.onChangeRegion}>
                  <Select.Option value="Metropolitana">Metropolitana</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col xs={24} sm={24} md={6}>
              <Form.Item
                label="Comuna de preferencia 1"
                name="comunaUno"
              >
                <Select>
                  {  
                  Object.keys(BARRIOS_COMUNAS).map(c => (
                      <Select.Option value={c}>
                        {c}
                      </Select.Option>
                    )) 
                  } 
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item
                label="Comuna de preferencia 2"
                name="comunaDos"
              >
                <Select>
                {  Object.keys(BARRIOS_COMUNAS).map(c => (
                      <Select.Option value={c}>{c}</Select.Option>
                    )) 
                  } 
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item
                label="Comuna de preferencia 3"
                name="comunaTres"
              >
                <Select>
                  {  Object.keys(BARRIOS_COMUNAS).map(c => (
                      <Select.Option value={c}>{c}</Select.Option>
                    )) 
                  } 
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col flex="auto">Dormitorios</Col>
          </Row>
          <Row justify="space-between">
            <Col span={11}>
              <Form.Item 
                name="dormitorioDesde"
                label="Dormitorios desde"
                rules={[{
                  required: false,
                  pattern: new RegExp(/\d+/g),
                  message: "Ingresa sólo números"
                }]}
              >
                <Input size="default" className="antd-form-input-size-fix" />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                name="dormitorioHasta"
                label="Dormitorios hasta"
                rules={[{
                  required: false,
                  pattern: new RegExp(/\d+/g),
                  message: "Ingresa sólo números"
                }]}
              >
                <Input size="default" className="antd-form-input-size-fix" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col flex="auto">Baños</Col>
          </Row>
          <Row justify="space-between">
            <Col span={11}>
              <Form.Item 
                name="banoDesde" 
                label="Baños desde"
                rules={[{
                  required: false,
                  pattern: new RegExp(/\d+/g),
                  message: "Ingresa sólo números"
                }]}
              >
                <Input size="default" className="antd-form-input-size-fix" />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item 
                name="banoHasta" 
                label="Baños hasta"
                rules={[{
                  required: false,
                  pattern: new RegExp(/\d+/g),
                  message: "Ingresa sólo números"
                }]}
              >
                <Input size="default" className="antd-form-input-size-fix" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col flex="auto">
              <Form.Item
                label="Estacionamientos"
                name="estacionamiento"
              >
                <Select>
                  <Select.Option value="0">0</Select.Option>
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col flex="auto">Superficie total (m2)</Col>
          </Row>
          <Row justify="space-between">
            <Col span={11}>
              <Form.Item name="superficieTotalDesde" label="Desde">
                <Input size="default" className="antd-form-input-size-fix" />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="superficieTotalHasta" label="Hasta">
                <Input size="default" className="antd-form-input-size-fix" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col flex="auto">Superficie útil (m2)</Col>
          </Row>
          <Row justify="space-between">
            <Col span={11}>
              <Form.Item name="superficieUtilDesde" label="Desde">
                <Input size="default" className="antd-form-input-size-fix" />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="superficieUtilHasta" label="Hasta">
                <Input size="default" className="antd-form-input-size-fix" />
              </Form.Item>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col flex="auto">
              <h3>
                Valor de la propiedad
              </h3>              
            </Col>
          </Row>
          <Row justify="space-between">
            <Col xs={24} sm={24} md={6}>
              <Form.Item
                name="tipo"
                label="Tipo"
                rules={[
                  {
                    required: true,
                    message: "Seleccione el tipo",
                  }
                ]}
              >
                <Radio.Group 
                  //onChange={onChange} value={value}
                >
                  <Radio value={"venta"}>Venta</Radio>
                  <Radio value={"arriendo"}>Arriendo</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Tooltip title="Te recomendamos ingresar el precio en UF si es de tipo Venta, y en CLP si es de tipo Arriendo">
            <Row justify="space-between">
              <Col xs={24} sm={24} md={6}>
                <Form.Item name="valorDesde" label="Desde">
                  <Input size="default" className="antd-form-input-size-fix" />
                </Form.Item>
              </Col>            
              <Col xs={24} sm={24} md={6}>
                <Form.Item name="valorHasta" label="Desde">
                  <Input size="default" className="antd-form-input-size-fix" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={6}>
                <Form.Item name="tipoMoneda" label="Tipo moneda">
                  <Radio.Group 
                    //onChange={onChange} value={value}
                  >
                    <Radio value={"CLP"}>CLP</Radio>
                    <Radio value={"UF"}>UF</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Tooltip>          
          <Row className="mb-3">
            <Col flex="auto">
              <h3>
                Datos de contacto
              </h3>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col xs={24} sm={24} md={11}>
              <Form.Item 
                name="nombre" 
                label="Nombre" 
                rules={[
                  {
                    required: true,
                    message: "El nombre de contacto es requerido",
                  },
                ]}
              >
                <Input size="default" className="antd-form-input-size-fix" />
              </Form.Item>
            </Col>            
            <Col xs={24} sm={24} md={11}>
              <Form.Item 
                name="telefono" 
                label="Teléfono"
                rules={[
                  {
                    required: true,
                    message: "El teléfono es requerido",
                  },
                ]}
              >
                <Input size="default" className="antd-form-input-size-fix" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col flex="auto">
              <Form.Item 
                name="email" 
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Ingrese un email válido",
                    pattern: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
                  },
                ]}
              >
                <Input size="default" className="antd-form-input-size-fix" />
              </Form.Item>
            </Col>
          </Row>
          <Row className="text-center">
            <Col flex="auto">
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="center text-center tasacion-submit"
                >
                  { submitButtonText }
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  requestPostAddSuscripcion: state.app.requestPostAddSuscripcion,
  errorMessage: state.app.errorMessage
});

const mapDispatchToProps = (dispatch) => ({
  postAddSuscripcion: (data) => dispatch(postAddSuscripcion(data)),
});

FormularioSuscripcion = connect(mapStateToProps, mapDispatchToProps)(FormularioSuscripcion);

export default FormularioSuscripcion;
