import React from "react";
import PageTitle from "../../components/common/PageTitle";
import {
  getVisitasFiltradas,
  getPropiedadesPaginadas,
  getUsuariosFiltrados,
  getAllBrokers
} from "../../action";
import { connect } from "react-redux";
import { Container, Row, Col, FormSelect } from "shards-react";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert2";
import "moment/locale/es";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import moment from "moment";
import "moment/locale/es";
import TablaVisitasMensuales from "./TablaVisitasMensuales";
import TablaVentasPropiedad from "./TablaVentasPropiedad";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class IndexPagos extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      rowsPerPage: 2,
      page: 0,
      currentTab: 0,
      openModalDetalleVisitas: false,
      visitaSeleccionada: null,
      periodo: moment().format("YYYY-MM-DD"),
      fechaInicial: moment().startOf('month').format("YYYY-MM-DD"),
      fechaFinal: moment().endOf('month').format("YYYY-MM-DD"),
    };
    const { getUsuariosFiltrados, getAllBrokers }= this.props;
    getUsuariosFiltrados(10);
    getAllBrokers();
  }

  componentDidMount() {
    const { getVisitasFiltradas } = this.props;
    const { fechaInicial, fechaFinal } = this.state;
    //fechaInicial, fechaFinal, idBroker, idSuscripcion, mostrarSoloSinConfirmar, mostrarSoloTramos, incluirVisitasPasadas, incluirVisitasFuturas
    getVisitasFiltradas(fechaInicial, fechaFinal, "", "", true, false, false, false);
  }

  getPeriodosOptions = () => {
    let optionsPeriodos = [];
    let periodos = [];
    periodos.push(moment());
    for (let i = 1; i < 12; i++) {
      periodos.push(moment().subtract(i, 'month'));
    }
    
    periodos.forEach((k) => {
      optionsPeriodos.push(
        <option key={k} value={k.format("YYYY-MM-DD")}>
          {k.format("MMMM YYYY")}
        </option>
      );
    });
    
    return optionsPeriodos;
  };

  handleChangePeriodo = (e) => {
    const { getVisitasFiltradas } = this.props;
    let fechaInicial = moment(e.target.value).startOf('month').format("YYYY-MM-DD");
    let fechaFinal = moment(e.target.value).endOf('month').format("YYYY-MM-DD");
    this.setState({
      fechaInicial,
      fechaFinal,
      periodo: moment(e.target.value).format("YYYY-MM-DD")
    });

    getVisitasFiltradas(fechaInicial, fechaFinal, "", "", true, false, false, false);
  }

  handleTabChange = (event, newValue) => {
    this.setState({
      currentTab: newValue
    });
  };

  feedback = () => {
    const { requestUsuarioFiltrados, requestVisitasBrokerSuscriptor } = this.props;
    
    if (requestUsuarioFiltrados === "LOADING" || requestVisitasBrokerSuscriptor === "LOADING") {
      swal.showLoading();
    } else {
      swal.close();
    }

    if (requestUsuarioFiltrados === "ERROR") {
      swal.fire("Error", "No se han podido cargar los brokers", "error");
    }

    if (requestVisitasBrokerSuscriptor === "ERROR") {
      swal.fire("Error", "No se han podido cargar las visitas", "error");
    }
  };

  render() {
    const { currentTab } = this.state;

    const classes = makeStyles((theme) => ({
      root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
      },
    }));

    let periodosOptions = this.getPeriodosOptions();

    return (
      <Container fluid className="main-content-container px-4">
        {this.feedback()}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Pagos"
            subtitle="Por ventas de propiedad y visitas mensuales"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col sm={12}>
            <div className={classes.root}>
              <AppBar position="static" color="default">
                <Tabs value={currentTab} onChange={this.handleTabChange} indicatorColor="primary" aria-label="simple tabs example">
                  <Tab label="Visitas mensuales" {...a11yProps(0)} />
                  <Tab label="Ventas propiedades" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel value={currentTab} index={0}>
                <Row>
                  <Col sm={4}>
                    <FormSelect value={this.state.periodo} onChange={(e) => this.handleChangePeriodo(e)}>
                      {periodosOptions}
                    </FormSelect>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <TablaVisitasMensuales />
                  </Col>
                </Row>
              </TabPanel>
              <TabPanel value={currentTab} index={1}>
                <TablaVentasPropiedad />
              </TabPanel>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    requestVisitasBrokerSuscriptor: state.app.requestVisitasBrokerSuscriptor,
    requestPropiedadesPaginadas: state.app.requestPropiedadesPaginadas,
    requestUsuarioFiltrados: state.app.requestUsuarioFiltrados,
    requestGetAllBrokers: state.app.requestGetAllBrokers
  };
};

const mapDispatchToProps = (dispatch) => ({
  getVisitasFiltradas: (fechaInicial, fechaFinal, idBroker, idSuscripcion, mostrarSoloSinConfirmar, mostrarSoloTramos, incluirVisitasPasadas, incluirVisitasFuturas) =>
    dispatch(getVisitasFiltradas(fechaInicial, fechaFinal, idBroker, idSuscripcion, mostrarSoloSinConfirmar, mostrarSoloTramos, incluirVisitasPasadas, incluirVisitasFuturas)),
  getPropiedadesPaginadas: (estado, idBroker, page, pageSize) =>
    dispatch(getPropiedadesPaginadas(estado, idBroker, page, pageSize)),
  getUsuariosFiltrados: (tipoCuenta) => dispatch(getUsuariosFiltrados(tipoCuenta)),
  getAllBrokers: () => dispatch(getAllBrokers())
});

IndexPagos = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPagos);

export default IndexPagos;