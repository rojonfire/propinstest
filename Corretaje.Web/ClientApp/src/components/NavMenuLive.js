import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Nav,
  Navbar,
  Col,
  Button,
  NavDropdown,
  
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import icon from "../utils/images";

import {
  logout,
  loginFacebook,
  setInmobiliariaIdState,
  setProyectoIdState,
  fetchGetProyectos,
  cleanProyecto,
} from "../action";

class NavMenuLive extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      query: "",
      statusLogin: false,
      name: "",
      picture: {},
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  componentDidMount() {
    const { dispatch, proyectoId } = this.props;
    if (!proyectoId) {
      dispatch(cleanProyecto());
    }
  }

  searchQuery = (value) => {
    this.setState({
      query: value.currentTarget.value,
    });
  };

  checkEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      window.location = "/resultado-busqueda?query=" + this.state.query;
    }
  };

  responseFacebook = (params) => {
    if (params.email && params.email !== "") {
      this.props.dispatch(
        loginFacebook(params.email, params.name, params.picture.data.url)
      );
    }
  };

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
        0
      )
    );
    window.location.href = urlProy ? urlProy : "https://propins.cl/live";
  };

  render() {
    const { isLoggedIn, ordenescompra } = this.props.auth;
    const { inmobiliariaId, inmobiliariaData, proyectoData } = this.props;
    let Ordenes = ordenescompra ? ordenescompra : [];

    const { user } = this.props.app;
    const { location } = this.props;

    const displayName =
      user && user.name
        ? user.name
        : user && user.nombres
        ? `${user.nombres} ${user.apellidos}`
        : "";

    const navStyle =
      location && (location.pathname === "/" || location.pathname === "/modelo")
        ? "border-bottom nav-site bg-white navbar-white position-relative nav-transparent"
        : "border-bottom nav-site bg-white navbar-white position-relative nav";

    const NavToggle =
      location &&
      (location.pathname === "/login" ||
        location.pathname === "/login" ||
        location.pathname === "/payment")
        ? "none"
        : "";

    let urlInmo =
      inmobiliariaId && inmobiliariaData && inmobiliariaData.UrlInmobiliaria
        ? inmobiliariaData.UrlInmobiliaria
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

    let logoInmo =
        inmobiliariaId && inmobiliariaData && inmobiliariaData.logo
            ? inmobiliariaData.logo.downloadLink !== ""
            ? inmobiliariaData.logo.downloadLink
            : icon.logoColorGris
            : icon.logoColorGris;
// console.log("urlProy: "+urlProy)
    // console.log("urlInmo: "+urlInmo)
    
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ display: NavToggle }}
        className={navStyle}
      >
        <Container fluid={true}>
          {/* <LinkContainer onClick={urlInmo ? urlProy ? window.location.href = urlProy : window.location.href = urlInmo : "/"}> */}
          <Navbar.Brand>
            <a
              href={
                location.pathname.indexOf("reserva-usuario")!==-1 && location.pathname.split("/").length===5 ?urlProy: urlInmo ? (urlProy ? urlProy : urlInmo) : "https://propins.cl/"
                // "https://propins.cl/" ? ("https://propins.cl/"?"https://propins.cl/":urlProy):urlInmo
              }
            >
              <img
                          className="nav-global"
                          src={logoInmo}
                          alt=""
                          
              /> 
                  
              
              
              
              
            </a>
            {/*<a href={urlInmo ? (urlProy ? urlProy : urlInmo):"https://propins.cl/"}>*/}
            {/*  /!*<img className="nav-global" src={icon.logoLive} alt=""/>*!/*/}
            {/*</a>*/}
          </Navbar.Brand>
          {/* </LinkContainer> */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Col md={10}>
              <Nav className="mr-auto"/>
            </Col>
            <Col md={3}>
              <div className="my-2 d-table col-12 pa1 paMobile">
                <div className="inline-flex login-facebook align-middle">
                  {isLoggedIn ? (
                    <div>
                      <div className="">
                        <div className="img-login">
                          <img src={user ? user.urlPhoto : ""} alt="" />
                        </div>
                        <div>
                          <NavDropdown
                            className="nombre-usuario me-polo"
                            title={displayName ? displayName : "Usuario"}
                            id="basic-nav-dropdown"
                          >
                            {Ordenes && Ordenes.length > 0 && (
                              <LinkContainer to={"/profile"}>
                                <NavDropdown.Item>Mi cuenta</NavDropdown.Item>
                              </LinkContainer>
                            )}

                            {Ordenes && Ordenes.length > 0 && (
                              <LinkContainer to={"/subir-agenda"}>
                                <NavDropdown.Item>
                                  Crear Agenda
                                </NavDropdown.Item>
                              </LinkContainer>
                            )}

                            <NavDropdown.Item
                              onClick={() => this.handleLogout()}
                            >
                              Salir
                            </NavDropdown.Item>
                          </NavDropdown>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Button
                      className="hola3-button"
                      variant="outlined"
                      href="/signin"
                    >
                      Iniciar Sesión
                    </Button>
                  )}
                </div>
              </div>
            </Col>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

const mapStateToProps = (state) => {
  const { app } = state;
  return {
    inmobiliariaData: app.inmobiliariaData,
    proyectoData: app.proyectoData,
    inmobiliariaId: app.inmobiliariaId,
    proyectoId: app.proyectoId,
  };
};

NavMenuLive = connect(mapStateToProps, mapDispatchToProps)(NavMenuLive);

export default NavMenuLive;
