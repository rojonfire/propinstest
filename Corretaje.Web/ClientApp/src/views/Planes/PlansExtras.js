import React from "react";
import { connect } from "react-redux";
import ReactSVG from "react-svg";
import api from "../../api";
import IconCard from "../../components/IconCard";
import icon from "../../utils/images";
import {
  getServiciosAdicionalesByPlanId,
  setDatosPropiedad,
} from "../../action";
import {
  Container,
  Modal,
  Col,
  Row,
  Card,
  Button,
  Table,
} from "react-bootstrap";
import swal from "sweetalert";
import { fetchGetUF, contratarPlan } from "../../action";
import utilsFunc from "../../utils/utilsFunc";
import { LoadingModal } from "../../components/Loading-nuevo";

class PlansAditionals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      total: 0,
      selectedCards: {},
      msj: "CONTINUAR SIN ADICIONALES",
      token: null,
      url: null,
      show: false,
      show2: false,
      loadingWebpay: false,
      tipo: 1, // tipo 0 sin adicionales / tipo 1 con adicionales
      currentStep: 6,
      selectedCardsCount: 0,
      msg: "Agregar",
    };

    this.selectCard = this.selectCard.bind(this);
    this.setRedirectWebpay = this.setRedirectWebpay.bind(this);
    this.props.getServiciosAdicionalesByPlanId(this.props.idPlan);
    const { updateTotal } = this.props;
    updateTotal(0);
  }

  componentDidMount = () => {
    window.scrollTo(0, 200);
    const { getUf } = this.props;
    getUf();
  };

  componentDidUpdate(prevProps, prevState) {
    const { url, token } = this.state;

    if (this.form && url && token) {
      this.form.submit();
    }
  }

  mapperDatosPropiedad = (values) => {
    if (values) {
      let obj = {
        direccion: {
          calle: {
            numero: values.numero,
            nombre: values.direccion,
          },
          numeroDepartamento: values.nroDepto,
          comunaNombre: values.comuna,
          regionNombre: values.region,
        },
      };
      return obj;
    }
    return null;
  };

  selectCard(id, value) {
    const { updateTotal, updateAditionalServices } = this.props;
    let { selectedCards, total } = this.state;

    // si el id seleccionado es igual a el de una tarjeta cambiar un boton especifico de letra
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
    });

    this.setState({ selectedCards, total }, () => {
      updateTotal(total);
      updateAditionalServices(selectedCards);
    });
  }

  redirectToMethod = (total) => {
    if (total > 0) {
      this.setRedirectWebpay();
    } else {
      this.completarContratacion();
    }
  };

  setRedirectWebpayAddAddins = async () => {
    const { plan, idOrdenCompra } = this.props;
    let url = null,
      token = null;
    this.setState({ loading: true, show: false }, async () => {
      try {
        const res = await api.apiAddServicioAdicional(
          idOrdenCompra,
          Object.keys(plan.extras)
        );
        if (res.estado === 1) {
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
      } catch (e) {
      } finally {
        this.setState({ url, token, loading: false, show: false });
      }
    });
  };

  setRedirectWebpay = async () => {
    this.manejarmodal();
    this.setState(
      { loading: true, show: false, loadingWebpay: true },
      async () => {
        const { plan, userId, user, ubicacionData } = this.props;

        let url = null,
          token = null;

        const webpayData = {
          planNombre: plan.nombrePlan,
          idPlanServicios: Object.keys(plan.extras),
          idUser: userId,
          nombreUser: user.mail,
          direccion: {
            calle: {
              numero: parseInt(ubicacionData.Numero),
              nombre: ubicacionData.Direccion,
            },
            numeroDepartamento: ubicacionData.Numero_depto,
            comunaNombre: ubicacionData.Comuna,
            //regionNombre: propiedad.region,
          },
          tipoPropiedad: parseInt(
            ubicacionData.Tipo_Propiedad === "Casa" ? 0 : 1
          ),
        };

        try {
          const res = await api.apiGetPayment(webpayData);
          if (res.estado === 1) {
            this.completarContratacion();
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

  completarContratacion = async () => {
    //this.manejarmodal();
    const {
      idPlan,
      ubicacionData,
      caracteristicasData,
      adicionalesData,
      precioVentaData,
    } = this.props;

    let dataContrato = {
      fechaContratacion: new Date(),
      tipoProyecto: ubicacionData.Tipo_Propiedad === "Casa" ? 0 : 1,
      direccion: ubicacionData.Direccion,
      numero: ubicacionData.Numero,
      numeroDepartamento: ubicacionData.Numero_depto
        ? ubicacionData.Numero_depto
        : 0,
      comuna: ubicacionData.Comuna,
      barrio: ubicacionData.Barrio,
      idPlan: idPlan,
      valor: precioVentaData.valorPropiedad,
      tipoMoneda: precioVentaData.tipoMoneda,
      fechaVisitaFotografoString: precioVentaData.photographerVisitDate,
      horaVisitaFotografo: precioVentaData.photographerVisitTime,
      horarioVisitas:
        precioVentaData.schedule != null &&
        precioVentaData.schedule !== undefined
          ? Array.from(precioVentaData.schedule)
          : null,
      idFotografo: precioVentaData.photographerId,
      serviciosAdicionales: Object.keys(this.state.selectedCards),
      caracteristicasPropiedad: {
        anioConstruccion: caracteristicasData.ano_constru,
        orientacion: caracteristicasData.orientacion,
        metrosUtiles: caracteristicasData.metros_utiles,
        metrosTotales: caracteristicasData.metros_totales,
        numeroDormitorios: caracteristicasData.numero_dorm,
        numeroBanios: caracteristicasData.numero_bano,
        dormitorioServicio:
          caracteristicasData.dorm_servicio === "Si" ? true : false,
        banioServicio:
          caracteristicasData.bano_servicio === "Si" ? true : false,
        bodega: caracteristicasData.Bodega === "Si" ? true : false,
        estacionamiento: caracteristicasData.estacionamiento,
        gastosComunes: caracteristicasData.gastos_comunes,
        contribuciones: caracteristicasData.contribuciones,
      },
      caracteristicasComunidad: {
        accesoControlado: adicionalesData.caracteristicas_comunidad.includes(
          "accesoControlado"
        )
          ? true
          : false,
        areasVerdes: adicionalesData.caracteristicas_comunidad.includes(
          "areasVerdes"
        )
          ? true
          : false,
        salaDeCine: adicionalesData.caracteristicas_comunidad.includes(
          "salaDeCine"
        )
          ? true
          : false,
        salaDeJuegos: adicionalesData.caracteristicas_comunidad.includes(
          "salaDeJuegos"
        )
          ? true
          : false,
        bicicletero: adicionalesData.caracteristicas_comunidad.includes(
          "bicicletero"
        )
          ? true
          : false,
        ascensor: adicionalesData.caracteristicas_comunidad.includes("ascensor")
          ? true
          : false,
        sauna: adicionalesData.caracteristicas_comunidad.includes("sauna")
          ? true
          : false,
        juegosInfantiles: adicionalesData.caracteristicas_comunidad.includes(
          "juegosInfantiles"
        )
          ? true
          : false,
        portonElectrico: adicionalesData.caracteristicas_comunidad.includes(
          "portonElectrico"
        )
          ? true
          : false,
        citofono: adicionalesData.caracteristicas_comunidad.includes("citofono")
          ? true
          : false,
        quincho: adicionalesData.caracteristicas_comunidad.includes("quincho")
          ? true
          : false,
        piscina: adicionalesData.caracteristicas_comunidad.includes("piscina")
          ? true
          : false,
        salaDeEventos: adicionalesData.caracteristicas_comunidad.includes(
          "salaDeEventos"
        )
          ? true
          : false,
        estacionamientoVisitas:
          adicionalesData.caracteristicas_comunidad.includes(
            "estacionamientoVisitas"
          )
            ? true
            : false,
        camaraSeguridad: adicionalesData.caracteristicas_comunidad.includes(
          "camaraSeguridad"
        )
          ? true
          : false,
      },
      caracteristicasAdicionales: {
        tipoCalefaccion: adicionalesData.calefaccion,
        escritorio: adicionalesData.caracteristicas_prop.includes("escritorio")
          ? true
          : false,
        alarma: adicionalesData.caracteristicas_prop.includes("alarma")
          ? true
          : false,
        logia: adicionalesData.caracteristicas_prop.includes("logia")
          ? true
          : false,
        salaDeEstar: adicionalesData.caracteristicas_prop.includes(
          "salaDeEstar"
        )
          ? true
          : false,
        cocinaAmoblada: adicionalesData.caracteristicas_prop.includes(
          "cocinaAmoblada"
        )
          ? true
          : false,
        portonAutomatico: adicionalesData.caracteristicas_prop.includes(
          "portonAutomatico"
        )
          ? true
          : false,
      },
    };

    this.props.contratarPlan(dataContrato);
  };

  manejarmodal = async () => {
    this.setState({ show2: !this.state.show2 });
  };

  userFeedBack = () => {
    const { estado, loading, history } = this.props;

    if (loading || this.state.loadingWebpay) {
      return <LoadingModal />;
    }
    if (estado === 1 && !loading) {
      history.push("/PlanContratado");
    }
    return null;
  };

  render() {
    const { uf, serviciosAdicionales } = this.props;
    const { selectedCardsCount, total, loading, selectedCards, token, url } =
      this.state;

    let cantidadServicios = 0;
    if (serviciosAdicionales && Array.isArray(serviciosAdicionales)) {
      cantidadServicios = serviciosAdicionales.length;
    }

    let ufiva = 0;
    if (total > 0 && uf) {
      ufiva = total * parseFloat(uf.replace(".", "").replace(",", "."));
      ufiva = Math.ceil(ufiva * 1.19);
    }

    return (
      <Container className="plansAditionals">
        <Modal show={this.state.show2} onHide={() => this.manejarmodal()}>
          <Modal.Header closelabel="" closeButton>
            <Row className="center text-center">
              <Col>
                <div className="modal-misreferidos">¡Importante!</div>
              </Col>
            </Row>
          </Modal.Header>
          <Modal.Body>
            <Row>
              La informacion de tu propiedad es muy importante para nosotros,
              por seguridad podria demorar unos minutos en cargar
            </Row>
          </Modal.Body>
        </Modal>
        {this.userFeedBack()}
        <div className="title-section text-center">
          <h4 className="titulo-planes-formulario3">
            ¿Quieres contratar servicios adicionales ?
          </h4>
          <span className="sub-titulo-horario-fotografo">
            Los servicios adicionales se pagan al momento de contratar
          </span>
        </div>
        <Container className="pa0">
          <Col md="12">
            <div id="cards">
              <Row>
                {serviciosAdicionales &&
                  Array.isArray(serviciosAdicionales) &&
                  serviciosAdicionales.map((card) => {
                    const { id, precio, imagen, nombre, subtitulo } = card;
                    let ico = undefined;
                    const upperText = (
                      <span>
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
                      <Col key={id} md="2" className="">
                        <Card
                          key={id}
                          className="card-servicios mover-izq-serv aditional shadow"
                        >
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
                          />
                          <Card.Footer className="center">
                            <div className="center">
                              <Button
                                variant="success"
                                className="center paralele"
                                key={id}
                                onClick={() => this.selectCard(id, precio)}
                              >
                                {selectedCards[id] === undefined
                                  ? "Agregar"
                                  : "Cancelar"}
                              </Button>
                            </div>
                          </Card.Footer>
                        </Card>
                      </Col>
                    );
                  })}
              </Row>
            </div>
          </Col>
          <Row>
            <Col md={{ span: 6, offset: 6 }}>
              <div className="mover-izq-serv cont-tabla">
                <Table responsive>
                  <tbody>
                    <tr>
                      <td className="pa0">Total de compra de adicionales:</td>
                      <td className="text-right pa0 h5">UF {total} + IVA</td>
                      <td className="text-right pa0 h5">
                        CLP {utilsFunc.formatNumeros(ufiva)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <div className="cont-btn">
                  {selectedCardsCount > 0 ? (
                    <Button
                      id="btnContinuar"
                      onClick={() => this.redirectToMethod(total)}
                      variant="primary"
                    >
                      {loading || token ? "CARGANDO..." : "CONTINUAR"}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => this.redirectToMethod(total)}
                      variant="primary"
                    >
                      Continuar sin adicionales
                    </Button>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <section className="section-space">
          <Container></Container>
        </section>
        <form
          action={url}
          ref={(input) => {
            this.form = input;
          }}
        >
          <input type="hidden" name="token_ws" value={token} />
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.app.loading,
  planContratado: state.app.planContratado,
  serviciosAdicionales: state.app.serviciosAdicionales,
  estado: state.app.estado,
  data: state.app.data,
  uf: state.app.uf,
  ...state.app,
  ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  getUf: () => dispatch(fetchGetUF()),
  setDatosPropiedad: (datosProps) => dispatch(setDatosPropiedad(datosProps)),
  contratarPlan: (planContratado) => dispatch(contratarPlan(planContratado)),
  getServiciosAdicionalesByPlanId: (idPlan) =>
    dispatch(getServiciosAdicionalesByPlanId(idPlan)),
  dispatch: (action) => {
    dispatch(action);
  },
});

PlansAditionals = connect(mapStateToProps, mapDispatchToProps)(PlansAditionals);

export default PlansAditionals;
