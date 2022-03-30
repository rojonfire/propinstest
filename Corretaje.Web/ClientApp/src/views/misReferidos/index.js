/** @format */

import React, {Component} from "react";

import {
    Modal,
    Container,
    Form,
    Row,
    Col,
    Button,
    Card,

} from "react-bootstrap";
import {connect} from "react-redux";
import "react-alice-carousel/lib/alice-carousel.css";
import api from "../../api";

import "moment-timezone";
import {Formik, Field} from "formik";
import sweetalert from "sweetalert";
import icon from "../../utils/images";
import {Link} from "react-router-dom";


export class MisReferidos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            referidos: [],

            responsive: {
                0: {items: 1},
                1024: {items: 3},
            },
        };
        this.NombreRef = React.createRef();
    }

    componentDidMount = async () => {
        window.scrollTo(0, 0);
        const {properId} = this.props.user;
        let referidosSelect = [];
        await api.apiGetProperById(properId).then(result => {
            referidosSelect = result.referidos

        })
        this.setState({referidos: referidosSelect})

    };


    manejarmodal = () => {
        this.setState({show: !this.state.show});
    };

    onSubmit = async e => {
        e.preventDefault();
        const {properId} = this.props.user;

        let nombre = document.getElementById("nombres").value;
        let apellido = document.getElementById("apellidos").value;
        let mail = document.getElementById("mail").value;

        let proper;
        proper = {
            "ProperId": properId,
            "Referidos": {
                "Nombres": nombre,
                "Apellido": apellido,
                "Email": mail
            }
        };
        let newref = await api.apiUpdateProper(proper);
        this.setState({referidos: newref.data.referidos})
        // this.setState({ show: !this.state.show });
        try {
            sweetalert({
                title: "Enviado con éxito",
                text: "Referido Agregado.",
                icon: "success",
                dangeMode: false
            })
            // this.setState({show: !this.state.show});
        } catch (error) {
            console.log("error: ", error)
        }
        this.manejarmodal();
    };


    render() {
        const {referidos} = this.state;
        const {user} = this.props;
        return <div>
            <section className="largo-agregar-refe">
                <Row className="">

                    <Col className="hideMOBILE" md="4">
                        <div className="modal-misreferidosA">Mis Referidos</div>
                    </Col>
                    <Col className="hideWEB" md="5">
                        <div className="modal-misreferidosA center text-center">Mis Referidos</div>
                    </Col>
                    <Col/>
                    <Col className="" md="4">
                        <Button
                            className="hideMOBILE"
                            variant="mis-referidos"
                            onClick={() => {
                                this.manejarmodal();
                            }}
                        >
                            {" "}
                            Agregar Referido
                        </Button>
                        <Modal
                            show={this.state.show}
                            onHide={() => this.manejarmodal()}
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
                                        Telefono: ""
                                    }}
                                    
                                    onSubmit={(e, opts) => this.EnviarData(e, opts)}
                                >

                                    {({isSubmitting}) => <Form onSubmit={this.EnviarData}>

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

                                    </Form>}
                                </Formik>
                            </Modal.Body>
                        </Modal>
                    </Col>
                </Row>
                
                <Row className="largonombre">
                    <Col md="4" className="text-center rerefiero">
                        Hola {user.name} !
                    </Col>
                </Row>
                <Row className="text-center center">
                    <Col md="12" className="text-center center">
                        <Button
                            className="center text-center hideWEB2"
                            variant="mis-referidos-hola"
                            onClick={() => {
                                this.manejarmodal();
                            }}
                        >
                            {" "}
                            <div className="text-center center">Agregar Referido</div>
                        </Button>
                    </Col></Row>
            </section>
            <Container>
                <div className="section-space-p1ex">
                    {referidos === 0 ? <div className="section-space6">
                        <Card className="cardNOMisref center">
                            <div className="text-center">
                                Aun no tienes referidos!
                                <br/>
                                <br/>
                                Agrega tu primer contacto seleccionando el boton superior derecho (Agregar Referido) y
                                recomiendale las
                                propiedades que creas se ajustan a
                                sus necesidades.
                            </div>
                        </Card>
                    </div> : null}

                    {
                        referidos.map(value => 
                            <div
                            key={value.id}
                            className="col-md-4 prop-alto pabox w-table-50 "
                        >
                            <Card className="bg-white cardMisref center">
                                <Row>
                                    <Col>
                                        {(value.referencias.length ===0) ? <Card className="minicarta2">
                                            <div className="juij">SIN REFERIR</div>
                                        </Card> : <Card className="minicarta">
                                            <div className="juij">REFERIDO</div>
                                        </Card>}

                                    </Col>
                                </Row>
                                <Row className="marginate">
                                    <Col className="letra-misref">
                                        Nombre
                                    </Col>

                                    <Col className="letra-misref">
                                        Correo electrónico
                                    </Col>

                                    <Col className=" hideMOBILE letra-misref">
                                        {(value.referencias.length !==0) ? <div>
                                                Estado de avance</div>
                                            : null}
                                    </Col>
                                    <Col className="hideMOBILE"/>


                                </Row>
                                <Row>
                                    <Col className="letra-misref1">
                                        {value.nombres} {value.apellido}
                                    </Col>
                                    <Col className="letra-misref2">
                                        {value.mail}
                                    </Col>
                                    <Col md="4" className="hideWEB"/>

                                    <Col md="4" className="hideMOBILE">
                                        <Row>

                                            {(value.referencias.length !==0) && (value.paso2 === true) && (value.paso3 === true) ?
                                                (
                                                    <Col>
                                                        <Row>
                                                            <Col><img src={icon.ok} alt=""/></Col>
                                                            <Col><img src={icon.ok} alt=""/></Col>
                                                            <Col><img src={icon.ok} alt=""/></Col>
                                                            <Col><img src={icon.ok} alt=""/></Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className="peke2">Referido</Col>
                                                            <Col className="peke2">Registro Completo</Col>
                                                            <Col className="peke2">Contactar Venderdor</Col>
                                                            <Col className="peke2">Promesa compra y venta</Col>
                                                        </Row>
                                                    </Col>
                                                ) : null}

                                            {( value.referencias.length !==0) && (value.paso2 === true) && (value.paso3 === false) ?
                                                (
                                                    <Col>
                                                        <Row>
                                                            <Col><img src={icon.ok} alt=""/></Col>
                                                            <Col><img src={icon.ok} alt=""/></Col>
                                                            <Col><img src={icon.paso3proc} alt=""/></Col>
                                                            <Col><img src={icon.paso4muerto} alt=""/></Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className="peke2">Referido</Col>
                                                            <Col className="peke2">Registro Completo</Col>
                                                            <Col className="peke2">Contactar Venderdor</Col>
                                                            <Col className="peke2">Promesa compra y venta</Col>
                                                        </Row>
                                                    </Col>
                                                ) : null}

                                            {(value.referencias.length !==0 ) && (value.paso2 === false) && (value.paso3 === false) ?
                                                (
                                                    <Col>
                                                        <Row>
                                                            <Col><img src={icon.ok} alt=""/></Col>
                                                            <Col><img src={icon.paso2proc} alt=""/></Col>
                                                            <Col><img src={icon.paso3muerto} alt=""/></Col>
                                                            <Col><img src={icon.paso4muerto} alt=""/></Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className="peke2">Referido</Col>
                                                            <Col className="peke2">Registro Completo</Col>
                                                            <Col className="peke2">Contactar Venderdor</Col>
                                                            <Col className="peke2">Promesa compra y venta</Col>
                                                        </Row>
                                                    </Col>
                                                ) : null}


                                        </Row>
                                    </Col>
                                    <Col/>
                                </Row>
                                <Row>
                                    <Col className="hideWEB letra-misref">
                                        {value.referencias.length !==0 ? <div>
                                                Estado de avance:</div>
                                            : null}
                                    </Col>
                                </Row>
                                <Row className="marginn hideWEB">
                                   
                                    {(value.referencias.length !==0 ) && (value.paso2 === true) && (value.paso3 === true) ?
                                        (
                                            <Col>
                                                <Row>
                                                    <Col><img src={icon.okM} alt=""/></Col>
                                                    <Col><img src={icon.okM} alt=""/></Col>
                                                    <Col><img src={icon.okM} alt=""/></Col>
                                                    <Col><img src={icon.okM} alt=""/></Col>
                                                </Row>
                                                <Row>
                                                    <Col className="peke2">Referido</Col>
                                                    <Col className="peke2">Confirmación de Registro</Col>
                                                    <Col className="peke2">Visita</Col>
                                                    <Col className="peke2">Cierre de Negocio</Col>
                                                </Row>
                                            </Col>
                                        ) : null}
                                    {(value.referencias.length !==0 ) && (value.paso2 === true) && (value.paso3 === false) ?
                                        (
                                            <Col>
                                                <Row>
                                                    <Col><img src={icon.okM} alt=""/></Col>
                                                    <Col><img src={icon.okM} alt=""/></Col>
                                                    <Col><img src={icon.paso3procM} alt=""/></Col>
                                                    <Col><img src={icon.paso4muertoM} alt=""/></Col>
                                                </Row>
                                                <Row>
                                                    <Col className="peke2">Referido</Col>
                                                    <Col className="peke2">Confirmación de Registro</Col>
                                                    <Col className="peke2">Visita</Col>
                                                    <Col className="peke2">Cierre de Negocio</Col>
                                                </Row>
                                            </Col>
                                        ) : null}

                                    {(value.referencias.length !==0 ) && (value.paso2 === false) && (value.paso3 === false) ?
                                        (
                                            <Col>
                                                <Row>
                                                    <Col><img src={icon.okM} alt=""/></Col>
                                                    <Col><img src={icon.paso2procM} alt=""/></Col>
                                                    <Col><img src={icon.paso3muertoM} alt=""/></Col>
                                                    <Col><img src={icon.paso4muertoM} alt=""/></Col>
                                                </Row>
                                                <Row>
                                                    <Col className="peke2">Referido</Col>
                                                    <Col className="peke2">Confirmación de Registro</Col>
                                                    <Col className="peke2">Visita</Col>
                                                    <Col className="peke2">Cierre de Negocio</Col>
                                                </Row>
                                            </Col>
                                        ) : null}
                                </Row>
                                
                                <Row>
                                    <Col className="hideMOBILE" md="10"/>

                                    { value.referencias.length !== 0 ? 
                                        <Col md="2" className="letra-misref">
                                            <Link
                                                to={"/mis-referidos/detalle?idref=" + value.id}
                                            >
                                            <Button variant="ver-mas up upito" >
                                                Ver mas
                                            </Button>
                                            </Link>
                                        </Col> 
                                        
                                        :
                                        (
                                            <Col className="center text-center">
                                                <Button variant="referirtransparente2" href="/resultado-busqueda">
                                                Referir
                                            </Button></Col>)}

                                </Row>


                            </Card>

                        </div>)
                    }

                </div>


            </Container>
        </div>
            ;
    }
}



const
    mapStateToProps = state => ({
        user: state.app.user
    })

const
    mapDispatchToProps = dispatch => ({
        dispatch: action => {
            dispatch(action);
        }
    })

MisReferidos = connect(mapStateToProps, mapDispatchToProps)(MisReferidos);

export default MisReferidos;
