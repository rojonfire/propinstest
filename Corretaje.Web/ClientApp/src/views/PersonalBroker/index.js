import React from "react";
import { connect } from "react-redux";
import { Container, Card } from "react-bootstrap";
import FormularioSuscripcion from "../../components/FormularioSuscripcion";
import { Row, Col } from "antd";

class PersonalBroker extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div>
        {" "}
        <div className="titulopersonalbroker">Personal Broker</div>{" "}
        <div className="subtitulopb">
          Cuéntanos que tipo de propiedad estas buscando y por medio de nuestro
          algoritmo encontraremos la propiedad de tus sueños
        </div>
        <div className="subtitulopb2">
          *Solo te contactaremos si encontramos una propiedad. Sin Spam.
        </div>
        <Container fluid className="main-content-container px-4">
          <Row justify="center">
            <Col xs={24} sm={24} md={18} lg={16} xl={14}>
              <FormularioSuscripcion submitButtonText="Enviar" />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    requestPostAddSuscripcion: state.app.requestPostAddSuscripcion,
    suscripcion: state.app.suscripcion,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

PersonalBroker = connect(mapStateToProps, mapDispatchToProps)(PersonalBroker);

export default PersonalBroker;
