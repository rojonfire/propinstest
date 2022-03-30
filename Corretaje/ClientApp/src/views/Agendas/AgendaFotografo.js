/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Col, Row } from "shards-react";

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
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
//----------

import swal from "sweetalert2";

import api from "../../api";
import moment from "moment";

import PageTitle from "../../components/common/PageTitle";

const searchFor = (search) => {
  return (x) => {
    return (
      x.dia === parseInt(search) ||
      x.direccion.toLowerCase().includes(search.toLowerCase()) ||
      x.tramo.toLowerCase().includes(search.toLowerCase()) ||
      moment(x.fecha)
        .format("DD/MM/YY")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
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

class AgendaFotografo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agendas: [],
      show: false,

      idProp: "",
      cliente: "",
      filtro: "",
      rowsPerPage: 5,
      page: 0,
    };
  }

  componentDidMount = async () => {
    this.getVisitas();
  };

  getVisitas = async (params) => {
    try {
      const { usr } = this.props;
      let agendas = await api.apiGetVisitaFotografoById(usr.Usr.userId);

      if (agendas.value.data !== null) {
        console.log(
          "AgendaFotografo -> getVisitas -> agendas.value.data",
          agendas.value.data
        );
        this.setState({ agendas: agendas.value.data });
      } else {
        this.setState({
          agendas: [],
        });
      }
    } catch (e) {
      console.error(e);
      swal.fire({
        icon: "info",
        title: "Atención",
        text: `Ocurrio un error: ${e}`,
      });
    }
  };

  cancelaVisita = async (id) => {
    try {
      swal.showLoading();
      let res = await api.apiCancelaVisitaFotografoById(id);
      if (res.estado === 1) {
        this.getVisitas();
        swal.fire({
          icon: "success",
          title: "Hora eliminada!",
        });
      }
    } catch (error) {
      console.error("error: ", error);
      swal.fire({
        icon: "info",
        title: "Atención",
        text: `Ocurrio un error: ${error}`,
      });
    } finally {
      this.setState({ show: false });
    }
  };

  render() {
    const { agendas } = this.state;

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

    const emptyRows =
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        agendas.filter(searchFor(this.state.filtro)).length -
          this.state.page * this.state.rowsPerPage
      );

    const classes = useStyles1;

    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="12"
            title="Días Agendados "
            subtitle="Agenda Fotografo"
            show={false}
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
        </Row>

        <br />
        {agendas && agendas.length > 0 ? (
          <Table className={classes.table} aria-label=" pagination table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Día</StyledTableCell>
                <StyledTableCell align="left">Fecha</StyledTableCell>
                <StyledTableCell align="left">Tramo</StyledTableCell>
                <StyledTableCell align="left">Direccion</StyledTableCell>
                <StyledTableCell align="center">Eliminar Hora</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(this.state.rowsPerPage > 0
                ? agendas
                    .filter(searchFor(this.state.filtro))
                    .slice(
                      this.state.page * this.state.rowsPerPage,
                      this.state.page * this.state.rowsPerPage +
                        this.state.rowsPerPage
                    )
                : agendas.filter(searchFor(this.state.filtro))
              )
                .filter(searchFor(this.state.filtro))
                .map((row, index) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell align="left">{row.dia}</TableCell>
                      <TableCell align="left">
                        {moment(row.fecha).format("DD/MM/YY")}
                      </TableCell>
                      <TableCell align="left">{row.tramo}</TableCell>
                      <TableCell align="left">{row.direccion}</TableCell>

                      <TableCell align="center">
                        <i
                          style={{
                            fontSize: 30,
                            color: "#f14",
                            cursor: "pointer",
                          }}
                          className="material-icons"
                          onClick={() => this.cancelaVisita(row.id)}
                        >
                          delete
                        </i>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 5 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={12} />
                </TableRow>
              )}
            </TableBody>
            {agendas.filter(searchFor(this.state.filtro)).length > 5 && (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "Todas", value: -1 },
                    ]}
                    count={agendas.filter(searchFor(this.state.filtro)).length}
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
            )}
          </Table>
        ) : (
          <Row>
            <Col>No hay días agendados</Col>
          </Row>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usr: state.app.itemUsuario[0],
  };
};

export default connect(
  mapStateToProps,
  null
)(AgendaFotografo);
