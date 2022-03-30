import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { fetchPostLoginUser } from "../../../src/action";
import "../../assets/Login.css";
import { ControlLabel, FormGroup, FormControl, Button } from "react-bootstrap";
import icon from "../../utils/images";
import ErrorLabel from "../../utils/ErrorLabel";

import { LoadingModal } from "../../utils/Loading";

class IndexLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      redirectToReferrer: false,
      isLoad: false,
      isError: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { itemUsuario } = nextProps;
    const estado = itemUsuario && itemUsuario[0] ? itemUsuario[0].Estado : null;
    const newState = {};

    if (estado === 0 && !prevState.isError) {
      newState.isError = true;
    }

    return newState;
  }

  login = (event) => {
    event.preventDefault();
    this.setState({ isLoad: true }, () => {
      const { postLoginUser } = this.props;
      if (this.state.password !== "" && this.state.email !== "") {
        postLoginUser(this.state.password, this.state.email);
      }
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { itemUsuario } = this.props;

    if (itemUsuario && itemUsuario.length > 0 && itemUsuario[0].Estado === 1) {
      const { history } = this.props;
      if (history != null) {
        setTimeout(function(){ 
          history.push("/home");
        }, 1200);
      }

    } else {
      if (this.state.isLoad !== prevState.isLoad) {
        this.setState({ isLoad: false });
      }
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    const { loading } = this.props;
    return (
      <div className="Login">
        {this.state.isLoad ? <LoadingModal /> : ""}

        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="fadeIn first">
              <div className="logo">
                <img src={icon.logoColor} alt="" />
              </div>
            </div>
            <form onSubmit={this.login}>
              <FormGroup controlId="email">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="password">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <Button
                className="w-100"
                bsSize="large"
                bsStyle="primary"
                type="submit"
              >
                Ingresar
              </Button>
            </form>

            {loading && <LoadingModal />}

            {!loading && this.state.isError ? (
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <ErrorLabel>Datos invalidos</ErrorLabel>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const formConf = {
  form: "my-form",
};

const mapStateToProps = (state) => ({
  itemUsuario: state.app.itemUsuario,
  loading: state.app.loading,
});

const mapDispatchToProps = (dispatch) => ({
  postLoginUser: (pass, mail) => dispatch(fetchPostLoginUser(pass, mail)),
});

IndexLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexLogin);
IndexLogin = reduxForm(formConf)(IndexLogin);

export default withRouter(IndexLogin);
