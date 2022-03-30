/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoadingModal } from '../../../utils/Loading';
import {
  FormikWizardProvider,
  Wizard,
  StepsList,
  Step,
  ButtonsList,
  PreviousButton,
  NextButton,
  SubmitButton
} from 'formik-wizard-form';
import { Alert } from 'react-bootstrap';

import withFormik from './withFormik';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

function step1Validator({ errors }) {
  return (
    !errors.txtIdCliente &&
    !errors.txtDisponibilidad &&
    !errors.txtTipoOperacion &&
    !errors.txtValor &&
    !errors.txtBanios &&
    !errors.txtMtroUtiles &&
    !errors.txtMtrototales &&
    !errors.txtPlanContratado
  );
}

function step2Validator({ errors }) {
  return (
    !errors.txtGlosa &&
    !errors.txtTipoPropiedad &&
    !errors.txtOrientacion &&
    !errors.txtGastosComunes &&
    !errors.txtCantEstacionamiento &&
    !errors.txtRegion &&
    !errors.txtComuna &&
    //!errors.txtBarrio &&
    !errors.txtVia &&
    !errors.txtNombreCalle &&
    !errors.txtNumero &&
    !errors.txtObsPrivadas &&
    !errors.txtObsPublicas &&
    !errors.txtLat
  );
}

function step3Validator({ errors }) {
  return true;
}

function step4Validator({ errors }) {
  return true;
}

class FormPropiedad extends Component {
  onClickMap = (params, map, coord) => {
    const { latLng } = coord;

    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState({
      marker: {
        title: '',
        name: '',
        position: { lat, lng }
      },
      imagessort: []
    });

    const { setFieldValue, onClickMapHelper } = this.props;
    onClickMapHelper(lat, lng);
    setFieldValue('txtLat', lat);
    setFieldValue('txtLng', lng);
  };

  componentDidUpdate(prevProps, nextProps) {
    const { setTouched, propiedad } = this.props;

    if (prevProps.propiedad.id !== propiedad.id) {
      setTouched();
    }
  }

  setCoords = ({ lat, lng }) => {
    const { setFieldValue, setCoordsHelper } = this.props;

    setCoordsHelper(lat, lng, () => {
      setFieldValue('txtLat', lat);
      setFieldValue('txtLng', lng);
    });
  };

  setInputValue = (inputName, inputValue) => {
    const { setFieldValue } = this.props;

    setFieldValue(inputName, inputValue);
  };

  render() {
    const {
      loading,
      items,
      regionesArr,
      itemComunas,
      onChangeFechaTermino,
      onChangeFechaDisponible,
      handleShow,
      handleClose,
      onChangeComunaId,
      selectFile,
      state,
      fechaterm,
      fechadisp,
      marker,
      showCoord,
      fileError,
      setFieldValue,
      imagenesProp,
      itemPlanes,
      getTramosDisponibles,
      renderOptions,
      handleDateChange,
      validarTramoError,
      currentDate,
      requestLoadingVisitaFotografo,
      handleTimeChange
    } = this.props;

    const tramosDisponibles = getTramosDisponibles(currentDate);
    const timeOptions = renderOptions(tramosDisponibles);

    let planesFormatted = [{value: null, label: ' - Seleccione -'}];
    if (itemPlanes != null && itemPlanes.length > 0) {
      itemPlanes.forEach(p => planesFormatted.push({value: p.id, label: p.nombre}));
    }

    return (
      <div>
        {loading ? <LoadingModal /> : ''}

        <FormikWizardProvider {...this.props}>
          {formProps => {
            const {
              getValidators,
              values,
              errors,
              isSubmitting,
              isValidating,
              submitCount,
              ...otherProps
            } = formProps;
            return (
              <React.Fragment>
                <Wizard {...otherProps}>
                  <StepsList
                    validators={getValidators([
                      step1Validator,
                      step2Validator,
                      step3Validator,
                      step4Validator
                    ])}
                  >
                    <Step
                      component={Step1}
                      clientes={items}
                      onChangeFechaTerm={onChangeFechaTermino}
                      fechaTermino={fechaterm}
                      fechaDisponible={fechadisp}
                      onchangeFechaDis={onChangeFechaDisponible}
                      title="Datos Basicos"
                      setFieldValue={setFieldValue}
                      values={values}
                      handleShow={handleShow}
                      handleClose={handleClose}
                      planes={planesFormatted}
                      tramosDisponibles={tramosDisponibles}
                      timeOptions={timeOptions}
                      handleDateChange={handleDateChange}
                      validarTramoError={validarTramoError}
                      currentDate={currentDate}
                      setInputValue={this.setInputValue}
                      requestLoadingVisitaFotografo={requestLoadingVisitaFotografo}
                      handleTimeChange={handleTimeChange}
                    />
                    <Step
                      component={Step2}
                      title="Datos Propiedad"
                      onMapClick={this.onClickMap}
                      setCoords={this.setCoords}
                      itemsRegiones={regionesArr}
                      itemComunas={itemComunas}
                      setInputValue={this.setInputValue}
                      onChangeComuna={onChangeComunaId}
                      setFieldValue={setFieldValue}
                      markerPosition={marker}
                      values={values}
                      showCoord={showCoord}
                    />
                    <Step
                      component={Step3}
                      title="Caracteristicas"
                      values={values}
                    />
                    <Step
                      component={Step4}
                      title="Imagenes"
                      selectFile={selectFile}
                      fileError={fileError}
                      stateShow={state}
                      imagenesProp={imagenesProp}
                      values={values}
                      errors={errors}
                    />
                  </StepsList>
                  <ButtonsList>
                    <PreviousButton
                      label="Anterior"
                      className="btn btn-warning"
                    />

                    <NextButton label="Siguiente" className="btn btn-warning" />
                    <SubmitButton label="Guardar" className="btn btn-success" />
                  </ButtonsList>
                </Wizard>
                {this.props.loading}
                {Object.keys(errors).length !== 0 && submitCount > 0 ? (
                  <Alert bsStyle={'danger'}>
                    <ul>
                      {Object.values(errors).map(error => (
                        <li key={error}>{error}</li>
                      ))}
                    </ul>
                  </Alert>
                ) : null}
              </React.Fragment>
            );
          }}
        </FormikWizardProvider>
      </div>
    );
  }
}

FormPropiedad = withFormik(FormPropiedad);

const mapPropsToValues = state => {
  return {
    loading: state.app.loading,
    itemPlanes: state.app.itemPlanes,
  };
};

export default connect(mapPropsToValues, null)(FormPropiedad);
