import React from "react";
import AccountSidebar from "../../components/AccountSidebar";
import { connect } from "react-redux";
import { postAddSuscripcion } from "../../action";
import FormularioSuscripcion from "../../components/FormularioSuscripcion";
import { Row, Col } from "antd";

class ReferirComprador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.state !== this.props.location.state) {
      this.setState(this.props.location.state);
    }
  }

  render() {
    return (
      <div className="fondo-perfil">
        <AccountSidebar />
        <Row justify="center">
          { /* smartphone, tablet chica, tablet grande/monitor chico, monitor normal/wide, monitor ultrawide */ }          
          <Col xs={14} sm={14} md={14} lg={11} xl={11}>
            <FormularioSuscripcion 
              title="Referir comprador"
              submitButtonText="Enviar"
            />
          </Col>
        </Row>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  requestPostAddSuscripcion: state.app.requestPostAddSuscripcion,
});

const mapDispatchToProps = (dispatch) => ({
  postAddSuscripcion: (data) => dispatch(postAddSuscripcion(data)),
});

ReferirComprador = connect(mapStateToProps, mapDispatchToProps)(ReferirComprador);

export default ReferirComprador;
