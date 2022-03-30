/** @format */

import React, { Component } from "react";

import { Container, Row, Col, Button } from "shards-react";
import { Link } from "react-router-dom";

import PageTitle from "../../../components/common/PageTitle";

import { connect } from "react-redux";

import {
  fetchGetAllUsuarios,
  fetchGetAllInmobiliarias,
} from "../../../action";
import util from "../../../utils/utilsFunctions";

//table
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import TablePagination from "@material-ui/core/TablePagination";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import moment from "moment";

const searchFor = (search) => {
  return (item) => {
    let correo = typeof item.mail !== "string" ? "" : item.mail;
    let name = typeof item.nombres !== "string" ? "" : item.nombres;
    let tipo = typeof item.tipoCuenta !== "string" ? "" : item.tipoCuenta;

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      tipo.toLowerCase().includes(search.toLowerCase()) ||
      correo.toLowerCase().includes(search.toLowerCase()) ||
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

export class IndexListUsuario extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchGetAllInmobiliarias());
    this.state = {
      idProp: "",
      cliente: "",
      filtro: "",
      rowsPerPage: 5,
      page: 0,
    };
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    let user = JSON.parse(localStorage.getItem("user"));
    dispatch(fetchGetAllInmobiliarias());
    dispatch(fetchGetAllUsuarios());
    //dispatch(fetchGetInmoUsuarios(user.userId));
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
    let items = [];
    let user = JSON.parse(localStorage.getItem("user"));
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


    if (this.props.itemsUsuarios && Array.isArray(this.props.itemsUsuarios)) {
      this.props.itemsUsuarios.map(function(item, i) {
        items.push({
          id: i,
          nombres: item.nombres + " " + item.apellidos,
          tipoCuenta: util.getTipoCuenta(item.tipoCuenta),
          email: item.email,
          iduser: item.id,
          editable: (moment(item.createdAt).add(2, 'days').isBefore(moment()) && (!item.registroCompletado || item.password != null)) || item.registroCompletado,
        });
        return null;
      });
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
            title={
              user && user.tipoCuenta === 6
                ? "Lista de Agentes"
                : "Lista de Usuarios"
            }
            subtitle={user && user.tipoCuenta === 6 ? "Agente" : "Usuario"}
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
              to={`/addusuario`}
            >
              <Button type="button" theme="primary form-control">
                {user && user.tipoCuenta === 6
                  ? "Crear Agente"
                  : "Crear Usuario"}
              </Button>
            </Link>
          </Col>
        </Row>

        <br />
        <Table className={classes.table} hover aria-label=" pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Nombre</StyledTableCell>
              <StyledTableCell align="left">Tipo de Cuenta</StyledTableCell>
              <StyledTableCell align="left">Mail</StyledTableCell>
              <StyledTableCell align="center">Editar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(this.state.rowsPerPage > 0 && user.tipoCuenta == 10
              ? items
                  .filter(searchFor(this.state.filtro))
                  .filter((items) => items.tipoCuenta == "Usuario Web")
                  .slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage +
                      this.state.rowsPerPage
                  )
              : items
                  .filter(searchFor(this.state.filtro))
                  .slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage +
                      this.state.rowsPerPage
                  )
            )

              .filter(searchFor(this.state.filtro))

              .map((row, index) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell align="left">{row.nombres}</TableCell>
                    <TableCell align="left">{row.tipoCuenta}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="center">
                      { row.editable ? (
                        <Link
                          style={{
                            color: "inherit",
                            textDecoration: "inherit",
                          }}
                          to={`/updateUsuario/${row.iduser}`}
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
                      ) : (
                        <Tooltip title="Este usuario ha sido referido hace menos de 48 horas, por lo que no puede ser editado todavía" aria-label="ver detalles">
                          <i
                          style={{
                            fontSize: 30,
                            color: "#afd6ff",
                          }}
                          className="material-icons"
                          >
                            edit
                          </i>
                        </Tooltip>
                        
                      ) }
                      
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
                rowsPerPageOptions={[5, 10, 20, { label: "Todas", value: -1 }]}
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
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  itemsUsuarios: state.app.itemsUsuarios,
  itemUsuario: state.app.itemUsuario,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

IndexListUsuario = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexListUsuario);

export default IndexListUsuario;
