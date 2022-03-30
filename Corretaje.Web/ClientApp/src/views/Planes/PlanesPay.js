import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGetInitPayment, setDataTrx } from "../../action";
import utilsFunc from "../../utils/utilsFunc";
import api from "../../api";

import { Container, Row, Table, Col, Card } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
// import Webpay from "./Webpay";
import { LoadingModal } from "../../components/Loading";

export class IndexPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicios: [],
      url: null,
      token: null,
    };
  }

  async componentDidMount() {
    const { plan, userId, user } = this.props;
    let url = null,
      token = null;

    const webpayData = {
      planNombre: plan.nombrePlan,
      idPlanServicios: Object.keys(plan.extras),
      idUser: userId,
      nombreUser: user.email,
    };

    try {
      const res = await api.apiGetPayment(webpayData);
      token = res.data.token;
      url = res.data.url;
    } catch (error) {
      console.error("error: ", error);
    } finally {
      this.setState({ url, token });
      const { setDataTrx } = this.props;
      setDataTrx();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { url, token } = this.state;

    if (this.form && url && token) {
      this.form.submit();
    }
  }

  render() {
    let precioTotalReal = 0;
    const { plan, data, serviciosAdicionales } = this.props;
    const { url, token } = this.state;

    let services = [];
   
    if (serviciosAdicionales && serviciosAdicionales.data) {
      serviciosAdicionales.data.forEach(function(num, i) {
        if (plan.extras[num.id] !== undefined) {
          services.push(num);
        }
      });
    }

    if (data && data.data) {
      precioTotalReal = data.data.precioTotal;
    }

    const preciototal = utilsFunc.formatNumeros(precioTotalReal);
    
    return (
        
      <Container>
        <Row>
          <Col md="12" className="pabox">
            <Card className="iframe shadow">
              {/* {<Webpay data={webpayData} loading={loading} />} */}
              <LoadingModal />
              <form
                action={url}
                ref={input => {
                  this.form = input;
                }}
              >
                <input type="hidden" name="token_ws" value={token} />
              </form>
            </Card>
          </Col>
          <section className="section-space">
            <Col md="12">
              <Row>
                <Col md="6">
                  <Card className="resumen-compra shadow">
                    <Card.Body>
                      <Row>
                        <Col md="12">
                          <Card.Title>Servicios adicionales</Card.Title>
                        </Col>
                        <Col md="12">
                          <Table responsive>
                            <tbody>
                              {services.map(card => {
                                return (
                                  <tr key={card.id}>
                                    <td>{card.nombre}</td>
                                    <td className="text-right">
                                      {card.precio} UF
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md="6">
                  <Card className="resumen-compra shadow">
                    <Card.Body>
                      <Row>
                        <Col md="12">
                          <Card.Title>Orden de compra</Card.Title>
                        </Col>
                        <Col md="12">
                          <Table responsive>
                            <tbody>
                              <tr>
                                <td>Adicionales</td>
                                <td className="text-right">{plan.total} UF </td>
                              </tr>
                              <tr>
                                <td>Total IVA</td>
                                <td className="text-right">{preciototal}</td>
                              </tr>

                              <tr>
                                <td>
                                  <span className="h5">Total Pagar</span>
                                </td>
                                <td className="text-right">
                                  <span className="h5 text-success">
                                    {preciototal}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                        <Col md="12">
                          <Alert variant="warning">
                            Se cobrará una vez que vendas o arriendas la
                            propiedad, no antes.
                          </Alert>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </section>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  data: state.app.data,
  ...state.app,
  ...state.auth,
});

const mapDispatchToProps = dispatch => ({
  initPayment: data => dispatch(fetchGetInitPayment(data)),
  setDataTrx: () => dispatch(setDataTrx("")),
});

IndexPayment = connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexPayment);

export default IndexPayment;
