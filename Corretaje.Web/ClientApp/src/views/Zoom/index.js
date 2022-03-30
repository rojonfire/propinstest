import React, { Component } from "react";
import swal from "sweetalert";
import { ZoomMtg } from "@zoomus/websdk";
import { connect } from "react-redux";
import { fetchGetSignature, setProyectoIdState, logout } from "../../action";
import { setMeetingStart, joinedZoomMeeting } from "../../action/index.js";
import $ from "jquery";
import api from "../../api";
import {
  setProyectoData,
} from "../../action";
import ReactGa from "react-ga";

export const initGA = () => {
  console.log("GA init");
  ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
};

class Zoom extends Component {
  constructor(props) {
    super(props);
    this.shareLink = window.location.href;
    this.state = {
      meetingLaunched: false,
      proyectoId: "",
      isCitaLoaded: false,
    };
    this.initializeZoom = this.initializeZoom.bind(this);
  }

  componentDidMount = async () => {
    await this.setProyectoId();
    initGA();
    logPageView();
  };

  componentDidUpdate = async () => {
    const { user } = this.props;
    const { isCitaLoaded } = this.state;

    if (!isCitaLoaded && user && Object.keys(user).length) {
      this.loadCita();
    }
  };

  setProyectoId = async () => {
    const { proyectoData, match, dispatch } = this.props;
    const proyectoId = match.params.id;

    if (!proyectoData) {
      const proyectoInfo = await api.apiGetUnProyecto(proyectoId);
      dispatch(setProyectoIdState(proyectoInfo.id));
      dispatch(setProyectoData(proyectoInfo));
    } else if (proyectoData.id !== proyectoId) {
      const proyectoInfo = await api.apiGetUnProyecto(proyectoId);
      dispatch(setProyectoIdState(proyectoInfo.id));
      dispatch(setProyectoData(proyectoInfo));
    }
    dispatch(setProyectoIdState(proyectoId));
    this.setState({
      proyectoId,
    });
  };

  loadCita = async () => {
    this.setState({ isCitaLoaded: true }, async () => {
      const {
        proyectoData,
        user,
        history,
        match,
        dispatch,
        inmobiliariaId,
      } = this.props;
      const proyectoId = match.params.id;
      const dateTime = new Date();
      console.log("Zoom -> loadCita -> dateTime", dateTime);

      const cita = await api.apiGetCitaUsuario(user.userId, proyectoId);
      if (cita && cita.tramo) {
        console.log("Zoom -> loadCita -> cita.tramo", cita.tramo);
        let citaDate = new Date(cita.fecha);
        let fecha =
          citaDate.getDate() +
          "-" +
          (citaDate.getMonth() + 1) +
          "-" +
          citaDate.getFullYear();
        let citaTimeStart = new Date(
          citaDate.getFullYear(),
          citaDate.getMonth(),
          citaDate.getDate(),
          parseInt(cita.tramo.slice(0, 2),10),
          parseInt(cita.tramo.slice(3, 5),10) - 1,
        );
        console.log("Zoom -> loadCita -> citaTimeStart", citaTimeStart);
        let citaTimeEnd = new Date(
          citaDate.getFullYear(),
          citaDate.getMonth(),
          citaDate.getDate(),
          parseInt(cita.tramo.slice(6, 8),10),
          parseInt(cita.tramo.slice(9, 11)) + 1,
        );
        console.log("Zoom -> loadCita -> citaTimeEnd", citaTimeEnd);
        if (citaTimeStart <= dateTime && dateTime <= citaTimeEnd) {
          if (proyectoData) {
            ZoomMtg.setZoomJSLib("https://source.zoom.us/1.7.10/lib", "/av");
            ZoomMtg.preLoadWasm();
            ZoomMtg.prepareJssdk();
            ZoomMtg.reRender({ lang: "es-ES" });
            let meetConfig = {
              meetingNumber: proyectoData.meetingNumber,
              meetingApi: proyectoData.apiKey,
              meetingPassword: proyectoData.meetingPassword,
              proyectoId: proyectoId,
            };
            this.launchMeeting(meetConfig);
            $("#zmmtg-root").css("z-index", "5000");
          } else {
            this.getproyecto(proyectoId);
          }
        } else {
          ///TODO: mostrar popup que avise que aún falta para la cita
          if (dateTime < citaTimeStart) {
            swal({
              icon: "info",
              title: "Atención",
              text: `Su visita fué agendada para el ${fecha} entre ${cita.tramo}.`,
              closeOnClickOutside: history.push(
                inmobiliariaId
                  ? `/live/info-proyecto/${this.state.proyectoId}/${inmobiliariaId}`
                  : `/live/info-proyecto/${this.state.proyectoId}`,
              ),
            });
          } else if (dateTime > citaTimeEnd) {
            swal({
              icon: "warning",
              title: "Atención",
              text: `Su cita del ${fecha} ya expiró, lo invitamos a agendar nuevamente su visita.`,
              closeOnClickOutside: history.push(
                inmobiliariaId
                  ? `/live/reserva-usuario/${this.state.proyectoId}/${inmobiliariaId}`
                  : `/live/reserva-usuario/${this.state.proyectoId}`,
              ),
            });
          }
        }
      } else {
        ///TODO: asegurarnos que el flujo es el correcto
        swal({
          icon: "warning",
          title: "Atención",
          text: "La cita no corresponde al usuario",
        });
        dispatch(logout());
        ///TODO: redireccionar a algún lugar si es necesario
      }
    });
  };

