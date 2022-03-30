/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { LoadingModal } from "../../../utils/Loading";
import {
  FormikWizardProvider,
  Wizard,
  StepsList,
  Step,
  ButtonsList,
  PreviousButton,
  NextButton,
  SubmitButton,
} from "formik-wizard-form";
import { Alert } from "react-bootstrap";
import {
  fetchGetAllInmobiliarias, cambiarNumeroTipologias
} from "../../../action";

import withFormik from "./withFormik";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

function step1Validator({ errors }) {
  return(
  !errors.txtIdInmobiliaria &&
  !errors.txtNombre &&
  !errors.txtEntrega &&
  !errors.txtTipoPrecio &&
  !errors.txtValorDesde &&
  !errors.txtEstado &&
  !errors.txtSuperficieUtilDesde &&
  !errors.txtSuperficieTotalesDesde &&
  !errors.txtMeetingNumber &&
  !errors.txtMeetingPassword &&
  !errors.txtUrlProyecto &&
  !errors.txtApiKey &&
  !errors.txtApiSecret
  )
}

function step2Validator({ errors }) {
  return (
    !errors.txtTipoProyecto &&
    !errors.txtIdRegion &&
    !errors.txtComuna &&
    !errors.txtTipoVia &&
    !errors.txtNombreCalle &&
    !errors.txtNumero
  );
}

function step3Validator({ errors }) {
  return !errors.txtCalefaccion &&
  !errors.txtTipoPiso;
}

function step4Validator({ errors }) {
  return true;
}

function step5Validator({ errors }) {
    var i;
    let truesList = []
    for (i = 0; i < errors.rows; i++) {
      truesList.push(!errors[`txtPlanoNombre_${i}`] ? true : false)
      truesList.push(!errors[`txtPlanoValorDesde_${i}`] ? true : false)
      truesList.push(!errors[`txtPlanoBanio_${i}`] ? true : false)
      truesList.push(!errors[`txtPlanoDormitorio_${i}`] ? true : false)
      truesList.push(!errors[`txtPlanoSuperficieDesde_${i}`] ? true : false)
    }
    delete errors.rows
    if (truesList.indexOf(false) === -1) {
      return true
    }
}

class FormProyecto extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchGetAllInmobiliarias());
    this.state = {
      rowsNumber: [0],
      lol: "lol",
    };
  }

  onClickMap = (params, map, coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState({
      marker: {
        title: "",
        name: "",
        position: { lat, lng },
      },
      imagessort: [],
    });

    const { setFieldValue, onClickMapHelper } = this.props;
    onClickMapHelper(lat, lng);
    setFieldValue("txtLat", lat);
    setFieldValue("txtLng", lng);
  };

  componentDidUpdate(prevProps, nextProps) {
    const { setTouched, proyecto } = this.props;

    if (prevProps.proyecto.id !== proyecto.id) {
      setTouched();
    }
  }

  setCoords = ({ lat, lng }) => {
    const { setFieldValue, setCoordsHelper } = this.props;

    setCoordsHelper(lat, lng, () => {
      setFieldValue("txtLat", lat);
      setFieldValue("txtLng", lng);
    });
  };

  step5Validator = ({ errors }) => {
    var i;
    let truesList = [];
    for (i = 0; i < this.props.rowsNumber; i++) {
      truesList.push(!errors[`txtPlanoNombre_${i}`] ? true : false);
      truesList.push(!errors[`txtPlanoValorDesde_${i}`] ? true : false);
      truesList.push(!errors[`txtPlanoBanio_${i}`] ? true : false);
      truesList.push(!errors[`txtPlanoDormitorio_${i}`] ? true : false);
      truesList.push(!errors[`txtPlanoSuperficieDesde_${i}`] ? true : false);
    }
    if (truesList.indexOf(false) === -1) {
      return true;
    }
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
      itemInmobiliarias,
      dispatch,
      rowsNumberProps
    } = this.props;

    return (
      <div>
        {loading ? <LoadingModal /> : ""}

        <FormikWizardProvider {...this.props}>
          {(formProps) => {
            const {
              getValidators,
              values,
              errors,
              isSubmitting,
              isValidating,
              submitCount,
              ...otherProps
            } = formProps;
            
            if (values.txtNumeroPlanos && values.txtNumeroPlanos) {
              if (this.state.rowsNumber.length !== Array(values.txtNumeroPlanos).fill(0).length) {
                dispatch(cambiarNumeroTipologias(Array(values.txtNumeroPlanos).fill(0)))
                this.setState({
                  rowsNumber: Array(values.txtNumeroPlanos).fill(0),
                });
              }
            }
            return (
              <React.Fragment>
                <Wizard {...otherProps}>
                  <StepsList
                    validators={getValidators([
                      step1Validator,
                      step2Validator,
                      step3Validator,
                      step4Validator,
                      this.step5Validator,
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
                      itemInmobiliarias={itemInmobiliarias}
                    />
                    <Step
                      component={Step2}
                      title="Datos Proyecto"
                      onMapClick={this.onClickMap}
                      setCoords={this.setCoords}
                      itemsRegiones={regionesArr}
                      itemComunas={itemComunas}
                      onChangeComuna={onChangeComunaId}
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
                      title="Portada"
                      selectFile={selectFile}
                      fileError={fileError}
                      stateShow={state}
                      imagenesProp={imagenesProp}
                      values={values}
                      errors={errors}
                    />
                    <Step
                      component={Step5}
                      title="Tipología"
                      values={values}
                      addNewRow={this.props.addNewRow}
                      removeRow={this.props.removeRow}
                      rowsNumber={this.state.rowsNumber}
                      errors={errors}
                      rowsNumberProps={rowsNumberProps}
                    />
                  </StepsList>
                  <ButtonsList>
                    <PreviousButton
                      label="Anterior"
                      className="btn btn-warning next-previous-form"
                    />

                    <NextButton
                      label="Siguiente"
                      className="btn btn-warning next-previous-form"
                    />
                    <SubmitButton
                      label="Guardar"
                      className="btn btn-success next-previous-form"
                    />
                  </ButtonsList>
                </Wizard>
                {this.props.loading}
                {Object.keys(errors).length !== 0 && submitCount > 0 ? (
                  <Alert bsStyle={"danger"}>
                    <ul>
                      {Object.values(errors).map((error) => (
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

FormProyecto = withFormik(FormProyecto);

const mapPropsToValues = (state) => {
  return {
    loading: state.app.loading,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch: action => {
    dispatch(action);
  }
});

export default connect(mapPropsToValues, mapDispatchToProps)(FormProyecto);
