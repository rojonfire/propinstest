import React from "react";
import { connect } from "react-redux";
import { withLastLocation } from "react-router-last-location";
import { LoadingModal } from "../../components/Loading";
import {
  setPlanDetails,
  fetchGetTodosLosPlanes,
  fetchGetServiciosAdicionales,
  setRegistered
} from "../../action";

import ProgressMenu from "../../components/ProgressMenu";
import PlansTable from "./PlansTable";
import PlansCaracteristicas from "./PlansCaracteristicas";
import PlansAdicionales from "./PlansAdicionales";
import PlansUbicacion from "./PlansUbicacion"; // los celestes claro son clases componentes
import PlansPrecioVenta from "./PlansPrecioVenta";
import PlansExtras from "./PlansExtras"; // los pasos si pueden ser clases
import PlansPay from "./PlanesPay";
import PlanFastContratado from "../gracias/PlanFastContratado";
import { Container, Row, Col } from "react-bootstrap";
import api from "../../api";
import swal from "sweetalert";
import utilsFunc from "../../utils/utilsFunc";
import ReactGa from "react-ga";

export const initGA = () => {
  ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
};

class Planes extends React.Component {
  constructor(props) {
    super(props);

    const { lastLocation } = props;
    const pathname = lastLocation ? lastLocation.pathname : "";

    let idOrdenCompra = utilsFunc.getUrlParameter("ordenCompra");
    if (idOrdenCompra && idOrdenCompra.includes("?")) {
      idOrdenCompra = idOrdenCompra.split("?")[0];
    }

    this.state = {
      step: (idOrdenCompra ? 2 : 1),
      total: 0,
      loading: false,
      idOrdenCompra,
      idPlan: undefined,
      ubicacionData: undefined,
      caracteristicasData: undefined,
      adicionalesData: undefined,
      precioVentaData: undefined,
      extrasData: undefined,
    };

    this.updatePlan = this.updatePlan.bind(this);
    this.updateStep = this.updateStep.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
    this.renderStep = this.renderStep.bind(this);
    this.setPrecioPlan = this.setPrecioPlan.bind(this);
    this.updateAditionalServices = this.updateAditionalServices.bind(this);
    this.setNombrePlan = this.setNombrePlan.bind(this);
    this.setFastPlan = this.setFastPlan.bind(this);
    const { setRegistered } = this.props;
    setRegistered(true);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { dispatch } = this.props;
    const { idOrdenCompra } = this.state;
    dispatch(fetchGetTodosLosPlanes());
    dispatch(fetchGetServiciosAdicionales());
    if (idOrdenCompra) {
      this.setState({ step: 2 });
    }
    initGA();
    logPageView();
  }

  updateStep({ step, goBack, cb }) {
    const { history, isLoggedIn } = this.props;
    let oldStep = this.state.step;
    const newStep = step ? step : goBack ? oldStep - 1 : oldStep + 1;
    cb && cb();

    if (oldStep === 1 && !isLoggedIn) {
      history.push("/signin");
    } else {
      this.setState({ step: newStep });
    }
  }

