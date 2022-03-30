import React, { useState, useEffect } from "react";

import { Container, Row, Col } from "shards-react";

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

import api from "../../api";
import moment from "moment";
import swal from "sweetalert2";

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

const TablePaginationActions = (props) => {
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
    onChangePage(event, page - 1 >=0 ? page-1 : 0);
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
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const AgendaLive = (props) => {
  const { userId } = JSON.parse(localStorage.user);
  const [agendas, setAgendas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState("");

  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];  

  useEffect(() => {
    const agenteId = JSON.parse(localStorage.user).userId
    async function getVisitas(val) {
      const res = await api.getVisitasAgente(val);
      const arr = [...agendas];
      if (res) {
        res.forEach(element => {
          if (element.direccion === undefined) {
            element.direccion = element.nombreProyecto
            arr.push(element)
          } else {
            arr.push(element)
          }
        });
      }
      setAgendas(arr);
      return res
    }
    getVisitas(agenteId)
  }, []);

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
    rowsPerPage -
    Math.min(
      rowsPerPage,
      agendas.filter(searchFor(filtro)).length - page * rowsPerPage
    );

  const classes = useStyles1;

  const cancelaVisita = async (id) => {
    swal.showLoading();
    try {
      const res = await api.cancelVisitaAgende(id);
      if (res.estado === 0) {
        swal.fire({
          icon: "error",
          title: res.mensaje,
        });
      } else {
        swal.fire({
          icon: "success",
          title: res.mensaje,
        });
      }
    } catch (error) {
      console.log("cancelaVisita -> error", error);
    }
  };

  const openLive = async (id) => {
    console.log("openLive -> id", id);    
    props.history.push(`/live?idproy=${id}`)
  };

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Agenda Live"
          subtitle="Live"
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
              setFiltro(str.target.value);
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
              <StyledTableCell align="left">Proyecto</StyledTableCell>
              <StyledTableCell align="center">Cancelar LIVE</StyledTableCell>
              <StyledTableCell align="center">LIVE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? agendas
                  .filter(searchFor(filtro))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : agendas.filter(searchFor(filtro))
            )
              .filter(searchFor(filtro))
              .map((row, index) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell align="left">{
                      row.dia === 7
                      ? days[0]
                      : days[row.dia]
                    }</TableCell>
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
                        onClick={() => cancelaVisita(row.id)}
                      >
                        delete
                      </i>
                    </TableCell>
                    <TableCell align="center">
                      <i
                        style={{
                          fontSize: 30,
                          color: "#4B328B",
                          cursor: "pointer",
                        }}
                        className="material-icons"
                        onClick={() => openLive(row.proyectoId)}
                      >
                        play_arrow
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
          {agendas.filter(searchFor(filtro)).length > 5 && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    { label: "Todas", value: -1 },
                  ]}
                  onChangeRowsPerPage={e => setRowsPerPage(+e.target.value)}
                  count={agendas.filter(searchFor(filtro)).length}
                  rowsPerPage={rowsPerPage}
                  page={+page}
                  onChangePage={(e, newPage) => setPage(newPage)}
                  SelectProps={{
                    inputProps: { "aria-label": "Cantidad" },
                    native: true,
                  }}
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
};

export default AgendaLive;
