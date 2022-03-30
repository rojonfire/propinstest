import React, { Component } from "react";
import { connect } from "react-redux";
import { addSuccessTrx } from "../../../action";
import utilfunc from "../../../utils/utilsFunc";
import { Container } from "react-bootstrap";
import ReactGa from 'react-ga'



export const initGA = () => {
  console.log('GA init')
  ReactGa.initialize('UA-167957495-1')
  }

export const logPageView = () => {
  ReactGa.set({page: window.location.pathname})
  ReactGa.pageview(window.location.pathname)
}


export class IndexPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorizationCode: "",
      commercecode: "",
      amount: "",
      buyOrder: "",
      urlPay: "",
      token: "",
    };
  }

  componentDidMount = () => {
    let authorizationCode = utilfunc.getUrlParameter("authorizationCode");
    let commercecode = utilfunc.getUrlParameter("commercecode");
    let amount = utilfunc.getUrlParameter("amount");
    let buyOrder = utilfunc.getUrlParameter("buyOrder");
    let urlPay = utilfunc.getUrlParameter("urlPay");
    let token = utilfunc.getUrlParameter("token");

    this.setState(
      {
        authorizationCode,
        commercecode,
        amount,
        buyOrder,
        urlPay,
        token,
      },
      () => {
        if (this.state.urlPay !== "" && this.state.token !== "") {
          document.getElementById("frmTrx").submit();
        }
      },
    );
    const { addSuccessTrx } = this.props;
    addSuccessTrx(
      authorizationCode,
      commercecode,
      amount,
      buyOrder,
      urlPay,
      token,
    );
    initGA();
    logPageView();
  };

  render() {
    return (
      <Container>
        <p>...Cargando</p>
        <form method="post" id="frmTrx" action={this.state.urlPay}>
          <input type="hidden" name="token_ws" value={this.state.token} />
        </form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state.payment,
});

const mapDispatchToProps = dispatch => ({
  addSuccessTrx: (authorizationCode, commercecode, amount, buyOrder, token) =>
    dispatch(
      addSuccessTrx(authorizationCode, commercecode, amount, buyOrder, token),
    ),
});

IndexPayment = connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexPayment);

export default IndexPayment;
