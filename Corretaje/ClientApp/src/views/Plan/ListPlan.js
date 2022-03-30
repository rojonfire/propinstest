/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGetAllPlanes, fetchDeletePlan } from '../../action';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'shards-react';

//table
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PageTitle from '../../components/common/PageTitle';
import swal from 'sweetalert2';

const searchFor = search => {
  return x => {
    return (
      x.nombre.toLowerCase().includes(search.toLowerCase()) ||
      x.descripcion.toLowerCase().includes(search.toLowerCase()) ||
      !search
    );
  };
};

function TablePaginationActions(props) {
  const classes = makeStyles(theme => ({
    root: {
      width: '100%'
    },
    table: {
      minWidth: 500
    },
    tableWrapper: {
      overflowX: 'auto'
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
    <div className={classes.root} style={{ width: '100%' }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
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
        {theme.direction === 'rtl' ? (
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
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
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

class ListPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idProp: '',
      cliente: '',
      filtro: '',
      rowsPerPage: 5,
      page: 0
    };
  }

  componentDidMount = () => {
    this.props.getPlans();
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

  detalle = servicios => {
    return servicios.map(servicio => (
      <li key={servicio.id + '_' + servicio.nombre}>{servicio.nombre}</li>
    ));
  };

  userFeedBack = () => {
    const { requestDeletePlan, requestGetPlanes, history, errorMessage } = this.props;

    if (requestDeletePlan === "LOADING" || requestGetPlanes === "LOADING") {
      swal.showLoading();
    } else {
      swal.close();
    }

    if (requestDeletePlan == "SUCCESS") {
      swal.fire({
        icon: 'success',
        title: 'Bien...',
        text: 'Plan creado!',
        onAfterClose: () => {
          history.push("/planes")
        }
      });
    }
    if (requestDeletePlan == 'ERROR') {
      swal.fire({
        icon: 'error',
        title: 'Error...',
        text: errorMessage
      });
    }
  }

  render() {
    const { planes } = this.props;

    const useStyles1 = makeStyles(() => ({
      root: {
        width: '100%'
      },
      table: {
        minWidth: 500
      },
      tableWrapper: {
        overflowX: 'auto'
      }
    }));

    const StyledTableCell = withStyles(() => ({
      head: {
        backgroundColor: '#fff',
        color: '#000'
      },
      body: {
        fontSize: 14
      }
    }))(TableCell);

    if (!planes) {
      return <div>loading..</div>;
    }

    const emptyRows =
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        planes.filter(searchFor(this.state.filtro)).length -
          this.state.page * this.state.rowsPerPage
      );

    const classes = useStyles1;

    return (
      <Container fluid className="main-content-container px-4">
        { this.userFeedBack() }
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Lista de planes"
            subtitle="Planes"
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
                color: 'inherit',
                textDecoration: 'inherit'
              }}
              to={`/addplan`}
            >
              <Button type="button" theme="primary form-control">
                Crear plan
              </Button>
            </Link>
          </Col>
        </Row>
        <br />
        <Table className={classes.table} aria-label=" pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Plan</StyledTableCell>
              <StyledTableCell align="left">Venta o arriendo</StyledTableCell>
              <StyledTableCell align="left">Servicios Base</StyledTableCell>
              <StyledTableCell align="center">Editar</StyledTableCell>
              <StyledTableCell align="center">Eliminar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(this.state.rowsPerPage > 0
              ? planes
                  .filter(searchFor(this.state.filtro))
                  .slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage +
                      this.state.rowsPerPage
                  )
              : planes.filter(searchFor(this.state.filtro))
            )
              .filter(searchFor(this.state.filtro))
              .map((row, index) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell align="left">{row.nombre}</TableCell>
                    <TableCell align="left">{row.esVenta == null || row.esVenta == undefined ? "" : row.esVenta ? 'Venta' : 'Arriendo'}</TableCell>
                    <TableCell align="left">
                      {this.detalle(row.serviciosBase)}
                    </TableCell>
                    <TableCell align="center">
                      <Link
                        style={{
                          color: 'inherit',
                          textDecoration: 'inherit'
                        }}
                        to={`/updateplan/${row.id}`}
                      >
                        <i
                          style={{
                            fontSize: 30,
                            color: '#007bff'
                          }}
                          className="material-icons"
                        >
                          edit
                        </i>
                      </Link>
                    </TableCell>

                    <TableCell align="center">
                      <i
                        style={{
                          fontSize: 30,
                          color: '#f14',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          this.props.deletePlan(row.id);
                        }}
                        className="material-icons"
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
          {planes.filter(searchFor(this.state.filtro)).length > 5 && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    { label: 'Todas', value: -1 }
                  ]}
                  count={planes.filter(searchFor(this.state.filtro)).length}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'Cantidad' },
                    native: true
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ 
  planes: state.app.itemPlanes, 
  requestDeletePlan: state.app.requestDeletePlan,
  requestGetPlanes: state.app.requestGetPlanes,
  errorMessage: state.app.errorMessage 
});

const mapDispatchToProps = dispatch => ({
  getPlans: () => dispatch(fetchGetAllPlanes()),
  deletePlan: id => dispatch(fetchDeletePlan(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListPlan);
