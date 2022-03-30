import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { login, cleanData, setLoading, setRegistered } from "../../action";
import icon from "../../utils/images";
import sweetalert from "sweetalert";
import { LoadingModal } from "../../components/Loading";
import { Row, Col, Form, Input, Button } from "antd";
import utilsFunc from "../../utils/utilsFunc";
import { Link } from "react-router-dom";

class IniciarSesion extends React.Component {
  constructor(props) {
    super(props);    

    const { dispatch, goToStep, registered } = this.props;

    //const isSigningUp = utilsFunc.getUrlParameter("register");
    if (!registered) {
      goToStep(1);
    }

    dispatch(setLoading(false));
  }

  goToSignUp = () => {
    const { goToStep, setRegistered } = this.props;
    setRegistered(false);
    goToStep(1);
  }

  onSubmit = (values) => {
    const { dispatch } = this.props;
    dispatch(login(values));
  };

  componentDidUpdate() {
    const { data, dispatch } = this.props;

    if (data && !data.isLoggedIn && Object.keys(data).length > 0) {
      sweetalert({
        title: "Error al iniciar sesión",
        text: data ? data.mensaje : "",
        icon: "warning",
        dangerMode: false,
      }).then(() => {
        dispatch(cleanData());
      });
    }
  }

  render() {
    const { text, title, goToStep, loading } = this.props;
    return (
      <Container fluid={true} className="login-horizontal-padding">
        {loading && <LoadingModal />}
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
                  email: "",
                  password: "",
                }}
                onValuesChange={this.onValuesChange}
              >
                <Row justify="space-between">
                  <Col span={24}>
                    <Form.Item 
                      name="email" 
                      label="Correo"
                      rules={[
                        {
                          required: true,
                          message: "El email es requerido",
                        }
                      ]}
                    >
                      <Input size="default" className="antd-form-input-size-fix registro-input" />
                    </Form.Item>
                  </Col>
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
                <Row justify="center">
                  <Col>
                    <Button
                      htmlType="submit"
                      className="register-btn"
                    >
                      Iniciar sesión
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row justify="center" className="mt-2">
            <Col>
              <span class="h5 text-primary subtitle-primary font-size-1rem">
                <a
                  onClick={() => goToStep(3)}
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </span>
            </Col>
          </Row>
          <Row justify="center" className="mt-2">
            <Col>
            Si no tienes cuenta,{" "}
              <span class="h5 text-primary subtitle-primary font-size-1rem">
                <a
                  onClick={() => this.goToSignUp()}
                >
                  regístrate aquí
                </a>
              </span>
            </Col>
          </Row>
        </div>
        
        
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, app } = state;
  return { ...auth, data: app.data, loading: app.loading, registered: app.registered };
};

const mapDispatchToProps = (dispatch) => ({
  setRegistered: (data) => dispatch(setRegistered(data)),
  dispatch: (action) => {
    dispatch(action);
  },
});

IniciarSesion = connect(mapStateToProps, mapDispatchToProps)(IniciarSesion);

export default IniciarSesion;
