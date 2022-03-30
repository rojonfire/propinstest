import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Grid, Col, Row, Table, Glyphicon, Modal } from "react-bootstrap";
import { fetchGetAllVisitas } from "../../action";

export class IndexVisita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  componentDidMount() {
    const { getVisitas } = this.props;
    getVisitas();
  }

  openModal = () => {
    this.setState({
      modal: true
    });
  };

  handleHide = () => {
    this.setState({ modal: false });
  };

  render() {
    const item = this.props.itemVisitas.map((p, i) => (
      <tr key={i}>
        <td />
        <td>{p.nombreCliente}</td>
        <td>{p.nombreUsuario}</td>
        <td>{p.nombreAnfitrion}</td>
        <td>{p.fechaVisita}</td>
        <td>{p.estado}</td>
        <td>
          <Glyphicon glyph="pushpin" onClick={this.openModal} />{" "}
        </td>
      </tr>
    ));
    return (
      <div>
        Visitas
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Usuario</th>
              <th>Anfitrión</th>
              <th>Fecha Visita</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>{item}</tbody>
        </Table>
        <div className="static-modal">
          <Modal
            show={this.state.modal}
            container={this}
            onHide={this.handleHide}
          >
            <Modal.Header closeButton>
              <Modal.Title>Ofertas Realizadas</Modal.Title>
            </Modal.Header>

            <Modal.Body>One fine body...</Modal.Body>

            <Modal.Footer />
          </Modal>
        </div>
      </div>
    );
  }
}

const formConf = {
  form: "my-form"
};

const mapStateToProps = state => ({
  itemVisitas: state.app.itemVisitas
});

const mapDispatchToProps = dispatch => ({
  getVisitas: () => dispatch(fetchGetAllVisitas())
});

IndexVisita = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexVisita);
IndexVisita = reduxForm(formConf)(IndexVisita);
export default IndexVisita;
