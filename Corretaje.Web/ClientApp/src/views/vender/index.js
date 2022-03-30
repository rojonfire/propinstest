import React from "react";
import "../../css/style-propins.css";
import ReactGa from "react-ga";
import {
    Col,
    Container,
    Card,
    Row,
    Image,
    ListGroup,
    Button,
    Collapse,
} from "react-bootstrap";
import {Link} from "react-router-dom";
import icon from "../../utils/images";
import {listOfData} from "../Home/Testimonios";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Rating from "react-rating";

export const initGA = () => {
    console.log("GA init");
    ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
    ReactGa.set({page: window.location.pathname});
    ReactGa.pageview(window.location.pathname);
};

export class vender extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            captchaToken: null,
            responsive: {1024: {items: 3}, 1366: { items: 3 }},
            galleryItems: listOfData.map((item, index) => (
                <Card key={index} className="carousel-card shadow-light2 testimonio">
                    <Card.Body className="carousel-card-inner ">
                        <br />
                        <Card.Text className="carousel-text ">{item.text}</Card.Text>
                        <Card.Footer>
                            <Row>
                                <Col>
                                    <Card.Title>
                                        {item.name} <br />
                                        <span>{item.comuna}</span>
                                    </Card.Title>
                                </Col>
                                <Col>
                                    <div className="rating">
                                        <Rating
                                            emptySymbol={
                                                <img
                                                    src={icon.starEmpty}
                                                    className="icon"
                                                    alt="star-empty"
                                                />
                                            }
                                            fullSymbol={
                                                <img
                                                    src={icon.starFull}
                                                    className="icon"
                                                    alt="star-full"
                                                    
                                                />
                                            }
                                            readonly={true}
                                            initialRating={5}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card.Body>
                </Card>
            )),
        };
    }

    handleCaptcha = (captchaToken) => {
        this.setState({captchaToken});
    };

    render() {
        const {open1, open2, open3, open4, open5, open6, open7} = this.state;
        // const { captchaToken, defaultMessage } = this.state;
        // let mail = user && user.email ? user.email : "";
        // const { user } = this.props;
        return (
            <div className="bg-white yopoi">
                <div className="bg-white section-space6">
                    <div className="vender-titulo">
                        Por qué vender mi propiedad con Propins?
                    </div>

                    <Row className="center">
                        <Col md="6" className="center hideMOBILE">
                            <Row className="margin-vender2 hideMOBILE center ">
                                {" "}
                                <Col sm="1">
                                    <img className="ok-vender" src={icon.venderOk} alt=""/></Col>
                                <Col className=" mover-parrafo ">
                                    
                                    Miles de propers buscan comprador para tu propiedad apoyados
                                    en data intelligence, multiplicando x 3 tu probabilidad de
                                    conversión.
                                    
                                </Col>
                            </Row>
                           
                            <Row className="margin-vender2 center">
                                <Col sm="1"> <img className="ok-vender" src={icon.venderOk} alt=""/></Col>
                                <Col className="mover-parrafo">
                                    Entregamos todas las herramientas e incentivos para que tu red
                                    de contactos pueda referir tu propiedad.(simula cuánto pueden
                                    ganar tus amigos)
                                </Col>
                            </Row>
                            
                            
                            <Row className=" margin-vender2 center">
                                <Col sm="1"> <img className="ok-vender" src={icon.venderOk} alt=""/></Col>
                                <Col className="mover-parrafo">
                                    No te cobramos comisión, solo te pedimos exclusividad en la
                                    venta por 60 días(una sola contraparte, pero miles de propers
                                    buscando a tu comprador).
                                </Col>
                            </Row>
                            <Row className=" margin-vender2 center">
                                <Col sm="1"> <img className="ok-vender" src={icon.venderOk} alt=""/></Col>
                                <Col className="mover-parrafo">
                                    Nos encargamos de todo: Tour virtual 3D y fotos 4K de tu casa,
                                    publicación en los principales portales inmobiliarios, visitas
                                    guiadas por nuestros anfitriones, negociación con comprador,
                                    redacción de contratos.
                                </Col>
                            </Row>
                            
                            
                        </Col>
                        <Row className="margin-vender2 hideWEB2 center ok-vender">
                            <Col sm="1"> <img className="ok-vender" src={icon.venderOk} alt=""/></Col>
                            <Col className=" text-center mover-parrafo ">
                                Miles de propers buscan comprador para tu propiedad apoyados
                                en data intelligence, multiplicando x 3 tu probabilidad de
                                conversión.

                            </Col>
                        </Row>
                        <Row className="margin-vender2 hideWEB2 center ok-vender">
                            <Col sm="1"> <img className="ok-vender" src={icon.venderOk} alt=""/></Col>
                            <Col className=" text-center mover-parrafo ">
                                Entregamos todas las herramientas e incentivos para que tu red
                                de contactos pueda referir tu propiedad.(simula cuánto pueden
                                ganar tus amigos)

                            </Col>
                        </Row>
                        <Row className="margin-vender2 hideWEB2 center ok-vender">
                            <Col sm="1"> <img className="ok-vender" src={icon.venderOk} alt=""/></Col>
                            <Col className=" text-center mover-parrafo ">
                                No te cobramos comisión, solo te pedimos exclusividad en la
                                venta por 60 días(una sola contraparte, pero miles de propers
                                buscando a tu comprador).

                            </Col>
                        </Row>
                        <Row className="margin-vender2 hideWEB2 center ok-vender">
                            <Col sm="1"> <img className="ok-vender" src={icon.venderOk} alt=""/></Col>
                            <Col className=" text-center mover-parrafo ">
                                Nos encargamos de todo: Tour virtual 3D y fotos 4K de tu casa,
                                publicación en los principales portales inmobiliarios, visitas
                                guiadas por nuestros anfitriones, negociación con comprador,
                                redacción de contratos.

                            </Col>
                        </Row>
                        <Row className="hideWEB">
                            <Col md="12" className="img-personas2"/>
                        </Row>

                        <Col md="6" className="hideMOBILE">
                            {" "}
                            <Row className="img-personas"/>
                        </Col>
                    </Row>
                </div>

                <div className="bg-white section-spacevendermob up23">
                    <h1 className="vender-titulo">Puedo vender sin exclusividad?</h1>
                    <Row className="text-center centraar2  center">
                        <Col>
                        {" "}
                        Si. Lo que diferencia a la venta SIN exclusividad es que tiene un
                        costo asociado (2% + IVA del precio de venta) y no incluye el tour
                        virtual 3D de la propiedad (opcional, desde 2UF + IVA).
                        </Col>
                    </Row>
                </div>

                <div className="bg-white up24 section-space-p1ex section-space6A">
                    <h1 className="vender-titulo down2">Cómo funciona?</h1>
                    <Row className="center-123">
                        <Col md="4" className="">
                            <Row className="distancia downcomo1">
                                Escoge el plan Propins que se acomode a tus necesidades (CON
                                exclusividad / SIN exclusividad).
                            </Row>
                            <Row className="distancia downcomo2">
                                A través de Data Intelligence y nuestro sistema de referidos
                                encontramos a los mejores candidatos para tu propiedad.
                            </Row>
                            <Row className="distancia downcomo3">
                                Relájate y disfruta mientras se multiplican tus opciones de
                                vender.
                            </Row>
                        </Col>
                        <Col md="4">
                            {" "}
                            <Image className="hideMOBILE" src={icon.Esqueleto}/>
                            <Image
                                className="hideWEB mueve-esqueleto"
                                src={icon.EsqueletoMOBILE}
                            />
                        </Col>
                        <Col md="4" className="">
                            <Row className="distancia2 movi1-vender abajoo">
                                Visitamos tu propiedad y la preparamos para hacer el mejor tour
                                virtual 3D del mercado.
                            </Row>
                            <Row className="distancia2 movi2-vender abajoo2">
                                Nos encargamos de todo (visitas guiadas, negociación con
                                candidatos, redacción de contratos, entregas).
                            </Row>
                        </Col>
                    </Row>
                </div>

                <section className="bg-white section-space-p1ex testimonial ">
                    <Container className="">
                        <h1 className="vender-titulo">Nuestros clientes nos recomiendan</h1>

                        <AliceCarousel
                            items={this.state.galleryItems}
                            responsive={this.state.responsive}
                            autoPlayDirection="rtl"
                            autoPlay={false}
                            fadeOutAnimation={true}
                            mouseDragEnabled={true}
                            playButtonEnabled={false}
                            disableAutoPlayOnAction={true}
                            showSlideInfo={false}
                            keysControlDisabled={true}
                            dotsDisabled={false}
                            buttonsDisabled={true}
                        />
                    </Container>
                </section>
                <section className="bg-white up25  section-space-p1ex ">
                    <div className="preguntas-vender">
                        <div className="vender-tituloA">
                            <br/>
                            <div>Preguntas frecuentes</div>
                        </div>
                        <div className="cont-collapse-preguntas-vender">
                            <ListGroup className="border-bottom">
                                <Button
                                    onClick={() => this.setState({open1: !open1})}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open1}
                                    className=" tama-ven background-color-transparent"
                                >
                                    Cuánto cuesta el servicio de Propins?
                                </Button>
                                <Collapse in={this.state.open1}>
                                    <div className="referir-dropdown" id="example-collapse-text">
                                        <p>
                                            <div className="gugu">
                                                <br/>
                                                Nuestro servicio CON exclusividad no tiene costo para el
                                                propietario, solo te pedimos 60 días de exclusividad en
                                                la venta de tu propiedad. El servicio SIN exclusividad
                                                tiene un costo equivalente al 2% + IVA del precio de
                                                venta de tu propiedad. Solo pagas si vendes.
                                            </div>
                                        </p>
                                    </div>
                                </Collapse>
                            </ListGroup>
                            <ListGroup className="border-bottom">
                                <Button
                                    onClick={() => this.setState({open2: !open2})}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open2}
                                    className="background-color-transparent"
                                >
                                    Cómo sé cuánto vale mi propiedad?
                                </Button>
                                <Collapse in={this.state.open2}>
                                    <div className="referir-dropdown" id="example-collapse-text">
                                        <p>
                                            <div className="gugu">
                                                <br/>
                                                ¡Te ayudamos! En Propins contamos con el mejor servicio
                                                de tasación online del mercado, a un precio insuperable
                                                para nuestros clientes.
                                            </div>
                                        </p>
                                    </div>
                                </Collapse>
                            </ListGroup>
                            <ListGroup className="border-bottom">
                                <Button
                                    onClick={() => this.setState({open3: !open3})}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open3}
                                    className="background-color-transparent"
                                >
                                    Se debe pagar por el tour virtual 3D?
                                </Button>
                                <Collapse in={this.state.open3}>
                                    <div className="referir-dropdown" id="example-collapse-text">
                                        <p>
                                            <div className="gugu">
                                                <br/>
                                                Realizamos el tour virtual N°1 del mercado totalmente
                                                GRATIS para nuestros clientes que vendan CON
                                                exclusividad.
                                            </div>
                                        </p>
                                    </div>
                                </Collapse>
                            </ListGroup>
                            <ListGroup className="border-bottom">
                                <Button
                                    onClick={() => this.setState({open4: !open4})}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open4}
                                    className="background-color-transparent"
                                >
                                    Quién muestra mi propiedad?
                                </Button>
                                <Collapse in={this.state.open4}>
                                    <div className="referir-dropdown" id="example-collapse-text">
                                        <p>
                                            <div className="gugu">
                                                <br/>
                                                Nosotros nos encargamos de hacer las visitas guiadas de
                                                tu propiedad con el(la) anfitrión(a) que te asignaremos.
                                            </div>
                                        </p>
                                    </div>
                                </Collapse>
                            </ListGroup>
                            <ListGroup className="border-bottom">
                                <Button
                                    onClick={() => this.setState({open5: !open5})}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open5}
                                    className="background-color-transparent"
                                >
                                    Quién se encarga de la negociación?
                                </Button>
                                <Collapse in={this.state.open5}>
                                    <div className="referir-dropdown" id="example-collapse-text">
                                        <p>
                                            <div className="gugu">
                                                {" "}
                                                <br/>En Propins validamos cada una de las ofertas
                                                que reciba tu propiedad y negociamos el mejor precio
                                                para ti. Nuestro objetivo es que puedas tomar la mejor
                                                decisión.
                                            </div>
                                        </p>
                                    </div>
                                </Collapse>
                            </ListGroup>
                            <ListGroup className="border-bottom">
                                <Button
                                    onClick={() => this.setState({open6: !open6})}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open6}
                                    className="background-color-transparent"
                                >
                                    <div className="guga">
                                        Qué pasa si no venden mi propiedad en los 60 días que dura
                                        la exclusividad?
                                    </div>
                                </Button>
                                <Collapse in={this.state.open6}>
                                    <div className="referir-dropdown" id="example-collapse-text">
                                        <p>
                                            <div className="gugu">
                                                <br/>
                                                Si la propiedad no se logra vender en el plazo que dura
                                                la exclusividad, proponemos tres opciones:
                                                <br/> a) Renovar el plazo de exclusividad por
                                                períodos de 30 días cada vez bajo las mismas condiciones
                                                comerciales.<br/> b) Modificar el mandato de venta a
                                                uno SIN exclusividad. <br/> c) Finiquitar al término
                                                de los 60 días el mandato de venta de tu propiedad.
                                            </div>
                                        </p>
                                    </div>
                                </Collapse>
                            </ListGroup>
                            <ListGroup className="border-bottom">
                                <Button
                                    onClick={() => this.setState({open7: !open7})}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open7}
                                    className="background-color-transparent"
                                >
                                    Puede un familiar o un amigo ser proper de mi propiedad?
                                </Button>
                                <Collapse in={this.state.open7}>
                                    <div className="referir-dropdown" id="example-collapse-text">
                                        <p>
                                            <div className="gugu">
                                                <br/>
                                                Por supuesto, de hecho te entregamos todas las
                                                herramientas para que la puedan referir a través de sus
                                                redes sociales y ganar dinero.
                                            </div>
                                        </p>
                                    </div>
                                </Collapse>
                            </ListGroup>
                        </div>
                    </div>
                </section>
                <section className="  bg-white up45 section-space7A section-ven-mobile">
                    <Row className="hideMOBILE">
                        <Col md="6">
                            <Card md="6" className="comienza-vender comienza-vender">
                                <Row>
                                    <div className="registro-vender margin-vender">
                                        {" "}
                                        Crea tu cuenta, elige tu plan y comienza a vender tu
                                        propiedad!
                                    </div>
                                </Row>
                                <Row className="text-center center">
                                    <Col className="text-center center" md="12">
                                        <Link
                                            to={{
                                                pathname: "/planes",
                                            }}
                                        >
                                            <Button variant="propins123">
                                                Comenzar
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col md="6">
                            <Card md="6" className="comienza-vender comienza-vender">
                                <Row>
                                    <div className="registro-vender margin-vender">
                                        {" "}
                                        Tienes dudas?, Déjanos tus datos y un experto se contactará
                                        contigo.
                                    </div>
                                </Row>
                                <Row className="text-center center">
                                    <Col className="text-center center" md="12">
                                        <Link
                                            to={{
                                                pathname: "/contacto",
                                            }}
                                        >
                                            <Button variant="propins123">
                                                Contactar
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
<Row className="hideWEB2">
                    <Card  className=" center comienza-vender">
                        <Row>
                            <div className="registro-vender  margin-vender">
                                {" "}
                                Crea tu cuenta, elige tu plan y comienza a vender tu
                                propiedad!
                            </div>
                        </Row>
                        <Row className="text-center center">
                            <Col className="text-center center" md="12">
                                <Link
                                    to={{
                                        pathname: "/planes",
                                    }}
                                >
                                    <Button variant="propins123">
                                        Comenzar
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Card>
                    <Card  className=" center comienza-vender ">
                        <Row>
                            <div className="registro-vender margin-vender">
                                {" "}
                                Tienes dudas?, Déjanos tus datos y un experto se contactará
                                contigo.
                            </div>
                        </Row>
                        <Row className="text-center center">
                            <Col className="text-center center" md="12">
                                <Link
                                    to={{
                                        pathname: "/contacto",
                                    }}
                                >
                                    <Button variant="propins123">
                                        Contactar
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Card>
</Row>
                </section>
                
            </div>
        );
    }

    componentDidMount() {
        initGA();
        logPageView();
    }
}

let validate = (values) => {
    let errors = {};
    if (values.Pregunta === "") {
        errors.Pregunta = "Completa este campo";
    }
};

export default vender;
