import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import icon from "../../utils/images";
import utils from "../../utils/utilsFunc";

export const DescripcionPropiedad = ({ ...props }) => {
  return (
    <Container className="pa0 mobile-space paMobile">
      <Col sm={12} className="pa0 hideMOBILE paMobile">
        <h6 className="text-success">Características de la propiedad</h6>
        <Row className="cont-dependencias moove">
          <Row>
            <Col>
              <img src={icon.m2contruidos} width="25%" alt="" />
              
               <li>{props.propiedad && props.propiedad.data
                  ? props.propiedad.data.superficieUtil
                  : 0}{" "}
               </li>
              <div className="m2derecha5 peke3">
                m² Construidos
              </div>
            </Col>
            <Col>
              <img src={icon.camas} width="25%" alt="" />
              <li>
                {" "}
                {props.propiedad && props.propiedad.data
                  ? props.propiedad.data.dormitorios
                  : 0}</li>
              
            </Col>
            <Col>
              <img src={icon.gastosco} width="20%" alt="" />{" "}
              
                $
                {props.propiedad && props.propiedad.data
                  ? utils.formatNumeros(props.propiedad.data.gastosComunes)
                  : 0}{" "}
                <div className="m2derecha6 peke3">Gastos comunes</div>
             
            </Col>
          </Row>
          <Row className="funao">
            <Col>
              <img src={icon.m2totales} width="25%" alt="" />
              <li>
                {props.propiedad && props.propiedad.data
                  ? props.propiedad.data.superficieTotales
                  : 0}{" "}
              </li>
              <div className="m2derecha5 peke3 ">m² Totales</div>
              
            </Col>
            <Col>
              <img src={icon.banos} width="25%" alt="" />
             
                <li>
                {props.propiedad && props.propiedad.data
                  ? props.propiedad.data.banio
                  : 0}
                </li>
              
            </Col>
            <Col>
              <img src={icon.contri} width="20%" alt="" />{" "}
              
                $
                {props.propiedad && props.propiedad.data
                  ? utils.formatNumeros(props.propiedad.data.contribuciones)
                  : 0}{" "}
              <div className="peke3 m2derecha6 "> Contribuciones</div>
              
            </Col>
          </Row>
        </Row>
      </Col>
      <Row className="hideWEB">
        <Col>
          <h6 className="text-success">Características de la propiedad</h6>
        </Col>
      </Row>
      <Row className="hideWEB">
        <Col>
          <img src={icon.m2contruidos} width="40%" alt="" />
          <div className="m2derecha2">
            {props.propiedad && props.propiedad.data
                ? props.propiedad.data.superficieUtil
                : 0}{" "}
            m²
          </div>
          <div className="m2derecha2 peke">
            Construidos
          </div>
        </Col>
        <Col>
          <img src={icon.camas} width="40%" alt="" />
          <div className="m2derecha2">
            {" "}
            {props.propiedad && props.propiedad.data
                ? props.propiedad.data.dormitorios
                : 0}
          </div>
        </Col>
        <Col>
          <img src={icon.gastosco} width="40%" alt="" />{" "}
          <div className="m2derecha2">
            $
            {props.propiedad && props.propiedad.data
                ? utils.formatNumeros(props.propiedad.data.gastosComunes)
                : 0}{" "}
                <div className="m2derecha3 peke">
                  Gastos comunes
                </div>
            
          </div>
        </Col>
        
      </Row>
      <Row className="hideWEB ">
        <Col>
          <img src={icon.m2totales} width="40%" alt="" />
          <div className="m2derecha2">
                {props.propiedad && props.propiedad.data
                    ? props.propiedad.data.superficieTotales
                    : 0}{" "}
            m² 
          </div>
          <div className="m2derecha2 peke" >
            Totales
          </div>
        </Col>
        <Col>
          <img src={icon.banos} width="40%" alt="" />
          <span>
                {" "}
            {props.propiedad && props.propiedad.data
                ? props.propiedad.data.banio
                : 0}
              </span>
        </Col>
        <Col>
          <img src={icon.contri} width="30%" alt="" />{" "}
          <div className="m2derecha2">
                $
            {props.propiedad && props.propiedad.data
                ? utils.formatNumeros(props.propiedad.data.contribuciones)
                : 0}{" "}
            
              </div>
          <div className="m2derecha2 peke">
            Contribuciones
          </div>
          
        </Col>

      </Row>
    </Container>
  );
};
