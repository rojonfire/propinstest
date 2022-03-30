import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import { setSuscripcion } from "../../action";
import { withStyles } from "@material-ui/core/styles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { LoadingModal } from "../../utils/Loading";

class TablaSuscripciones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propiedades: this.props.propiedades,
      page: this.props.page,
      rowsPerPage: this.props.rowsPerPage,
      propiedadSeleccionada: {},
      modalCambioEstado: false,
      nuevoEstado: "",
      modalContrato: false,
      modalAsignacionBroker: false,
      nuevoBroker: "",
      brokerPropiedadSeleccionada: null,
    };
  }

  getNombreUsuario = (idUsuario) => {
    const { itemsUsuarios } = this.props;
    let user = null;
    let nombreUsuario = "";
    if (itemsUsuarios != null && idUsuario != null) {
      user = itemsUsuarios.filter((u) => u.id == idUsuario).pop();
      if (user != null) {
        nombreUsuario = `${user.nombres} ${user.apellidos}`;
      }
    }
    return nombreUsuario;
  };

  render() {
    const { suscripcionesResultados, setSuscripcion } = this.props;
    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: "#fff",
        color: "#000",
      },
      body: {
        fontSize: 12,
      },
    }))(TableCell);

    const StyledWideTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: "#fff",
        color: "#000",
        width: 300,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);

    return (
      <TableContainer component={Paper} className={"hola"}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Posible Comprador</StyledTableCell>
              <StyledTableCell align="left">Ingresado por</StyledTableCell>
              <StyledTableCell align="left">Tipo propiedad</StyledTableCell>
              <StyledTableCell align="left">
                Comunas de preferencia
              </StyledTableCell>
              <StyledTableCell align="left">Rango valores</StyledTableCell>
              <StyledTableCell align="left">Rango dormitorios</StyledTableCell>
              <StyledTableCell align="left">Rango baños</StyledTableCell>
              <StyledTableCell align="left">Rango superficie</StyledTableCell>
              <StyledTableCell align="left">Estacionamientos</StyledTableCell>
              <StyledTableCell align="left">Puntaje</StyledTableCell>
              <StyledWideTableCell align="left">Acciones</StyledWideTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suscripcionesResultados &&
              Array.isArray(suscripcionesResultados) &&
              suscripcionesResultados.length > 0 &&
              suscripcionesResultados.map((row) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell align="left">{row.nombreUsuario}</TableCell>
                    <TableCell align="left">
                      {this.getNombreUsuario(row.idUsuario)}
                    </TableCell>
                    <TableCell align="left">{row.tipoPropiedad}</TableCell>
                    <TableCell align="left" style={{ width: 160 }}>
                      <List
                        dense={true}
                        sx={{
                          width: "100%",
                          maxWidth: 240,
                          bgcolor: "background.paper",
                        }}
                        className={"px-0"}
                      >
                        <ListItem key={1} disablePadding className={"px-0"}>
                          <ListItemAvatar className={"list-item-avatar-narrow"}>
                            <Avatar className={"small-icon"} alt={`Comuna uno`}>
                              1
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText id={1} primary={row.comunaUno} />
                        </ListItem>
                        <ListItem key={2} disablePadding className={"px-0"}>
                          <ListItemAvatar className={"list-item-avatar-narrow"}>
                            <Avatar className={"small-icon"} alt={`Comuna dos`}>
                              2
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText id={1} primary={row.comunaDos} />
                        </ListItem>
                        <ListItem key={3} disablePadding className={"px-0"}>
                          <ListItemAvatar className={"list-item-avatar-narrow"}>
                            <Avatar
                              className={"small-icon"}
                              alt={`Comuna tres`}
                            >
                              3
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText id={3} primary={row.comunaTres} />
                        </ListItem>
                      </List>
                    </TableCell>
                    <TableCell align="left">
                      {row.valorDesde} - {row.valorHasta}
                    </TableCell>
                    <TableCell align="left" style={{ width: 80 }}>
                      {row.cantidadDormitoriosDesde} -{" "}
                      {row.cantidadDormitoriosHasta}
                    </TableCell>
                    <TableCell align="left" style={{ width: 80 }}>
                      {row.cantidadBanosDesde} - {row.cantidadBanosHasta}
                    </TableCell>
                    <TableCell align="left" style={{ width: 160 }}>
                      <List
                        dense={true}
                        sx={{
                          width: "100%",
                          maxWidth: 240,
                          bgcolor: "background.paper",
                        }}
                        className={"px-0"}
                      >
                        <ListItem key={1} disablePadding className={"px-0"}>
                          <ListItemText
                            id={1}
                            primary={`${row.metrosUtilesDesde} - ${
                              row.metrosUtilesHasta
                            }`}
                            secondary={"Superficie útil"}
                          />
                        </ListItem>
                        <ListItem key={2} disablePadding className={"px-0"}>
                          <ListItemText
                            id={1}
                            primary={`${row.metrosTotalesDesde} - ${
                              row.metrosTotalesHasta
                            }`}
                            secondary={"Superficie total"}
                          />
                        </ListItem>
                      </List>
                    </TableCell>
                    <TableCell align="left">
                      {row.cantidadEstacionamientos}
                    </TableCell>
                    <TableCell align="left">{row.puntaje}</TableCell>

                    <TableCell align="left">
                      <Tooltip title="Editar" aria-label="editar">
                        <Link
                          to={{
                            pathname: `/updatesuscripcion/${row.id}`,
                          }}
                        >
                          <IconButton
                            color="primary"
                            aria-label="Editar"
                            component="span"
                            onClick={() => setSuscripcion(row)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
          <TableFooter>
            <TableRow>{this.props.tablePagination()}</TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    responseMessage: state.app.responseMessage,
    propiedadBroker: state.app.propiedadBroker,
    suscripcion: state.app.suscripcion,
    itemsUsuarios: state.app.itemsUsuarios,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setSuscripcion: (suscripcion) => dispatch(setSuscripcion(suscripcion)),
});

TablaSuscripciones = connect(
  mapStateToProps,
  mapDispatchToProps
)(TablaSuscripciones);

export default TablaSuscripciones;
