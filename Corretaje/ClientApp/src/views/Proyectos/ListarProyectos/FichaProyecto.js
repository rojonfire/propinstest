/** @format */

import React from 'react';

import {
  FormTextarea,
  FormGroup,
  FormInput,
  Container,
  Row,
  Col
} from 'shards-react';

import moment from 'moment';

class FichaProyecto extends React.Component {
  constructor(props) {
    super(props);
    const id = this.props.params;

    this.state = {
      propiedad: id
    };
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <FormGroup>
              <label>Operacion: </label>
              <FormInput value={this.state.propiedad.operacion} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <label>Contribuciones: </label>
              <FormInput value={this.state.propiedad.contribuciones} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <label>Baños: </label>
              <FormInput value={this.state.propiedad.banio} />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup>
              <label>Precio: </label>
              <FormInput
                value={
                  this.state.propiedad.tipoPrecio +
                  ' ' +
                  this.state.propiedad.valor
                }
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <label>Gastos Comunes: </label>
              <FormInput value={this.state.propiedad.gastosComunes} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <label>Comuna: </label>
              <FormInput value={this.state.propiedad.comuna} />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup>
              <label>Fecha Inicio: </label>
              <FormInput
                value={moment(this.state.propiedad.fechaInicio).format(
                  'DD-MM-YYYY'
                )}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <label>Fecha Termino: </label>
              <FormInput
                value={moment(this.state.propiedad.fechaTermino).format(
                  'DD-MM-YYYY'
                )}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <label>Fecha Disponible: </label>
              <FormInput
                value={moment(this.state.propiedad.disponibilidad).format(
                  'DD-MM-YYYY'
                )}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup>
              <label>Estacionamientos: </label>
              <FormInput value={this.state.propiedad.cantEstacionamiento} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <label>Bodega: </label>
              <FormInput value={this.state.propiedad.bodega ? 'Si' : 'No'} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <label>Destacada: </label>
              <FormInput value={this.state.propiedad.destacar ? 'Si' : 'No'} />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <FormGroup>
              <label>Dormitorios: </label>
              <FormInput value={this.state.propiedad.dormitorios} />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <label>Observaciones: </label>
            <FormTextarea
              type="textarea"
              value={this.state.propiedad.observacionesInternas}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FichaProyecto;
