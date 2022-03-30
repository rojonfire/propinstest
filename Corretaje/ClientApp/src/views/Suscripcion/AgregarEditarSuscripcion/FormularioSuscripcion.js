import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  FieldGroup,
  SelectFieldGroup,
} from "../../../utils/Input";
import Tooltip from '@material-ui/core/Tooltip';

import { Row, Col, Button } from "shards-react";

export default ({
  values,
  onSubmit,
}) => {
  const [moneda, setMoneda] = useState("UF");
  const [tipo, setTipo] = useState(values && !values.esVenta ? "arriendo" : "venta");
  
  const validate = (formValues) => {
    const errors = {};

    if (!formValues.Nombre) {
      errors.Nombre = "Por favor ingrese sus nombres";
    }

    if (formValues.tipo == null) {
      errors.tipo = "Por favor ingrese tipo";
    }

    return errors;
  }

  const onChangeTipo = (newValue, setFieldValueMethod) => {
    setTipo(newValue);
    setFieldValueMethod("tipo", newValue);
  }

  return (
    <div>
      <Formik
        initialValues={{
          TipoPropiedad: values && values.tipoPropiedad,
          Region: "Metropolitana",
          Comuna1: values && values.comunaUno,
          Comuna2: values && values.comunaDos,
          Comuna3: values && values.comunaTres,
          Dormitorio_Desde: values && values.cantidadDormitoriosDesde,
          Dormitorio_Hasta: values && values.cantidadDormitoriosHasta,
          Bano_Desde: values && values.cantidadBanosDesde,
          Bano_Hasta: values && values.cantidadBanosHasta,
          Estacionamiento: values && values.cantidadEstacionamientos,
          M2Totales_Desde: values && values.metrosTotalesDesde,
          M2Totales_Hasta: values && values.metrosTotalesHasta,
          M2Utiles_Desde: values && values.metrosUtilesDesde,
          M2Utiles_Hasta: values && values.metrosUtilesHasta,
          Valor_Desde: values && values.valorDesde,
          Valor_Hasta: values && values.valorHasta,
          tipo_moneda: moneda,
          tipo: tipo,
          Nombre: values && values.nombreUsuario,
          Correo: values && values.emailUsuario,
          Celular: values && values.telefono
        }}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          handleSubmit,
          setFieldValue
        }) => (
          <>
            <Form onSubmit={handleSubmit} className="form-container">
              <Row>
                <Col>
                  <SelectFieldGroup
                    label="Tipo de Propiedad"
                    name="TipoPropiedad"
                    arrayOps={[
                      { value: "", label: "Seleccione..." },
                      { value: "Casa", label: "Casa" },
                      {
                        value: "Departamento",
                        label: "Departamento",
                      },
                    ]}
                    value={values.TipoPropiedad}
                  />
                </Col>
                <Col>
                  <SelectFieldGroup
                    label="Region"
                    name="Region"
                    arrayOps={[
                      { value: "", label: "Seleccione..." },
                      {
                        value: "Metropolitana",
                        label: "Metropolitana",
                      },
                    ]}
                    value={values.Region}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <SelectFieldGroup
                    label="Comuna de Preferencia 1"
                    name="Comuna1"
                    arrayOps={[
                      { value: "", label: "Seleccione..." },
                      {
                        value: "Colina",
                        label: "Colina",
                      },
                      {
                        value: "La Florida",
                        label: "La Florida",
                      },
                      {
                        value: "La Reina",
                        label: "La Reina",
                      },
                      {
                        value: "Lo Barnechea",
                        label: "Lo Barnechea",
                      },
                      {
                        value: "Macul",
                        label: "Macul",
                      },
                      {
                        value: "Ñuñoa",
                        label: "Ñuñoa",
                      },
                      {
                        value: "Peñalolen",
                        label: "Peñalolen",
                      },
                      {
                        value: "Providencia",
                        label: "Providencia",
                      },
                      {
                        value: "Santiago",
                        label: "Santiago",
                      },
                      {
                        value: "Vitacura",
                        label: "Vitacura",
                      },
                      {
                        value: "Las Condes",
                        label: "Las Condes",
                      },
                      {
                        value: "Huechuraba",
                        label: "Huechuraba",
                      },
                      {
                        value: "Independencia",
                        label: "Independencia",
                      },
                      {
                        value: "La Cisterna",
                        label: "La Cisterna",
                      },
                    ]}
                    value={values.Comuna1}
                  />
                </Col>
                <Col>
                  <SelectFieldGroup
                    label="Comuna de Preferencia 2"
                    name="Comuna2"
                    arrayOps={[
                      { value: "", label: "Seleccione..." },
                      {
                        value: "Colina",
                        label: "Colina",
                      },
                      {
                        value: "La Florida",
                        label: "La Florida",
                      },
                      {
                        value: "La Reina",
                        label: "La Reina",
                      },
                      {
                        value: "Lo Barnechea",
                        label: "Lo Barnechea",
                      },
                      {
                        value: "Macul",
                        label: "Macul",
                      },
                      {
                        value: "Ñuñoa",
                        label: "Ñuñoa",
                      },
                      {
                        value: "Peñalolen",
                        label: "Peñalolen",
                      },
                      {
                        value: "Providencia",
                        label: "Providencia",
                      },
                      {
                        value: "Santiago",
                        label: "Santiago",
                      },
                      {
                        value: "Vitacura",
                        label: "Vitacura",
                      },
                      {
                        value: "Las Condes",
                        label: "Las Condes",
                      },
                      {
                        value: "Huechuraba",
                        label: "Huechuraba",
                      },
                      {
                        value: "Independencia",
                        label: "Independencia",
                      },
                      {
                        value: "La Cisterna",
                        label: "La Cisterna",
                      },
                    ]}
                    value={values.Comuna2}
                  />
                </Col>
                <Col>
                  <SelectFieldGroup
                    label="Comuna de Preferencia 3"
                    name="Comuna3"
                    arrayOps={[
                      { value: "", label: "Seleccione..." },
                      {
                        value: "Colina",
                        label: "Colina",
                      },
                      {
                        value: "La Florida",
                        label: "La Florida",
                      },
                      {
                        value: "La Reina",
                        label: "La Reina",
                      },
                      {
                        value: "Lo Barnechea",
                        label: "Lo Barnechea",
                      },
                      {
                        value: "Macul",
                        label: "Macul",
                      },
                      {
                        value: "Ñuñoa",
                        label: "Ñuñoa",
                      },
                      {
                        value: "Peñalolen",
                        label: "Peñalolen",
                      },
                      {
                        value: "Providencia",
                        label: "Providencia",
                      },
                      {
                        value: "Santiago",
                        label: "Santiago",
                      },
                      {
                        value: "Vitacura",
                        label: "Vitacura",
                      },
                      {
                        value: "Las Condes",
                        label: "Las Condes",
                      },
                      {
                        value: "Huechuraba",
                        label: "Huechuraba",
                      },
                      {
                        value: "Independencia",
                        label: "Independencia",
                      },
                      {
                        value: "La Cisterna",
                        label: "La Cisterna",
                      },
                    ]}
                    value={values.Comuna3}
                  />
                </Col>
              </Row>
              <Row className="moverdomrs">
                <Col> Dormitorios</Col>
                <Col />
                <Col>Baños</Col>
                <Col />
                <Col />
              </Row>
              <Row>
                <Col>
                  <FieldGroup
                    name="Dormitorio_Desde"
                    label="Desde"
                    value={values.Dormitorio_Desde}
                  />
                </Col>
                <Col>
                  <FieldGroup
                    name="Dormitorio_Hasta"
                    label="Hasta"
                    value={values.Dormitorio_Hasta}
                  />
                </Col>
                <Col>
                  <FieldGroup
                    name="Bano_Desde"
                    label="Desde"
                    value={values.Bano_Desde}
                  />
                </Col>
                <Col>
                  <FieldGroup
                    name="Bano_Hasta"
                    label="Hasta"
                    value={values.Bano_Hasta}
                  />
                </Col>
                <Col>
                  <SelectFieldGroup
                    name="Estacionamiento"
                    label="Estacionamiento"
                    arrayOps={[
                      { value: "", label: "Seleccione..." },
                      {
                        value: "0",
                        label: "0",
                      },
                      {
                        value: "1",
                        label: "1",
                      },
                      {
                        value: "2",
                        label: "2",
                      },
                      {
                        value: "3",
                        label: "3",
                      },
                      {
                        value: "4",
                        label: "4",
                      },
                      {
                        value: "5",
                        label: "5",
                      },
                    ]}
                    value={values.Estacionamiento}
                  />
                </Col>
              </Row>
              <Row className="moverdomrs">
                <Col>M2 Totales</Col>
                <Col />
                <Col>M2 Útiles</Col>
                <Col />
              </Row>
              <Row>
                <Col>
                  <FieldGroup
                    name="M2Totales_Desde"
                    label="Desde"
                    value={values.M2Totales_Desde}
                  />
                </Col>
                <Col>
                  <FieldGroup
                    name="M2Totales_Hasta"
                    label="Hasta"
                    value={values.M2Totales_Hasta}
                  />
                </Col>
                <Col>
                  <FieldGroup
                    name="M2Utiles_Desde"
                    label="Desde"
                    value={values.M2Utiles_Desde}
                  />
                </Col>
                <Col>
                  <FieldGroup
                    name="M2Utiles_Hasta"
                    label="Hasta"
                    value={values.M2Utiles_Hasta}
                  />
                </Col>
              </Row>
              <div className="radio-group-label"> Tipo</div>
              <Row className="mb-4">
                <Col sm={"2"}>
                  <Field
                    name="tipo"
                    id="tipo"
                    type="radio"
                    value="venta"
                    checked={tipo == "venta"}
                    onChange={() => onChangeTipo("venta", setFieldValue)}
                  />
                  Venta
                </Col>

                <Col sm={"2"}>
                  <Field
                    name="tipo"
                    id="tipo"
                    type="radio"
                    value="arriendo"
                    checked={tipo == "arriendo"}
                    onChange={() => onChangeTipo("arriendo", setFieldValue)}
                  />
                  Arriendo
                </Col>
                { errors && errors.tipo && (
                  <div className="validation-error-message">
                    <ErrorMessage name={'tipo'}  />
                  </div>
                ) }                
              </Row>              
              <Tooltip 
                followCursor={true}
                classes={{
                  tooltip: 'font-size-12'
                }}
                title="Te recomendamos ingresar el precio en UF si es de tipo Venta, y en CLP si es de tipo Arriendo" 
                aria-label="ver detalles"
              >
                <div>
                  <Row>
                    <Col>
                      {" "}
                      <FieldGroup
                        name="Valor_Desde"
                        label="Valor desde"
                        value={values.Valor_Desde}
                      />
                    </Col>
                    <Col>
                      {" "}
                      <FieldGroup
                        name="Valor_Hasta"
                        label="Valor Hasta"
                        value={values.Valor_Hasta}
                      />
                    </Col>
                  </Row>               
                  <div className="radio-group-label"> Tipo moneda</div>
                  <Row className="mb-4">
                    <Col sm={"2"}>
                      <Field
                        name="tipo_moneda"
                        id="UF"
                        type="radio"
                        value="UF"
                        onChange={() => setMoneda("UF")}
                      />
                      UF
                    </Col>

                    <Col sm={"2"}>
                      <Field
                        name="tipo_moneda"
                        id="CLP"
                        type="radio"
                        value="CLP"
                        onChange={() => setMoneda("CLP")}
                      />
                      CLP
                    </Col>
                  </Row>                  
                </div>                
              </Tooltip>
              
              
              <div className="subsubtitsuscri">
                {" "}
                Datos Personales Cliente
              </div>
              <Row>
                <Col>
                  <FieldGroup
                    name="Nombre"
                    label="Nombre"
                    value={values.Nombre}
                  />
                </Col>
                <Col>
                  <FieldGroup
                    name="Correo"
                    label="Correo"
                    value={values.Correo}
                  />
                </Col>
                <Col>
                  <FieldGroup
                    name="Celular"
                    label="Celular"
                    value={values.Celular}
                  />
                </Col>
              </Row>
              <div className="center text-center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Enviar
                </Button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
}