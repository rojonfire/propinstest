import React, { Component } from "react";
import { Container, ListGroup, Col } from "react-bootstrap";
import icon from "../../../utils/images";
import utilfunc from "../../../utils/utilsFunc";
import ReactGa from 'react-ga'



export const initGA = () => {
  console.log('GA init')
  ReactGa.initialize('UA-167957495-1')
  }

export const logPageView = () => {
  ReactGa.set({page: window.location.pathname})
  ReactGa.pageview(window.location.pathname)
}

export class IndexFail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
        descripcion: "",
        show: true
    };
  }
  componentDidMount = () => {
    let code = utilfunc.getUrlParameter("codigo");
    let descripcion = decodeURI(utilfunc.getUrlParameter("Descripcion"));
    this.setState({
      code,
      descripcion,
    });
    initGA();
    logPageView();
  };

  render() {
    const { history } = this.props;
    return (
      <Container fluid="true" className="pa0 paMobile bg-light ">
        <section className="section-space">
          <div className="flujo-planes">
            <div className="success-planes">
              <Col md="3" sm="8" xs="12" className="cont-center">
                <img src={icon.error} alt="" />
                <h4 className="h2">Transacción Fallida</h4>
                <br />
                {this.state.show ? (
                  <div>
                    <ListGroup variant="flush">
                      <ListGroup.Item active>Resumen de compra</ListGroup.Item>
                      <ListGroup.Item className="text-left">
                        {this.state.code}
                      </ListGroup.Item>
                      <ListGroup.Item className="text-left">
                        {this.state.descripcion}
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                ) : (
                  ""
                )}
                <button
                  className="back btn"
                  onClick={() => history.push("/profile")}
                >
                  Volver
                </button>
              </Col>
            </div>
          </div>
        </section>
      </Container>
    );
  }
}

export default IndexFail;
