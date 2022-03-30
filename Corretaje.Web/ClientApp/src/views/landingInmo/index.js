import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { Row, Col, Form, Input, Button, Image } from "antd";
import { getLandingInmobiliariaByPathname, fetchGetInmobiliaria, postReferirVendedor } from "../../action";
import swal from "sweetalert";
import { LoadingModal } from "../../components/Loading";

class LandingInmo extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      defaultBackgroundColor: "#000",
      defaultTextColor: "#FFF",
      defaultButtonColor: "#CCC",
    }
    const pathname = window.location.pathname.replace("/landing/", "");
    const { getLandingInmobiliariaByPathname } = this.props;
    getLandingInmobiliariaByPathname(pathname);
    console.log(window.location);
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { landingInmobiliaria, fetchGetInmobiliaria } = this.props;
    if (landingInmobiliaria != null && prevProps.landingInmobiliaria != landingInmobiliaria) {
      fetchGetInmobiliaria(landingInmobiliaria.idInmobiliaria);
    }
  };

  onSubmit = (values) => {
    const { postReferirVendedor, landingInmobiliaria } = this.props;
    
    const data = {
      nombres: `${values.nombre} ${values.apellido}`,
      telefono: values.telefono,
      email: values.email,
      comuna: "Sin definir",
      idInmobiliaria: landingInmobiliaria && landingInmobiliaria.idInmobiliaria
    }

    postReferirVendedor(data);
  }

  feedback = () => {
    const { errorMessage, requestReferirVendedor, requestGetLandingInmobiliaria, requestGetInmobiliariaById } = this.props;

    if (requestReferirVendedor === "LOADING" || requestGetLandingInmobiliaria === "LOADING" || requestGetInmobiliariaById === "LOADING") {
      return <LoadingModal porcentaje={0} finish={() => void 0} />;
    }

    if (requestReferirVendedor === "SUCCESS") {
      swal("Se ha enviado el formulario exitosamente", {
        icon: "success",
        buttons: {
          cancel: false,
          confirm: true,
        },
      }).then(() => {
        window.location.reload();
      });
    }

    if (requestReferirVendedor === "ERROR") {
      swal(errorMessage, {
        icon: "error",
        button: {
          cancel: false,
          confirm: true,
          className: "gray-bg"
        },
      });
    }

  };

  render() {
    const { landingInmobiliaria, inmobiliariaData, requestGetInmobiliariaById, requestGetLandingInmobiliaria } = this.props;
    const { defaultBackgroundColor, defaultTextColor, defaultButtonColor } = this.state;

    const backgroundColor = landingInmobiliaria && landingInmobiliaria.backgroundColor ? landingInmobiliaria.backgroundColor : defaultBackgroundColor;
    const textColor = landingInmobiliaria && landingInmobiliaria.letterColor ? landingInmobiliaria.letterColor : defaultTextColor;
    const buttonColor = landingInmobiliaria && landingInmobiliaria.buttonColor ? landingInmobiliaria.buttonColor : defaultButtonColor;

    return (
      <section style={{ background: backgroundColor }} className="landing-container">
        { this.feedback() }
        <Row justify="center" className="mb-2rem">
          <Col>
            { requestGetLandingInmobiliaria !== "LOADING" && requestGetInmobiliariaById !== "LOADING" && (
              <div>
                { inmobiliariaData && inmobiliariaData.logo && inmobiliariaData.logo.downloadLink ? (
                  <Image
                    width={200}
                    src={inmobiliariaData.logo.downloadLink}
                    alt={inmobiliariaData && inmobiliariaData.nombre ? inmobiliariaData.nombre : "Logo inmobiliaria"}
                  />
                ) : (
                  <Image
                    width={200}
                    height={200}
                    alt="Logo no encontrado"
                    src="error"
                    fallback="data:image/png;base64,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"
                  />
                )}
              </div>
            ) }
          </Col>
        </Row>
        <Row justify="center" className="my-2rem">
          <Col xs={22} sm={16} md={14} lg={12} xl={8}>
            <div className="estilotitulo" style={{ color: textColor }}>
              Vende tu propiedad usada con nosotros
            </div>
          </Col>
        </Row>
        <Row justify="center" className="my-2rem">
          <Col xs={22} sm={16} md={14} lg={12} xl={8} >
            <div className="subtitulopb2" style={{ color: textColor }}>
              Nos encargamos de gestionar la venta o compra de tu propiedad sin
              ningún costo para ti.
            </div>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={22} sm={16} md={14} lg={12} xl={8} >
            <Container fluid className="landing-form-container">              
              <Form
                layout="vertical"
                ref={this.formRef}
                name="control-ref"
                onFinish={this.onSubmit}
                initialValues={{
                  nombre: "",
                  apellido: "",
                  telefono: "",
                  email: "",
                }}                
              >
                <Row justify="center">
                  <Col span={24}>
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
                      <Input
                        size="default"
                        className="antd-form-input-size-fix input-no-border"
                        placeholder="Nombre"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="center">
                  <Col span={24}>
                    <Form.Item
                      name="apellido"
                      label="Apellido"
                      rules={[
                        {
                          required: true,
                          message: "El apellido de contacto es requerido",
                        },
                      ]}
                    >
                      <Input
                        size="default"
                        placeholder="Apellido"
                        className="antd-form-input-size-fix input-no-border"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="center">
                  <Col span={24}>
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
                      <Input
                        size="default"
                        placeholder="Teléfono"
                        className="antd-form-input-size-fix input-no-border"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="center">
                  <Col span={24}>
                    <Form.Item
                      name="email"
                      label="Correo electrónico"
                      rules={[
                        {
                          required: true,
                          message: "El correo electrónico es requerido",
                        },
                        {
                          message: "El correo electrónico ingresado no es válido",
                          pattern: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
                        }
                      ]}
                    >
                      <Input
                        size="default"
                        placeholder="Correo electrónico"
                        className="antd-form-input-size-fix input-no-border"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="text-center">
                  <Col flex="auto">
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        className="center text-center landing-submit"
                        style={{
                          color: textColor,
                          backgroundColor: buttonColor,
                        }}
                      >
                        Enviar
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Col>
        </Row>
        
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    requestGetLandingInmobiliaria: state.app.requestGetLandingInmobiliaria,
    landingInmobiliaria: state.app.landingInmobiliaria,
    inmobiliariaData: state.app.inmobiliariaData,
    requestReferirVendedor: state.app.requestReferirVendedor,
    errorMessage: state.app.errorMessage,
    requestGetInmobiliariaById: state.app.requestGetInmobiliariaById
  };
};

const mapDispatchToProps = (dispatch) => ({
  getLandingInmobiliariaByPathname: (pathname) => dispatch(getLandingInmobiliariaByPathname(pathname)),
  postReferirVendedor: (data) => dispatch(postReferirVendedor(data)),
  fetchGetInmobiliaria: (id) => dispatch(fetchGetInmobiliaria(id)),
  dispatch: (action) => {
    dispatch(action);
  },
});

LandingInmo = connect(mapStateToProps, mapDispatchToProps)(LandingInmo);

export default LandingInmo;
