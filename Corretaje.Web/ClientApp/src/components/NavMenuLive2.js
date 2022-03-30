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

import { logout, loginFacebook } from "../action";

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
    const { dispatch, history } = this.props;
    dispatch(logout());
    history.push("/");
  };

  render() {
    const { isLoggedIn, ordenescompra } = this.props.auth;

    let Ordenes = ordenescompra ? ordenescompra : [];

    const { user } = this.props.app;
    const { location } = this.props;

    const displayName =
      user && user.name
        ? user.name
        : user && user.nombres
        ? `${user.nombres} ${user.apellidos}`
        : "";
    console.log("NavMenu -> render -> location.pathname", location.pathname);

    const displayProyecto2 = location.pathname === "/resultado-busqueda";
    console.log("NavMenu -> render -> location.pathname", location.pathname);

    const navStyle =
      location && location.pathname === "/"
        ? "border-bottom nav-site bg-white navbar-white position-relative nav-transparent"
        : "border-bottom nav-site bg-white navbar-white position-relative nav ";

    const NavToggle =
      location &&
      (location.pathname === "/login" ||
        location.pathname === "/Login" ||
        location.pathname === "/payment")
        ? "none"
        : "";

    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ display: NavToggle }}
        className={navStyle}
      >
        <Container fluid={true}>
          <LinkContainer to={"/"}>
            <Navbar.Brand>
              {location && location.pathname === "/" ? (
                <img className="nav-global" src={icon.logoColorGris} alt="" />
              ) : (
                <img className="nav-global" src={icon.logoColorGris} alt="" />
              )}

              <img
                className="nav-home logogris none-mobile"
                src={icon.logoColor}
                alt=""
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Col md={10}>
              <Nav className="mr-auto">
                <LinkContainer to={"/modelo"}>
                  <Nav.Link> Nosotros </Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/resultado-busqueda"}>
                  <Nav.Link> Propiedades </Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/marketplace"}>
                  <Nav.Link> Partners </Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/Tour"}>
                  <Nav.Link> Tour virtual </Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/contacto"}>
                  <Nav.Link> Contáctanos </Nav.Link>
                </LinkContainer>

                {displayProyecto2 && (
                  <LinkContainer to={"/live"}>
                    <Nav.Link>
                      <div className="theblue">
                        <span>Proyectos</span>
                      </div>
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Col>

            {/* <InputGroup> // este es un buscador 
                <FormControl
                  placeholder="Buscar propiedad"
                  aria-label="Buscar propiedad"
                  aria-describedby="Buscar propiedad"
                  onKeyUp={this.searchQuery}
                  onKeyDown={this.checkEnter}
                />
                <InputGroup.Append>
                  <LinkContainer
                    to={"/resultado-busqueda?query=" + this.state.query}
                  >
                    <Button>
                      <img src={icon.iconSearch} alt="" />
                    </Button>
                  </LinkContainer>
                </InputGroup.Append>
              </InputGroup>*/}

            <Col md={3}>
              <div className="my-2 d-table col-12 pa0 paMobile">
                <div className="inline-block login-facebook align-middle">
                  {isLoggedIn ? (
                    <div>
                      <div className="">
                        <div className="img-login">
                          <img src={user ? user.urlPhoto : ""} alt="" />
                        </div>
                        <div>
                          <NavDropdown
                            className="nombre-usuario"
                            title={displayName ? displayName : "Usuario"}
                            id="basic-nav-dropdown"
                          >
                            <LinkContainer to={"/profile"}>
                              <NavDropdown.Item>Mi Cuenta</NavDropdown.Item>
                            </LinkContainer>

                            {Ordenes && Ordenes.length > 0 && (
                              <LinkContainer to={"/subir-agenda"}>
                                <NavDropdown.Item>
                                  Crear Agenda
                                </NavDropdown.Item>
                              </LinkContainer>
                            )}

                            <NavDropdown.Divider />
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
                      className={
                        location && location.pathname === "/"
                          ? "hola-button"
                          : "hola2-button"
                      }
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

const mapDispatchToProps = (dispatch) => ({});

NavMenuLive = connect(mapDispatchToProps, null)(NavMenuLive);

export default NavMenuLive;
