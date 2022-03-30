import React from "react";
import {
  CardGroup,
  Row,
  Col,
  Card,
  Container,
  Button,
  Spinner,
} from "react-bootstrap";
import AccountSidebar from "../../components/AccountSidebar";
import { connect } from "react-redux";
import {
  getServiciosAdicionalesByPlanId,
  fetchGetUF,
  postContratarServiciosAdicionales,
} from "../../action";
import ReactSVG from "react-svg";
import icon from "../../utils/images";
import IconCard from "../../components/IconCard";
import moment from "moment";
import CustomErrorMessage from "../../components/CustomErrorMessage";
import utilsFunc from "../../utils/utilsFunc";
import api from "../../api";
import swal from "sweetalert";
import { LoadingModal } from "../../components/Loading";

class PlanContratadoPerfil extends React.Component {
  constructor(props) {
    super(props);
    const {
      planContratado,
      fechaContratacion,
      serviciosAdicionalesContratados,
    } = this.props.location.state;
    this.state = {
      planContratado,
      serviciosAdicionalesContratados,
      fechaContratacion,
      selectedCards: {},
      total: 0,
      selectedCardsCount: 0,
      token: null,
      url: null,
    };
    this.selectCard = this.selectCard.bind(this);
    const { getUf, getServiciosAdicionalesByPlanId } = this.props;
    getServiciosAdicionalesByPlanId(planContratado.id);
    getUf();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.state !== this.props.location.state) {
      this.setState(this.props.location.state);
      this.props.getServiciosAdicionalesByPlanId(
        this.props.location.state.planContratado.id
      );
    }
    const { url, token } = this.state;

