/** @format */

const { validate } = require('rut.js');

const checkRut = rut => {
  if (rut) {
    if (!validate(rut)) {
      return false;
    } else {
      return true;
    }
  }
};

export const validateValues = formValues => {
  const errors = {};

  if (formValues.nombres === '') {
    errors.nombres = 'Por favor ingrese sus nombres';
  }
  if (formValues.apellidos === '') {
    errors.apellidos = 'Por favor ingrese sus apellidos';
  }

  if (formValues.rut === '') {
    errors.rut = 'Ingrese Rut';
  } else {
    if (!checkRut(formValues.rut)) {
      errors.rut = 'Ingrese Rut Válido';
    }
  }
  if (formValues.mail === '') {
    errors.mail = 'Por favor ingrese su Mail';
  }

  return errors;
};
