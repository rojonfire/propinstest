import React from "react";
import {
  getAllBrokers,
  getPropiedadesPaginadas,
  fetchGetAllUsuarios,
  fetchGetAllClientes,
  getSuscripciones
} from "../../action";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import "moment/locale/es";
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Tooltip from '@material-ui/core/Tooltip';
import "moment/locale/es";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TablePagination from "@material-ui/core/TablePagination";
import moment from "moment";
import utilsFunc from '../../utils/utilsFunctions'

class TablaVentasPropiedad extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      details: false,
      rowsPerPage: 5,
      page: 0,
    };
    const { getPropiedadesPaginadas, fetchGetAllUsuarios, getClientes, getSuscripciones, getAllBrokers } = this.props;
    fetchGetAllUsuarios();
    getPropiedadesPaginadas(5, "", 0, 10);
    getClientes();
    getSuscripciones(0, 999);
    getAllBrokers();
  }

  handleChangePage = (event, newPage) => {
    const { rowsPerPage } = this.state;
    this.setState({
      page: newPage,
    });
    const { getPropiedadesPaginadas } = this.props;
    getPropiedadesPaginadas("5", "", newPage + 1, rowsPerPage);
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });

    const { getPropiedadesPaginadas } = this.props;
    getPropiedadesPaginadas("5", "", 1, parseInt(event.target.value, 10));
  };

  toggleDetails = () => {
    this.setState({
      details: !this.state.details
    });
  }

  getNombreCliente = (id) => {
    let nombre = "";
    const { itemsClientes } = this.props;
    if (itemsClientes != null && itemsClientes.length > 0) {
      let cliente = itemsClientes.filter(c => c.id === id).pop();
      if (cliente != null) {
        nombre = `${cliente.nombres} ${cliente.apellidos}`;
      }
    }
    return nombre;
  }

  getNombreUsuarioQueRefirioACliente = (id) => {
    let nombre = "";
    const { itemsClientes, itemsUsuarios } = this.props;
    if (itemsUsuarios != null && itemsUsuarios.length > 0 && itemsClientes != null && itemsClientes.length > 0) {
      let cliente = itemsClientes.filter(c => c.id === id).pop();
      if (cliente != null) {
        let user = itemsUsuarios.filter(u => u.email === cliente.mail).pop();
        if (user != null) {
          let userQueRefirio = itemsUsuarios.filter(u => u.id === user.referidoPor).pop();
          if (userQueRefirio != null) {
            nombre = `${userQueRefirio.nombres} ${userQueRefirio.apellidos}`;
          }
        }
      }
    }
    return nombre;
  }

  getDatosBancariosUsuarioQueRefirioACliente = (id) => {
    let datosBancarios = null;
    const { itemsClientes, itemsUsuarios } = this.props;
    if (itemsUsuarios != null && itemsUsuarios.length > 0 && itemsClientes != null && itemsClientes.length > 0) {
      let cliente = itemsClientes.filter(c => c.id === id).pop();
      if (cliente != null) {
        let user = itemsUsuarios.filter(u => u.email === cliente.mail).pop();
        if (user != null) {
          let userQueRefirio = itemsUsuarios.filter(u => u.id === user.referidoPor).pop();
          if (userQueRefirio != null) {
            datosBancarios = userQueRefirio.datosBancarios;
          }
        }
      }
    }
    return datosBancarios;
  }

  getDatosBancariosUsuarioQueRefirioAComprador = (id) => {
    let datosBancarios = null;
    const { suscripciones, itemsUsuarios } = this.props;
    if (itemsUsuarios != null && itemsUsuarios.length > 0 && suscripciones != null && suscripciones.results != null && suscripciones.results.length > 0) {
      let suscriptor = suscripciones.results.filter(s => s.id === id).pop();
      if (suscriptor != null) {
        let user = itemsUsuarios.filter(u => u.id === suscriptor.idUsuario).pop();
        if (user != null) {
          datosBancarios = user.datosBancarios;
        }
      }
    }

    return datosBancarios;
  }

  getNombreUsuario = (id) => {
    let nombre = "";
    const { itemsUsuarios } = this.props;
    if (itemsUsuarios != null && itemsUsuarios.length > 0) {
      let usuario = itemsUsuarios.filter(u => u.id === id).pop();
      if (usuario != null) {
        nombre = `${usuario.nombres} ${usuario.apellidos}`;
      }
    }
    return nombre;
  }

  getTipoUsuario = (id) => {
    let tipoUsuario = "";
    const { itemsUsuarios } = this.props;
    if (itemsUsuarios != null && itemsUsuarios.length > 0) {
      let usuario = itemsUsuarios.filter(u => u.id === id).pop();
      const { getTipoCuenta } = utilsFunc;
      if (usuario != null) {
        let tipoCuenta = getTipoCuenta(usuario.tipoCuenta);
        if (tipoCuenta != null) {
          tipoUsuario = tipoCuenta[0];
        }
      } 
    }
    
    return tipoUsuario;
  }

  getNombreSuscriptor = (id) => {
    let nombre = "";
    const { suscripciones } = this.props;
    if (suscripciones != null && suscripciones.results != null && suscripciones.results.length > 0) {
      let suscriptor = suscripciones.results.filter(s => s.id === id).pop();
      if (suscriptor != null) {
        nombre = suscriptor.nombreUsuario;
      }
    }
    return nombre;
  }

  getNombrePersonaQueRefirioASuscriptor = (id) => {
    let nombre = "";
    const { suscripciones, itemsUsuarios } = this.props;
    if (itemsUsuarios != null && itemsUsuarios.length > 0 && suscripciones != null && suscripciones.results != null && suscripciones.results.length > 0) {
      let suscriptor = suscripciones.results.filter(s => s.id === id).pop();
      if (suscriptor != null) {
        let user = itemsUsuarios.filter(u => u.id === suscriptor.idUsuario).pop();
        if (user != null) {
          nombre = `${user.nombres} ${user.apellidos}`;
        }
      }
    }

    return nombre;
  }

  getDatosBancarios = (id) => {
    let datosBancarios = null;
    const { brokers, itemsUsuarios } = this.props;
    if (brokers != null && brokers.length > 0 && itemsUsuarios != null && itemsUsuarios.length > 0) {
      let usuario = itemsUsuarios.filter(u => u.id === id).pop();
      if (usuario != null) {
        datosBancarios = usuario.datosBancarios;
      }
    }
    return datosBancarios;
  }

  render() {
    const { propiedadesPaginadas, requestPropiedadesPaginadas } = this.props;
    const useStylesTable = makeStyles((theme) => ({
      root: {
        width: '100%',
        marginBottom: '2rem'
      },
      heading: {
        fontSize: theme.typography.pxToRem(35),
        flexBasis: '33.33%',
        flexShrink: 0,
        paddingRight: 20,
        backgroundColor: 'red'
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
    }));


    const classes = useStylesTable;

    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1
      },
      paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
      },
      image: {
        width: 128,
        height: 128,
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
    }));

    return (
      <div>
        <div style={{ width: '100%', marginBottom: '2rem' }}>
        { requestPropiedadesPaginadas == "LOADING" && (<div>Cargando...</div>)}
        { requestPropiedadesPaginadas != "LOADING" && propiedadesPaginadas && propiedadesPaginadas.results && propiedadesPaginadas.results.length > 0 && propiedadesPaginadas.results.map(p => {
          let datosBancariosBroker = this.getDatosBancarios(p.idBroker);

          let nombreUsuarioReferidorVendedor = this.getNombreUsuarioQueRefirioACliente(p.idCliente);
          let datosBancariosReferidorVendedor = this.getDatosBancariosUsuarioQueRefirioACliente(p.idCliente);

          let nombreUsuarioReferidorComprador = this.getNombrePersonaQueRefirioASuscriptor(p.idSuscripcionDelComprador);
          let datosBancariosReferidorComprador = this.getDatosBancariosUsuarioQueRefirioAComprador(p.idSuscripcionDelComprador);

          return (
            <ExpansionPanel className={"w-100"}>
            <ExpansionPanelSummary
              expandIcon={
                <Tooltip title="Ver detalles" aria-label="ver detalles">
                  <IconButton
                    color="primary"
                    aria-label="ver detalles"
                    component="span"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Tooltip>
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={"w-100"}
            >
              <Typography style={{ flexBasis: '20%', }} className={classes.heading}>
                { moment(p.fechaCambioEstadoAPropiedadEntregada).format("DD/MM/YYYY") }
              </Typography>
              <Typography className={classes.secondaryHeading}>
                Venta propiedad { p.nombreCalle } { p.numero }
              </Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails style={{ width: '100%'}}>
              <div style={{ width: '100%'}}>
                <Paper style={{ width: '100%', padding: '2rem'}}>
                  <Grid container xs={12}>
                    <Grid xs={12} container spacing={2}>
                      <Grid item xs={3} container spacing={2}>
                        <Typography gutterBottom variant="h6">
                          Informacion venta
                        </Typography>
                      </Grid>
                      <Grid item xs={6} container spacing={2}>
                        <Typography gutterBottom variant="h6">
                          Brokers y embajadores asociados a propiedad
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid xs={12} container rowSpacing={1}>
                      <Grid item xs={3} container  rowSpacing={1} direction="column">
                        <Typography variant="subtitle1">
                          { p.valorCompraPropiedad }
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          Precio Final
                        </Typography>
                        <Typography variant="subtitle1">
                          { this.getNombreCliente(p.idCliente) }
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                          Propietario
                        </Typography>
                        <Typography variant="subtitle1">
                          { this.getNombreSuscriptor(p.idSuscripcionDelComprador)}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                          Comprador propiedad (suscriptor)
                        </Typography>
                      </Grid>
                      <Grid item xs={9} container rowSpacing={1} justifyContent="center" alignItems="center" >
                        <Grid item xs={4} container  direction="column">
                          <Typography variant="subtitle1">
                            { this.getNombreUsuario(p.idBroker) }
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            Broker a cargo de la propiedad
                          </Typography>
                        </Grid>
                        <Grid item xs={4} container >
                          <Typography variant="caption" display="block" gutterBottom>
                            Comision del 10% de ? = $ ? CLP
                          </Typography>
                        </Grid>
                        <Grid item xs={4} container >
                          <Typography variant="caption" display="block" gutterBottom>
                            { datosBancariosBroker ? (`${datosBancariosBroker.tipoCuenta} ${datosBancariosBroker.banco} N° cuenta ${datosBancariosBroker.numeroCuenta}`) : 'Sin información' }
                          </Typography>
                        </Grid>

                        <Grid item xs={4} container  direction="column">
                          <Typography variant="subtitle1">
                            { nombreUsuarioReferidorVendedor ? nombreUsuarioReferidorVendedor : "Sin información" }
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            Broker/Embajador que refirio a vendedor
                          </Typography>
                        </Grid>
                        <Grid item xs={4} container >
                          <Typography variant="caption" display="block" gutterBottom>
                            { nombreUsuarioReferidorVendedor ? "Comision del 10% de ? = $ ? CLP" : "" } 
                          </Typography>
                        </Grid>
                        <Grid item xs={4} container >
                          <Typography variant="caption" display="block" gutterBottom>
                            { datosBancariosReferidorVendedor ? (`${datosBancariosReferidorVendedor.tipoCuenta} ${datosBancariosReferidorVendedor.banco} N° cuenta ${datosBancariosReferidorVendedor.numeroCuenta}`) : '' }
                          </Typography>
                        </Grid>

                        <Grid item xs={4} container  direction="column">
                          <Typography variant="subtitle1">
                            { nombreUsuarioReferidorComprador ? nombreUsuarioReferidorComprador : "Sin información" }
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            Broker/Embajador que refirio a comprador
                          </Typography>
                        </Grid>
                        <Grid item xs={4} container >
                          <Typography variant="caption" display="block" gutterBottom>
                            { nombreUsuarioReferidorComprador ? "Comision del 10% de ? = $  CLP" : "" } 
                          </Typography>
                        </Grid>
                        <Grid item xs={4} container >
                          <Typography variant="caption" display="block" gutterBottom>
                            { datosBancariosReferidorComprador ? (`${datosBancariosReferidorComprador.tipoCuenta} ${datosBancariosReferidorComprador.banco} N° cuenta ${datosBancariosReferidorComprador.numeroCuenta}`) : '' }
                          </Typography>
                        </Grid>

                      </Grid>

                    </Grid>
                  </Grid>
                </Paper>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          )
        })}
        </div>
        <div className="text-center align-center">
          <TablePagination
            count={propiedadesPaginadas && propiedadesPaginadas.results && propiedadesPaginadas.results.length}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            rowsPerPage={this.state.rowsPerPage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            SelectProps={{
              inputProps: { "aria-label": "Cantidad" },
              native: true,
            }}
            rowsPerPageOptions={[5, 10, 20, 50]}
            labelRowsPerPage={"Resultados por página"}
          />
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    visitasBrokerSuscriptor: state.app.visitasBrokerSuscriptor,
    propiedadesPaginadas: state.app.propiedadesPaginadas,
    usuariosFiltrados: state.app.usuariosFiltrados,
    brokers: state.app.brokers,
    propiedadesPaginadas: state.app.propiedadesPaginadas,
    requestPropiedadesPaginadas: state.app.requestPropiedadesPaginadas,
    itemsUsuarios: state.app.itemsUsuarios,
    itemsClientes: state.app.itemsClientes,
    suscripciones: state.app.suscripciones,
    requestSuscripciones: state.app.requestSuscripciones,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllBrokers: () => dispatch(getAllBrokers()),
  getPropiedadesPaginadas: (estado, idBroker, page, pageSize) =>
    dispatch(getPropiedadesPaginadas(estado, idBroker, page, pageSize)),
  fetchGetAllUsuarios: () => dispatch(fetchGetAllUsuarios()),
  getClientes: () => dispatch(fetchGetAllClientes()),
  getSuscripciones: (page, pageSize) =>
    dispatch(getSuscripciones(page, pageSize)),
});

TablaVentasPropiedad = connect(
  mapStateToProps,
  mapDispatchToProps
)(TablaVentasPropiedad);

export default TablaVentasPropiedad;