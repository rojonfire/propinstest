import React, { Component } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  
} from "react-bootstrap";
import { connect } from "react-redux";

import "react-alice-carousel/lib/alice-carousel.css";

import "moment-timezone";
import Select from "react-select";

const options = [
  { value: "Banco de Chile", label: "Banco de Chile" },
  { value: "Banco Estado", label: "Banco Estado" },
  { value: "Banco Bice", label: "Banco Bice" },
];

export class Promesa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      show2: false,
      render: false,

      responsive: {
        0: { items: 1 },
        1024: { items: 4 },
      },
    };
  }
  componentDidMount = async () => {
    window.scrollTo(0, 0);
  };
  manejarmodal2 = () => {
    this.setState({ show2: !this.state.show2 });
  };
  render() {
    return (
      <Container className="bg-white downn">
        <section className="section-space6">
          <Row className="primera-linea">
            <Col md="4">
              <div className="modal-misreferidosA">Promesa Compra Venta </div>
            </Col>
            <Col/>
          </Row>
          <Card className="tarjeta-promesa">
            <Row className="">
              <Col md="4">
                <Row className="negro-promesa">Adjuntar archivo</Row>
                <Row className="negro-claro-promesa">
                  Archivo con extension pdf, png, jpeg, etc
                </Row>
              </Col>

              <Col md="4"/>
              <Col md="4" className="">
                {" "}
                <Container>
                  <form>
                    <label>
                      <input className="btn-promesa" type="file" />
                    </label>
                    <br />
                  </form>
                </Container>
              </Col>
            </Row>
          </Card>
          <Card className="tarjeta-form-promesa">
            <Row>
              <Col md="12" className="datos-promesa text-center">
                {" "}
                Datos bancarios
              </Col>
            </Row>

            <form>
              <Container className="para-centrar">
                <Row>
                  <Col md="4">
                    <Row>Medio de pago</Row>
                    <Row>
                      <label>
                        {" "}
                        Boleta
                        <input type="radio" />
                      </label>
                    </Row>
                    <Row>
                      <label>
                        {" "}
                        Factura
                        <input type="radio" />
                      </label>
                    </Row>
                  </Col>

                  <Col md="4" className="">
                    <Row> Tipo de cuenta</Row>
                    <Row>
                      <label>
                        {" "}
                        <Select
                          options={options}
                          className="largo-opciones-select2"
                        />
                      </label>
                    </Row>
                  </Col>
                  <Col md="4">
                    <Row>Banco</Row>
                    <Row>
                      <label>
                        {" "}
                        <Select
                          options={options}
                          className="largo-opciones-select2"
                        />
                      </label>
                    </Row>
                    <Row>Numero de Cuenta</Row>
                    <Row>
                      <label>
                        {" "}
                        <input type="email" />
                      </label>
                    </Row>
                  </Col>
                </Row>
              </Container>
              <Row>
                <Col md="12" className="text-center">
                  <button className="btn-referir-proper2" type="submit">
                    <div className="submit-letra-proper">Subir</div>
                  </button>
                </Col>
              </Row>
            </form>
          </Card>
        </section>
      </Container>
    );
  }
}

Promesa = connect(null, null)(Promesa);

export default Promesa;
