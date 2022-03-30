import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { fetchRecuperaPassword } from "../../action";
import icon from "../../utils/images";
import sweetalert from "sweetalert";
import { LoadingModal } from "../../components/Loading";
import { Row, Col, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

class Recuperar extends React.Component {
  componentDidUpdate() {
    const { recover, goToStep } = this.props;
    if (recover && recover.data && recover.data.estado === 1) {
      sweetalert({
        title: "Recuperación realizada con éxito",
        text:
          "Uno correo electrónico de recuperación ha sido enviado a su casilla electrónica.",
        icon: "success",
        dangerMode: false,
      });
      goToStep(2);
    } else if (recover && recover.estado === 0) {
      sweetalert({
        title: "Error!",
        text: recover.mensaje,
        icon: "error",
        dangerMode: true,
      });
    }
  }
  onSubmit = (values) => {
    const { dispatch } = this.props;
    dispatch(fetchRecuperaPassword(values));
  }

  render() {
    const { text, title, goToStep, loading } = this.props;
    return (
      <Container className="login-horizontal-padding">
        {loading && <LoadingModal />}
        <div className="cont-login">
          <div className="hideWEB hide-md hide-lg hide-xl display-block-xs display-block-sm">
            <Row justify="space-between">
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
              <Col span={9}>
                ¿Ya tienes cuenta?{" "}
                <span onClick={() => goToStep(2)} className="text-primary">
                  Inicia sesión
                </span>
              </Col>
            </Row>
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
                  usuarioEMail: ""
                }}
                onValuesChange={this.onValuesChange}
              >
                <Row justify="space-between">
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <Form.Item 
                      name="usuarioEMail" 
                      label="Email"
                      rules={[
                        {
                          required: true,
                          message: "Ingrese su email",
                        },
                      ]}
                    >
                      <Input size="default" className="antd-form-input-size-fix registro-input" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="center">
                  <Col>
                    <Button
                      htmlType="submit"
                      className="register-btn"
                    >
                      Recuperar contraseña
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

const validate = (formValues) => {
  let errors = {};

  if (formValues.usuarioEMail === "") {
    errors.usuarioEMail = "Por favor ingrese su correo electrónico";
  }
  if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.usuarioEMail) &&
    formValues.usuarioEMail !== ""
  ) {
    errors.usuarioEMail = "Correo electrónico no valido";
  }
  return errors;
};

const mapStateToProps = (state) => {
  const { app } = state;
  return { recover: app.recover, loading: app.loading };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

Recuperar = connect(mapStateToProps, mapDispatchToProps)(Recuperar);

export default Recuperar;
