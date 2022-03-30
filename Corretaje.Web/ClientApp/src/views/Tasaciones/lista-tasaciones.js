import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  ListGroup,
  Row,
  Col,
  Jumbotron,
} from "react-bootstrap";
import api from "../../api";
import utils from "../../utils/utilsFunc";
import icon from "../../utils/images";

import { LoadingModal } from "../../components/Loading";

const { downloadPDFfromBase64 } = utils;

export class ListaTasaciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tasaciones: [],
      feedbackByTasacionId: {},
    };
  }

  componentDidMount = async () => {
    const { userId } = this.props;

    this.setState({ loading: true }, async () => {
      try {
        const { data: tasaciones } = await api.apiGetTasacionesByUserId(userId);

        this.setState({ tasaciones });
      } catch (error) {
        console.error("error: ", error);
      } finally {
        this.setState({ loading: false });
      }
    });
  };

  downloadTasacion = async tasacionId => {
    const { feedbackByTasacionId } = this.state;
    feedbackByTasacionId[tasacionId] = "Loading...";

    this.setState({ feedbackByTasacionId }, async () => {
      try {
        const { data: base64 } = await api.apiGetTasacionBase64(tasacionId);
        if (!base64) {
          feedbackByTasacionId[tasacionId] = "No se encontró archivo.";
        } else {
          downloadPDFfromBase64({ base64, filename: "Tasacion" });
          delete feedbackByTasacionId[tasacionId];
        }
      } catch (error) {
        console.error("error: ", error);
        feedbackByTasacionId[tasacionId] = "Error";
      } finally {
        this.setState({ feedbackByTasacionId });
      }
    });
  };

  renderTasaciones = () => {
    const { tasaciones, feedbackByTasacionId } = this.state;

    return tasaciones.map(tasacion => {
      const { glosa, id } = tasacion;
      return (
        <ListGroup.Item className="shadow" key={id}>
          <Col md="12">
            <Row>
              <Col md="10" sm="8">
                <div className="cont-data">
                  <div className="cont-text">
                    <h2 className="h6">{glosa}</h2>
                  </div>
                </div>
              </Col>

              <Col md="2">
                <div className="cont-data">
                  <div className="cont-text">
                    {!feedbackByTasacionId[id] && (
                      <Button
                        variant="primary"
                        onClick={() => this.downloadTasacion(id)}
                      >
                        <img src={icon.download} alt="" />
                        Descargar tasación
                      </Button>
                    )}

                    {feedbackByTasacionId[id] && (
                      <span>{feedbackByTasacionId[id]}</span>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </ListGroup.Item>
      );
    });
  };

  render() {
    const { history } = this.props;
    const { loading, tasaciones } = this.state;

    return (
      <Container fluid="true" className="bg-light pa0">
        <Container>
          <Row>
            <Col md="12" className="center-cont paMobile">
              <section className="section-space">
                <Jumbotron className="bg-info">
                  <h1>Hola, Propinslover</h1>
                  <p>
                    Si usted necesita tener una referencia estadística para
                    vender, comprar, arrendar o establecer los valores del
                    sector en el caso de optar por realizar una inversión
                    inmobiliaria, esta herramienta es la indicada para usted.
                  </p>
                  <p>
                    <Button
                      variant="primary"
                      onClick={() => history.push("/tasaciones")}
                    >
                      Realizar Tasación
                    </Button>
                  </p>
                </Jumbotron>
                <div className="title-section text-center">
                  <h4 className="h4">Lista de tasaciones</h4>
                </div>

                <ListGroup className="cont-ofertas">
                  <ListGroup.Item className="shadow header">
                    <Col md="12">
                      <Row>
                        <Col md="10" sm="8">
                          <div className="cont-text">
                            <span>Propiedad</span>
                          </div>
                        </Col>

                        <Col md="2">
                          <div className="cont-text">
                            <span>Acción</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </ListGroup.Item>
                  {this.renderTasaciones()}
                </ListGroup>

                {loading && <LoadingModal />}

                {!loading && tasaciones.length === 0 && (
                  <div className="sin-ofertas">
                    <div className="cont-text">
                      <img src={icon.error} alt="" />
                      <h6 className="h6">Actualmente no tienes tasaciones</h6>
                    </div>
                  </div>
                )}
              </section>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth,
});

ListaTasaciones = connect(mapStateToProps)(ListaTasaciones);

export default ListaTasaciones;
