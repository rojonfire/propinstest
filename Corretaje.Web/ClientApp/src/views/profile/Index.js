import React from "react";
import { connect } from "react-redux";
import {
  fetchOrdenesDeCompra,
  setDatosPropiedad,
  logout,
  getPropiedadesByClienteId,
} from "../../action";
import api from "../../api";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Jumbotron,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import swal from "sweetalert";

import IndexModalUser from "./ModalUpdate";
import Dropdown from "../../components/Dropdown";
import ReactGa from "react-ga";
import AccountSidebar from "../../components/AccountSidebar";

export const initGA = () => {
  console.log("GA init");
  ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
};

export class IndexProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      show: false,
      usuario: {},
      selectedPlanIndex: null,
    };
  }

  componentDidMount = async () => {
    const { getPropiedadesByClienteId } = this.props;
    getPropiedadesByClienteId();
    await this.fetchUser();
    initGA();
    logPageView();
    if (window.location.href.indexOf("?reloaded") === -1)
      window.location.href = window.location.href + "?reloaded=true";
  };

  verificaFotografo = async () => {
    const { history, user } = this.props;
    const fechas = await api.apiVerificaVisitaFotografos(user.userId);

    if (fechas.value && fechas.value.estado === 1)
      history.push("/reserva-fotografo");

    if (fechas.value && fechas.value.estado === 0) {
      swal({
        title: "Error",
        text: "Solo puedes hacer una reserva. Intenta re agrendar.",
        icon: "error",
        dangerMode: true,
      });
    }
  };

  onChangePropiedad = (opt) => {
    this.setState({ selectedPlanIndex: opt });
    let { ordenescompra, setDatosPropiedad } = this.props;

    ordenescompra = ordenescompra || [];
    let selectedPlan = ordenescompra[opt];
    setDatosPropiedad(selectedPlan);
  };

  fetchUser = async () => {
    const { user, logout, history } = this.props;

    try {
      const usuario = await api.apiGetUsuarioById(user.userId);

      const { getOrdenes, setDatosPropiedad } = this.props;

      if (usuario && usuario.data && usuario.data.ordenCompra) {
        getOrdenes(usuario.data.ordenCompra);

        let ordenescompra = usuario.data.ordenCompra || [];
        const plan = ordenescompra[0] || null;
        setDatosPropiedad(plan);
      }

      this.setState({
        usuario: usuario ? usuario.data : {},
      });
    } catch (error) {
      logout();
      history.push("/");
      console.log("error: ", error);
    }
  };

  //intentofor = () => {
  //  const { ordenescompra, propiedadesCliente } = this.props;
  //  if (ordenescompra.length > 0) {
  //   return <div> Tengo ordenescompra </div>;
  //  } else if (propiedadesCliente.length > 0) {
  ////     return// <div> Tengo propiedadescliente</div>;
  //  } else <div> No tengo </div>;
  //};

  setPropiedadesOptions = () => {
    let { ordenescompra } = this.props;
    ordenescompra = ordenescompra || [];

    return ordenescompra.map((oc, i) => {
      let {
        plan: { descripcion },
        direccion,
      } = oc;
      direccion =
        direccion && direccion.calle
          ? `${direccion.calle.nombre} ${direccion.calle.numero}`
          : ``;
      const label = `${descripcion} ${direccion}`;

      return {
        label,
        value: i,
      };
    });
  };

  render() {
    console.log(this.props.propiedadesCliente);
    console.log(this.props);
    let { history, ordenescompra } = this.props;
    const { usuario, selectedPlanIndex } = this.state;

    ordenescompra = ordenescompra || [];
    const plan = ordenescompra[0] || null;
    let selectedPlan = plan;
    if (
      ordenescompra &&
      ordenescompra.length > 1 &&
      selectedPlanIndex !== null
    ) {
      selectedPlan = ordenescompra[selectedPlanIndex];
    }

    return (
      <Container fluid="true" className="bg-light vh-70">
        <AccountSidebar />
        <IndexModalUser
          show={this.state.show}
          onhide={() => this.setState({ show: false })}
          user={usuario || {}}
          fetchUser={this.fetchUser}
        />

        <section className="section-space">
          <Container>
            <Row>
              <Col md={9}>
                <Jumbotron className="bg-info profile-jumbo">
                  <h1>
                    Hola,{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      {usuario.nombres &&
                        `${usuario.nombres} ${usuario.apellidos}`}
                    </span>
                    !
                  </h1>
                  <p>
                    Bienvenido a propins, la revolución al corretaje de
                    propiedades.
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.setState({ show: true })}
                  >
                    Actualizar mis datos
                  </button>
                </Jumbotron>
              </Col>
              <Col md={3}>
                {ordenescompra.length ? (
                  <Card className="profile-plan">
                    <Card.Body>
                      {ordenescompra && ordenescompra.length > 1 && (
                        <div>
                          <Dropdown
                            onChange={(opt) => this.onChangePropiedad(opt)}
                            options={this.setPropiedadesOptions()}
                            label={"Mis Propiedades"}
                          />
                          <hr />
                        </div>
                      )}

                      <Card.Title>
                        Plan Propins:{" "}
                        <strong className="text-success">
                          {selectedPlan && selectedPlan.plan.nombre}
                        </strong>
                      </Card.Title>
                      <Card.Text>
                        Costo plan {selectedPlan && selectedPlan.plan.precio} UF
                        <br />
                        <span>
                          Dirección:{" "}
                          {selectedPlan &&
                            selectedPlan.direccion &&
                            selectedPlan.direccion.calle.nombre}{" "}
                          {selectedPlan &&
                            selectedPlan.direccion &&
                            selectedPlan.direccion.calle.numero}
                        </span>
                        <br />
                        <br />
                        {selectedPlan && (
                          <Button
                            variant="outline-success"
                            onClick={() =>
                              history.push(
                                `/planes?ordenCompra=${selectedPlan.id}`
                              )
                            }
                          >
                            Agregar adicionales
                          </Button>
                        )}
                      </Card.Text>
                    </Card.Body>

                    {selectedPlan &&
                      selectedPlan.serviciosAdicionales.length > 0 &&
                      selectedPlan.estado === 0 && (
                        <ListGroup className="list-group-flush adicionales-profile">
                          <Card.Title>Adicionales:</Card.Title>
                          {selectedPlan.serviciosAdicionales.map((item, i) => {
                            const page =
                              item.estado === 0
                                ? "/list-tasaciones"
                                : "/tasaciones";
                            const nameButon =
                              item.estado === 0
                                ? "Mis Tasaciones"
                                : "Realizar tasación";

                            return (
                              <ListGroupItem key={i}>
                                {item.nombre}

                                {item.nombre.includes("Tasa") ? (
                                  <Button
                                    variant="outline-success"
                                    onClick={() => history.push(page)}
                                  >
                                    {nameButon}
                                  </Button>
                                ) : (
                                  ""
                                )}
                              </ListGroupItem>
                            );
                          })}
                        </ListGroup>
                      )}
                  </Card>
                ) : (
                  <div>
                    <Card>
                      <p>
                        Actualmente no cuentas con un Plan Propins, haz click en
                        contratar tu plan
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => history.push("/planes")}
                      >
                        Contrata tu Plan
                      </button>{" "}
                    </Card>
                  </div>
                )}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <hr />
                <span className="h4">Mis Accesos Directos:</span>
              </Col>
              <Col md={3} className="pabox">
                <Card border="primary profile-card">
                  <Card.Body>
                    <Card.Title>Ofertas Recibidas</Card.Title>
                    <Card.Text>
                      Revisa tus ofertas recibidas de otros Propinslovers.
                    </Card.Text>
                    <Button
                      variant="outline-primary"
                      onClick={() => history.push("/contraoferta")}
                    >
                      Ofertas Recibidas
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              {ordenescompra.length > 0 && (
                <Col md={3} className="pabox">
                  <Card border="warning profile-card">
                    <Card.Body>
                      <Card.Title>Ofertas Realizadas</Card.Title>
                      <Card.Text>
                        Verifica tus ofertas realizadas hacia otros
                        Propinslovers.
                      </Card.Text>
                      <Button
                        variant="outline-warning"
                        onClick={() => history.push("/reofertar")}
                      >
                        Ofertas Realizadas
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              )}
              <Col md={3} className="pabox">
                <Card border="danger profile-card">
                  <Card.Body>
                    <Card.Title>Mis Visitas</Card.Title>
                    <Card.Text>Revisas todas tus visitas agregadas.</Card.Text>
                    <Button
                      variant="outline-danger"
                      onClick={() => history.push("/visitas")}
                    >
                      Mis Visitas
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              {ordenescompra.length > 0 && (
                <Col md={3} className="pabox">
                  <Card border="success profile-card">
                    <Card.Body>
                      <Card.Title>Agendar Fotógrafo</Card.Title>
                      <Card.Text>
                        Ya puedes agendar visita con uno de nuestros fotógrafos.
                      </Card.Text>
                      <Button
                        variant="outline-success"
                        onClick={this.verificaFotografo}
                      >
                        Agendar Fotógrafo
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
          </Container>
        </section>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.app,
  ...state.auth,
  propiedadesCliente: state.app.propiedadesCliente,
});

const mapDispatchToProps = (dispatch) => ({
  getOrdenes: (ordenes) => dispatch(fetchOrdenesDeCompra(ordenes)),
  setDatosPropiedad: (datosProps) => dispatch(setDatosPropiedad(datosProps)),
  getPropiedadesByClienteId: () => dispatch(getPropiedadesByClienteId()),
  logout: () => dispatch(logout()),
});

IndexProfile = connect(mapStateToProps, mapDispatchToProps)(IndexProfile);

export default IndexProfile;
//<section className="section-space">
//{propiedadesCliente
//? propiedadesCliente.map((item, i) => {
//  return (
//  <div key={i}>
//  Plan {item.planContratado.nombre}, Propiedad en{" "}
//{item.comuna}
//</div>
//);
//})
//: ""}
//</section>
