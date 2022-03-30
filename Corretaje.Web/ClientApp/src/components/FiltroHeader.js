import React from "react";
import { Form, Row, Col } from "react-bootstrap";

export const FiltroHeader = (props) => {
  const { searchPropiedades } = props;
  return (
    <Form inline className="inline-block col-md-12 pa0 paMobile">
      <Row className="pa0 paMobile w-table-50">
        <Col>
          <Form.Group className="mx-1rem" as={Row} controlId="txtTipoPro">
            <Form.Label column sm={6} md lg xl>Tipo propiedad</Form.Label>
            <Form.Control id="txtTipoPro" as="select" onChange={searchPropiedades}>
              <option value="">Todos</option>
              <option value="Departamento">Departamento</option>
              <option value="Casa">Casa</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mx-1rem" as={Row} controlId="txtComuna">
            <Form.Label column sm={5}>Comuna</Form.Label>
            <Form.Control id="txtComuna" as="select" placeholder="Comuna" onChange={searchPropiedades}>
              <option key={0} value="">Todos</option>
              <option key={1} value="Las Condes">
                Las Condes
              </option>
              <option key={2} value="Lo Barnechea">
                Lo Barnechea
              </option>
              <option key={3} value="Vitacura">
                Vitacura
              </option>
              <option key={4} value="Santiago">
                Santiago
              </option>
              <option key={5} value="Providencia">
                Providencia
              </option>
              <option key={6} value="Ñuñoa">
                Ñuñoa
              </option>
              <option key={7} value="La Reina">
                La Reina
              </option>
              <option key={8} value="Peñalolen">
                Peñalolen
              </option>
              <option key={9} value="Macul">
                Macul
              </option>
              <option key={10} value="Colina">
                Colina
              </option>
              <option key={11} value="La Florida">
                La Florida
              </option>
              <option key={12} value="San Miguel">
                San Miguel
              </option>
              <option key={13} value="Estación Central">
                Estación Central
              </option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mx-1rem" as={Row} controlId="txtTipoOperacion">
            <Form.Label column sm={6}>Tipo proyecto</Form.Label>
            <Form.Control id="txtTipoOperacion" as="select" placeholder="Tipo" onChange={searchPropiedades}>
              <option key={0} value="">Todos</option>
              <option key={1} value="Venta">
                Venta
              </option>
              <option key={2} value="Arriendo">
                Arriendo
              </option>
              <option key={3} value="Proyecto">
                Proyecto
              </option>              
            </Form.Control>
          </Form.Group>
        </Col>
        
        
        
      </Row>
    </Form>
  );
};
