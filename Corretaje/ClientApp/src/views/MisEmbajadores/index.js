import React from "react";
import {
  getUsuariosPaginados,
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
import { withStyles } from "@material-ui/core/styles";
import PageTitle from "../../components/common/PageTitle";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

class IndexMisEmbajadores extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      rowsPerPage: 10,
      page: 0
    };

    let user = JSON.parse(localStorage.getItem("user"));
    
    if (user != null) {
      const { getUsuariosPaginados } = this.props;

      //(pageSize, page, tipoCuenta, referidoPor, soloEmbajadores)
      getUsuariosPaginados(10, 1, 1, user.userId, true);
    }    
  }

  handleChangePage = (event, newPage) => {
    const { rowsPerPage } = this.state;
    this.setState({
      page: newPage,
    });
    const { getUsuariosPaginados } = this.props;
    getUsuariosPaginados(rowsPerPage, newPage + 1, 1, "", true);
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
    const { getUsuariosPaginados } = this.props;
    getUsuariosPaginados(parseInt(event.target.value, 10), 1, 1, null, true);
  };
  
  feedback = () => {
    const { requestGetUsuariosPaginados, errorMessage } = this.props;
    if (requestGetUsuariosPaginados === "LOADING") {
      Swal.showLoading();
    } else {
      Swal.close();
    }
    if (requestGetUsuariosPaginados === "ERROR") {
      Swal.fire("Error", errorMessage, "error");
    }
  };


  render() {
    const { usuariosPaginados, requestGetUsuariosPaginados } = this.props;
    
    const StyledTableCell = withStyles(() => ({
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
            title="Mis embajadores"
            subtitle="Embajadores que has referido"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col>
            {requestGetUsuariosPaginados === "LOADING" && (
              <div>
                Cargando...
              </div>
            )}
            {requestGetUsuariosPaginados !== "LOADING" && (usuariosPaginados == null || (usuariosPaginados.results && Array.isArray(usuariosPaginados.results) && 
            usuariosPaginados.results.length === 0)) && (
              <div>
                Vaya, parece que no tienes ningún embajador. Prueba refiriendo uno en la sección de Referir y recursos.
              </div>
            )}
            {requestGetUsuariosPaginados != "LOADING" && usuariosPaginados && usuariosPaginados.results && Array.isArray(usuariosPaginados.results) && usuariosPaginados.results.length > 0 && (
              <TableContainer component={Paper} className={"hola"}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">Nombre</StyledTableCell>
                      <StyledTableCell align="left">Teléfono</StyledTableCell>
                      <StyledTableCell align="left">Email</StyledTableCell>
                      <StyledTableCell align="left">Registro completado</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  
                  {usuariosPaginados.results.map((row) => 
                    (
                      <TableRow key={row.id}>
                        <TableCell align="left">{row.nombres} {row.apellidos}</TableCell>
                        <TableCell align="left">{row.telefono}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>                        
                        <TableCell align="left">
                          { row.registroCompletado ? (
                            <CheckIcon />
                          ) : (
                            <CloseIcon />
                          )}
                        </TableCell>                        
                      </TableRow>
                    )
                  )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        count={usuariosPaginados && usuariosPaginados.totalResults}
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
            )}
            
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usuariosPaginados: state.app.usuariosPaginados,
    requestGetUsuariosPaginados: state.app.requestGetUsuariosPaginados,
    errorMessage: state.app.errorMessage
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUsuariosPaginados: (pageSize, page, tipoCuenta, referidoPor, soloEmbajadores) => 
    dispatch(getUsuariosPaginados(pageSize, page, tipoCuenta, referidoPor, soloEmbajadores)),
  dispatch: (action) => {
    dispatch(action);
  },
});

IndexMisEmbajadores = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexMisEmbajadores);

export default IndexMisEmbajadores;
