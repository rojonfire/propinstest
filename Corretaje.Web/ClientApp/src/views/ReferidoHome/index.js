import React, {Component} from "react";

import {
    Container,
    Row,
    Col,
    Button,
    Card,
    
} from "react-bootstrap";
import {connect} from "react-redux";

import icon from "../../utils/images";

import "react-alice-carousel/lib/alice-carousel.css";


import api from "../../api";

import "moment-timezone";

import utilsFunc from "../../utils/utilsFunc";
import {CardlItem} from "../../components/Card";
import {CarrouselItem} from "../../components/Carrousel";
import {Link} from "react-router-dom";
const {formatNumeros} = utilsFunc;

export class ReferidoHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            show2: false,
            render: false,
            referido: {},
            propiedades: [],
            responsive: {
                0: {items: 1},
                1024: {items: 4},
            },
        };
        this.NombreRef = React.createRef();
        
    }

    componentDidMount = async () => {
        window.scrollTo(0, 0);
        const idRef = utilsFunc.getUrlParameter("idref");
        let referidoDatos = {};
        let props;
        let propiedades;
        if (idRef !== undefined) {
            referidoDatos = await api.GetReferidoById(idRef);
            props = {
                "Ids": referidoDatos.referencias
            }
            propiedades = await api.apiGetPropiedadesId(props);
            this.setState({'propiedades': propiedades});
            this.setState({'referido': referidoDatos});
        }
        
    }



manejarmodal = () => {
    this.setState({show: !this.state.show});
};
manejarmodal2 = () => {
    this.setState({show2: !this.state.show2});
};
manejarmodal3 = () => {
    this.setState({show: !this.state.show, show2: !this.state.show2});
};

