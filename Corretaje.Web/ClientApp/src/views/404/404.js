import React, { Component } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import icon from "../../utils/images";

export class error404 extends Component {
  render() {
    return (
      <Container fluid="true" className="bg-light pa0 paMobile flex-auto">
        <div className="sin-resultados">
          <img src={icon.error404} alt="404"/>
          <Link
            to={{
              pathname: "/",
            }}
          >
            <Button>Volver al Home</Button>
          </Link>
        </div>
      </Container>
    );
  }
}

export default error404;
