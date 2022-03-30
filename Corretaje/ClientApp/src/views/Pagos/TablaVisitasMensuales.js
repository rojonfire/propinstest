import React from "react";
import {
  getAllBrokers
} from "../../action";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import "moment/locale/es";
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import "moment/locale/es";
import { Modal, ModalBody, ModalHeader } from "shards-react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class TablaVisitasMensuales extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      openModalDetalleVisitas: false,
      visitaSeleccionada: null,
    };
  }
  
  toggleModalDetalleVisitas = (visitaSeleccionada) => {
    this.setState({
      openModalDetalleVisitas: !this.state.openModalDetalleVisitas,
      visitaSeleccionada
    });
  }

  getNombreUsuario = (idBroker) => {
    const { usuariosFiltrados } = this.props;
    let nombre = "";
    if (usuariosFiltrados != null) {
      let broker = usuariosFiltrados.filter(u => u.id === idBroker).pop();
      if (broker != null) {
        nombre = `${broker.nombres} ${broker.apellidos}`;
      }
    }
    return nombre;
  }

  getDatosBancarios = (idBroker) => {
    const { brokers, usuariosFiltrados } = this.props;
    let datosBancarios = null;
    if (brokers !== null && usuariosFiltrados !== null) {
      let userBroker = usuariosFiltrados.filter(u => u.id === idBroker).pop();
      if (userBroker != null) {
        datosBancarios = userBroker.datosBancarios;
      }
    }

    return datosBancarios;
  }

  armarTabla = () => {
    const { visitasBrokerSuscriptor } = this.props;
    let visitasFormatted = [];
    if (visitasBrokerSuscriptor != null) {
      visitasBrokerSuscriptor.forEach(v => {
        if (!Object.keys(visitasFormatted).includes(v.idBroker)) {
          visitasFormatted[v.idBroker] = [{
            clienteId: v.clienteId,
            fecha: v.fecha,
            idSuscripcion: v.idSuscripcion,
            nombrePropietario: v.nombrePropietario,
            propiedadDireccion: v.propiedadDireccion,
            tipoPropiedad: v.tipoPropiedad,
            tramo: v.tramo
          }];
        } else {
          visitasFormatted[v.idBroker].push({
            clienteId: v.clienteId,
            fecha: v.fecha,
            idSuscripcion: v.idSuscripcion,
            nombrePropietario: v.nombrePropietario,
            propiedadDireccion: v.propiedadDireccion,
            tipoPropiedad: v.tipoPropiedad,
            tramo: v.tramo
          });
        }
      });
    }

    return visitasFormatted;
  }

  render() {
    const { requestVisitasBrokerSuscriptor } = this.props;
    const { openModalDetalleVisitas, visitaSeleccionada } = this.state;
    const StyledTableCell = withStyles(theme => ({
      head: {
        backgroundColor: "#fff",
        color: "#000",
      },
      body: {
        fontSize: 12
      }
    }))(TableCell);
    
    let visitas = this.armarTabla();

    return (
      <div>
        <TableContainer component={Paper} className={"hola"}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Broker</StyledTableCell>
                <StyledTableCell align="left">Visitas realizadas</StyledTableCell>
                <StyledTableCell align="left">Datos bancarios</StyledTableCell>
                <StyledTableCell align="left">Monto a transferir</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { (visitas == null || Object.keys(visitas).length < 1) && requestVisitasBrokerSuscriptor !== "LOADING" && (
                <TableCell align="left">No se han registrado visitas en el mes seleccionado</TableCell>
              ) }
              { visitas !== null && Object.keys(visitas).map((key, index) => {
                let datosBancarios = this.getDatosBancarios(key);
                let montoAPagar = visitas[key].length * 5000;
                return ( 
                  <TableRow key={index}>
                    <TableCell align="left">
                      { this.getNombreUsuario(key) }
                    </TableCell>
                    <TableCell align="left">
                      <Tooltip title="Haga clic para ver más detalles">
                        <Chip 
                          onClick={() => this.toggleModalDetalleVisitas(visitas[key])} 
                          icon={<RemoveRedEyeIcon />} 
                          label={`${visitas[key].length} visitas realizadas`} 
                          clickable 
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left">
                      { datosBancarios && (
                        <div>
                          <Typography variant="body1" gutterBottom>
                            { datosBancarios.tipoCuenta }  { datosBancarios.banco }
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            N° Cuenta { datosBancarios.numeroCuenta }
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Método de pago preferido: { datosBancarios.medioPago }
                          </Typography>
                        </div>
                      ) }
                    </TableCell>
                    <TableCell align="left" style={{ width: 160 }}>
                      ${montoAPagar}
                    </TableCell>
                  </TableRow>
                )}) 
              }
            </TableBody>
            <TableFooter>
              <TableRow>
              { /*this.props.tablePagination() */}
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <Modal fade={false} open={openModalDetalleVisitas} toggle={this.toggleModalDetalleVisitas}>
          <ModalHeader>Visitas realizadas</ModalHeader>
          <ModalBody className="p-0 big-modal-overflow">
            { visitaSeleccionada != null && visitaSeleccionada.length > 0 && visitaSeleccionada.map(v => {
              let fecha = v.fecha.split(" ")[0];
              return (
                <Card sx={{ minWidth: 275 }} className={"mb-2"} variant="outlined" >
                  <CardContent>
                    <List className="p-0">
                      
                      <ListItem className="p-0">
                        <ListItemText
                          primary="Fecha y hora de la visita"
                          secondary={`${fecha} ${v.tramo}`}
                        />
                      </ListItem>

                      <ListItem className="p-0">
                        <ListItemText
                          disableTypography={false}
                          primary="Dirección propiedad"
                          secondary={`${v.propiedadDireccion}`}
                        />
                      </ListItem>
                      <ListItem className="p-0">
                        <ListItemText
                          disableTypography={false}
                          primary="Nombre propietario"
                          secondary={`${v.nombrePropietario}`}
                        />
                      </ListItem>

                    </List>
                  </CardContent>
                </Card>
                )
              }
            )}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    visitasBrokerSuscriptor: state.app.visitasBrokerSuscriptor,
    propiedadesPaginadas: state.app.propiedadesPaginadas,
    usuariosFiltrados: state.app.usuariosFiltrados,
    brokers: state.app.brokers,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllBrokers: () => dispatch(getAllBrokers())
});

TablaVisitasMensuales = connect(
  mapStateToProps,
  mapDispatchToProps
)(TablaVisitasMensuales);

export default TablaVisitasMensuales;