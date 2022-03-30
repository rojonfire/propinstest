import React from "react";
import { Container } from "react-bootstrap";

export const Descri = ({ ...props }) => {
  return (
    <Container className="pa0 mobile-space paMobile">
      <div className="h5 text-success">Descripción de la propiedad</div>
      <p>{props.descripcion}</p>
    </Container>
  );
};
