import React, {Component} from "react";
import {connect} from "react-redux";
import {Container, Row, Card, Button, Col, ListGroup} from "react-bootstrap";
import Calendar from "react-calendar";
import moment from "moment";
import api from "../../../api";
import {LoadingModal} from "../../../components/Loading";

export class ReservaHoras extends Component {
    constructor(props) {
        super(props);

        this.state = {
            daycalendar: "",
            day: new Date(),
            show: false,
            hora: "",
            bloques: [],
            tramosOcupados: [],
            loading: false
        };
    }

    componentDidUpdate = async (prevProps) => {
        const {diaElegido, proyecto} = this.props;
        if (proyecto && proyecto.inmobiliariaId && prevProps.diaElegido !== diaElegido) {
            const datos = await api.apiGetVisitasClienteByFechaYId(
                proyecto.inmobiliariaId,
                moment(diaElegido).format("YYYY-MM-DD")
            );
            console.log("datos")
            console.log(datos)
            this.setState({
                tramosOcupados: datos.data
            });
        }
    };

    changeDay = async day => {
        const {proyecto} = this.props;
        console.log("proyecto changeDay:", proyecto)
        const datos = await api.apiGetVisitasClienteByFechaYId(
            proyecto.inmobiliariaId,
            moment(day).format("YYYY-MM-DD")
        );
        this.setState({
            daycalendar: moment(day),
            day,
            hora: "",
            tramosOcupados: datos.data
        });
    };

    onAddReserva = (hora, agenteId, idBloque) => {
        this.setState({hora, agenteId, idBloque});
    };
    addReservaUsuario = async () => {
        try {
            this.setState({loading: true});
            const {diaElegido, userId, onSetDayAndTramo, proyectoId} = this.props;
            const {daycalendar, hora, agenteId} = this.state;
            let dayShowcalendar = daycalendar === "" ? diaElegido : daycalendar;
            let datos = {
                usuarioId: userId,
                clienteId: "",
                dia: moment(dayShowcalendar).isoWeekday(),
                agenteId: agenteId,
                proyectoId: proyectoId,
                tramo: hora,
                fecha: new Date(moment(dayShowcalendar))
            };

            let res = await api.apiPostAgendaVisitaAgente(datos);
            onSetDayAndTramo(dayShowcalendar, hora, this.props.nextStep);
            if (res.estado === 1) {
                onSetDayAndTramo(dayShowcalendar, hora, this.props.nextStep);
            }

        } catch (error) {
            console.log("error: ", error);
        } finally {
            this.setState({loading: false});
        }
    };

