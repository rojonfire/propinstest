import React, { Component } from "react";
import { Container, Card} from "react-bootstrap";
import visitaPropiedad from "../../../assets/img/visita-propiedad.svg";
import moment from "moment";
import "moment/locale/es";
import funcs from "../../../utils/utilsFunc";
import {
  logout,
  setInmobiliariaIdState,
  setProyectoIdState,
  fetchGetProyectos,
  
} from "../../../action";

export class Confirmacion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idProy: "",
    };
  }

  componentDidMount = async () => {
    
    const idProy = funcs.getUrlParameter("idProy");
    this.setState({
      idProy,
    });
  }
 
  handleLogout = () => {
    const {
      dispatch,
      inmobiliariaId,
      proyectoId,
      proyectoData,
    } = this.props;
    let urlProy =
      proyectoData && proyectoData.urlProyecto
        ? proyectoData.urlProyecto
        : undefined;
    if (urlProy) {
      urlProy = urlProy
        .replace("http//", "https://")
        .replace("https//", "https://");
      if (urlProy.slice(0, 3) === "www") {
        urlProy = "https://" + urlProy;
      }
    }
    dispatch(logout());
    if (proyectoId) {
      dispatch(setInmobiliariaIdState(proyectoId));
    } else if (inmobiliariaId) {
      dispatch(setInmobiliariaIdState(inmobiliariaId));
    }
    if (proyectoId) {
      dispatch(setProyectoIdState(proyectoId));
    } else if (proyectoId) {
      dispatch(setProyectoIdState(proyectoId));
    }
    dispatch(
      fetchGetProyectos(
        {
          idInmo: null,
          limit: 0,
          skip: 0,
          direccion: null,
          isFirts: false,
          tipoOperacion: null,
          tipoProyecto: null,
          estadoProp: 0,
        },
        0,
        0,
      ),
    );
    window.location.href = urlProy ? urlProy : "https://propins.cl/live";
  };


  render() {
    const { diaReserva, tramoReserva, inmobiliariaId, inmobiliariaData, proyectoData} = this.props;
    
    let urlInmo =
      inmobiliariaId && inmobiliariaData && inmobiliariaData.urlInmobiliaria
        ? inmobiliariaData.urlInmobiliaria
        : undefined;
    if (urlInmo) {
      urlInmo = urlInmo
        .replace("http//", "https://")
        .replace("https//", "https://");
      if (urlInmo.slice(0, 3) === "www") {
        urlInmo = "https://" + urlInmo;
      }
    }

    let urlProy =
      proyectoData && proyectoData.urlProyecto
        ? proyectoData.urlProyecto
        : undefined;
    if (urlProy) {
      urlProy = urlProy
        .replace("http//", "https://")
        .replace("https//", "https://");
      if (urlProy.slice(0, 3) === "www") {
        urlProy = "https://" + urlProy;
      }
    }

    return (
      <Container fluid="true">
        <section className="section-space reservar-fotografo">
          <Container>
            <Card className="text-center">
              <Card.Body className="pa0 pa-backoffice">
                <Card.Img variant="top" src={visitaPropiedad} />
                <Card.Title>
                  <div className="title-section text-center">
                    <h4 className="h4">Visita Virtual Confirmada</h4>
                  </div>
                </Card.Title>
                <Card.Text>
                {/* 13 de Abril del 2020 a las 11:00hrs */}
                  <strong>
                    {moment(diaReserva).format("LL")} {tramoReserva}
                  </strong>
                  <br/>
                  Te hemos enviado un correo con el link de la reunión.
                </Card.Text>
             
                    <button
                      variant="primary"
                      className="purple-button btn btn-primary"
                      onClick={() =>
                        (window.location.href = inmobiliariaId 
                          ? "https://altosdelonco.cl/"
                          : "https://propins.cl/resultado-busqueda")
                      }
                      type="button"
                    >
                      Volver a Proyecto
                    </button>
                   
                
              </Card.Body>
            </Card>
          </Container>
        </section>
      </Container>
    );
  }
}

export default Confirmacion;


