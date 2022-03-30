import React, { Component } from "react";
import {
  Container,
  Row,
  
} from "react-bootstrap";
import icon from "../utils/images";
import { LinkContainer } from "react-router-bootstrap";

export class FooterLive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
    };
  }

  searchQuery = value => {
    this.setState({
      query: value.currentTarget.value,
    });
  };

  checkEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      window.location = "/resultado-busqueda?query=" + this.state.query;
    }
  };

  render() {
    const { location } = this.props;

    const FootToggle =
      location &&
      (location.pathname === "/login" ||
        location.pathname === "/Login" ||
        location.pathname === "/payment" ||
        location.pathname === "/resultado-busqueda")
        ? "none"
        : "";

    return (
      <footer style={{ display: FootToggle }}>
        <Container fluid={true}>
          <Row>
            <div align="center" className="col-md-12 w-table-100">
              <div className="cont-logo">
                <LinkContainer to={"/live"}>
                  <a>
                    <img src={icon.logoFooter} alt="" />
                  </a>
                </LinkContainer>
              </div>
            </div>           
          </Row>
        </Container>
      </footer>
    );
  }
}
