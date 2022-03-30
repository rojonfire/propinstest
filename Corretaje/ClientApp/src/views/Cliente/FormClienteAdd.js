/** @format */

import React, { Component, Fragment } from 'react';
import {
  FieldGroup,
  SelectFieldGroup,
  DateFieldGroup
} from '../../utils/Input';
import { Row, Col } from 'shards-react';

export class FormClienteAdd extends Component {
  render() {
    const { values } = this.props;
    const test = false;
    return (
      <Fragment>
        {test && <FieldGroup name="id" label="Id" value={values.id} />}
        <Row>
          <Col md="6" className="form-group">
            <FieldGroup name="nombres" label="Nombres" value={values.nombres} />
          </Col>
          <Col md="6" className="form-group">
            <FieldGroup
              name="apellidos"
              label="Apellidos"
              value={values.apellidos}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="form-group">
            <SelectFieldGroup
              label="Estado civil"
              name="estadoCivil"
              arrayOps={[
                { value: '', label: '--Seleccione--' },
                { value: 'Soltero', label: 'Soltero' },
                { value: 'Casado', label: 'Casado' }
              ]}
              value={values.estadoCivil}
            />
          </Col>
          <Col md="6" className="form-group">
            <DateFieldGroup
              id="txtFechaNacimiento"
              name="fechaNacimiento"
              label="Fecha Nacimiento"
              value={
                values.fechaNacimiento === '' || values.fechaNacimiento === null
                  ? new Date()
                  : new Date(values.fechaNacimiento)
              }
              max={new Date()}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="form-group">
            <FieldGroup name="rut" label="Rut" value={values.rut} />
          </Col>
          <Col md="6" className="form-group">
            <FieldGroup
              name="telefono"
              label="Telefono"
              value={values.telefono}
            />
          </Col>
        </Row>
        <FieldGroup name="mail" label="Mail" value={values.mail} />
        <FieldGroup
          name="direccion"
          label="Direccion"
          value={values.direccion}
        />
      </Fragment>
    );
  }
}

export default FormClienteAdd;
