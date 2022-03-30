import React from "react";
import {
  postUploadPropiedadesPI,
  postAddSuscripcion,
  getSuscripcionExport,
  getSuscripcionLastUpdated,
  postReferirEmbajador,
  postReferirVendedor,
} from "../../action";
import { connect } from "react-redux";
import { Container, Row, Col, Modal, ModalBody, Card } from "shards-react";
import Swal from "sweetalert2";
import { Formik } from "formik";
import TablaSuscripciones from "../Suscripcion";

class IndexReferir extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      ModalReferirEmbajadores: false,
      ModalReferirVendedores: false,
      showTable: false,
    };
    this.toggleModalReferirEmbajadores = this.toggleModalReferirEmbajadores.bind(
      this
    );
    this.toggleModalReferirVendedores = this.toggleModalReferirVendedores.bind(
      this
    );
    this.toggleshowTable = this.toggleshowTable.bind(this);
  }
  toggleModalReferirEmbajadores() {
    this.setState({
      ModalReferirEmbajadores: !this.state.ModalReferirEmbajadores,
    });
  }
  toggleModalReferirVendedores() {
    this.setState({
      ModalReferirVendedores: !this.state.ModalReferirVendedores,
    });
  }

  toggleshowTable() {
    this.setState({
      showTable: !this.state.showTable,
    });
  }

  onSubmitReferirEmbajador = (formData) => {
    const { postReferirEmbajador } = this.props;
    postReferirEmbajador(formData);
  };

  onSubmitReferirVendedor = (formData) => {
    const { postReferirVendedor } = this.props;
    postReferirVendedor(formData);
  };

  validateReferirEmbajadorForm = (formValues) => {
    const errors = {};
    if (!formValues.nombres) {
      errors.nombres = "Por favor ingrese un nombre";
    }
    if (!formValues.email) {
      errors.email = "Por favor ingrese email";
    }
    if (!formValues.telefono) {
      errors.telefono = "Por favor ingrese telefono";
    }
    return errors;
  };

  validateReferirVendedorForm = (formValues) => {
    const errors = {};
    if (!formValues.nombres) {
      errors.nombres = "Por favor ingrese un nombre";
    }
    if (!formValues.email) {
      errors.email = "Por favor ingrese email";
    }
    if (!formValues.telefono) {
      errors.telefono = "Por favor ingrese telefono";
    }
    if (!formValues.comuna) {
      errors.comuna = "Por favor ingrese comuna";
    }
    return errors;
  };

  feedbackModalReferirEmbajador = () => {
    const { requestReferirEmbajador, errorMessage } = this.props;

    if (requestReferirEmbajador === "LOADING") {
      Swal.showLoading();
    }

    if (requestReferirEmbajador === "SUCCESS") {
      Swal.fire({
        title: "Referir embajador",
        text: "Se ha referido el embajador exitosamente",
        icon: "success",
        onAfterClose: () => {
          this.toggleModalReferirEmbajadores();
        },
      });
    }

    if (requestReferirEmbajador === "ERROR") {
      Swal.fire("Error", errorMessage, "error");
    }
  };

  feedbackModalReferirVendedor = () => {
    const { requestReferirVendedor } = this.props;

    if (requestReferirVendedor === "LOADING") {
      Swal.showLoading();
    }

    if (requestReferirVendedor === "SUCCESS") {
      Swal.fire({
        title: "Referir vendedor",
        text: "Se ha referido el vendedor exitosamente",
        icon: "success",
        onAfterClose: () => {
          this.toggleModalReferirVendedores();
        },
      });
    }

    if (requestReferirVendedor === "ERROR") {
      Swal.fire("Error", "No se ha podido referir al vendedor", "error");
    }
  };

  render() {
    const {
      ModalReferirEmbajadores,
      ModalReferirVendedores,
      showTable,
    } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Modal
          fade={false}
          open={ModalReferirEmbajadores}
          toggle={this.toggleModalReferirEmbajadores}
        >
          <div className="center titulo-modal">
            Complete para referir a embajador
          </div>
          <ModalBody>
            {this.feedbackModalReferirEmbajador()}
            <Formik
              initialValues={{ nombres: "", email: "", telefono: "" }}
              onSubmit={this.onSubmitReferirEmbajador}
              validate={this.validateReferirEmbajadorForm}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <div className="tag-name">Nombre</div>
                  <div className="center">
                    <input
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.nombres}
                      name="nombres"
                      className="input-formulario"
                    />
                  </div>
                  {props.errors.nombres && (
                    <div className="center">{props.errors.nombres}</div>
                  )}

                  <div className="tag-name">Correo</div>
                  <div className="center">
                    <input
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                      name="email"
                      className="input-formulario"
                    />
                  </div>
                  {props.errors.email && (
                    <div className="center">{props.errors.email}</div>
                  )}
                  <div className="tag-name">Teléfono</div>
                  <div className="center">
                    <input
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.telefono}
                      name="telefono"
                      className="input-formulario"
                    />
                  </div>
                  {props.errors.telefono && (
                    <div className="center">{props.errors.telefono}</div>
                  )}

                  <div className="center">
                    <button className="btn-referir" type="submit">
                      Enviar
                    </button>{" "}
                  </div>
                </form>
              )}
            </Formik>
          </ModalBody>
        </Modal>

        <Modal
          fade={false}
          open={ModalReferirVendedores}
          toggle={this.toggleModalReferirVendedores}
        >
          <div className="center titulo-modal">
            Complete para referir a Vendedor
          </div>
          <ModalBody>
            {this.feedbackModalReferirVendedor()}
            <Formik
              initialValues={{
                nombres: "",
                email: "",
                telefono: "",
                comuna: "",
              }}
              onSubmit={this.onSubmitReferirVendedor}
              validate={this.validateReferirVendedorForm}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <div className="tag-name">Nombre</div>
                  <div className="center">
                    <input
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.nombres}
                      name="nombres"
                      className="input-formulario"
                    />
                  </div>
                  {props.errors.nombres && (
                    <div className="center">{props.errors.nombres}</div>
                  )}

                  <div className="tag-name">Email</div>
                  <div className="center">
                    <input
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                      name="email"
                      className="input-formulario"
                    />
                  </div>
                  {props.errors.email && (
                    <div className="center">{props.errors.email}</div>
                  )}

                  <div className="tag-name">Teléfono</div>
                  <div className="center">
                    <input
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.telefono}
                      name="telefono"
                      className="input-formulario"
                    />
                  </div>
                  {props.errors.telefono && (
                    <div className="center">{props.errors.telefono}</div>
                  )}

                  <div className="tag-name">Comuna</div>
                  <div className="center">
                    <input
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.comuna}
                      name="comuna"
                      className="input-formulario"
                    />
                  </div>
                  {props.errors.comuna && (
                    <div className="center">{props.errors.comuna}</div>
                  )}

                  <div className="center">
                    <button className="btn-referir" type="submit">
                      Enviar
                    </button>{" "}
                  </div>
                </form>
              )}
            </Formik>
          </ModalBody>
        </Modal>
        <Row>
          <Col>
            <Card className="card-linda-referir">
              {" "}
              <div className="titulos-referir">Embajadores</div>
              <Row>
                <Col md="12" className="center">
                  <button
                    onClick={this.toggleModalReferirEmbajadores}
                    className="btn-referir"
                  >
                    Referir
                  </button>{" "}
                </Col>
              </Row>
            </Card>
          </Col>
          <Col>
            <Card className="card-linda-referir">
              {" "}
              <div className="titulos-referir">Vendedores</div>
              <Row>
                <Col md="12" className="center">
                  <button
                    onClick={this.toggleModalReferirVendedores}
                    className="btn-referir"
                  >
                    Referir
                  </button>{" "}
                </Col>
              </Row>
            </Card>
          </Col>
          <Col>
            <Card className="card-linda-referir">
              {" "}
              <div className="titulos-referir">Compradores</div>
              <div className="subtitulo-referir">(Personal Broker)</div>
              <Row>
                <Col md="12" className="center">
                  <button
                    onClick={this.toggleshowTable}
                    className="btn-referir"
                  >
                    Referir
                  </button>{" "}
                </Col>
              </Row>
            </Card>
          </Col>
          <Col>
            <Card className="card-linda-referir">
              {" "}
              <div className="titulos-referir">Propiedades</div>
              <Row>
                <Col md="12" className="center">
                  <button className="btn-Proximamente">Próximamente</button>{" "}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        {showTable && (
          <div className="margin-tabla">
            <TablaSuscripciones />
          </div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    requestPostUploadPIPropiedades: state.app.requestPostUploadPIPropiedades,
    requestPostAddSuscripcion: state.app.requestPostAddSuscripcion,
    suscripcionExcel: state.app.suscripcionExcel,
    requestSuscripcionExcel: state.app.requestSuscripcionExcel,
    suscripcionLastUpdated: state.app.suscripcionLastUpdated,
    requestSuscripcionLastUpdated: state.app.requestSuscripcionLastUpdated,
    embajador: state.app.embajador,
    requestReferirEmbajador: state.app.requestReferirEmbajador,
    vendedor: state.app.vendedor,
    requestReferirVendedor: state.app.requestReferirVendedor,
    errorMessage: state.app.errorMessage
  };
};

const mapDispatchToProps = (dispatch) => ({
  postUploadPropiedadesPI: (tipo, file) =>
    dispatch(postUploadPropiedadesPI(tipo, file)),
  postAddSuscripcion: (data) => dispatch(postAddSuscripcion(data)),
  getSuscripcionExport: () => dispatch(getSuscripcionExport()),
  getSuscripcionLastUpdated: () => dispatch(getSuscripcionLastUpdated()),
  postReferirEmbajador: (data) => dispatch(postReferirEmbajador(data)),
  postReferirVendedor: (data) => dispatch(postReferirVendedor(data)),
  dispatch: (action) => {
    dispatch(action);
  },
});

IndexReferir = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexReferir);

export default IndexReferir;
