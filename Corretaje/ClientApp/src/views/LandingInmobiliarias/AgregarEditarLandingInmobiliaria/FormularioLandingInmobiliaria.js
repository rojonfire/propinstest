import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  SelectFieldGroup,
} from "../../../utils/Input";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Row, Col, Button } from "shards-react";

export default ({
  values,
  onSubmit,
  inmobiliarias
}) => {
  const [backgroundColor, setBackgroundColor] = useState(values && values.backgroundColor ? values.backgroundColor : "");
  const [letterColor, setLetterColor] = useState(values && values.letterColor ? values.letterColor : "");
  const [buttonColor, setButtonColor] = useState(values && values.buttonColor ? values.buttonColor : "");

  const inmobiliariasOptions = [];
  
  inmobiliarias && inmobiliarias.length > 0 &&
    inmobiliarias.forEach(i => inmobiliariasOptions.push({ label: i.nombre, value: i.id }));
  
  const validate = (formValues) => {
    const errors = {};

    if (!formValues.idInmobiliaria) {
      errors.idInmobiliaria = "Por favor seleccione una inmobiliaria";
    }

    if (!formValues.backgroundColor) {
      errors.backgroundColor = "Por favor seleccione un color de fondo";
    }

    if (!formValues.letterColor) {
      errors.letterColor = "Por favor seleccione un color de texto";
    }

    if (!formValues.buttonColor) {
      errors.buttonColor = "Por favor seleccione un color de boton";
    }

    return errors;
  }

  const onChangeBackgroundColor = (newValue, setFieldValueMethod) => {
    setBackgroundColor(newValue);
    setFieldValueMethod("backgroundColor", newValue);
  }
  
  const onChangeLetterColor = (newValue, setFieldValueMethod) => {
    setLetterColor(newValue);
    setFieldValueMethod("letterColor", newValue);
  }
  
  const onChangeButtonColor = (newValue, setFieldValueMethod) => {
    setButtonColor(newValue);
    setFieldValueMethod("buttonColor", newValue);
  }  

  return (
    <Formik
      initialValues={{
        idInmobiliaria: values && values.idInmobiliaria,
        letterColor: letterColor,
        backgroundColor: backgroundColor,
        buttonColor: buttonColor
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
                  label="Inmobiliaria"
                  name="idInmobiliaria"
                  arrayOps={inmobiliariasOptions}
                  value={values.idInmobiliaria}
                />
              </Col>
            </Row>
            <Row>
              <Col>Color de fondo</Col>
              <Col>Color de texto</Col>
              <Col>Color de boton</Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <HexColorPicker color={backgroundColor} onChange={(color) => onChangeBackgroundColor(color, setFieldValue)} />
                <HexColorInput color={backgroundColor} onChange={(color) => onChangeBackgroundColor(color, setFieldValue)} />
              </Col>
              <Col>
                <HexColorPicker color={letterColor} onChange={(color) => onChangeLetterColor(color, setFieldValue)} />
                <HexColorInput color={letterColor} onChange={(color) => onChangeLetterColor(color, setFieldValue)} />
              </Col>
              <Col>
                <HexColorPicker color={buttonColor} onChange={(color) => onChangeButtonColor(color, setFieldValue)} />
                <HexColorInput color={buttonColor} onChange={(color) => onChangeButtonColor(color, setFieldValue)} />
              </Col>
            </Row>
            <div className="center text-center">
              <Button
                color="primary"
                type="submit"
              >
                Agregar
              </Button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}