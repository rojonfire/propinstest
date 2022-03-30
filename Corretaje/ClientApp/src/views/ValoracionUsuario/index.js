import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import { Grid, Row, Col } from "react-bootstrap";
import { FieldGroup, TextAreaFieldGroup } from "../../utils/Input";
import { fetchAddValoracion } from "../../action";
import * as Yup from "yup";

const valoracionSchema = Yup.object().shape({
  nombre: Yup.string().required("Campo obligatorio"),
  descripcion: Yup.string()
    .required("Campo obligatorio")
    .min(3, "el mensaje debe ser mas largo ")
    .max(100, "el mensaje debe ser mas corto"),
  ubicacion: Yup.string().required("Campo obligatorio")
});

export class Valoraciones extends Component {
  render() {
    return (
      <div>
        <Formik
          validationSchema={valoracionSchema}
          initialValues={{ descripcion: "", nombre: "", ubicacion: "" }}
          onSubmit={(values, { resetForm }) => {
            this.props.agregarValoracion(values);
            resetForm();
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="form-container">
              <Grid>
                <Row>
                  <Col>
                    <h1>Agregar Valoración</h1>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FieldGroup name="nombre" label="Nombre" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextAreaFieldGroup
                      name="descripcion"
                      label="Descripción"
                    />
                    {errors.descripcion && touched.descripcion ? (
                      <div>{errors.descripcion}</div>
                    ) : null}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FieldGroup name="ubicacion" label="Ubicación" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Agregar
                    </button>
                  </Col>
                </Row>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    agregarValoracion: valoracion => dispatch(fetchAddValoracion(valoracion))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Valoraciones);
