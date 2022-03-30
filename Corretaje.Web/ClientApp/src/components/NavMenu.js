import React, { Component } from "react";

import { connect } from "react-redux";

import {
  Container,
  Nav,
  Navbar,
  Col,
  Row,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-router-dom";
import { setRegistered } from "../action";

import icon from "../utils/images";

import { logout, loginFacebook } from "../action";

class NavMenu extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      query: "",
      statusLogin: false,
      name: "",
      picture: {},
      referido: {},
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

  goToSignUp = () => {
    const { setRegistered, history } = this.props;
    setRegistered(false);
    history.push("signin");
  };

  goToLogin = () => {
    const { setRegistered, history } = this.props;
    setRegistered(true);
    history.push("signin");
  };

  render() {
    const { isLoggedIn, ordenescompra, tipoCuenta } = this.props.auth;
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
      //ponemos todas las paginas donde querermos que se vea blanco el nav-menu

      (location && location.pathname === "/") ||
      location.pathname === "/comprar" ||
      location.pathname === "/referir" ||
      location.pathname === "/inmobiliarias"
        ? "nav-menu-belen-blanco" //" nav-site bg-white navbar-light position-relative nav-transparent" //nav menu blanco
        : "nav-menu-belen-negro"; // nav menu negro

    const NavToggle =
      // aqui ponemos todas las paginas en las que no queremos que se vea el nav-menu
      location &&
      (location.pathname === "/login" ||
        location.pathname === "/Login" ||
        location.pathname === "/login2" ||
        location.pathname === "/registro-proper" ||
        location.pathname === "/registronormal" ||
        location.pathname === "/registro-referido" ||
        location.pathname === "/registro" ||
        location.pathname === "/registroproper" ||
        location.pathname === "/payment" ||
        location.pathname === "/signin" ||
        location.pathname === "/personalbroker" ||
        location.pathname.includes("/landing/") ||
        location.pathname === "/graciaslanding")
        ? "none"
        : "";

    return (
      <div className="p-relative">
        <Navbar
          collapseOnSelect
          expand="lg"
          style={{ display: NavToggle }}
          className={navStyle}
        >
          <Container fluid={true}>
            <LinkContainer to={"/"}>
              <Navbar.Brand>
                <div className={"hideMOBILE"}>
                  {(location && location.pathname === "/") ||
                  location.pathname === "/comprar" ||
                  location.pathname === "/referir" ||
                  location.pathname === "/inmobiliarias" ||
                  location.pathname === "/planes" ? (
                    <img
                      className="moverlogoprincipal"
                      src={icon.logoColor}
                      alt=""
                    />
                  ) : (
                    <img
                      className="moverlogoprincipal"
                      src={icon.logoColor}
                      alt=""
                    />
                  )}
                </div>

                <div className={"hideWEB2"}>
                  {(location && location.pathname === "/") ||
                  location.pathname === "/comprar" ||
                  location.pathname === "/referir" ||
                  location.pathname === "/inmobiliarias" ? (
                    <img className="w-35vw" src={icon.logoColor} alt="" />
                  ) : (
                    <img className="w-35vw" src={icon.logoColor} alt="" />
                  )}
                </div>
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
              <div md={6} className="center" className="navbar123">
                <Nav className="mr-auto">
                  <NavLink to={"/"} exact={true}>
                    {" "}
                    PROPIETARIO{" "}
                  </NavLink>

                  <NavLink to={"/comprar"}> PROPIEDADES </NavLink>

                  <NavLink to={"/referir"}> REFERIR </NavLink>

                  <NavLink to="/inmobiliarias"> INMOBILIARIAS </NavLink>

                  {isLoggedIn ? (
                    <div className="text-center center hideWEB">
                      <div className="text-center center ">
                        <div className="img-login"></div>
                        <div className="center text-center">
                          <NavDropdown
                            className="text-center center nombre-usuario"
                            title={displayName ? displayName : "Usuario"}
                            id=""
                          >
                            <div classname="medespliego">
                              {tipoCuenta === 1 ? (
                                <LinkContainer to={"/perfil"}>
                                  <NavDropdown.Item className="micuenta">
                                    Mi Cuenta
                                  </NavDropdown.Item>
                                </LinkContainer>
                              ) : null}

                              {tipoCuenta === 7 ? (
                                <LinkContainer to={"/proper-home"}>
                                  <NavDropdown.Item>
                                    Menu Proper
                                  </NavDropdown.Item>
                                </LinkContainer>
                              ) : null}
                              {tipoCuenta === 8 ? (
                                <LinkContainer
                                  to={"/referido-home?idref=" + user.userId}
                                >
                                  <NavDropdown.Item>
                                    Menu Referido
                                  </NavDropdown.Item>
                                </LinkContainer>
                              ) : null}

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
                            </div>
                          </NavDropdown>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Button
                      className={
                        location &&
                        (location.pathname === "/" ||
                          location.pathname === "/comprar" ||
                          location.pathname === "/referir" ||
                          location.pathname === "/inmobiliarias")
                          ? "hola13-button center hideWEB text-center"
                          : "hola-button hideWEB  center text-center"
                      }
                      variant=""
                      //href="/signin"
                      onClick={() => this.goToLogin()}
                    >
                      <div className="center text-center"> Iniciar Sesión</div>
                    </Button>
                  )}
                </Nav>
              </div>

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

              <Col md={2}>
                <div className="my-2 d-table col-12 pa0 hide-ipad  hide-ipad paMobile hideMOBILE">
                  <div className="inline-block login-facebook align-middle">
                    {isLoggedIn ? (
                      <div>
                        <div className="hideMOBILE">
                          <div className="img-login">
                            <img src={user ? user.urlPhoto : ""} alt="" />
                          </div>
                          <div>
                            <NavDropdown
                              className="nombre-usuario"
                              title={displayName ? displayName : "Usuario"}
                              id=""
                            >
                              {tipoCuenta !== 7 && tipoCuenta !== 8 ? (
                                <LinkContainer to={"/perfil"}>
                                  <NavDropdown.Item>Mi Cuenta</NavDropdown.Item>
                                </LinkContainer>
                              ) : null}

                              {tipoCuenta === 7 ? (
                                <LinkContainer to={"/proper-home"}>
                                  <NavDropdown.Item>
                                    Menu Proper
                                  </NavDropdown.Item>
                                </LinkContainer>
                              ) : null}
                              {tipoCuenta === 8 ? (
                                <LinkContainer
                                  to={"/referido-home?idref=" + user.userId}
                                >
                                  <NavDropdown.Item>
                                    Menu Referido
                                  </NavDropdown.Item>
                                </LinkContainer>
                              ) : null}

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
                      <div>
                        <Row className="center text-center hide-ipad hideMOBILE">
                          <Col md="12" className="">
                            <Button
                              className={
                                location &&
                                (location.pathname === "/" ||
                                  location.pathname === "/comprar" ||
                                  location.pathname === "/referir" ||
                                  location.pathname === "/inmobiliarias" ||
                                  location.pathname === "/planes")
                                  ? "hola-button center text-center"
                                  : "hola-button center text-center"
                              }
                              variant="outlined"
                              onClick={() => this.goToLogin()}
                            >
                              <div className="center text-center">
                                {" "}
                                Iniciar Sesión
                              </div>
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Button
                            variant="registro-nav"
                            onClick={() => this.goToSignUp()}
                          >
                            <div>Registro</div>
                          </Button>
                        </Row>
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, app } = state;
  return { ...app, registered: app.registered };
};

const mapDispatchToProps = (dispatch) => ({
  setRegistered: (data) => dispatch(setRegistered(data)),
});

NavMenu = connect(mapStateToProps, mapDispatchToProps)(NavMenu);

export default NavMenu;