render()
{
    const {referido} = this.state;
    const {propiedades} = this.state;
    const {history} = this.props;
    
    return (
        <Container>
            <section className="section-space-p1ex
            ">
                <Row className="center text-center">
                    <Col >
                        <div className="referido-home-titulo">HOLA {referido.nombre} !</div>
                    </Col>
                </Row>
                <Row className="center text-center">
                    <Col className="bienvenido-a-prop">
                        {" "}
                        Bienvenido a Propins
                    </Col>
                    
                </Row>
                <Row className="">
                    <Col md="12" className="hideMOBILE centrar-proper">
                        {" "}
                        Estos son los proyectos sugeridos para tí
                    </Col>
                </Row>
                <Row className="hideWEB2 center text-center">
                    <Col md="12" className="">
                        {" "}
                        Estos son los proyectos sugeridos para tí
                    </Col>
                </Row>
                <Container className="">
                    <Row>
                        {propiedades.map((item) => (

                            <div
                                key={item.id}
                                className="prop-alto center pabox w-table-50"
                            >
                                <CardlItem
                                    key={item.id}
                                    header={
                                        <CarrouselItem
                                            key={item.id}
                                            arrayOps={item.imagenes}
                                            onChangePropiedad={() => history.push("/info-propiedad?idprop=" + item.id)}
                                        />
                                    }

                                    body={
                                        <div>
                                            <div className="etiquetas-propiedades">
                                                {
                                                    item.usado ? (
                                                        <img src={icon.etiquetausado} alt=""/>
                                                    ) : (
                                                        // <Link to={"/live/info-proyecto/"+item.idProyecto}>

                                                        <img src={icon.etiquetanuevo} alt=""/>
                                                    )
                                                    // </Link>
                                                }
                                            </div>


                                            <Card.Title className="titulo-arriba">
                                                <Row>
                                                    <Col>
                                                        {item.tipoPropiedad} {item.glosa}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <span>{item.comuna}</span>
                                                    </Col>
                                                    <Col>
                                                        {
                                                            item.usado ? (
                                                                <span className="cod_prop">
                                    <div className="text-success">
                                      Código propiedad:{" "}
                                    </div>
                                    <strong>{item.codPropiedad}</strong>
                                  </span>
                                                            ) : (
                                                                // <Link to={"/live/info-proyecto/"+item.idProyecto}>
                                                                <span className="cod_prop">
                                    <div className="text-inmo">
                                      Código propiedad:{" "}
                                    </div>
                                    <strong>{item.codPropiedad}</strong>
                                  </span>
                                                            )
                                                            // </Link>
                                                        }
                                                    </Col>
                                                </Row>
                                                <Row className="">
                                                    <Col>
                                                        {
                                                            item.usado ? (
                                                                <div className="text-success uf">
                                                                    <div
                                                                        className=" text-success uf entre-letra">Valor
                                                                    </div>
                                                                    {" "}
                                                                    UF{" "}
                                                                    {item.valor
                                                                        ? formatNumeros(item.valor)
                                                                        : ""}
                                                                </div>
                                                            ) : (
                                                                // <Link to={"/live/info-proyecto/"+item.idProyecto}>

                                                                <div className="text-inmo uf">
                                                                    {" "}
                                                                    <div className="entre-letra">
                                                                        Valor entre
                                                                    </div>
                                                                    {item.valor
                                                                        ? formatNumeros(item.valor)
                                                                        : ""}{" "}
                                                                    - 500 UF{" "}
                                                                </div>
                                                            )
                                                            // </Link>
                                                        }
                                                    </Col>
                                                    <Col>
                                                        {item.usado ? (
                                                            <Button variant="ganxreferir-inmo ">
                                                                <Row className="text-success center">
                                                                    <div className="gana">
                                                                        Ganancia por Referir{" "}
                                                                    </div>
                                                                </Row>
                                                                <Row> </Row>
                                                                <Row>
                                                                    {" "}
                                                                    <div className="center gana2">
                                                                        {" "}
                                                                        UF {Math.round(item.valor * 0.003)}{" "}
                                                                    </div>
                                                                </Row>
                                                            </Button>
                                                        ) : (
                                                            <Button variant="ganxreferir gana">
                                                                <Row className="text-inmo center">
                                                                    Ganancia por Referir
                                                                </Row>
                                                                <Row>
                                                                    <div className="entre-letra center">
                                                                        Desde
                                                                    </div>
                                                                </Row>
                                                                <Row>
                                                                    <div className="center gana2">
                                                                        UF {Math.round(item.valor * 0.003)}{" "}
                                                                    </div>
                                                                </Row>
                                                            </Button>
                                                        )}
                                                    </Col>

                                                </Row>
                                                <Row className="letter-small cachucha">
                                                    <Col>
                                                        <img src={icon.camas} alt=""/>{" "}{item.dormitorio}
                                                    </Col>
                                                    <Col>
                                                        <img src={icon.banos} alt=""/> {item.banos}
                                                    </Col>
                                                    <Col>
                                                        <img src={icon.m2contruidos} alt=""/>{item.m2Construidos}m²
                                                        <div className="m2derecha peke">
                                                            Construidos
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <img src={icon.m2totales} alt=""/>{item.m2Utiles}m²
                                                        <div className="peke m2derecha ">Totales</div>
                                                    </Col>
                                                </Row>
                                            
                                            
                                            
                                            
                                            </Card.Title>
                                            
                                            <Card.Footer>
                                                {item.usado ? (
                                                        <Link
                                                            to={"/info-propiedad?idprop=" + item.idUsados}
                                                        >
                                                            <Button type="button" variant="referir33">
                                                                Ver Propiedad
                                                            </Button>
                                                        </Link>
                                                    ) :
                                                    <Button type="button" variant="referir34"
                                                            href={"live/info-proyecto/" + item.idProyecto}>
                                                        Ver Proyectos
                                                    </Button>
                                                }
                                            </Card.Footer>
                                        </div>


                                    }


                                >
                                </CardlItem>

                            </div>))}

                    </Row>

                </Container>
            </section>
        </Container>
    );
}
}

ReferidoHome = connect(null, null)(ReferidoHome);

export default ReferidoHome;
