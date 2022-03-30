/** @format */

import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import { Container, Row, Col, Button } from 'shards-react';

import PageTitle from '../../../components/common/PageTitle';

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

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
//----------

import {
  fetchGetAllClientes,
  fecthUpdateCliente,
  fetchClearAction
} from '../../../action';
import FormClienteAdd from '../FormClienteAdd';

const searchFor = search => {
  return x => {
    return (
      x.nombres.toLowerCase().includes(search.toLowerCase()) ||
      x.rut.toLowerCase().includes(search.toLowerCase()) ||
      x.mail.toLowerCase().includes(search.toLowerCase()) ||
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

export class IndexListCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editModal: false,
      idCliente: 0,

      idProp: '',
      cliente: '',
      filtro: '',
      rowsPerPage: 5,
      page: 0
    };
  }

  handleEditModalHide = () => {
    this.setState({ editModal: false });
  };

  componentDidMount = () => {
    const { getClientes } = this.props;
    getClientes();
  };

  onClickEditCliente = (cell, row, index) => {
    this.setState({
      editModal: true,
      idCliente: row.id
    });

    let data = {
      Nombres: row.cliente.nombres,
      Apellidos: row.cliente.apellidos,
      EstadoCivil: row.cliente.estadoCivil,
      FechaNacimiento: row.cliente.fechaNacimiento,
      Rut: row.cliente.rut,
      Mail: row.cliente.mail,
      Telefono: row.cliente.telefono,
      TarjetaDeCredito: row.cliente.tarjetaDeCredito,
      Direccion: row.cliente.direccion
    };

    this.props.initialize(data);
  };

  handleEditCliente = values => {
    const { updateCliente } = this.props;

    let data = {
      nombres: values.Nombres,
      apellidos: values.Apellidos,
      rut: values.Rut,
      estadoCivil: values.EstadoCivil,
      fechaNacimiento: values.FechaNacimiento,
      mail: values.Mail,
      telefono: values.Telefono,
      direccion: values.Direccion,
      idString: this.state.idCliente
    };

    updateCliente(data);
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { mensaje, clearAction, getClientes } = this.props;

    if (mensaje && mensaje.estado === 1) {
      alert(mensaje.mensaje);
      clearAction();
      this.setState({
        idCliente: 0
      });
      getClientes();
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
    const { handleSubmit } = this.props;
    let items = [];

    const useStyles1 = makeStyles(theme => ({
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

    const StyledTableCell = withStyles(theme => ({
      head: {
        backgroundColor: '#fff',
        color: '#000'
      },
      body: {
        fontSize: 14
      }
    }))(TableCell);

    if (this.props.itemsClientes) {
      this.props.itemsClientes.map(function(item, i) {
        items.push({
          id: item.id,
          nombres: item.nombres,
          rut: item.rut,
          mail: item.mail,
          cliente: item
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
            title="Lista de clientes"
            subtitle="Cliente"
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
              to={`/addcliente`}
            >
              <Button type="button" theme="primary form-control">
                Crear cliente
              </Button>
            </Link>
          </Col>
        </Row>
        <br />
        <Table className={classes.table} hover aria-label=" pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Nombre</StyledTableCell>
              <StyledTableCell align="left">Rut</StyledTableCell>
              <StyledTableCell align="left">Mail</StyledTableCell>
              <StyledTableCell align="center">Editar</StyledTableCell>
              <StyledTableCell align="center">Agendar Horario</StyledTableCell>
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
                return (
                  <TableRow key={row.id}>
                    <TableCell align="left">{row.nombres}</TableCell>
                    <TableCell align="left">{row.rut}</TableCell>
                    <TableCell align="left">{row.mail}</TableCell>
                    <TableCell align="center">
                      <Link
                        style={{
                          color: 'inherit',
                          textDecoration: 'inherit'
                        }}
                        to={`/updateCliente/${row.id}`}
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
                      <Link
                        style={{
                          color: 'inherit',
                          textDecoration: 'inherit'
                        }}
                        to={`/agendas/cliente/${row.id}`}
                      >
                        <i
                          style={{
                            fontSize: 30,
                            color: '#007bff'
                          }}
                          className="material-icons"
                        >
                          alarm_on
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
                rowsPerPageOptions={[5, 10, 25, { label: 'Todas', value: -1 }]}
                count={items.filter(searchFor(this.state.filtro)).length}
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
        </Table>
        <div className="static-modal">
          <Modal
            className="ModalLarge"
            show={this.state.editModal}
            onHide={this.handleEditModalHide}
            bsSize="large"
          >
            <Modal.Header closeButton>
              <Modal.Title>Editar Cliente</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <form onSubmit={handleSubmit(this.handleEditCliente)}>
                <FormClienteAdd />
                <button className="btn btn-primary" type="submit">
                  Editar Cliente
                </button>
              </form>
            </Modal.Body>

            <Modal.Footer />
          </Modal>
        </div>
      </Container>
    );
  }
}

const formConf = {
  form: 'IndexEditarCliente'
};

const mapStateToProps = state => ({
  itemsClientes: state.app.itemsClientes,
  mensaje: state.app.mensaje
});

const mapDispatchToProps = dispatch => ({
  getClientes: () => dispatch(fetchGetAllClientes()),
  updateCliente: obj => dispatch(fecthUpdateCliente(obj)),
  clearAction: () => dispatch(fetchClearAction())
});

IndexListCliente = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexListCliente);
IndexListCliente = reduxForm(formConf)(IndexListCliente);

export default IndexListCliente;