    render() {
        const {diaElegido, bloquesDia, ocupados} = this.props;
        const {daycalendar, tramosOcupados, loading} = this.state;

        let dayNumber;
        let bloquesDay = [];
        let horasOcupadasHoy = [];
        moment(new Date(diaElegido)).isoWeekday();
        dayNumber = moment(daycalendar).isoWeekday();

        if (isNaN(dayNumber)) {
            dayNumber = moment(new Date(diaElegido)).isoWeekday();
        }

        if (dayNumber === 1) bloquesDay = bloquesDia.bloques["Lunes"];
        if (dayNumber === 2) bloquesDay = bloquesDia.bloques["Martes"];
        if (dayNumber === 3) bloquesDay = bloquesDia.bloques["Miercoles"];
        if (dayNumber === 4) bloquesDay = bloquesDia.bloques["Jueves"];
        if (dayNumber === 5) bloquesDay = bloquesDia.bloques["Viernes"];
        if (dayNumber === 6) bloquesDay = bloquesDia.bloques["Sabado"];
        if (dayNumber === 7) bloquesDay = bloquesDia.bloques["Domingo"];
        console.log("bloquesday")
        // console.log("bloquesDay:", bloquesDay)

        tramosOcupados !== null &&
        tramosOcupados.map(t => {
            bloquesDay = bloquesDay.filter(item => item.tramo !== t);
            return null;
        });

        let dayShowcalendar = diaElegido ? diaElegido : daycalendar;

        let dayOfWeek =
            daycalendar === ""
                ? moment(diaElegido).format("LL")
                : moment(daycalendar).format("LL")

        let dayOfWeekDateFormat =
            daycalendar === ""
                ? moment(diaElegido)._d
                : moment(daycalendar)._d

        if (bloquesDay && bloquesDay.length > 0) {
            bloquesDay.sort((a, b) => (a.tramo > b.tramo) ? 1 : -1)
        }

        let today = new Date()

        if (dayOfWeekDateFormat.getFullYear() === today.getFullYear() &&
            dayOfWeekDateFormat.getMonth() === today.getMonth() &&
            dayOfWeekDateFormat.getDate() === today.getDate()
        ) {
            bloquesDay = bloquesDay.filter(item => new Date(today.getFullYear(),
                today.getMonth(),
                today.getDate(),
                parseInt(item.tramo.slice(0, 2)) - 1,
                parseInt(item.tramo.slice(3, 5)))
                > today);
        }
        if (ocupados.length > 0) {
            horasOcupadasHoy = ocupados.filter(item => dayOfWeekDateFormat.getFullYear() === item.fullFecha.getFullYear() &&
                dayOfWeekDateFormat.getMonth() === item.fullFecha.getMonth() &&
                dayOfWeekDateFormat.getDate() === item.fullFecha.getDate()
            );
        }

        if (horasOcupadasHoy.length > 0) {
            let i;
            for (i = 0; i < horasOcupadasHoy.length; i++) {
                bloquesDay = bloquesDay.filter(item => item.tramo !== horasOcupadasHoy[i].tramo);
            }
        }

        let HorasReservas = {
            bloques: bloquesDay
        };
        console.log("Horas Reserva Bloques")
        console.log(HorasReservas.bloques)

        return (
            <Container fluid="true">
                {loading && <LoadingModal porcentaje={0} finish={() => void 0}/>}
                <section className="section-space reservar-fotografo">
                    <Container>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Img variant="top" src=""/>
                                <Card.Title>
                                    <div className="title-section text-center">
                                        <h4 className="h4">Agendar hora de Live</h4>
                                    </div>
                                </Card.Title>
                                <Card.Text>
                                    Seleccione una hora para su visita virtual
                                </Card.Text>

                                <Row>
                                    <div className="col-md-6">
                                        <div className="cont-pagination-arrow">
                                            <span className="h4">{dayOfWeek}</span>
                                        </div>
                                        <div className="cont-btn button-proyecto">
                                            {HorasReservas.bloques &&
                                            HorasReservas.bloques.map((num, i) => (

                                                <Button
                                                    key={i}
                                                    onClick={() => this.onAddReserva(num.tramo, num.agenteId, num.id)}
                                                    variant="primary"
                                                    block
                                                >
                                                    {num.tramo}
                                                </Button>
                                            ))}
                                        </div>
                                        {HorasReservas.bloques &&
                                        HorasReservas.bloques.length <= 0 && (
                                            <div className="cont-btn">
                                                No hay tramos disponibles para este día
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <Calendar
                                            className="button-proyecto"
                                            value={dayShowcalendar && new Date(dayShowcalendar)}
                                            minDate={new Date()}
                                            onChange={this.changeDay}
                                        />
                                        <Row>
                                            <Col md={12}>
                                                <ListGroup>
                                                    <ListGroup.Item active>Datos Reserva</ListGroup.Item>
                                                    <ListGroup.Item>Día: {dayOfWeek}</ListGroup.Item>
                                                    <ListGroup.Item>
                                                        Hora: {this.state.hora}
                                                    </ListGroup.Item>

                                                    <ListGroup.Item>
                                                        {HorasReservas.bloques && (
                                                            <Button
                                                                className="button-proyecto"
                                                                onClick={this.addReservaUsuario}>
                                                                Confirmar Live
                                                            </Button>
                                                        )}
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container>
                </section>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    ...state.auth,
    user: state.user,
    proyecto: state.app.proyectoData
});

const mapDispatchToProps = dispatch => ({});

ReservaHoras = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReservaHoras);

export default ReservaHoras;
