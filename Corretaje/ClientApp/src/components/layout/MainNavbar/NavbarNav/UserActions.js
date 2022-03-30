/** @format */

import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
} from "shards-react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  fetchClearUserSession,
  fetchCLearInitialstate,
} from "../../../../action";
import jwt from "jsonwebtoken";

export class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      mail: "",
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  componentDidMount = () => {
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      this.setState({
        mail: user.Mail,
      });
    }
  };

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  render() {
    let nombres =
      this.props.itemUsuario &&
      this.props.itemUsuario.length > 0 &&
      this.props.itemUsuario[0].Usr &&
      this.props.itemUsuario[0].Usr.Nombres;
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <span className="d-none d-md-inline-block">{nombres}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem className="text-danger">
            <AuthButton {...this.props} />
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}

const mapStateToProps = (state) => ({
  itemUsuario: state.app.itemUsuario,
});

const mapDispatchToProps = (dispatch) => ({
  logoutSession: () => dispatch(fetchClearUserSession()),
  logoutApp: () => dispatch(fetchCLearInitialstate()),
});

UserActions = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserActions);

export default UserActions;

const AuthButton = withRouter(({ history, ...props }) => {
  let token =
    props &&
    props.itemUsuario &&
    props.itemUsuario.length > 0 &&
    props.itemUsuario[0].Usr &&
    props.itemUsuario[0].Usr.Token;

  if (token != null) {
    try {
      var decoded = jwt.verify(
        token,
        "CleveritPhygyjuhukyhkijijijliliugjgkihhjklojikhkhujilarking"
      );
      if (Date.now() >= decoded.exp * 1000) {
        console.log("Token expired");
        props.logoutSession();
        props.logoutApp();
        localStorage.removeItem("user");
        window.location = "/Login";
      } else {
        //console.log("Token NOT expired");
      }
    } catch (error) {
      console.error(error);
      props.logoutSession();
      props.logoutApp();
      localStorage.removeItem("user");
      window.location = "/Login";
    }
  }
  return localStorage.getItem("user") ? (
    <div>
      <a className={"btn btn-primary margin-primary"} href="/perfil">
        Mi perfil
      </a>
      <a
        href="/Login"
        className={"btn btn-primary"}
        onClick={() => {
          props.logoutSession();
          props.logoutApp();
          localStorage.removeItem("user");
          window.location = "/Login";
        }}
      >
        Cerrar Sesión
      </a>
    </div>
  ) : (
    <p>No has iniciado sesión.</p>
  );
});
