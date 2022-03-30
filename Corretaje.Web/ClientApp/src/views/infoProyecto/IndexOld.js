/** @format */

import React, { Component } from 'react';

import {
  Container,
  Row,
  Button,
  Breadcrumb,
  Card,
  OverlayTrigger,
  Tooltip,
  Badge,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import utilfunc from '../../utils/utilsFunc';
import { fetchGetUF } from '../../action';
import 'react-alice-carousel/lib/alice-carousel.css';
import 'moment-timezone';
import { Link } from "react-router-dom";
import { CardlItem } from "../../components/Card";
import icon from "../../utils/images";
import utilsFunc from "../../utils/utilsFunc";
const { formatNumeros } = utilsFunc;

export class IndexInfoProyecto extends Component {
  constructor(props) {
    super(props);

    this.shareLink = window.location.href;

    this.state = {
      proyecto: null,
      loading: false,
    };
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0);
    const { idCliente, getUf } = this.props;
    let id = utilfunc.getUrlParameter('idprop');
    getUf();

    // const proyecto = await api.apiGetPropiedadInfo(id, idCliente);

    const proyecto = {
      _id : "5e7ecb00f85cf100011bbd3a",
      CreatedAt : "2020-03-28T03:56:48.605Z",
      UpdatedAt : "2020-03-28T03:56:48.605Z",
      Delete : false,
      Destacar : false,
      SuperficieUtilDesde : 35.0,
      loc : {
          x : -33.4316869891623,
          y : -70.6246492277683
      },
      SuperficieTotalesDesde : 40.0,
      ValorDesde : 4000.0,
      Entrega : "Q1 2021",
      IdRegion : 15,
      Numero : 5950,
      Imagenes : [ 
          {
              Name : "download.png",
              Value : "",
              DownloadLink : "https://propiblobstorage.blob.core.windows.net:443/2f54152a-8b20-41f4-8db4-211919091433/download.png",
              EsPortada : false,
              ContainerName : "2f54152a-8b20-41f4-8db4-211919091433"
          }
      ],
      Modelos : [ 
          {
              Nombre : "Modelo 1",
              Banio : 1,
              Dormitorio : 0,
              SuperficieDesde : 35.0,
              ValorDesde : 4000.0,
              Imagenes : [ 
                  {
                      Name : "download.png",
                      Value : "",
                      DownloadLink : "https://propiblobstorage.blob.core.windows.net:443/85800042-f6b3-4d89-b183-96a66727eef3/download.png",
                      EsPortada : false,
                      ContainerName : "85800042-f6b3-4d89-b183-96a66727eef3"
                  }
              ]
          }, 
          {
              Nombre : "Modelo 2",
              Banio : 1,
              Dormitorio : 0,
              SuperficieDesde : 45.0,
              ValorDesde : 4500.0,
              Imagenes : [ 
                  {
                      Name : "download.png",
                      Value : "",
                      DownloadLink : "https://propiblobstorage.blob.core.windows.net:443/e1d1dd16-18b6-4f5b-8651-f7d07c2d5e23/download.png",
                      EsPortada : false,
                      ContainerName : "e1d1dd16-18b6-4f5b-8651-f7d07c2d5e23"
                  }
              ]
          }
      ],
      CarCom : {
          AccesoControlado : false,
          EstVisita : false,
          PortonElec : false,
          SalonDeJuegos : false,
          AreasVerdes : false,
          Quincho : false,
          Sauna : false,
          CamaraSeguridad : false,
          Bicicletros : false,
          SalaDeCine : false,
          JuegosInf : false,
          Piscina : false,
          SalaDeEventos : false,
          BodegasEcommerce : false
      },
      ProyCar : {
          Calefaccion : "Losa",
          Alarma : false,
          CocinaAmo : false,
          TipoPiso : "Porcelanato",
          Termopanel : false
      },
      Comuna : "Las Condes",
      NombreCalle : "Apoquindo",
      ObservacionesInternas : "No",
      ObservacionesPublicas : "No",
      TipoPrecio : "UF",
      TipoProyecto : "Departamento",
      UrlMattePort : "https://www.google.com",
      TipoVia : "Calle",
      Estado : 0,
      InmobiliariaId : "5e5d1765519f340001c76b81",
      NombreInmobiliaria : "Arauco",
      Nombre : "Proyecto Uno",
      Operacion : "Venta",
      Rentabilidad : false,
      Conectividad : false,
      Terminaciones : false,
      Equipamiento : false,
      HtmlbuttonLink : "https://www.google.com"
  }

    this.setState({ proyecto });
  };

  componentWillUnmount() {}


  // http://localhost:3000/info-proyecto?idprop=5cd9a6d0c189e200016c4dee


  render() {
    const { proyecto } = this.state

    const estados = [
      { value: 0, label: 'En Blanco' },
      { value: 1, label: 'En Verde' },
      { value: 2, label: 'Entrega Inmediata' },
    ]
    return (
      <Container fluid={true} className="bg-light live-custom">


        <Row className="bread-crumb-custom">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={"/"}>
                Inicio
              </Link>
            </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={"/live"}>
              Proyectos
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            Modelos
          </Breadcrumb.Item>
        </Breadcrumb>
        </Row>


        <Container>
          <Row className="info-proyectos-type">
            <div>
              Modelos del proyecto
              <br/>
              Total de modelos encontrados: 2
            </div>

            <div>
              <Button variant={'info'} onClick={this.onMoreInfo}>
                  IR A PROYECTOS
                </Button>
            </div>
          </Row>

        <br/>
        <Row>
                 {/* { proyecto && proyecto.Modelos
           ? proyecto.Modelos.map((row, index) => {

                return (

                    <div>
                      <img src={row.Imagenes[0].DownloadLink} alt="Img" style={{borderColor: "black", borderStyle: "dotted", margin: "10px"}}/>
                    </div>
                  
              );
              })
            : null 
              } */}
            { proyecto && proyecto.Modelos
            ? proyecto.Modelos.map(item => (
                <div key={proyecto.id} className="col-md-4 pabox w-table-50">
                  <CardlItem
                    key={proyecto.id}
                    header={<img src={item.Imagenes[0].DownloadLink} alt="Img" style={{borderColor: "black", borderStyle: "dotted", margin: "10px"}}/>
                      // <CarrouselItem
                      //   key={item.id}
                      //   arrayOps={item.imagenes}
                      //   onChangePropiedad={() =>
                      //     history.push("/info-propiedad?idprop=" + item.id)
                      //   }
                      // />
                    }
                    body={
                      <div>
                        <div
                          className="img-destacado"
                          style={proyecto.destacar ? { display: "block" } : {}}
                        >
                          <img src={icon.imgDestacado} alt="" />
                        </div>

                        {proyecto.exclusividad && (
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-disabled">
                                Proyecto Exclusivo Propins
                              </Tooltip>
                            }
                          >
                            <div className="exclusive-propins">
                              <img src={icon.exclusive} alt="exclusive" />
                            </div>
                          </OverlayTrigger>
                        )}

                        <Badge className="badge-category">
                          {proyecto.Operacion}
                        </Badge>
                        <Card.Title>
                          {proyecto.TipoProyecto}
                           <br/> 
                          <h4 style={{margin: "0px"}}>{item.Nombre}</h4>
                          <span>{proyecto.Comuna}</span>
                        </Card.Title>
                        <Card.Text>
                          <span className="uf text-success">
                            UF {item.ValorDesde ? formatNumeros(item.ValorDesde) : ""}
                          </span>
                                                    <span className="small">
                          Inmobiliaria: {" "}
                            <strong>{proyecto.NombreInmobiliaria}</strong>
                          </span>
                          <br/>
                          <span className="small">
                            Estado:{" "}
                            <strong>{estados.find(o => o.value === proyecto.Estado).label}</strong>
                          </span>
                          <span className="cont-dependencias">
                            <span>
                              <Badge className="badge-secondary">
                                {item.Dormitorio}D/{item.Banio}B
                              </Badge>
                            </span>
                            <span>
                              <Badge className="badge-secondary">
                                {item.SuperficieDesde} m²
                              </Badge>
                            </span>
                          </span>

                        </Card.Text>
                        {/* <Card.Footer>
                          <Link to={"/info-propiedad?idprop=" + proyecto.id}>
                            <Button type="button">Ver Proyecto</Button>
                          </Link>
                        </Card.Footer> */}
                      </div>
                    }
                  />
                </div>
              ))
            : null}


              </Row>
              </Container>
      </Container>
    );
  }

}

const mapStateToProps = state => ({
  uf: state.app.uf,
  ...state.app,
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  getUf: () => dispatch(fetchGetUF())
});

IndexInfoProyecto = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexInfoProyecto);

export default IndexInfoProyecto;
