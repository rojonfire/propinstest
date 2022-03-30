import React from "react";
import PageTitle from "../../../components/common/PageTitle";
import { postLandingInmobiliaria, updateLandingInmobiliaria, fetchGetAllInmobiliarias } from "../../../action";
import { connect } from "react-redux";
import { Container, Row } from "shards-react";
import Swal from 'sweetalert2'
import FormularioLandingInmobiliaria from "./FormularioLandingInmobiliaria";

class AgregarEditarLandingInmobiliaria extends React.Component {
  constructor(...args) {
    super(...args);
  }

  onSubmit = (values) => {
    const { postLandingInmobiliaria, updateLandingInmobiliaria, match } = this.props;

    if (match && match.params && match.params.id) {
      updateLandingInmobiliaria(match.params.id, values);
    } else {
      postLandingInmobiliaria(values);
    }

  };

  feedback = () => {
    const { requestPostLandingInmobiliaria, requestUpdateLandingInmobiliaria, errorMessage, history } = this.props;
    if (requestPostLandingInmobiliaria === "LOADING" || requestUpdateLandingInmobiliaria === "LOADING") {
      Swal.showLoading();
    }

    if (requestPostLandingInmobiliaria === "SUCCESS") {
      Swal.fire({
        title: "Landing inmobiliaria agregado",
        text: "Se ha añanido la landing inmobiliaria exitosamente",
        type: "success",
        onAfterClose: () => {
          history.push("/landinginmobiliaria");
        }
      });
    }

    if (requestUpdateLandingInmobiliaria === "SUCCESS") {
      Swal.fire({
        title: "Landing inmobiliaria editada",
        text: "Se ha editado la landing inmobiliaria exitosamente",
        type: "success",
        onAfterClose: () => {
          history.push("/landinginmobiliaria");
        }
      });
    }

    if (requestPostLandingInmobiliaria === "ERROR") {
      Swal.fire("Error", errorMessage, "error");
    }

    if (requestUpdateLandingInmobiliaria === "ERROR") {
      Swal.fire("Error", errorMessage, "error");
    }

  };

  render() {
    const { landingInmobiliaria, itemInmobiliarias } = this.props;
    console.log(itemInmobiliarias);
    
    return (
      <Container fluid className="main-content-container px-4">
        { this.feedback() }
        <Row noGutters className="page-header">
          <PageTitle
            sm="4"
            title="Landing inmobiliaria"
            subtitle="Crear o editar"
            className="text-sm-left"
          />
        </Row>
        <FormularioLandingInmobiliaria values={landingInmobiliaria} onSubmit={this.onSubmit} inmobiliarias={itemInmobiliarias} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    requestGetAllInmobiliarias: state.app.requestGetAllInmobiliarias,
    itemInmobiliarias: state.app.itemInmobiliarias,
    requestPostLandingInmobiliaria: state.app.requestPostLandingInmobiliaria,
    landingInmobiliaria: state.app.landingInmobiliaria,
    requestUpdateLandingInmobiliaria: state.app.requestUpdateLandingInmobiliaria
  };
};

const mapDispatchToProps = (dispatch) => ({
  postLandingInmobiliaria: (data) => dispatch(postLandingInmobiliaria(data)),
  fetchGetAllInmobiliarias: () => dispatch(fetchGetAllInmobiliarias()),
  updateLandingInmobiliaria: (id, data) => dispatch(updateLandingInmobiliaria(id, data)),
  dispatch: (action) => {
    dispatch(action);
  },
});

AgregarEditarLandingInmobiliaria = connect(
  mapStateToProps,
  mapDispatchToProps
)(AgregarEditarLandingInmobiliaria);

export default AgregarEditarLandingInmobiliaria;