    if (this.form && url && token) {
      this.form.submit();
    }
  }

  selectCard(id, value) {
    let { selectedCards, total } = this.state;

    if (selectedCards[id] !== undefined) {
      delete selectedCards[id];
      total = total - value;
    } else {
      selectedCards[id] = value;
      total = total + value;
    }

    if (selectedCards && Object.keys(selectedCards).length > 0) {
      this.setState({ msj: "CONTINUAR" });
    } else {
      this.setState({ msj: "CONTINUAR SIN ADICIONALES" });
    }

    this.setState({
      selectedCardsCount: Object.keys(selectedCards).length,
      total,
      selectedCards,
    });
  }

  updateTotal = (value) => {
    this.setState({
      total: value,
    });
  };

  updateAditionalServices = (selectedCards) => {
    this.setState({
      selectedCards,
    });
  };

  setRedirectWebpay = async () => {
    this.setState(
      { loading: true, show: false, loadingWebpay: true },
      async () => {
        const { planContratado, selectedCards } = this.state;
        const { userId, user } = this.props;

        let url = null,
          token = null;

        const webpayData = {
          planNombre: planContratado.nombre,
          idPlanServicios: Object.keys(selectedCards),
          idUser: userId,
          nombreUser: user.mail,
        };

        try {
          const res = await api.apiGetPayment(webpayData);
          if (res.estado === 1) {
            this.registrarNuevosServiciosContratados();
            token = res.data.token;
            url = res.data.url;
          } else if (res.estado === 0) {
            swal({
              title: "¡UPS! Hay un error",
              text: "Intentalo nuevamente o contacte con el administrador",
              icon: "error",
              dangerMode: false,
            });
          } else if (res.estado === 2) {
            swal({
              title: "¡UPS!",
              text: res.mensaje,
              icon: "warning",
              dangerMode: false,
            });
          }
        } catch (error) {
          console.error("error: ", error);
        } finally {
          this.setState({ url, token, loading: false, show: false });
        }
      }
    );
  };

  registrarNuevosServiciosContratados = () => {
    const { selectedCards } = this.state;
    const { contratarServiciosAdicionales } = this.props;
    let serviciosAdicionales = Object.keys(selectedCards);
    const { id } = this.props.match.params;
    contratarServiciosAdicionales(id, serviciosAdicionales);
  };

  feedback = () => {
    const { estado, loading } = this.props;

    if (loading || this.state.loadingWebpay) {
      return <LoadingModal porcentaje={0} finish={() => void 0} />;
    }
    if (estado === 1 && !loading) {
      console.log("EXITO");
    }
    return null;
  };

  render() {
    const {
      serviciosAdicionales,
      requestStateGetServiciosAdicionalesByPlan,
      uf,
    } = this.props;
    const {
      selectedCards,
      selectedCardsCount,
      total,
      planContratado,
      serviciosAdicionalesContratados,
      fechaContratacion,
      url,
      token,
    } = this.state;

    let serviciosContratadosIds = [];
    if (
      serviciosAdicionalesContratados !== undefined &&
      Array.isArray(serviciosAdicionalesContratados)
    ) {
      serviciosAdicionalesContratados.forEach((s) => {
        serviciosContratadosIds.push(s.id);
      });
    }

    let ufiva = 0;
    if (total > 0 && uf) {
      ufiva = total * parseFloat(uf.replace(".", "").replace(",", "."));
      ufiva = Math.ceil(ufiva * 1.19);
    }

    return (
      <div className="fondo-perfil">
        {this.feedback()}
        <AccountSidebar />
        <div className="hideWEB2">
          <div className="tituloperfilsinmargen">Plan contratado</div>
          <Card>
            <Card.Body className="card-carct-perfil-status2">
              <Card.Title>
                <span className="font-weight-bold">PLAN</span>
              </Card.Title>
              <Card.Text>
                <p className="theclasic">{planContratado.nombre}</p>
                <div className="fechaplan">
                  Fecha de contratación del plan:{" "}
                  {moment(fechaContratacion).format("DD-MM-YYYY")}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body className="card-carct-perfil-status">
              <Card.Title>
                <span className="font-weight-bold">
                  CONTACTAR ASESORA PROPINS
                </span>
                <div className="letranormal-negra-perfil">Álvaro Devéscovi</div>
                <div className="numerotele">(+56) 9 7854 2618</div>
              </Card.Title>
            </Card.Body>
          </Card>

          <div className="tituloperfilsinmargen2">
            Añade adicionales para potenciar la venta de tu propiedad
          </div>

          <div className="corrercolperfil">
            {requestStateGetServiciosAdicionalesByPlan === "LOADING" && (
              <div className="text-center">
                <Spinner animation="border" />
              </div>
            )}

            {(requestStateGetServiciosAdicionalesByPlan === "IDLE" ||
              requestStateGetServiciosAdicionalesByPlan === "ERROR") &&
              serviciosAdicionales === undefined && (
                <div className="text-center">
                  <CustomErrorMessage message="Ha habido un error cargando la información de los servicios adicionales, por favor inténtalo más tarde." />
                </div>
              )}
            {(requestStateGetServiciosAdicionalesByPlan === "IDLE" ||
              requestStateGetServiciosAdicionalesByPlan === "SUCCESS") &&
              serviciosAdicionales !== undefined &&
              Array.isArray(serviciosAdicionales) && (
                <Container className="pa0">
                  <div id="cards">
                    <div className="center">
                      {serviciosAdicionales.map((card) => {
                        const { id, precio, nombre, subtitulo } = card;
                        let ico = undefined;
                        const upperText = (
                          <span
                            className={
                              serviciosContratadosIds.includes(id) &&
                              "secondary"
                            }
                          >
                            UF <b>{precio}</b>
                          </span>
                        );

                        if (nombre === "Redes Sociales")
                          ico = <ReactSVG src={icon.rrss} />;
                        else if (nombre === "Tour Virtual 3D")
                          ico = <ReactSVG src={icon.tourvirtualserv} />;
                        else if (nombre === "Planos")
                          ico = <ReactSVG src={icon.planos} />;
                        else if (nombre === "Destacados")
                          ico = <ReactSVG src={icon.destacados} />;
                        else if (nombre === "Cartel se Vende")
                          ico = <ReactSVG src={icon.cartel} />;

                        return (
                          <div key={id} className="center">
                            <Card key={id} className="aditional card-servicios">
                              <IconCard
                                key={id}
                                selected={
                                  selectedCards[id] === undefined ? false : true
                                }
                                upperText={upperText}
                                icon={ico}
                                title={nombre}
                                subtitle={subtitulo}
                                subtitleClass={"small-font"}
                                iconCardBallClass={
                                  serviciosContratadosIds.includes(id) &&
                                  "iconCard-ball-secondary"
                                }
                              />
                              <Card.Footer>
                                {serviciosContratadosIds.includes(id) && (
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    className="w-100"
                                  >
                                    Contratado
                                  </Button>
                                )}
                                {!serviciosContratadosIds.includes(id) && (
                                  <Button
                                    variant="primary"
                                    onClick={() => this.selectCard(id, precio)}
                                    size="sm"
                                    className="w-100"
                                  >
                                    {selectedCards[id] === undefined
                                      ? "Agregar"
                                      : "Cancelar"}
                                  </Button>
                                )}
                              </Card.Footer>
                            </Card>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Container>
              )}
          </div>
          <div className="adiselectmover">
            Adicionales seleccionados: {selectedCardsCount}
          </div>
          <div className="adiselectmover">Total adicionales:UF {total} </div>
          <div className="adiselectmover">
            {utilsFunc.formatNumeros(ufiva)} CLP
          </div>
          <div className="botoncaca">
            <Button variant="primary" className="hihi">
              Contratar adicionales
            </Button>
          </div>
        </div>
        <div className="hideMOBILE">
          <Row>
            <Col md="3"></Col>
            <Col md="7">
              <h2 className="font-weight-bold mt-4">Plan contratado </h2>
              <CardGroup>
                <Card>
                  <Card.Body className="card-perfil-plan-peque">
                    <Card.Title>
                      <span className="font-weight-bold">PLAN</span>
                    </Card.Title>
                    <Card.Text>
                      <p className="fondo-valorplan">{planContratado.nombre}</p>
                      <div className="letrapeque">
                        Fecha de contratación del plan:{" "}
                        {moment(fechaContratacion).format("DD-MM-YYYY")}
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body className="card-perfil-plan-peque">
                    <Card.Title>
                      <span className="font-weight-bold">
                        CONTACTAR ASESOR PROPINS
                      </span>
                    </Card.Title>
                    <Card.Text>
                      <p className="letranormal-negra-perfil">Álvaro Devéscovi</p>
                      <div className="letrapeque">(+56) 9 7854 2618</div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </CardGroup>
            </Col>
          </Row>
          {planContratado.nombre !== "FAST" ? (
            <div className="">
              <div className="sub-titulo-perfil-2">
                Añade adicionales para potenciar la venta de tu propiedad
              </div>
              <div className="corrercolperfil">
                {requestStateGetServiciosAdicionalesByPlan === "LOADING" && (
                  <div className="text-center">
                    <Spinner animation="border" />
                  </div>
                )}

                {(requestStateGetServiciosAdicionalesByPlan === "IDLE" ||
                  requestStateGetServiciosAdicionalesByPlan === "ERROR") &&
                  serviciosAdicionales === undefined && (
                    <div className="text-center">
                      <CustomErrorMessage message="Ha habido un error cargando la información de los servicios adicionales, por favor inténtalo más tarde" />
                    </div>
                  )}
                {(requestStateGetServiciosAdicionalesByPlan === "IDLE" ||
                  requestStateGetServiciosAdicionalesByPlan === "SUCCESS") &&
                  serviciosAdicionales !== undefined &&
                  Array.isArray(serviciosAdicionales) && (
                    <Container className="pa0">
                      <div
                        id="cards"
                        className="center centrar-cajas-servicios"
                      >
                        <Row className="">
                          <Col md="1"></Col>
                          {serviciosAdicionales.map((card) => {
                            const { id, precio, nombre, subtitulo } =
                              card;
                            let ico = undefined;
                            const upperText = (
                              <span
                                className={
                                  serviciosContratadosIds.includes(id) &&
                                  "secondary"
                                }
                              >
                                UF <b>{precio}</b>
                              </span>
                            );

                            if (nombre === "Redes Sociales")
                              ico = <ReactSVG src={icon.rrss} />;
                            else if (nombre === "Tour Virtual 3D")
                              ico = <ReactSVG src={icon.tourvirtualserv} />;
                            else if (nombre === "Planos")
                              ico = <ReactSVG src={icon.planos} />;
                            else if (nombre === "Destacados")
                              ico = <ReactSVG src={icon.destacados} />;
                            else if (nombre === "Cartel se Vende")
                              ico = <ReactSVG src={icon.cartel} />;

                            return (
                              <Col className="div-row">
                                <Card
                                  key={id}
                                  className="aditional card-servicios"
                                >
                                  <IconCard
                                    key={id}
                                    selected={
                                      selectedCards[id] === undefined
                                        ? false
                                        : true
                                    }
                                    upperText={upperText}
                                    icon={ico}
                                    title={nombre}
                                    subtitle={subtitulo}
                                    subtitleClass={"small-font"}
                                    iconCardBallClass={
                                      serviciosContratadosIds.includes(id) &&
                                      "iconCard-ball-secondary"
                                    }
                                  />
                                  <Card.Footer>
                                    {serviciosContratadosIds.includes(id) && (
                                      <Button
                                        variant="secondary"
                                        size="sm"
                                        className="w-100"
                                      >
                                        Contratado
                                      </Button>
                                    )}
                                    {!serviciosContratadosIds.includes(id) && (
                                      <Button
                                        variant="primary"
                                        onClick={() =>
                                          this.selectCard(id, precio)
                                        }
                                        size="sm"
                                        className="w-100"
                                      >
                                        Incluir al plan
                                      </Button>
                                    )}
                                  </Card.Footer>
                                </Card>
                              </Col>
                            );
                          })}
                        </Row>
                      </div>
                    </Container>
                  )}
              </div>
              <Row>
                <Col md="1"></Col>
                <Col md="7">
                  <div className="mover-total">
                    Adicionales seleccionados: {selectedCardsCount}
                  </div>
                </Col>
                <Col className="mover-total-2">
                  <div className="">
                    Total adicionales: {utilsFunc.formatNumeros(ufiva)} CLP
                  </div>

                  <div>
                    <Button
                      variant="primary"
                      onClick={() => this.setRedirectWebpay()}
                    >
                      Contratar adicionales
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          ) : null}
        </div>
        <form
          action={url}
          ref={(input) => {
            this.form = input;
          }}
        >
          <input type="hidden" name="token_ws" value={token} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  serviciosAdicionales: state.app.serviciosAdicionales,
  requestStateGetServiciosAdicionalesByPlan:
    state.app.requestStateGetServiciosAdicionalesByPlan,
  uf: state.app.uf,
  ...state.app,
  ...state.auth,
  userData: state.app.userData,
  loading: state.app.loading,
  estado: state.app.estado,
});

const mapDispatchToProps = (dispatch) => ({
  getServiciosAdicionalesByPlanId: (idPlan) =>
    dispatch(getServiciosAdicionalesByPlanId(idPlan)),
  getUf: () => dispatch(fetchGetUF()),
  contratarServiciosAdicionales: (idPropiedad, serviciosAdicionales) =>
    dispatch(
      postContratarServiciosAdicionales(idPropiedad, serviciosAdicionales)
    ),
});

PlanContratadoPerfil = connect(mapStateToProps, mapDispatchToProps)(PlanContratadoPerfil);

export default PlanContratadoPerfil;
