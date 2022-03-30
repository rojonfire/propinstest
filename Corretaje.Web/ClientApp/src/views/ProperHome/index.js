import React, { Component } from "react";

import { Modal, Container, Form, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import icon from "../../utils/images";
import "react-alice-carousel/lib/alice-carousel.css";
import api from "../../api";
import "moment-timezone";
import sweetalert from "sweetalert";
import { fetchGetProperById, fetchGetPropiedades } from "../../action";
import { Field, Formik } from "formik";

export class ProperHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      show2: false,
      render: false,

      responsive: {
        0: { items: 1 },
        1024: { items: 3 },
      },
    };
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0);
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { properId } = this.props.user;

    let nombre = document.getElementById("nombres").value;
    let apellido = document.getElementById("apellidos").value;
    let mail = document.getElementById("mail").value;

    let proper = {
      ProperId: properId,
      Referidos: {
        Nombres: nombre,
        Apellido: apellido,
        Mail: mail,
      },
    };
   
    await api.apiUpdateProper(proper);
    // this.setState({ show: !this.state.show });
    try {
      sweetalert({
        title: "Enviado con éxito",
        text: "Referido Agregado.",
        icon: "success",
        dangeMode: false,
      });
      // this.setState({show: !this.state.show});
    } catch (error) {
      console.log("error: ", error);
    }
    this.manejarmodal2();
  };

  manejarmodal = () => {
    this.setState({ show: !this.state.show });
  };
  manejarmodal2 = () => {
    this.setState({ show2: !this.state.show2 });
  };
  manejarmodal3 = () => {
    this.setState({ show: !this.state.show, show2: !this.state.show2 });
  };

  render() {
    const { user } = this.props;
    return (
      <section className="larguisimoo">
        <section className=" ">
          <Row className="largo-agregar-refe">
            <Col md="4">
              <div className="modal-misreferidosA">Hola {user.name} !</div>
            </Col>
            <Col />
            <Col md="4">
              <Button
                  className="hideMOBILE"
                variant="mis-referidos"
                onClick={() => {
                  this.manejarmodal2();
                }}
              >
                {" "}
                Agregar Referido
              </Button>
              <Modal
                show={this.state.show2}
                onHide={() => this.manejarmodal2()}
              >
                <Modal.Header closeButton>
                  <div className="modal-misreferidos">Agregar Referido</div>
                </Modal.Header>
                <Modal.Body>
                  <Formik
                    initialValues={{
                      Nombres: "",
                      Apellidos: "",
                      Mail: "",
                      Telefono: "",
                    }}
                    
                    onSubmit={(e, opts) => this.EnviarData(e, opts)}
                  >
                    {({ isSubmitting }) => (
                      <Form onSubmit={this.EnviarData}>
                        <label>Nombre</label>
                        <Field
                          name="Nombres"
                          id="nombres"
                          className="color-border-modal form-control"
                          ref={this.NombreRef}
                        />

                        <label>Apellido</label>
                        <Field
                          name="Apellidos"
                          id="apellidos"
                          className="color-border-modal form-control"
                        />

                        <label>Correo</label>
                        <Field
                          name="Mail"
                          id="mail"
                          className="color-border-modal form-control"
                          placeholder="example@example.cl"
                        />
                        <div className="center text-center">
                          <Button
                              // type="submit"
                              variant="misreferidosmod"
                              onClick={this.onSubmit}
                          >
                            {isSubmitting ? "Enviando..." : "Enviado"}
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
          <Container>
            <Row className="center-propers">
              <Col md="4" className="card-home-proper3 hideWEB2">
                <Row>
                  <Col className="titulo-propers-home left-propers">
                    NUEVO REFERIDO
                  </Col>
                </Row>
                <Row>
                  <Col className="parrafo-propers-home">
                    Agrega los datos de tu nuevo contacto
                  </Col>
                </Row>

                <Row className="center text-center left-propers">
                  <Col>
                    <Button
                        className=""
                        variant="propers"
                        onClick={() => {
                          this.manejarmodal2();
                        }}
                    >
                      {" "}
                      Agregar 
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col md="3" className="card-home-proper3">
                <Row  className="center text-center">
                  <Col className="titulo-propers-home left-propers">
                    REFERIR
                  </Col>
                </Row>
                <Row className="center text-center">
                  <Col className="parrafo-propers-home">
                    Recomienda propiedades según las necesidades de tu referido
                  </Col>
                </Row>
                <Row className="center text-center">
                  <Col>
                    <Button variant="propers" href="/resultado-busqueda">
                      {" "}
                      Comenzar
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col md="3" className="card-home-proper3">
                <Row className="center text-center">
                  <Col className="titulo-propers-home ">
                    MIS REFERIDOS
                  </Col>
                </Row>
                <Row className="center text-center">
                  <Col className="parrafo-propers-home">
                    Revisa tu lista de referidos y su estado de avance
                  </Col>
                </Row>
                <Row className="center text-center">
                  <Col className="">
                    <Button variant="propers2" href="/mis-referidos">
                      {" "}
                      Acceder
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col md="3" className="card-home-proper3">
                
                <Row className="center text-center">
                  <Col className="titulo-propers-home ">
                    RECURSOS{" "}
                  </Col>
                </Row>
                <Row className="center text-center">
                  <Col className="parrafo-propers-home">
                    Te entregamos material de apoyo para compartir en tus
                    contactos
                  </Col>
                </Row>
                <Row  className="center text-center ">
                  <Col className="center text-center ">
                      <div className="proxi center text-center"> PRÓXIMAMENTE </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="">
              <Col className="hideMOBILE">
                <img
                  className="img-tips-proper"
                  src={icon.tipspropers}
                  alt=""
                />
              </Col>
              <Col className="hideWEB">
                <img
                  className="img-tips-proper"
                  src={icon.tipspropers2}
                  alt=""
                />
              </Col>
            </Row>
          </Container>
        </section>
      </section>
    );
  }
}


const mapStateToProps = (state) => ({
  loading: state.app.loading,
  user: state.app.user,
});

const mapDispatchToProps = (dispatch) => ({
  getPropiedades: (query, totalPages, currentPage) =>
    dispatch(fetchGetPropiedades(query, totalPages, currentPage)),
  getProperId: (properId) => dispatch(fetchGetProperById(properId)),
  dispatch: (action) => {
    dispatch(action);
  },
});
ProperHome = connect(mapStateToProps, mapDispatchToProps)(ProperHome);

export default ProperHome;
