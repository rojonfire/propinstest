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
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import { setLandingInmobiliaria } from "../../action";
import { withStyles } from "@material-ui/core/styles";

class TablaLandingInmobiliarias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propiedades: this.props.listaLandingInmobiliarias,
      page: this.props.page,
      rowsPerPage: this.props.rowsPerPage,
      propiedadSeleccionada: {},
    };
  }

  getNombreInmobiliaria = (id) => {
    let nombre = "";
    const { itemInmobiliarias } = this.props;
    if (itemInmobiliarias != null && itemInmobiliarias.length > 0) {
      let inmobiliaria = itemInmobiliarias.filter(c => c.id === id).pop();
      if (inmobiliaria != null) {
        nombre = inmobiliaria.nombre;
      }
    }
    return nombre;
  }

  getLinkLanding = (pathname) => {
    return window.location.origin.includes("localhost") || window.location.origin.includes("dev.propins") 
      ? `https://dev.propins.cl/landing/${pathname}` 
      : `https://www.propins.cl/landing/${pathname}`;
  }

  render() {
    const { listaLandingInmobiliarias, setLandingInmobiliaria, requestGetAllLandingInmobiliarias } = this.props;

    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: "#fff",
        color: "#000",
      },
      body: {
        fontSize: 12,
      },
    }))(TableCell);

    return (
      <TableContainer component={Paper} className={"hola"}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={1} align="left">Inmobiliaria</StyledTableCell>
              <StyledTableCell colSpan={2} align="center">Color de texto</StyledTableCell>
              <StyledTableCell colSpan={2} align="center">Color de fondo</StyledTableCell>
              <StyledTableCell colSpan={2} align="center">Color de boton</StyledTableCell>
              <StyledTableCell colSpan={1} align="center">Link landing</StyledTableCell>
              <StyledTableCell colSpan={1} align="left">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requestGetAllLandingInmobiliarias === "LOADING" && (
              <TableRow>
                <TableCell colSpan={8}>
                  Cargando...
                </TableCell>
              </TableRow>
            )}
            {requestGetAllLandingInmobiliarias === "ERROR" && (
              <TableRow>
                <TableCell colSpan={8}>
                  Ha habido un error cargando las landing inmobiliarias. Intenta recargar la página.
                </TableCell>
              </TableRow>
            )}
            {requestGetAllLandingInmobiliarias !== "LOADING" && listaLandingInmobiliarias &&
              Array.isArray(listaLandingInmobiliarias) &&
              listaLandingInmobiliarias.length == 0 && (
                <TableRow>
                  <TableCell colSpan={8}>
                    No se han agregado landings inmobiliarias todavía. Comienza por añadir una haciendo clic en el botón Agregar Landing Inmobiliaria.
                  </TableCell>
                </TableRow>
            )}
            {requestGetAllLandingInmobiliarias !== "LOADING" && listaLandingInmobiliarias &&
              Array.isArray(listaLandingInmobiliarias) &&
              listaLandingInmobiliarias.length > 0 &&
              listaLandingInmobiliarias.map((row) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell align="left">{ this.getNombreInmobiliaria(row.idInmobiliaria) }</TableCell>
                    <TableCell align="right">
                      <div className="color-swatch" style={{backgroundColor: row.letterColor}}/>                      
                    </TableCell>
                    <TableCell align="left">
                      {row.letterColor}
                    </TableCell>
                    <TableCell align="right">
                      <div className="color-swatch" style={{backgroundColor: row.backgroundColor}}/>                      
                    </TableCell>
                    <TableCell align="left">{row.backgroundColor}</TableCell>
                    <TableCell align="right">
                      <div className="color-swatch" style={{backgroundColor: row.buttonColor}}/>                      
                    </TableCell>
                    <TableCell align="left">{row.buttonColor}</TableCell>
                    <TableCell align="left">
                      <Tooltip title="Ir al landing" aria-label="Ir al landing">
                        <a href={this.getLinkLanding(row.pathname)} target="_blank"
                        >
                          <IconButton
                            color="primary"
                            aria-label="Ir al landing"
                            component="span"
                          >
                            <OpenInNewIcon />
                          </IconButton>
                        </a>
                      </Tooltip>
                      {" "}
                      { this.getLinkLanding(row.pathname) }
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Editar" aria-label="editar">
                        <Link
                          to={{
                            pathname: `/landinginmobiliaria/${row.id}`,
                          }}
                        >
                          <IconButton
                            color="primary"
                            aria-label="Editar"
                            component="span"
                            onClick={() => setLandingInmobiliaria(row)}
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
    requestGetAllLandingInmobiliarias: state.app.requestGetAllLandingInmobiliarias,
    itemInmobiliarias: state.app.itemInmobiliarias,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setLandingInmobiliaria: (data) => dispatch(setLandingInmobiliaria(data)),
});

TablaLandingInmobiliarias = connect(
  mapStateToProps,
  mapDispatchToProps
)(TablaLandingInmobiliarias);

export default TablaLandingInmobiliarias;
