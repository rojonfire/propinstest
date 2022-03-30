import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import swal from "sweetalert";
import Popup from "./Popup";

import api from "../../api";
import { Regiones } from "../../utils/Regiones";
import utilsFunc from "../../utils/utilsFunc";
import { Button, Row, Col } from "react-bootstrap";

const operacionOpts = [
  { label: "Venta", value: "Venta" },
  { label: "Arriendo", value: "Arriendo" },
];

const propiedadOpts = [
  { label: "Casa", value: "Casa" },
  { label: "Departamento", value: "Departamento" },
  { label: "Oficina", value: "Oficina" },
];

const regionesOpts = [
  ...Regiones.map(r => ({
    label: r.region,
    value: r.region,
  })),
];

let bathOpts = [];
let roomsOpts = [];

for (let i = 1; i <= 10; i++) {
  bathOpts.push({ label: `${i} baño${i > 1 ? "s" : ""}`, value: i });
  roomsOpts.push({ label: `${i} dormitorio${i > 1 ? "s" : ""}`, value: i });
}

const initialValues = {
  email: "",
  tipoOperacion: "Venta",
  tipoPropiedad: "Casa",
  region: "Región Metropolitana de Santiago",
  banios: 1,
  dormitorios: 1,
};

const TextField = ({ name, type, label, ...props }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field
        type={type}
        name={name}
        id={name}
        className="form-control"
        {...props}
      />
      <ErrorMessage name={name} component="div" />
    </div>
  );
};

const SelectField = ({ name, options, label, ...props }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field
        id={name}
        className="form-control"
        component="select"
        name={name}
        {...props}
      >
        {options.map(o => (
          <option value={o.value} key={o.value}>
            {o.label}
          </option>
        ))}
      </Field>
      <span
        style={{
          height: 0,
          position: "absolute",
          bottom: "45%",
          right: "5%",
          fontWeight: "bold",
        }}
      >
        ˅
      </span>
    </div>
  );
};

const validate = values => {
  let errors = {};

  for (let key in values) {
    if (!values[key]) {
      errors[key] = `Campo requerido!`;
    }
  }

  if (values.email && !utilsFunc.checkEmail(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const SubscriptionPopup = ({ show, togglePopup }) => {
  const [region, setRegion] = useState("Región Metropolitana de Santiago");

  const _onSubscribe = async busqueda => {
    console.log("busqueda: ", busqueda);
    const { email } = busqueda;
    delete busqueda.email;

    const data = {
      email,
      busqueda,
    };

    try {
      await api.setSubscription(data);
      swal({
        title: "¡Éxito!",
        text: "Ahora recibirás los correos.",
        icon: "success",
      });
    } catch (error) {
      console.error("error: ", error);
      swal({
        title: "Error",
        text: error,
        icon: "warning",
        dangerMode: true,
      });
    } finally {
      togglePopup();
    }
  };

  const setComunaOpts = () => {
    let comunas = [];
    Regiones.some(r => {
      if (r.region === region) {
        comunas = r.comunas.map(c => ({ label: c, value: c }));
        return true;
      }
      return false;
    });

    return comunas;
  };

  return (
    <Popup show={show} togglePopup={togglePopup}>
      <div id="popup-newsletter-container">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={_onSubscribe}
        >
          {params => {
            const { isSubmitting } = params;
            return (
              <Form>
                <div id="popup-newsletter">
                  <Row>
                    <Col sm="12">
                      <TextField name="email" type="email" label="Correo" />
                    </Col>

                    <Col sm="6">
                      <SelectField
                        name="tipoOperacion"
                        options={operacionOpts}
                        label="Tipo"
                      />
                    </Col>

                    <Col sm="6">
                      <SelectField
                        name="tipoPropiedad"
                        options={propiedadOpts}
                        label="Propiedad"
                      />
                    </Col>

                    <Col sm="6">
                      <SelectField
                        name="region"
                        options={regionesOpts}
                        label="Región"
                        value={region || ""}
                        onChange={e => setRegion(e.target.value)}
                      />
                    </Col>

                    <Col sm="6">
                      <SelectField
                        name="comuna"
                        options={setComunaOpts()}
                        label="Comuna"
                      />
                    </Col>

                    <Col sm="6">
                      <SelectField
                        name="banios"
                        options={bathOpts}
                        label="Baños"
                      />
                    </Col>

                    <Col sm="6">
                      <SelectField
                        name="dormitorios"
                        options={roomsOpts}
                        label="Dormitorios"
                      />
                    </Col>

                    <Col sm="12">
                      <Button type="submit" disabled={isSubmitting}>
                        Suscribirse
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Popup>
  );
};

export default SubscriptionPopup;
