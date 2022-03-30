import React from "react";
import { connect } from "react-redux";
import { Container, Button } from "react-bootstrap";
import ReactGa from "react-ga";
import { Link } from "react-router-dom";

export const initGA = () => {
  console.log("GA init");
  ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
};

class PlanContratado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    initGA();
    logPageView();
    document.querySelector("body").scrollTo(0, 0);
  }

  render() {
    return (
      <Container className="section-space-referir center text-center">
        <div className={"center plancontratado"}>Plan Contratado!</div>
        <div className={"center gracias-parrafo"}>
          Has finalizado la contratación de tu plan
          <div className="mt-5">
            <Link to={"/perfil"}>
              <Button>Ir a mi perfil</Button>
            </Link>
          </div>
        </div>
      </Container>
    );
  }
}

PlanContratado = connect(null, null)(PlanContratado);

export default PlanContratado;