  continuarReservaFot = async (propiedad) => {
    try {
      this.setState({ loading: true });
      const { history, plan, userId, user } = this.props;
      let dato = {
        planNombre: plan.nombrePlan,
        idPlanServicios: plan.extras ? Object.keys(plan.extras) : [],
        idUser: userId,
        nombreUser: user.email,
        direccion: {
          calle: {
            numero: parseInt(propiedad.numero),
            nombre: propiedad.direccion,
          },
          numeroDepartamento: propiedad.nroDepto,
          comunaNombre: propiedad.comuna,
          regionNombre: propiedad.region,
        },
        tipoPropiedad: parseInt(propiedad.TipoPropiedad),
      };

      const data = await api.apiPostAgregarOrdenSinAddins(dato);
      if (data.estado === 1) {
        history.push("/reserva-fotografo");
      } else if (data.estado === 0) {
        swal({
          title: "¡UPS! Hay un error",
          text: "Intentalo nuevamente o contacte con el administrador",
          icon: "error",
          dangerMode: false,
        });
      } else if (data.estado === 2) {
        swal({
          title: "¡UPS!",
          text: data.mensaje,
          icon: "warning",
          dangerMode: false,
        });
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  setPrecioPlan(precioPlan) {
    const { dispatch } = this.props;
    dispatch(setPlanDetails({ precioPlan }));
  }

  setNombrePlan(nombrePlan) {
    const { dispatch } = this.props;
    dispatch(setPlanDetails({ nombrePlan }));
  }

  setFastPlan(fastPlan) {
    const { dispatch } = this.props;
    dispatch(setPlanDetails({ fastPlan }));
  }

  setIdPlan(idPlan) {
    const { dispatch } = this.props;
    dispatch(setPlanDetails({ idPlan }));
  }

  updatePlan(hired, precio, nombre, fast, idPlan) {
    const { dispatch } = this.props;
    dispatch(setPlanDetails({ hired }));
    this.setPrecioPlan(precio);
    this.setNombrePlan(nombre);
    this.setFastPlan(fast);
    this.setIdPlan(idPlan);
  }

  updateTotal(total) {
    const { dispatch } = this.props;
    dispatch(setPlanDetails({ total }));
  }

  updateAditionalServices(extras) {
    const { dispatch } = this.props;
    dispatch(setPlanDetails({ extras }));
  }

  handleData = (step, dataValues) => {
    switch (step) {
      case 1:
        this.setState({ idPlan: dataValues });
        return;
      case 2:
        this.setState({ ubicacionData: dataValues });
        return;
      case 3:
        this.setState({ caracteristicasData: dataValues });
        return;
      case 4:
        this.setState({ adicionalesData: dataValues });
        return;
      case 5:
        this.setState({ precioVentaData: dataValues });
        return;
      case 6:
        this.setState({ extrasData: dataValues });
        return;
      default:
        return;
    }
  };

  renderStep(planes, serviciosAdicionales, planesDesc) {
    const { step, idOrdenCompra } = this.state;
    let precio = 0,
      nombre = "",
      fast = false,
      idPlan = "";
    if (this.props.plan) {
      precio = this.props.plan.precioPlan;
      nombre = this.props.plan.nombrePlan;
      fast = this.props.plan.fastPlan;
      idPlan = this.props.plan.idPlan;
    }

    let steps;
    if (fast) {
      steps = [
        <PlansTable
          updateStep={this.updateStep}
          updatePlan={this.updatePlan}
          features={planes}
        />,
        <PlansUbicacion
          updateStep={this.updateStep}
          formData={this.handleData}
          history={this.props.history}
        />,
        <PlansCaracteristicas
          updateStep={this.updateStep}
          formData={this.handleData}
        />,
        <PlansAdicionales
          updateStep={this.updateStep}
          formData={this.handleData}
          fastPlan={true}
          idPlan={idPlan}
          ubicacionData={this.state.ubicacionData}
          caracteristicasData={this.state.caracteristicasData}
          adicionalesData={undefined}
          precioVentaData={undefined}
        />,
        <PlanFastContratado />,
      ];
    } else {
      steps = [
        <PlansTable
          updateStep={this.updateStep}
          updatePlan={this.updatePlan}
          features={planes}
        />,
        <PlansUbicacion
          updateStep={this.updateStep}
          formData={this.handleData}
          history={this.props.history}
        />,
        <PlansCaracteristicas
          updateStep={this.updateStep}
          formData={this.handleData}
        />,
        <PlansAdicionales
          updateStep={this.updateStep}
          formData={this.handleData}
          fastPlan={false}
        />,
        <PlansPrecioVenta
          updateStep={this.updateStep}
          formData={this.handleData}
        />,

        <PlansExtras
          idOrdenCompra={idOrdenCompra}
          updateStep={this.updateStep}
          updateTotal={this.updateTotal}
          updatePlan={this.updatePlan}
          aditionalServices={serviciosAdicionales}
          precioPlan={precio}
          nombrePlan={nombre}
          updateAditionalServices={this.updateAditionalServices}
          continuarReservaFot={this.continuarReservaFot}
          idPlan={idPlan}
          ubicacionData={this.state.ubicacionData}
          caracteristicasData={this.state.caracteristicasData}
          adicionalesData={this.state.adicionalesData}
          precioVentaData={this.state.precioVentaData}
          history={this.props.history}
        />,
        <PlansPay
          updateStep={this.updateStep}
          updatePlan={this.updatePlan}
          history={this.props.history}
        />,
      ];
    }

    return steps[step - 1];
  }

  render() {
    const { step, loading } = this.state;

    const { planes, serviciosAdicionales, plan, tipoPlanSeleccionado } = this.props;

    let esVenta = true;
    if (tipoPlanSeleccionado != "venta") {
      esVenta = false;
    }

    let planesFeatures = [];
    let classCyber = "";
    if (planes) {
      planesFeatures = planes.filter(p => p.esVenta == esVenta);
      let discounts = false;
      planesFeatures.forEach((e) => {
        if (e.descuento) {
          discounts = true;
          return;
        }
      });

      classCyber =
        discounts === true
          ? "pa0 paMobile bg-white section-space-planes "
          : "pa0 paMobile section-space-planes bg-white";
    }

    let serviceFeature = [];

    if (serviciosAdicionales && serviciosAdicionales.data) {
      serviceFeature = serviciosAdicionales.data;
    }

    let fast = false;

    if (plan) {
      fast = plan.fastPlan;
    }

    return (
      <div className={classCyber}>
        {loading && <LoadingModal porcentaje={0} finish={() => void 0} />}
        <div className="bg-white ">
          <Container className="pa0">
            {step !== 1 && ((fast && step !== 5) || (!fast && step !== 8)) ? (
              <section className="">
                <div id="progress">
                  <ProgressMenu step={step} data={this.props.plan} />
                </div>
              </section>
            ) : null}
          </Container>
        </div>

        <Row>
          <Col md="12" className="bg-thite section-space-p1ex ">
            <section>
              <div id="content" className="">
                {this.renderStep(planesFeatures, serviceFeature)}
              </div>
            </section>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, plan, app } = state;
  return { ...auth, ...plan, ...app };
};

const mapDispatchToProps = (dispatch) => ({
  setRegistered: (data) => dispatch(setRegistered(data)),
  dispatch: (action) => {
    dispatch(action);
  },
});

// const mapDispatchToProps = dispatch => ({
//   setPlanDetails: details => dispatch(setPlanDetails(details))
// });

Planes = connect(mapStateToProps, mapDispatchToProps)(Planes);
Planes = withLastLocation(Planes);

export default Planes;
