import React, { Component } from "react";
import { Container, ListGroup, Col, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { cleanTrx, setUser } from "../../../action";
import icon from "../../../utils/images";
import utilsFunc from "../../../utils/utilsFunc";
import api from "../../../api";
import ReactGa from 'react-ga'



export const initGA = () => {
  console.log('GA init')
  ReactGa.initialize('UA-167957495-1')
  }

export const logPageView = () => {
  ReactGa.set({page: window.location.pathname})
  ReactGa.pageview(window.location.pathname)
}

export class IndexCompra extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      show: false,
      authorizationCode: "",
      commercecode: "",
      amount: "",
      buyOrder: ""
    };
  }

  componentDidMount = async () => {
    try {
      const {
        authorizationCode,
        commercecode,
        amount,
          buyOrder
        //Todos los comentarios realizados que involucran al usuario, se realizaron para que el flujo de webpay se muestre correctamente.
        //userId,
        //setUser,
        //idCliente
      } = this.props;

      let values = {
        codigoComercio: commercecode,
        codigoVerificacion: authorizationCode,
        ordenCompraId: buyOrder
      };
      await api.apiPostNotificacionOrdenCompra(values);

        
      /*if (!idCliente && userId) {
        const getUser = await api.apiGetUsuarioById(userId);
        const user = getUser.data;
        setUser(user);
        }
       

      const user = await api.apiGetUsuarioById(userId);
        setUser(user);*/
       

      if (
        authorizationCode !== "" &&
        commercecode !== "" &&
        amount !== "" &&
        buyOrder !== ""
      ) {
        this.setState(
          {
            authorizationCode,
            commercecode,
            amount,
            buyOrder,

            show: true
          },
          () => {
            const { cleanTrx } = this.props;
            cleanTrx();
          }
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ loading: false });
    }
  };

  // componentDidUpdate = async (prevState, nextProps) => {

  // }

  render() {
    const { loading, show } = this.state;
      const { history } = this.props;
      console.log(this.state);
    return (
      <Container fluid="true" className="pa0 paMobile bg-light ">
        <section className="section-space">
          <div className="flujo-planes">
            <div className="success-planes">
              <Col md="3" sm="8" xs="12" className="cont-center">
                {loading && <div>Cargando...</div>}

                {!loading && (
                  <React.Fragment>
                    {show ? (
                      <React.Fragment>
                        <img src={icon.success} alt="" />
                        <h4 className="h2">Transacción Finalizada</h4>
                        <br />
                        <div>
                          <ListGroup variant="flush">
                            <ListGroup.Item active>
                              Resumen de compra
                            </ListGroup.Item>
                            <ListGroup.Item className="text-left">
                              Código: {this.state.authorizationCode}
                            </ListGroup.Item>
                            <ListGroup.Item className="text-left">
                              Código comercio: {this.state.commercecode}
                            </ListGroup.Item>
                            <ListGroup.Item className="text-left">
                              Monto:{" "}
                              {utilsFunc.formatNumeros(this.state.amount)}
                            </ListGroup.Item>
                            <ListGroup.Item className="text-left">
                              Orden: {this.state.buyOrder}
                            </ListGroup.Item>
                          </ListGroup>
                          <button
                            className="back btn"
                            onClick={() => history.push("/profile")}
                          >
                            Volver
                          </button>
                        </div>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <img src={icon.tarjetasegura} alt="card" />
                        <h4 className="h2">Transacción Anulada</h4>
                        <br />
                        <Alert variant="warning">
                          No se ha realizado ningún cargo a su tarjeta, revise
                          que su tarjeta tenga los fondos necesarios.
                        </Alert>
                        <button
                          className="back btn"
                          onClick={() => history.push("/profile")}
                        >
                          Volver
                        </button>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )}
              </Col>
            </div>
          </div>
        </section>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
    ...state.pay
    //...state.app.user
});

const mapDispatchToProps = dispatch => ({
    cleanTrx: () => dispatch(cleanTrx())
    //setUser: user => dispatch(setUser(user))
});

IndexCompra = connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexCompra);

export default IndexCompra;
