/** @format */

import React, { Component } from "react";
import { withLastLocation } from "react-router-last-location";

import { Container, Row, Breadcrumb } from "react-bootstrap";
import { connect } from "react-redux";
import {
  setProyectoIdState,
  setInmobiliariaIdState,
  setProyectoData,
  cleanSignature,
  fetchGetInmobiliaria,
  cleanInmobiliaria,
} from "../../action";
import "react-alice-carousel/lib/alice-carousel.css";
import "moment-timezone";
import { Link } from "react-router-dom";
import { InfoProyecto } from "./components/InfoProyecto";
import { DetallesModelo } from "./components/DetallesModelo";
import api from "../../api";
import ReactGa from "react-ga";

export const initGA = () => {
  console.log("GA init");
  ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
};
export class IndexInfoProyecto extends Component {
  constructor(props) {
    super(props);

    this.shareLink = window.location.href;

    this.state = {
      show: "allModels",
      modelNumber: null,
      proyecto: {},
      proyectoId: "",
      liveIsAllowed: false,
      isInmobLoaded: false,
    };
    this.showModelDetails = this.showModelDetails.bind(this);
  }

  showModelDetails = (modelNumber) => {
    if (modelNumber === -1) {
      this.setState({
        show: "allModels",
        modelNumber: null,
      });
    } else {
      this.setState({
        show: "modelDetails",
        modelNumber: modelNumber,
      });
    }
  };

  componentDidUpdate = async () => {
    const { match, dispatch, proyectoData } = this.props;
    const { isInmobLoaded } = this.state;
    if (!isInmobLoaded) {
      this.setState({ isInmobLoaded: true });
      // let cita;
      let proyectoId = match.params.id1;
      console.log(
        "IndexInfoProyecto -> componentDidUpdate -> proyectoId",
        proyectoId
      );
      // let inmobiliariaId = match.params.id2;
      if (!proyectoData) {
        const proyectoInfo = await api.apiGetUnProyecto(proyectoId);
        dispatch(setProyectoIdState(proyectoInfo.id));
        dispatch(setProyectoData(proyectoInfo));
        dispatch(fetchGetInmobiliaria(proyectoInfo.inmobiliariaId));
        this.setState({
          proyecto: proyectoInfo,
        });
      } else if (proyectoData.id !== proyectoId) {
        const proyectoInfo = await api.apiGetUnProyecto(proyectoId);
        dispatch(setProyectoIdState(proyectoInfo.id));
        dispatch(setProyectoData(proyectoInfo));
        dispatch(fetchGetInmobiliaria(proyectoInfo.inmobiliariaId));
        this.setState({
          proyecto: proyectoInfo,
        });
      } else {
        this.setState({
          proyecto: proyectoData,
        });
        dispatch(fetchGetInmobiliaria(proyectoData.inmobiliariaId));
      }
    }
  };

  componentDidMount = async () => {
    const { match, dispatch, user, proyectoData } = this.props;
    document.querySelector("body").scrollTo(0, 0);
    let cita = null;
    let proyectoId = match.params.id1;
    let inmobiliariaId = match.params.id2;
    if (proyectoData === undefined) {
      const proyectoInfo = await api.apiGetUnProyecto(proyectoId);
      dispatch(setProyectoIdState(proyectoInfo.id));
      dispatch(setProyectoData(proyectoInfo));
      dispatch(fetchGetInmobiliaria(proyectoInfo.inmobiliariaId));
      this.setState({
        proyecto: proyectoInfo,
      });
    } else if (proyectoData.id !== proyectoId) {
      const proyectoInfo = await api.apiGetUnProyecto(proyectoId);
      dispatch(setProyectoIdState(proyectoInfo.id));
      dispatch(setProyectoData(proyectoInfo));
      dispatch(fetchGetInmobiliaria(proyectoInfo.inmobiliariaId));
      this.setState({
        proyecto: proyectoInfo,
      });
    } else {
      this.setState({
        proyecto: proyectoData,
      });
      dispatch(fetchGetInmobiliaria(proyectoData.inmobiliariaId));
    }
    let dateTime = new Date();
    if (user && user.userId) {
      cita = await api.apiGetCitaUsuario(user.userId, proyectoId);
      if (cita !== null && cita !== undefined && cita.tramo) {
        let citaDate = new Date(cita.fecha);
        let citaTimeStart = new Date(
          citaDate.getFullYear(),
          citaDate.getMonth(),
          citaDate.getDate(),
          parseInt(cita.tramo.slice(0, 2), 10),
          parseInt(cita.tramo.slice(3, 5)) - 1
        );
        let citaTimeEnd = new Date(
          citaDate.getFullYear(),
          citaDate.getMonth(),
          citaDate.getDate(),
          parseInt(cita.tramo.slice(6, 8), 10),
          parseInt(cita.tramo.slice(9, 11)) + 1
        );
        if (citaTimeStart <= dateTime && dateTime <= citaTimeEnd) {
          this.setState({
            liveIsAllowed: true,
          });
        }
      }
    }
    if (inmobiliariaId === undefined || inmobiliariaId === "") {
      dispatch(cleanInmobiliaria());
    } else {
      dispatch(setInmobiliariaIdState(inmobiliariaId));
      dispatch(fetchGetInmobiliaria(inmobiliariaId));
    }
    dispatch(cleanSignature());
    this.setState({
      proyectoId,
    });
    initGA();
    logPageView();
  };

  render() {
    const { show, modelNumber, proyecto } = this.state;
    const { history, inmobiliariaId } = this.props;
    return (
      <Container fluid={true} className="bg-light live-custom">
        <Row className="bread-crumb-custom">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={"/"}>Inicio</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link
                to={
                  inmobiliariaId
                    ? `/live/info-proyecto/${inmobiliariaId}`
                    : "/resultado-busqueda"
                }
              >
                Proyectos
              </Link>
            </Breadcrumb.Item>
            {show === "allModels" ? (
              <Breadcrumb.Item active>Modelos</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item>
                <span onClick={() => this.showModelDetails(-1)}>Modelos</span>{" "}
              </Breadcrumb.Item>
            )}
            {show === "allModels" ? null : (
              <Breadcrumb.Item active>Detalles</Breadcrumb.Item>
            )}
          </Breadcrumb>
        </Row>

        {show === "allModels" ? (
          <InfoProyecto
            showModelDetails={this.showModelDetails}
            proyecto={proyecto}
            history={history}
            liveIsAllowed={this.state.liveIsAllowed}
          />
        ) : (
          <DetallesModelo
            showModelDetails={this.showModelDetails}
            modelNumber={modelNumber}
            proyecto={proyecto}
            history={history}
            liveIsAllowed={this.state.liveIsAllowed}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.app.user,
  inmobiliariaId: state.app.inmobiliariaId,
  proyectoData: state.app.proyectoData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

IndexInfoProyecto = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexInfoProyecto);
IndexInfoProyecto = withLastLocation(IndexInfoProyecto);

export default IndexInfoProyecto;
