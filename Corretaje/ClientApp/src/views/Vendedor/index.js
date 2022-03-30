import React from "react";
import {
  getVendedores,
  putUsuarioCambiarContactado
} from "../../action";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col
} from "shards-react";
import Swal from "sweetalert2";
import TablePagination from "@material-ui/core/TablePagination";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import PageTitle from "../../components/common/PageTitle";

class IndexVendedor extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      rowsPerPage: 10,
      page: 0
    };

    const { getVendedores } = this.props;
    getVendedores(1, 10);
  }

  handleClick = (id) => {
    const { putUsuarioCambiarContactado } = this.props;
    putUsuarioCambiarContactado(id);
  }

  handleChangePage = (event, newPage) => {
    const { rowsPerPage } = this.state;
    this.setState({
      page: newPage,
    });
    const { getVendedores } = this.props;
    getVendedores(newPage + 1, rowsPerPage);
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
    const { getVendedores } = this.props;
    getVendedores(1, parseInt(event.target.value, 10));
  };
  
  feedback = () => {
    const { requestGetVendedores, requestCambiarContactado, errorMessage, getVendedores } = this.props;
    const { rowsPerPage, page } = this.state;

    if (requestGetVendedores === "LOADING") {
      Swal.showLoading();
    } else if (requestGetVendedores === "SUCCESS"){
      Swal.close();
    } else {
      if (requestCambiarContactado === "SUCCESS") {
        Swal.fire({
          icon: "success",
          title: "Cambio exitoso",
          text: "Se ha cambiado el estado de contacto del usuario con éxito",
          onAfterClose: () => {
            getVendedores(page + 1, rowsPerPage);
          },
        });        
      }    
  
      if (requestGetVendedores === "ERROR") {
        Swal.fire("Error", "No se han podido cargar los vendedores", "error");
      }
  
      if (requestCambiarContactado === "ERROR") {
        Swal.fire("Error", errorMessage, "error");
      }
    }
    
  }

  render() {
    const { vendedores } = this.props;
    
    const StyledTableCell = withStyles(theme => ({
      head: {
        backgroundColor: "#fff",
        color: "#000",
      },
      body: {
        fontSize: 12
      }
    }))(TableCell);
    return (
      <Container fluid className="main-content-container px-4">
        { this.feedback() }
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Vendedores"
            subtitle="Posibles leads"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col>
            <TableContainer component={Paper} className={"hola"}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Nombre</StyledTableCell>
                    <StyledTableCell align="left">Telefono</StyledTableCell>
                    <StyledTableCell align="left">Email</StyledTableCell>
                    <StyledTableCell align="left">Comuna</StyledTableCell>
                    <StyledTableCell align="left">Contactado</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vendedores && vendedores.results && Array.isArray(vendedores.results) && vendedores.results.length > 0 
                  && vendedores.results.map((row) => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell align="left">{row.nombres}</TableCell>
                        <TableCell align="left">{row.telefono}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.comuna}</TableCell>
                        <TableCell align="left">
                          <Tooltip title="Click para cambiar" aria-label="editar">
                            <FormGroup>
                            { row.contactado ? (
                              <FormControlLabel control={<Checkbox defaultChecked />} label="Contactado" onClick={() => this.handleClick(row.id)} />
                            ) : (
                              <FormControlLabel control={<Checkbox />} label="No contactado" onClick={() => this.handleClick(row.id)} />
                            )}
                            </FormGroup>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      count={vendedores && vendedores.totalResults}
                      page={this.state.page}
                      onChangePage={this.handleChangePage}
                      rowsPerPage={this.state.rowsPerPage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      SelectProps={{
                        inputProps: { "aria-label": "Cantidad" },
                        native: true,
                      }}
                      labelRowsPerPage={"Resultados por página"}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    vendedores: state.app.vendedores,
    requestGetVendedores: state.app.requestGetVendedores,
    requestCambiarContactado: state.app.requestCambiarContactado,
    errorMessage: state.app.errorMessage
  };
};

const mapDispatchToProps = (dispatch) => ({
  getVendedores: (page, rowsPerPage) => dispatch(getVendedores(page, rowsPerPage)),
  putUsuarioCambiarContactado: (idUsuario) => dispatch(putUsuarioCambiarContactado(idUsuario)),
  dispatch: (action) => {
    dispatch(action);
  },
});

IndexVendedor = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexVendedor);

export default IndexVendedor;
