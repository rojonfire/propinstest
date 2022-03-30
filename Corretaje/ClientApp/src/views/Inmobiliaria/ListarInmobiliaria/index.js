/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import { fetchClearAction, fetchGetAllInmobiliarias } from "../../../action";

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

const searchFor = search => {
  return x => {
    return x.nombre.toLowerCase().includes(search.toLowerCase()) || !search;
  };
};

function TablePaginationActions(props) {
  const classes = makeStyles(theme => ({
    root: {
      width: "100%"
    },
    table: {
      minWidth: 500
    },
    tableWrapper: {
      overflowX: "auto"
    }
  }));
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
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
  rowsPerPage: PropTypes.number.isRequired
};

export class ListarInmobiliaria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      editModal: false,
      idProp: "",
      cliente: "",
      filtro: "",
      rowsPerPage: 5,
      page: 0
    };
  }

  componentDidMount() {
    const { getInmobiliarias } = this.props;
    getInmobiliarias();
  }

  onClickProductSelected(cell, row, index) {
    this.setState({
      modal: true,
      idProp: row.propiedad,
      Cliente: row.Cliente
    });
  }

  handleHide = () => {
    this.setState({ modal: false });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { mensaje, getClearAction } = this.props;

    if (mensaje && mensaje.estado === 1) {
      alert("Inmobiliaria Actualizada");
      getClearAction();
    }
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    });
  };

  render() {
    let items = [];
    const { itemInmobiliarias } = this.props;
    const { rowsPerPage, page, filtro } = this.state;

    const useStyles1 = makeStyles(theme => ({
      root: {
        width: "100%"
      },
      table: {
        minWidth: 500
      },
      tableWrapper: {
        overflowX: "auto"
      }
    }));

    const StyledTableCell = withStyles(theme => ({
      head: {
        backgroundColor: "#fff",
        color: "#000"
      },
      body: {
        fontSize: 14
      }
    }))(TableCell);

    if (itemInmobiliarias) {
      itemInmobiliarias.map(function(item) {
        items.push({
          direccion: item.direccion,
          logo: null,
          mail: item.mail,
          nombre: item.nombre,
          rut: item.rut,
          telefono: item.telefono,
          id: item.id,
          link: item.htmlbuttonLink
        });
        return null;
      });
    }

    const emptyRows =
      rowsPerPage -
      Math.min(
        rowsPerPage,
        items.filter(searchFor(filtro)).length - page * rowsPerPage
      );

    const classes = useStyles1;
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Lista de Inmobiliarias"
            subtitle="Inmobiliarias"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col md={4}>
            <input
              type="text"
              placeholder="Buscar"
              className="form-control"
              onChange={str => {
                this.setState({
                  filtro: str.target.value
                });
              }}
            />
          </Col>
          <Col md={5} />
          <Col md={3}>
            <Link
              style={{
                color: "inherit",
                textDecoration: "inherit"
              }}
              to={`/addinmobiliaria`}
            >
              <Button type="button" theme="primary form-control">
                Crear Inmobiliaria
                <i
                  style={{
                    fontSize: 15,
                    color: "#fff"
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
              <StyledTableCell align="left">Inmobiliaria</StyledTableCell>              
              <StyledTableCell align="left">Teléfono</StyledTableCell>
              <StyledTableCell align="left">Correo Electrónico</StyledTableCell>
              <StyledTableCell align="left">Dirección</StyledTableCell>
              <StyledTableCell align="left">Link HTML</StyledTableCell>
              <StyledTableCell align="left">Editar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? items
                  .filter(searchFor(filtro))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : items.filter(searchFor(filtro))
            )
              .filter(searchFor(filtro))
              .map((row, index) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell align="left">{row.nombre}</TableCell>
                    <TableCell align="left">{row.telefono}</TableCell>
                    <TableCell align="left">{row.mail}</TableCell>
                    <TableCell align="left">{row.direccion}</TableCell>
                    <TableCell align="left">
                      <textarea id="w3mission" rows="1" cols="20" readonly value={row.link ? row.link : ""}>
                      </textarea>
                    </TableCell>
                    <TableCell align="left">
                      <Link
                        style={{
                          color: "inherit",
                          textDecoration: "inherit",
                        }}
                        to={`/updateinmobiliaria/${row.id}`}
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
                  native: true
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Container>
    );
  }
}

const formConf = {
  form: "ListarInmobiliaria"
};

const mapStateToProps = state => ({
  itemInmobiliarias: state.app.itemInmobiliarias,
  mensaje: state.app.mensaje
});

const mapDispatchToProps = dispatch => ({
  getInmobiliarias: () => dispatch(fetchGetAllInmobiliarias()),
  getClearAction: () => dispatch(fetchClearAction())
});

ListarInmobiliaria = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListarInmobiliaria);
ListarInmobiliaria = reduxForm(formConf)(ListarInmobiliaria);
export default ListarInmobiliaria;
