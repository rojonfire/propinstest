import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import { Modal, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { putSerEmbajador } from "../../action";
import { LoadingModal } from "../../components/Loading";
import swal from "sweetalert";

class QuieroSerEmbajador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      loading: false,
    };
  }

  save = (formValues, e) => {
    const { putSerEmbajador } = this.props;
    putSerEmbajador();
  };

  updateFeedback = () => {
    const { requestSerEmbajador, errorMessage } = this.props;
    if (requestSerEmbajador === "LOADING") {
      return <LoadingModal porcentaje={0} finish={() => void 0} />;
    }
    if (requestSerEmbajador === "ERROR") {
      swal({
        icon: "error",
        text: errorMessage,
        title: "Error"
      });
    }
    if (requestSerEmbajador === "SUCCESS") {
      swal({
        title: "Cambio exitoso",
        text: "Felicidades, ya eres un embajador! A tu izquierda encontrarás una nueva sección dedicada a tus nuevas acciones como embajador una vez se actualice la página",
        icon: "success",
        buttons: {
          cancel: false,
          confirm: true,
        },
      }).then((value) => {
        window.location.reload();
      });
    }
    return null;
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        {this.updateFeedback()}
        <Modal.Header closeLabel=" " closeButton>
          <Modal.Title>Quiero ser embajador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>¿Qué significa ser embajador de Propins?</h3>
          <p>
            Significa esto y lo otro
          </p>

          <h3>¿Cómo puedo convertirme en embajador?</h3>
          <p>
            Sólo haz click en el botón Confirmar ser embajador, y podrás empezar a referir desde ya!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Cancelar
          </Button>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={(e) => this.save()}
          >
            Confirmar ser embajador
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.app,
  ...state.auth,
  requestSerEmbajador: state.app.requestSerEmbajador,
  errorMessage: state.app.errorMessage
});

const mapDispatchToProps = (dispatch) => ({
  putSerEmbajador: (userData) => dispatch(putSerEmbajador(userData)),
  dispatch: (action) => {
    dispatch(action);
  },
});

QuieroSerEmbajador = connect(mapStateToProps, mapDispatchToProps)(QuieroSerEmbajador);

export default QuieroSerEmbajador;
