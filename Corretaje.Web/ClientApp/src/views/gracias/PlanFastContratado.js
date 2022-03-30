import React from "react";
import { connect } from "react-redux";
import icon from "../../utils/images";
import ReactGa from "react-ga";
import { Link } from "react-router-dom";
import {
  Button,
} from "react-bootstrap";

export const initGA = () => {
  console.log("GA init");
  ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
};

class PlanFastContratado extends React.Component {
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
      <div>
        <section className="hideMOBILE section-space-referir center text-center">
          <div className="pt-5">
            <img
              className={"tamano-img-gracias center"}
              src={icon.FotoGraciasPlanFast}
              alt=""
            />
          </div>
          <div className={"muchasgracias mt-5 mb-4"}>
            ¡ Muchas Gracias !
          </div>
          <div className={"center gracias-parrafo mb-4"}>
            Dentro de las próximas 48 horas te llegará una propuesta de compra a
            tu correo electrónico
          </div>
          <div>
            <Link to={"/perfil"}>
              <Button>
                Ir a mi perfil
              </Button>
            </Link>
          </div>
        </section>
        <section className="hideWEB2 section-space-referir center text-center">
          <div className={"my-5"}>
            <img
              className={"imagen-gracias-mobile center"}
              src={icon.FotoGraciasPlanFast}
              alt=""
            />
          </div>
          <div className={"muchasgracias mb-2"}>
            ¡ Muchas Gracias !
          </div>
          <div className={"center gracias-parrafo"}>
            Dentro de las próximas 48 horas te llegará una propuesta de compra a
            tu correo electrónico
            <div className="mt-4">
              <Link to={"/perfil"}>
                <Button>
                  Ir a mi perfil
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

PlanFastContratado = connect(null, null)(PlanFastContratado);

export default PlanFastContratado;