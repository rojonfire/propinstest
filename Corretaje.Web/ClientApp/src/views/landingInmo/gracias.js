import React from "react";
import { connect } from "react-redux";
import { Container, Card } from "react-bootstrap";
import FormularioSuscripcion from "../../components/FormularioSuscripcion";
import { Row, Col, Form, Input, Button, Select, Radio, Tooltip } from "antd";
import icon from "../../utils/images";

class graciaslanding extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <section
        className="completarseccionlargo"
        style={{ background: "#00132D" }}
      >
        {" "}
        <Row justify="center">
          <Col>
            <Card>
              {" "}
              <img className="" src={icon.logoilumina} alt="" />
            </Card>{" "}
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            {" "}
            <div className="estilotitulo2" style={{ color: "#FFFFFF" }}>
              Nos contactaremos contigo lo antes posible.
            </div>{" "}
          </Col>
        </Row>
      </section>
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

graciaslanding = connect(mapStateToProps, mapDispatchToProps)(graciaslanding);

export default graciaslanding;
