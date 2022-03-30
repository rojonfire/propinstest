import React, { Component } from "react";
import { ZoomMtg } from "@zoomus/websdk";
import { connect } from "react-redux";
import {
  fetchGetSignature,
  getAllProyectos,
  getUserProyectos,
} from "../../action";

const getUrlParameter = (sParam) => {
  let sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;
  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
};

class Live extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingLaunched: false,
      proyectoId: "",
    };
    this.launchMeeting = this.launchMeeting.bind(this);
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.tipoCuenta === 0) {
        this.props.dispatch(getAllProyectos());
      } else {
        this.props.dispatch(getUserProyectos(user.userId));
      }
    }
  }

  componentDidMount() {
    const { itemProyectos, dispatch } = this.props;
    let idproy = getUrlParameter("idproy");
    this.setState({
      proyectoId: idproy,
    });
    let proyecto = itemProyectos.find((p) => p.id === idproy);
    if (proyecto === undefined) {
      console.log("proyecto is undefined");
      dispatch(getAllProyectos());
    } else {
      if (proyecto && proyecto.meetingNumber && proyecto.meetingPassword) {
        ZoomMtg.setZoomJSLib("https://source.zoom.us/1.7.10/lib", "/av");
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
        ZoomMtg.reRender({ lang: "es-ES" });
        let meetConfig = {
          meetingNumber: proyecto.meetingNumber,
          meetingApi: proyecto.apiKey,
          meetingPassword: proyecto.meetingPassword,
          proyectoId: idproy,
        };
        this.launchMeeting(meetConfig);
      }
    }

    //$("#zmmtg-root").css("z-index", "5000");
  }

  componentDidUpdate(prevProps) {
    const { itemProyectos } = this.props;
    const { meetingLaunched } = this.state;

    if (
      prevProps.itemProyectos !== itemProyectos &&
      meetingLaunched === false
    ) {
      let idproy = getUrlParameter("idproy");
      let proyecto = itemProyectos.find((p) => p.id === idproy);
      if (proyecto && proyecto.meetingNumber && proyecto.meetingPassword) {
        ZoomMtg.setZoomJSLib("https://source.zoom.us/1.7.10/lib", "/av");
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
        ZoomMtg.reRender({ lang: "es-ES" });
        let meetConfig = {
          meetingNumber: proyecto.meetingNumber,
          meetingApi: proyecto.apiKey,
          meetingPassword: proyecto.meetingPassword,
          proyectoId: idproy,
        };
        this.launchMeeting(meetConfig);
      }
    }
  }

  launchMeeting = async (meetConfig) => {
    const { dispatch, signature } = this.props;
    console.log("launch meeting");
    await dispatch(
      fetchGetSignature(meetConfig.meetingNumber, 1, meetConfig.proyectoId)
    );
    if (signature) {
      console.log("Live -> signature", signature);
      console.log("signature exists");
      meetConfig.signature = signature;
      this.initializeZoom(meetConfig);
    }
  };

  initializeZoom(meetConfig) {
    const { Usuario } = this.props;
    console.log("initializing zoom");
    this.setState({ meetingLaunched: true });
    ZoomMtg.init({
      leaveUrl: "/agendaLive",
      showMeetingHeader: true, //option
      disableInvite: false, //optional
      disableCallOut: false, //optional
      disableRecord: false, //optional
      disableJoinAudio: false, //optional
      audioPanelAlwaysOpen: true, //optional
      showPureSharingContent: true, //optional
      isSupportAV: true, //optional,
      isSupportChat: true, //optional,
      isSupportQA: true, //optional,
      isSupportCC: true, //optional,
      screenShare: true, //optional,
      rwcBackup: "", //optional,
      videoDrag: true, //optional,
      sharingMode: "both", //optional,
      videoHeader: true, //optional,
      isLockBottom: true, // optional,
      isSupportNonverbal: true, // optional,
      isShowJoiningErrorDialog: true, // optional
      success: function() {
        console.log("success init");
        ZoomMtg.join({
          signature: meetConfig.signature,
          apiKey: meetConfig.meetingApi,
          meetingNumber: meetConfig.meetingNumber,
          userName: Usuario.Nombres,
          userEmail: Usuario.Mail,
          //userEmail: "cgalleguillos@cleveritgroup.com",
          passWord: meetConfig.meetingPassword,
          success() {
            console.log("join meeting success");
          },
          error(res) {
            console.log("error en join");
            console.log(res);
          },
        });
      },
      error(res) {
        console.log("error en init");
        console.log(res);
      },
    });
  }

  render() {
    return <div className="wrapper fadeInDown ReactModal__Body--open "></div>;
  }
}

const mapStateToProps = (state) => {
  const { app, auth } = state;
  return {
    signature: app.signature,
    Usuario: app.itemUsuario[0].Usr,
    itemProyectos: app.itemProyectos,
    ...app,
    ...auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

Live = connect(mapStateToProps, mapDispatchToProps)(Live);

export default Live;
