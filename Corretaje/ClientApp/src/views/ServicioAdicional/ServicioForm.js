/** @format */

import React, { Component, Fragment } from 'react';
import { FieldGroup } from '../../utils/Input';
import ErrorLabel from '../../utils/ErrorLabel';
import ReactSVG from 'react-svg';
import icon from '../../utils/images';
import { ErrorMessage } from 'formik';

import { Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import swal from 'sweetalert2';

export default class ServicioForm extends Component {
  state = { value: false };

  userFeedBack = () => {
    const { requestState, history, mensaje } = this.props;

    if (requestState == "LOADING") swal.showLoading();

    if (requestState == "SUCCESS") {
      swal.fire({
        icon: 'success',
        title: 'Bien...',
        text: 'Servicio agregado!',
        onAfterClose: () => {
          history.push("/tables")
        }
      });
    }

    if (requestState == 'ERROR') {
      swal.fire({
        icon: 'error',
        title: 'Error...',
        text: mensaje
      });
    }
  };

  render() {
    const { values, onSubmit } = this.props;
    const test = false;
    return (
      <Fragment>
        {this.userFeedBack()}
        <div>
          <FieldGroup label="Nombre" name="nombre" value={values.nombre} />
          <FieldGroup
            label="Subtitulo"
            name="subtitulo"
            value={values.subtitulo}
          />
          <FieldGroup label="Precio" name="precio" value={values.precio} />
          <ToggleButtonGroup
            type="radio"
            name="imagen"
            value={values.imagen}
            justified
            onChange={img => {
              values.imagen = img;
              this.setState({ value: !this.state.value });
            }}
          >
            <ToggleButton bsStyle={'info'} value={'anfitrion'}>
              <ReactSVG
                svgStyle={{
                  maxWidth: '30px',
                  maxHeight: '30px'
                }}
                loading={() => <span>Cargando</span>}
                src={icon.anfitriones}
              />
            </ToggleButton>
            <ToggleButton bsStyle={'info'} value={'tasacion'}>
              <ReactSVG
                svgStyle={{
                  maxWidth: '30px',
                  maxHeight: '30px'
                }}
                loading={() => <span>Cargando</span>}
                src={icon.tasacion}
              />
            </ToggleButton>
            <ToggleButton bsStyle={'info'} value={'planos'}>
              <ReactSVG
                svgStyle={{
                  maxWidth: '30px',
                  maxHeight: '30px'
                }}
                loading={() => <span>Cargando</span>}
                src={icon.planos}
              />
            </ToggleButton>
            <ToggleButton bsStyle={'info'} value={'destacados'}>
              <ReactSVG
                svgStyle={{
                  maxWidth: '30px',
                  maxHeight: '30px'
                }}
                loading={() => <span>Cargando</span>}
                src={icon.destacados}
              />
            </ToggleButton>
            <ToggleButton bsStyle={'info'} value={'redessoc'}>
              <ReactSVG
                svgStyle={{
                  maxWidth: '30px',
                  maxHeight: '30px'
                }}
                loading={() => <span>Cargando</span>}
                src={icon.publicidad}
              />
            </ToggleButton>
          </ToggleButtonGroup>
          <ErrorMessage name={'imagen'} component={ErrorLabel} />

          {test && (
            <Fragment>
              <FieldGroup label="Id" name="id" value={values.id} />
              <FieldGroup
                label="Tipo de moneda"
                name="tipoMoneda"
                value={values.tipoMoneda}
              />
            </Fragment>
          )}
        </div>
        <div style={{ marginTop: '10px' }}>
          {' '}
          <Button
            type="submit"
            onClick={() => {
              onSubmit();
            }}
            className="btn-primary"
          >
            Guardar
          </Button>
        </div>
      </Fragment>
    );
  }
}
