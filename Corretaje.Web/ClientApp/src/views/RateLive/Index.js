/** @format */

import React, { Component } from 'react';
import {
  Container,
  Button
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { postCalificacion,
  joinedZoomMeeting,
  cleanSignature,
  fetchGetInmobiliaria,
  setInmobiliariaIdState,
  cleanInmobiliaria,
  setProyectoData,
  setProyectoIdState} from '../../action/index';
import 'react-alice-carousel/lib/alice-carousel.css';
import 'moment-timezone';
import StarRatings from 'react-star-ratings'; 
import api from "../../api";
import ReactGa from 'react-ga'



export const initGA = () => {
  console.log('GA init')
  ReactGa.initialize('UA-167957495-1')
  }

export const logPageView = () => {
  ReactGa.set({page: window.location.pathname})
  ReactGa.pageview(window.location.pathname)
}

export class RateLive extends Component {
  constructor(props) {
    super(props);

    this.shareLink = window.location.href;

    this.state = {
        recomendacionAgente: "",
        recomendacionProyecto: "",
        ratingAgente: 0,
        ratingRentabilidad: 0,
        ratingConectividad: 0,
        ratingPlusvalia: 1,
        ratingTerminaciones: 0,
        ratingEquipamiento: 0,
        rateComponent: "host",
        proyectoId: "",
        meetingEnd: new Date().getTime(),
        agenteId: "",
    };
    this.handleChangeRecomendacionAgente = this.handleChangeRecomendacionAgente.bind(this);
    this.handleChangeRecomendacionProyecto = this.handleChangeRecomendacionProyecto.bind(this);
  }

  componentDidMount = async () => {
    const { user, joinedMeeting, history, dispatch, match, proyectoData } = this.props
    dispatch(cleanSignature())
    let proyectoId = match.params.id1;
    let inmobiliariaId = match.params.id2;   
    // Si joinedMeeting es false significa que nunca se levanto la sala de zoom
    if (joinedMeeting === false) {
      history.push(inmobiliariaId ? "/live/info-proyecto/" + proyectoId + "/" + inmobiliariaId : "/live/info-proyecto/" + proyectoId);
    }
    let meetingEnd = new Date().getTime()
    let cita = await api.apiGetCitaUsuario(user.userId, proyectoId)
    if (inmobiliariaId) {
      dispatch(setInmobiliariaIdState(inmobiliariaId));
      dispatch(fetchGetInmobiliaria(inmobiliariaId))
    } else {
      dispatch( cleanInmobiliaria());
    }
    if (proyectoData === undefined) {
      const proyectoInfo = await api.apiGetUnProyecto(proyectoId);
      dispatch(setProyectoIdState(proyectoInfo.id));
      dispatch(setProyectoData(proyectoInfo))
    } else if (proyectoData.id !== proyectoId) {
      const proyectoInfo = await api.apiGetUnProyecto(proyectoId);
      dispatch(setProyectoIdState(proyectoInfo.id));
      dispatch(setProyectoData(proyectoInfo))
    }
    this.setState({
        proyectoId: proyectoId,
        meetingEnd: meetingEnd,
        agenteId: cita && cita.agenteId ? cita.agenteId : ""
    });
    initGA();
    logPageView();
  }

  changeRatingAgente = ( newRating) => {
    this.setState({
        ratingAgente: newRating
    });
  }

  changeRatingRentabilidad = ( newRating ) => {
    this.setState({
        ratingRentabilidad: newRating
    });
  }

  changeRatingConectividad = ( newRating ) => {
    this.setState({
        ratingConectividad: newRating
    });
  }

  changeRatingPlusvalia = ( newRating ) => {
    this.setState({
        ratingPlusvalia: newRating
    });
  }

  changeRatingTerminaciones = ( newRating ) => {
    this.setState({
        ratingTerminaciones: newRating
    });
  }

  changeRatingEquipamiento = ( newRating ) => {
    this.setState({
        ratingEquipamiento: newRating
    });
  }

  changeComponent = () => {
    this.setState({
        rateComponent: "proyect"
    });
  }

  submitRate = async () => {
    const { dispatch, user, history, meetingStart, inmobiliariaId } = this.props
    const { proyectoId, meetingEnd, agenteId } = this.state
    let totalTime =  meetingEnd - meetingStart
    let rate = {
        proyectoInmobiliarioId: proyectoId,
        evaluadorId: user.userId,
        agenteId: agenteId,
        evaluacion: this.state.ratingAgente,
        comentario: this.state.recomendacionAgente,
        comentarioProyecto: this.state.recomendacionProyecto,

        evaluacionRentabilidad: this.state.ratingRentabilidad,
        evaluacionConectividad: this.state.ratingConectividad,
        evaluacionTerminaciones: this.state.ratingTerminaciones,
        evaluacionEquipamiento: this.state.ratingEquipamiento,
        evaluacionPlusvalia: this.state.ratingPlusvalia,
        duracion: this.msToTime(totalTime).slice(0, 5)
    }
    await dispatch(postCalificacion(rate))
    dispatch(joinedZoomMeeting(false))
    history.push(inmobiliariaId ? "/live/info-proyecto/" + proyectoId + "/" + inmobiliariaId : "/live/info-proyecto/" + proyectoId);
  }

  handleChangeRecomendacionAgente = (event) => {
    this.setState({
        recomendacionAgente: event.target.value
    });
  }

  handleChangeRecomendacionProyecto = (event) => {
    this.setState({
        recomendacionProyecto: event.target.value
    });
  }

  msToTime = (duration) => {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }

  render() {
    const { ratingAgente, rateComponent, ratingRentabilidad, proyectoId,
        ratingConectividad, ratingTerminaciones,
        ratingEquipamiento, recomendacionAgente, recomendacionProyecto} = this.state
        const { history, inmobiliariaId } = this.props
    return (

    rateComponent === "host"
    ? <Container fluid={true} className="bg-light live-custom rate-holder">
        <Container className="rate-agent-project centered-text">
                <h5 className="centered-text" style={{fontWeight: "bold"}}>¿Cómo calificarías a nuestro ANFITRIÓN?</h5>
                <br/>
                <span className="centered-text">Tu experiencia es importante para nosotros</span>
                <br/>
                <br/>
                <StarRatings
                    rating={ratingAgente}
                    starRatedColor="rgba(252, 186, 3, 1)"
                    changeRating={this.changeRatingAgente}
                    numberOfStars={5}
                    name='rating'
                    starHoverColor="rgba(252, 186, 3, 0.5)"
                    />
                <br/>
                <br/>
                <span className="centered-text">¿Quieres dejar una recomendación o sugerencia?</span>
                <br/>
                <br/>
                <input
                    type="text"
                    placeholder="Déjanos tu comentario..."
                    value={recomendacionAgente}
                    style={{
                        border: "1px solid #9F9F9F",
                        borderRadius: "4px",
                        opacity: "0.64",
                        padding: "5px",
                        width: "250px"
                    }}
                    onChange={this.handleChangeRecomendacionAgente}
                />
                <br/>
                <br/>
                <div style={{display: "flex", alignItems: "center",  justifyContent: "space-around"}}>
                    <div onClick={() => this.changeComponent()} style={{cursor: "pointer"}}>
                        <span style={{textDecoration: "underline"}}>
                            Quizás la próxima vez
                        </span>
                    </div>
                    <Button onClick={() => this.changeComponent()}>
                        Continuar
                    </Button>
                </div>
            </Container>
      </Container>
    : <Container fluid={true} className="bg-light live-custom rate-holder">
        <Container className="rate-agent-project centered-text">
                <h5 className="centered-text" style={{fontWeight: "bold"}}>¿Cómo calificarías a nuestro PROYECTO?</h5>
                <br/>
                <div className="centered-text"
                style={{
                    // maxWidth: "350px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"}}>



                    <div style={{textAlign: "left"}}>
                    <span style={{paddingRight: "20px", fontSize: "20px"}}>Rentabilidad</span>
                    <br/>
                    <span style={{paddingRight: "20px", fontSize: "20px"}}>Conectividad</span>
                    <br/>
                    {/* <span style={{paddingRight: "20px", fontSize: "20px"}}>Plusvalia</span>
                    <br/> */}
                    <span style={{paddingRight: "20px", fontSize: "20px"}}>Terminaciones</span>
                    <br/>
                    <span style={{paddingRight: "20px", fontSize: "20px"}}>Equipamiento</span>
                    </div>


                    <div>
                    <StarRatings
                        rating={ratingRentabilidad}
                        starRatedColor="rgba(252, 186, 3, 1)"
                        changeRating={this.changeRatingRentabilidad}
                        numberOfStars={5}
                        name='rating'
                        starDimension="30px"
                        starHoverColor="rgba(252, 186, 3, 0.5)"
                    />
                    <br/>
                    <StarRatings
                        rating={ratingConectividad}
                        starRatedColor="rgba(252, 186, 3, 1)"
                        changeRating={this.changeRatingConectividad}
                        numberOfStars={5}
                        name='rating'
                        starDimension="30px"
                        starHoverColor="rgba(252, 186, 3, 0.5)"
                    />
                    {/* <br/>
                    <StarRatings
                        rating={ratingPlusvalia}
                        starRatedColor="rgba(252, 186, 3, 1)"
                        changeRating={this.changeRatingPlusvalia}
                        numberOfStars={5}
                        name='rating'
                        starDimension="30px"
                        starHoverColor="rgba(252, 186, 3, 0.5)"
                    /> */}
                    <br/>
                    <StarRatings
                        rating={ratingTerminaciones}
                        starRatedColor="rgba(252, 186, 3, 1)"
                        changeRating={this.changeRatingTerminaciones}
                        numberOfStars={5}
                        name='rating'
                        starDimension="30px"
                        starHoverColor="rgba(252, 186, 3, 0.5)"
                    />
                    <br/>
                    <StarRatings
                        rating={ratingEquipamiento}
                        starRatedColor="rgba(252, 186, 3, 1)"
                        changeRating={this.changeRatingEquipamiento}
                        numberOfStars={5}
                        name='rating'
                        starDimension="30px"
                        starHoverColor="rgba(252, 186, 3, 0.5)"
                    />
                    </div>
                </div>
                <br/>
                <span className="centered-text">¿Quieres dejar una recomendación o sugerencia?</span>
                <br/>
                <br/>
                <input
                    type="text"
                    placeholder="Déjanos tu comentario..."
                    value={recomendacionProyecto}
                    style={{
                        border: "1px solid #9F9F9F",
                        borderRadius: "4px",
                        opacity: "0.64",
                        padding: "5px",
                        width: "250px",
                    }}
                    onChange={this.handleChangeRecomendacionProyecto}
                />
                <br/>
                <br/>
                <div style={{display: "flex", alignItems: "center",  justifyContent: "space-around" }}>
                    <div
                    onClick={() => history.push(inmobiliariaId ? "/live/info-proyecto/" + proyectoId + "/" + inmobiliariaId : "/live/info-proyecto/" + proyectoId)}
                    style={{cursor: "pointer"}}>
                        <span style={{textDecoration: "underline"}}>
                            Quizás la próxima vez
                        </span>
                    </div>
                    <Button onClick={() => this.submitRate()}>
                        Enviar
                    </Button>
                </div>

            </Container>
    </Container>
    );
  }
}

const mapStateToProps = state => ({
    respuesta: state.app.respuesta,
    totalPages: state.app.totalPages,
    currentPage: state.app.currentPage,
    loading: state.app.loading,
    user: state.app.user,
    meetingStart: state.app.meetingStart,
    joinedMeeting: state.app.joinedMeeting,
    inmobiliariaId: state.app.inmobiliariaId,
    proyectoData: state.app.proyectoData,
  });
  
const mapDispatchToProps = dispatch => ({
    dispatch: action => {dispatch(action)},
})
  
RateLive = connect(mapStateToProps, mapDispatchToProps)(RateLive);

export default RateLive;
