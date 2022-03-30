import React from "react";
import PageTitle from "../../components/common/PageTitle";
import {
  getAllLandingInmobiliarias,
  setLandingInmobiliaria,
  fetchGetAllInmobiliarias
} from "../../action";
import { connect } from "react-redux";
import { Container, Row, Col } from "shards-react";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import TablaLandingInmobiliarias from "./TablaLandingInmobiliarias";
import TablePagination from "@material-ui/core/TablePagination";
import { Link } from "react-router-dom";

class IndexLandingInmobiliaria extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      rowsPerPage: 10,
      page: 0,
      totalResults: 0,
    };

    const {
      getAllLandingInmobiliarias,
      fetchGetAllInmobiliarias
    } = this.props;
    getAllLandingInmobiliarias();
    fetchGetAllInmobiliarias();
  }

  tablePagination = (data) => {
    if (data) {
      return (
        <TablePagination
          count={data.totalResults}
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
      );
    } else {
      return <div />;
    }
  };

  handleChangePage = (event, newPage) => {
    const { rowsPerPage } = this.state;
    this.setState({
      page: newPage,
    });
    const { getAllLandingInmobiliarias } = this.props;
    getAllLandingInmobiliarias(newPage + 1, rowsPerPage);
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
    const { getAllLandingInmobiliarias } = this.props;
    getAllLandingInmobiliarias(1, parseInt(event.target.value, 10));
  };

  feedback = () => {
    const {
      requestGetAllLandingInmobiliarias,
      errorMessage,
    } = this.props;

    if (requestGetAllLandingInmobiliarias === "LOADING") {
      Swal.showLoading();
    } else {
      Swal.close();
    }
    
    if (requestGetAllLandingInmobiliarias === "ERROR") {
      Swal.fire("Error", errorMessage, "error");
    }
  };

  render() {
    const {
      setLandingInmobiliaria,
      landingInmobiliarias
    } = this.props;

    return (
      <Container fluid className="main-content-container px-4">
        { this.feedback() }
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Landing Inmobiliarias"
            subtitle="Gestiona las landing page de nuestras inmobiliarias"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col md={9} className={"text-right float-right"} />
          <Col md={3} className={"text-right float-right"}>
            <Link
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
              to={`/landinginmobiliaria/add`}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={setLandingInmobiliaria(null)}
                color="primary"
              >
                Agregar landing inmobiliaria
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <TablaLandingInmobiliarias
              listaLandingInmobiliarias={landingInmobiliarias && landingInmobiliarias.results}
              page={this.state.page}
              rowsPerPage={this.state.rowsPerPage}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              tablePagination={() => this.tablePagination(landingInmobiliarias)}
              feedback={this.tablaFeedback}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemInmobiliarias: state.app.itemInmobiliarias,
    requestGetAllLandingInmobiliarias: state.app.requestGetAllLandingInmobiliarias,
    requestGetAllInmobiliarias: state.app.requestGetAllInmobiliarias,
    landingInmobiliarias: state.app.landingInmobiliarias,
    errorMessage: state.app.errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllLandingInmobiliarias: () =>
    dispatch(getAllLandingInmobiliarias()),
  setLandingInmobiliaria: (data) => dispatch(setLandingInmobiliaria(data)),
  fetchGetAllInmobiliarias: () => dispatch(fetchGetAllInmobiliarias())
});

IndexLandingInmobiliaria = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexLandingInmobiliaria);

export default IndexLandingInmobiliaria;
