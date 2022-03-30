import React from "react";
import {Container, Col, Row} from "react-bootstrap";
import icon from "../../../utils/images";
import utils from "../../../utils/utilsFunc";

export const DescripcionPropiedad = ({ ...props }) => {
  return (
    <Container className="pa0 mobile-space paMobile">
      <Col sm={12} className="pa0 paMobile">
        <h6>Descripción de la propiedad</h6>
        <Row className="cont-dependencias moove">
          <Col>
            <img src={icon.iconConstruidos} alt="" />
            
              {" "}
              {props.proyecto && props.proyecto.modelos && props.proyecto.modelos[props.modelNumber]
                ? props.proyecto.modelos[props.modelNumber].superficieDesde
                : 0}{" "}
            <div className="m2derecha5 peke3"> m2 Construidos</div>
            
          </Col>
          <li>
            <img src={icon.iconM2} alt="" />
            <span>
              {props.proyecto
                ? props.proyecto.data.superficieTotales
                : 0}{" "}
              m2 Totales
            </span>
          </li>
          <li>
            <img src={icon.iconDormitorio} alt="" />
            <span>
              Dormitorios:{" "}
              {props.proyecto
                ? props.proyecto.modelos[props.modelNumber].dormitorio
                : 0}
            </span>
          </li>
          <li>
            <img src={icon.iconBanio} alt="" />
            <span>
              Baños:{" "}
              {props.proyecto
                ? props.proyecto.modelos[props.modelNumber].banio
                : 0}
            </span>
          </li>
          <li>
            <img src={icon.iconGastoComun} alt="" />
            <span>
              Gastos comunes: $
              {props.propiedad && props.propiedad.data
                ? utils.formatNumeros(props.propiedad.data.gastosComunes)
                : 0}
            </span>
          </li>
          <li>
            <img src={icon.iconContribuciones} alt="" />
            <span>
              Contribuciones: $
              {props.propiedad && props.propiedad.data
                ? utils.formatNumeros(props.propiedad.data.contribuciones)
                : 0}
            </span>
          </li>
        </Row>
        <p>{props.descripcion}</p>
      </Col>
    </Container>
  );
};
