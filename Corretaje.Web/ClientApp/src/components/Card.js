import React from "react";
import { Card } from "react-bootstrap";

export const CardlItem = ({ header, body, ...props }) => {
  return (
    <Card className="paFull propiedad destacado shadow">
      {header}
      <Card.Body>{body}</Card.Body>
    </Card>
  );
};

export const CardlItemSmall = ({ header, body, ...props }) => {
  return (
    <Card className="paFull propiedad destacado shadow card-small">
      {header}
      <Card.Body>{body}</Card.Body>
    </Card>
  );
};