  getproyecto = async (idProy) => {
    const { dispatch } = this.props;
    const proyecto = await api.apiGetUnProyecto(idProy);
    dispatch(setProyectoData(proyecto));
  };

  delay = (ms) => new Promise((res) => setTimeout(res, ms));

  launchMeeting = async (meetConfig) => {
    const { dispatch, tokenZoom } = this.props;
    await dispatch(
      fetchGetSignature(meetConfig.meetingNumber, 0, meetConfig.proyectoId),
    );
    if (tokenZoom !== null && tokenZoom !== undefined) {
      console.log("go directly");
      this.initializeZoom(meetConfig);
    } else {
      console.log("wait 5 seconds");
      await this.delay(5000);
      this.initializeZoom(meetConfig);
    }
    await this.delay(10000);
  };

  initializeZoom(meetConfig) {
    const { user, dispatch, tokenZoom, inmobiliariaId } = this.props;
    this.setState({ meetingLaunched: true });
    dispatch(setMeetingStart(new Date().getTime()));
    ZoomMtg.init({
      leaveUrl: inmobiliariaId
        ? `/live/rate/${this.state.proyectoId}/${inmobiliariaId}`
        : `/live/rate/${this.state.proyectoId}`,
      isSupportAV: true,
      videoDrag: false,
      videoHeader: false,
      isLockBottom: false,
      showMeetingHeader: false,
      success: function () {
        ZoomMtg.join({
          signature: tokenZoom,
          apiKey: meetConfig.meetingApi,
          meetingNumber: meetConfig.meetingNumber, // required
          userName: user.name, // required
          userEmail: user.email, // Not used, required for Webinars
          passWord: meetConfig.meetingPassword, // If required; set by host
          success() {
            console.log("join meeting success");
            // Se cambia joinedMeeting para que se pueda calificar posteriormente
            dispatch(joinedZoomMeeting(true));
          },
          error(res) {
            dispatch(joinedZoomMeeting(false));
            console.log("error en join");
            console.log(res);
          },
        });
      },
      error(res) {
        dispatch(joinedZoomMeeting(false));
        console.log("error en init");
        console.log(res);
      },
    });
  }

  render() {
    console.log(this.state.proyectoId);
    return (
      <div
    className="Meeting"
    style={{backgroundColor: "grey", zIndex: "100"}}
    />
    );
  }
}

const mapStateToProps = (state) => {
  const { app, auth } = state;
  const { tokenZoom } = app;

  return {
    tokenZoom,
    ...app,
    ...auth,
    proyectoData: app.proyectoData,
    user: app.user,
    inmobiliariaId: app.inmobiliariaId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

Zoom = connect(mapStateToProps, mapDispatchToProps)(Zoom);

export default Zoom;
