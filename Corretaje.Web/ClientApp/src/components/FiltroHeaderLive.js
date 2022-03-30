import React from "react";
import { Form, Row, Col } from "react-bootstrap";



export const FiltroHeaderLive = props => {
  const { searchPropiedades } = props;
  return (
    <Form className="inline-block col-md-12 pa0 paMobile">
      <Row>
        <Col className="pa0 col-12 col-md-2 paMobile w-table-50">
          <div className="box-select">
            <Form.Control id="txtOp" as="select">
              <option value="">Operación</option>              
              <option value="Venta">Comprar</option>
              <option value="Arrendar">Arrendar</option>
            </Form.Control>
          </div>
        </Col>
        <Col className="pa0 col-12 col-md-3 paMobile w-table-50">
          <div className="box-select">
            <Form.Control id="txtTipoPro" as="select">
              <option value="">Tipo de Proyecto</option> 
              <option value="Departamento">Departamento</option> 
              <option value="Casa">Casa</option>                           
              <option value="Otro">Otro</option>
            </Form.Control>
          </div>
        </Col>
        <Col className="pa0 col-12 col-md-3 paMobile w-table-50">
          <div className="box-select">
            <Form.Control id="txtEstadoPro" as="select">
              <option value="3">Etapa del proyecto</option>
              <option value="0">En Blanco</option>
              <option value="1">En Verde</option>
              <option value="2">Entrega Inmediata</option>
            </Form.Control>
          </div>
        </Col>
        <Col className="pa0 col-12 col-md-4 paMobile w-table-50">
          <div className="box-select">
            <Form.Control
              id="txtQuery"
              className="icon-form"
              placeholder="Comuna / Ciudad"
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  e.preventDefault();
                  searchPropiedades();
                }
              }}
            />
          </div>
        </Col>
      </Row>
    </Form>
  );
};
