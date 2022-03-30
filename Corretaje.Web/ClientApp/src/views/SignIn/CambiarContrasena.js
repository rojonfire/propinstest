import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { restablecerPassword } from "../../action";
import icon from "../../utils/images";
import sweetalert from "sweetalert";
import { Row, Col, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

class CambiarContrasena extends React.Component {
  componentDidUpdate() {
    const { restablecer, goToStep } = this.props;
    if (restablecer && restablecer.estado === 1) {
      goToStep(1);
      sweetalert({
        title: "Tu contraseña ha sido modificada con exito",
        text: restablecer.mensaje,
        icon: "success",
        dangerMode: false,
      });
    } else if (restablecer && restablecer.estado === 0) {
      sweetalert({
        title: "Ups!",
        text: restablecer.mensajes,
        icon: "warning",
        dangerMode: true,
      });
    } else if (!restablecer) {
      sweetalert({
        title: "Ups!",
        text: "ha ocurrido un error inesperado",
        icon: "warning",
        dangerMode: true,
      });
    }
  }
  onSubmit = (values) => {
    const { dispatch, tokenPassword } = this.props;
    if (tokenPassword) {
      const data = {
        password: values.password,
        email: tokenPassword.usuarioEmail,
      };
      dispatch(restablecerPassword(data));
    }
  }

  render() {
    const { text, title } = this.props;
    return (
      <Container fluid={true} className="login-horizontal-padding">
        <div className="text-center cont-login">
          <div className="cont-info">
            <div className="hideWEB hide-md hide-lg hide-xl display-block-xs display-block-sm">
              <Row justify="start">
                <Col span={8}>
                  <Link
                    to={{
                      pathname: `/`
                    }}
                  >
                    <img
                      className="w-100"
                      src={icon.logoColorGris}
                      alt=""                      
                    />
                  </Link>
                </Col>
              </Row>              
            </div>
          </div>
          <Row justify="center">
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className="py-1rem line-height-3rem register-text">
                <span className="h4 text-primary title-primary text-transform-capitalize">{title}</span>
                <p className="description">{text}</p>
              </div>
          
              <Form
                layout="vertical"
                ref={this.formRef}
                name="control-ref"
                onFinish={this.onSubmit}
                initialValues={{
                  passwordConfirm: "",
                  password: "",
                }}
                onValuesChange={this.onValuesChange}
              >
                <Row>
                  <Col span={24}>
                    <Form.Item 
                      name="password" 
                      label="Contraseña"
                      rules={[
                        {
                          required: true,
                          message: "La contraseña es requerida",
                        }
                      ]}
                    >
                      <Input.Password size="default" className="antd-form-input-size-fix registro-input" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item 
                      name="passwordConfirm" 
                      label="Confimar contraseña"
                      rules={[
                        {
                          required: true,
                          message: "La contraseña es requerida",
                        }
                      ]}
                    >
                      <Input.Password size="default" className="antd-form-input-size-fix registro-input" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="center">
                  <Col>
                    <Button
                      htmlType="submit"
                      className="register-btn"
                    >
                      Cambiar contraseña
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { app } = state;
  return { restablecer: app.restablecer, tokenPassword: app.tokenPassword };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

CambiarContrasena = connect(
  mapStateToProps,
  mapDispatchToProps
)(CambiarContrasena);

export default CambiarContrasena;
