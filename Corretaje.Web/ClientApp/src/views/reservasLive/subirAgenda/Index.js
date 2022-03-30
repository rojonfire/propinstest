import React, { Component } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { setUser } from "../../../action";
import Schedule from "../../components/Schedule";


export class IndexReservaAgendamientoUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCheckBoxes: new Set(),
      feedbackCheck: {}
    };
  }

  handleCheck = (values) => {
    //console.log("check!!");
    //this.props.onCheck(values);
  }

  componentDidMount = async () => {
    const { clienteId, userId, setUser } = this.props;

    if (!clienteId && userId) {
      const getUser = await api.apiGetUsuarioById(userId);
      const user = getUser.data;
      setUser(user);
    }

    const { feedbackCheck, selectedCheckBoxes } = this.state;
    let bloques = await api.apiGetAgendaCliente(clienteId);
    if (bloques && bloques.data) {
      let selected = selectedCheckBoxes;

      Object.keys(bloques.data.bloques).map(item => {
        let datos = bloques.data.bloques[item];

        datos.map(b => {
          let dianum = this.getDayNumber(item);
          feedbackCheck[b.tramo + dianum] = true;
          let label = b.tramo + ";" + dianum;
          if (selected.has(label)) {
            selected.delete(label);
          } else {
            selected.add(label);
          }
          return null;
        });

        return null;
      });

      this.setState({
        feedbackCheck
      });
    }
    console.log("ASDASDAS")
  };

  getDayNumber = dia => {
    if (dia === "Lunes") return 1;
    if (dia === "Martes") return 2;
    if (dia === "Miercoles") return 3;
    if (dia === "Jueves") return 4;
    if (dia === "Viernes") return 5;
    if (dia === "Sabado") return 6;
    if (dia === "Domingo") return 0;
  };


  render() {
    return (
      <Schedule hideButton={true} reservasLive={false} />
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth,
  ...state.app.user
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user))
});

IndexReservaAgendamientoUsuario = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexReservaAgendamientoUsuario);

export default IndexReservaAgendamientoUsuario;
