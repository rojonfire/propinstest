import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import swal from "sweetalert2";
import { updateAgendaCliente, getAgendaClienteByPropiedadId, setAgendaCliente } from "../../action";
import { connect } from "react-redux";
import {
  Container,
} from "shards-react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const items = {
  Dia: ["Hra", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
  Tramos: [
    "08:00-08:30",
    "08:30-09:00",
    "09:00-09:30",
    "09:30-10:00",
    "10:00-10:30",
    "10:30-11:00",
    "11:00-11:30",
    "11:30-12:00",
    "12:00-12:30",
    "12:30-13:00",
    "13:00-13:30",
    "13:30-14:00",
    "14:00-14:30",
    "14:30-15:00",
    "15:00-15:30",
    "15:30-16:00",
    "16:00-16:30",
    "16:30-17:00",
    "17:00-17:30",
    "17:30-18:00",
    "18:00-18:30",
    "18:30-19:00",
    "19:00-19:30",
    "19:30-20:00",
  ],
};

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCheckBoxes: new Set(),
      feedbackCheck: {},
    };
    const { getAgendaClienteByPropiedadId } = this.props;
    getAgendaClienteByPropiedadId(this.props.propiedadId);
  }

  componentDidUpdate(prevProps, newProps) {
    if (this.props.agendaCliente != prevProps.agendaCliente) {
      const { feedbackCheck, selectedCheckBoxes } = this.state;
      const { agendaCliente } = this.props;
      if (agendaCliente) {
        let selected = selectedCheckBoxes;

        Object.keys(agendaCliente.bloques).map((item) => {
          let datos = agendaCliente.bloques[item];

          datos.map((b) => {
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
        feedbackCheck,
      });
    }
    }
  }

  componentWillUnmount() {
    const { setAgendaCliente } = this.props;
    setAgendaCliente(null);
  }

  getDayNumber = (dia) => {
    if (dia === "Lunes") return 1;
    if (dia === "Martes") return 2;
    if (dia === "Miercoles") return 3;
    if (dia === "Jueves") return 4;
    if (dia === "Viernes") return 5;
    if (dia === "Sabado") return 6;
    if (dia === "Domingo") return 0;
  };

  addTramo = (tramo, dia) => {
    const { feedbackCheck } = this.state;
    feedbackCheck[tramo + "" + dia] = !feedbackCheck[tramo + "" + dia];
    let selected = this.state.selectedCheckBoxes;
    let label = tramo + ";" + dia;
    if (selected.has(label)) {
      selected.delete(label);
    } else {
      selected.add(label);
    }
    this.setState({
      selectedCheckBoxes: selected,
      feedbackCheck,
    });
    this.props.onCheck(this.state.selectedCheckBoxes);
  };

  crearAgendaCliente = async () => {
    const { clienteId, propiedadId, updateAgendaCliente } = this.props;

    let selected = this.state.selectedCheckBoxes;
    let agendaTramos = [];
    selected.forEach((value) => {
      let val = value.split(";");
      agendaTramos.push({
        tramo: val[0],
        dia: val[1],
        clienteId: clienteId,
        propiedadId: propiedadId,
      });
    });

    if (agendaTramos.length <= 0) {
      swal({
        title: "Agenda",
        text: "Debe agregar al menos un tramo!",
        icon: "warning",
        dangerMode: false,
      });
      return;
    } else {
      updateAgendaCliente(agendaTramos);
    }
  };

  renderDias = () => {
    return items.Dia.map((item, i) => {
      return (
        <TableCell
          className="box-table letra-dias-semana bg-light week
        "
          key={i}
        >
          <div>{item}</div>
        </TableCell>
      );
    });
  };

  renderTramos = () => {
    const { feedbackCheck } = this.state;
    return items.Tramos.map((tramo, i) => {
      return (
        <TableRow key={i + tramo}>
          <TableCell className="box-table2">
            <text className="up-text-horario">{tramo}</text>
          </TableCell>
          <TableCell className="box-table">
            <input
              type="checkbox"
              checked={feedbackCheck[tramo + "" + 1] ? true : false}
              onChange={() => this.addTramo(tramo, 1)}
            />
          </TableCell>
          <TableCell className="box-table">
            <input
              type="checkbox"
              checked={feedbackCheck[tramo + "" + 2] ? true : false}
              onChange={() => this.addTramo(tramo, 2)}
            />
          </TableCell>
          <TableCell className="box-table">
            <input
              type="checkbox"
              checked={feedbackCheck[tramo + "" + 3] ? true : false}
              onChange={() => this.addTramo(tramo, 3)}
            />
          </TableCell>
          <TableCell className="box-table">
            <input
              type="checkbox"
              checked={feedbackCheck[tramo + "" + 4] ? true : false}
              onChange={() => this.addTramo(tramo, 4)}
            />
          </TableCell>
          <TableCell className="box-table">
            <input
              type="checkbox"
              checked={feedbackCheck[tramo + "" + 5] ? true : false}
              onChange={() => this.addTramo(tramo, 5)}
            />
          </TableCell>
          <TableCell className="box-table">
            <input
              type="checkbox"
              checked={feedbackCheck[tramo + "" + 6] ? true : false}
              onChange={() => this.addTramo(tramo, 6)}
            />
          </TableCell>
          <TableCell className="box-table">
            <input
              type="checkbox"
              checked={feedbackCheck[tramo + "" + 0] ? true : false}
              onChange={() => this.addTramo(tramo, 0)}
            />
          </TableCell>
        </TableRow>
      );
    });
  };

  render() {
    const { requestAgendaCliente } = this.props;
    return (
      <Container>
        { requestAgendaCliente === "LOADING" && (<div>Cargando...</div>)}
        { requestAgendaCliente !== "LOADING" && (
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    {this.renderDias()}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.renderTramos()}
                </TableBody>
              </Table>
            </TableContainer>

            <div className="text-center mt-2">
              {!this.props.hideButton && (
                <Button
                  className="btn btn-primary"
                  onClick={this.crearAgendaCliente}
                  disabled={this.props.requestUpdateAgendaCliente !== "LOADING" ? false : true}
                >
                  { this.props.requestUpdateAgendaCliente !== "LOADING" ? 'Confirmar Agenda' : 'Cargando...'}
                </Button>
              )}
            </div>
          </div>
        )}
        
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.app,
  ...state.auth,
  userData: state.app.userData,
  requestUpdateAgendaCliente: state.app.requestUpdateAgendaCliente,
  requestAgendaCliente: state.app.requestAgendaCliente,
});

const mapDispatchToProps = (dispatch) => ({
  getAgendaClienteByPropiedadId: (idPropiedad) => dispatch(getAgendaClienteByPropiedadId(idPropiedad)),
  updateAgendaCliente: (data) => dispatch(updateAgendaCliente(data)),
  setAgendaCliente: (value) => dispatch(setAgendaCliente(value))
});

Schedule = connect(mapStateToProps, mapDispatchToProps)(Schedule);

export default Schedule;
