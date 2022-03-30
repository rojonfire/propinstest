/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import {
  fetchGetAllClientes,
  fetchAllRegiones,
  fetchClearAction,
  getAllProyectos,
  getUserProyectos
} from "../../../action";
import { ModalItem } from "../../../utils/modal";
import FichaProyecto from "./FichaProyecto";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

import { Link } from "react-router-dom";

import { Container, Row, Col, Button } from "shards-react";

import PageTitle from "../../../components/common/PageTitle";

const searchFor = (search) => {
  return (x) => {
    return (
      // x.Cliente.toLowerCase().includes(search.toLowerCase()) ||
      // x.Operacion.toLowerCase().includes(search.toLowerCase()) ||
      x.comuna.toLowerCase().includes(search.toLowerCase()) ||
      x.tipoProyecto.toLowerCase().includes(search.toLowerCase()) ||
      !search
    );
  };
};

function TablePaginationActions(props) {
  const classes = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    table: {
      minWidth: 500,
    },
    tableWrapper: {
      overflowX: "auto",
    },
  }));
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root} style={{ width: "100%" }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export class IndexListarProyectos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      editModal: false,
      idProp: "",
      cliente: "",
      filtro: "",
      rowsPerPage: 5,
      page: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // getCLientes();
    // getRegiones();
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.tipoCuenta === 0) {
        dispatch(getAllProyectos());
      }else {
        dispatch(getUserProyectos(user.userId))
      }
    }
  }

  onClickProductSelected(cell, row, index) {
    this.setState({
      modal: true,
      idProp: row.proyecto,
      Cliente: row.Cliente,
    });
  }

  handleHide = () => {
    this.setState({ modal: false });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { mensaje, getClearAction } = this.props;

    if (mensaje && mensaje.estado === 1) {
      alert("Proyecto Actualizado");
      getClearAction();
    }
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  render() {
    const { itemProyectos } = this.props;
    let items = [];

    const useStyles1 = makeStyles((theme) => ({
      root: {
        width: "100%",
      },
      table: {
        minWidth: 500,
      },
      tableWrapper: {
        overflowX: "auto",
      },
    }));

    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: "#fff",
        color: "#000",
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);

    if (itemProyectos && Array.isArray(itemProyectos)) {
      itemProyectos.map((item) =>
        items.push({
          Nombre: item.nombre,
          id: item.id,
          Inmobiliaria: item.nombreInmobiliaria,
          Valor: item.valorDesde,
          Disponible: "Si",
          Destacar: true ? "Si" : "No",
          Exclusiva: true ? "Si" : "No",
          proyecto: item,
          comuna: item.comuna,
          direccion: item.nombreCalle,
          tipoProyecto: item.tipoProyecto,
          disponible: true,
          link: item.htmlbuttonLink
        })
      );
    }

    const emptyRows =
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        items.filter(searchFor(this.state.filtro)).length -
          this.state.page * this.state.rowsPerPage
      );

    const classes = useStyles1;
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Lista de proyectos"
            subtitle="Proyectos"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col md={4}>
            <input
              type="text"
              placeholder="Buscar"
              className="form-control"
              onChange={(str) => {
                this.setState({
                  filtro: str.target.value,
                });
              }}
            />
          </Col>
          <Col md={5} />
          <Col md={3}>
            <Link
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
              to={`/addproyecto`}
            >
              <Button type="button" theme="primary form-control">
                Crear Proyecto
                <i
                  style={{
                    fontSize: 15,
                    color: "#fff",
                  }}
                  className="material-icons"
                >
                  home
                </i>
              </Button>
            </Link>
          </Col>
        </Row>
        <br />
        <Table className={classes.table} aria-label=" pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Nombre</StyledTableCell>
              <StyledTableCell align="left">Inmobiliaria</StyledTableCell>
              <StyledTableCell align="left">Valor Desde</StyledTableCell>
              <StyledTableCell align="left">Destacar</StyledTableCell>
              <StyledTableCell align="left">Exclusiva</StyledTableCell>
              <StyledTableCell align="left">Comuna</StyledTableCell>
              <StyledTableCell align="left">Tipo</StyledTableCell>
              <StyledTableCell align="left">Direccion</StyledTableCell>
              <StyledTableCell align="left">Link HTML</StyledTableCell>
              {/* <StyledTableCell align="left">Fecha</StyledTableCell> */}
              <StyledTableCell align="left">Editar</StyledTableCell>
              {/* <StyledTableCell align="left">Estado</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {(this.state.rowsPerPage > 0
              ? items
                  .filter(searchFor(this.state.filtro))
                  .slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage +
                      this.state.rowsPerPage
                  )
              : items.filter(searchFor(this.state.filtro))
            )
              .filter(searchFor(this.state.filtro))
              .map((row, index) => {
                const direccion = `${row.proyecto.nombreCalle} ${row.proyecto.numero}`;
                return (
                  <TableRow key={row.id}>
                    <TableCell align="left">{row.Nombre}</TableCell>
                    <TableCell align="left">{row.Inmobiliaria}</TableCell>
                    <TableCell align="left">{row.Valor}</TableCell>
                    <TableCell align="left">{row.Destacar}</TableCell>
                    <TableCell align="left">{row.Exclusiva}</TableCell>
                    <TableCell align="left">{row.comuna}</TableCell>
                    <TableCell align="left">{row.tipoProyecto}</TableCell>
                    <TableCell align="left">{direccion}</TableCell>
                    <TableCell align="left">
                      <textarea id="w3mission" rows="1" cols="20" readonly value={row.link ? row.link : ""}>
                      </textarea>
                    </TableCell>
                    {/* <TableCell align="left">
                      <i
                        style={{
                          fontSize: 30,
                          color: "#00a72c",
                          cursor: "pointer",
                        }}
                        className="material-icons"
                        onClick={() =>
                          this.onClickProductSelected("", row, index)
                        }
                      >
                        event
                      </i>
                    </TableCell> */}
                    <TableCell align="left">
                      <Link
                        style={{
                          color: "inherit",
                          textDecoration: "inherit",
                        }}
                        to={`/updateproyecto/${row.proyecto.id}`}
                      >
                        <i
                          style={{
                            fontSize: 30,
                            color: "#007bff",
                          }}
                          className="material-icons"
                        >
                          edit
                        </i>
                      </Link>
                    </TableCell>
                    {/* <TableCell align="left">
                      <i
                        style={{
                          fontSize: 30,
                          cursor: "pointer",
                          color: row.proyecto.disponible
                            ? "#007bff"
                            : "#c4183c",
                        }}
                        className="material-icons"
                        onClick={() => {
                          this.props.deleteProyecto(
                            row.proyecto.id,
                            !row.proyecto.disponible
                          );
                        }}
                      >
                        {row.proyecto.disponible ? "check" : "close"}
                      </i>
                    </TableCell> */}
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={12} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "Todas", value: -1 }]}
                count={items.filter(searchFor(this.state.filtro)).length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                SelectProps={{
                  inputProps: { "aria-label": "Cantidad" },
                  native: true,
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
        <ModalItem
          show={this.state.modal}
          handleHide={this.handleHide}
          Title={"Ficha Proyecto - Cliente: " + this.state.Cliente}
          Componente={FichaProyecto}
          paramsComponents={this.state.idProp}
          {...this.props}
        />
      </Container>
    );
  }
}

const formConf = {
  form: "IndexListarProyectos",
};

const mapStateToProps = (state) => ({
  itemsClientes: state.app.itemsClientes,
  itemRegiones: state.app.itemRegiones,
  mensaje: state.app.mensaje,
  itemProyectos: state.app.itemProyectos,
});

const mapDispatchToProps = (dispatch) => ({
  getCLientes: () => dispatch(fetchGetAllClientes()),
  getRegiones: () => dispatch(fetchAllRegiones()),
  getClearAction: () => dispatch(fetchClearAction()),
  dispatch: (action) => {
    dispatch(action);
  },
});

IndexListarProyectos = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexListarProyectos);
IndexListarProyectos = reduxForm(formConf)(IndexListarProyectos);
export default IndexListarProyectos;
