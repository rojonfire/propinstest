import React from "react";
import { CheckFieldGroup, SelectFieldGroup } from "../../../utils/Input";

import { Container, Row, Col } from "shards-react";

import PageTitle from "../../../components/common/PageTitle";

export default ({ touched, errors, values }) => (
  <Container fluid className="main-content-container px-4">
    <PageTitle
      sm="4"
      title="Carateristicas Propiedad"
      subtitle=""
      className="text-sm-left"
      show={false}
    />

    <Row>
      <Col sm={4}>
        <SelectFieldGroup
          name="txtCalefaccion"
          label="Calefacción"
          arrayOps={[
            { value: "", label: "--Seleccione--" },
            { value: "losa", label: "Losa" },
            { value: "radiador", label: "Radiador" },
            { value: "electrica", label: "Eléctrica" },
            { value: "otro", label: "Otro" }
          ]}
          value={values.txtCalefaccion}
        />
      </Col>
    </Row>

    <Row>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtEscritorio}
          label="Escritorio"
          name="txtEscritorio"
          value={values.txtEscritorio}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtLogia}
          label="Logia"
          name="txtLogia"
          value={values.txtLogia}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtPortonAutomatico}
          label="Portón automático"
          name="txtPortonAutomatico"
          value={values.txtPortonAutomatico}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtCocinaAmoblada}
          label="Cocina Amoblada"
          name="txtCocinaAmoblada"
          value={values.txtCocinaAmoblada}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtSalaEstar}
          label="Sala de estar"
          name="txtSalaEstar"
          value={values.txtSalaEstar}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtAlarma}
          label="Alarma"
          name="txtAlarma"
          value={values.txtAlarma}
        />
      </Col>
    </Row>

    <PageTitle
      sm="4"
      title="Carateristicas Comunidad"
      subtitle=""
      className="text-sm-left"
      show={false}
    />

    <Row>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtAccesoControlado}
          label="Acceso controlado"
          name="txtAccesoControlado"
          value={values.txtAccesoControlado}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtEstacionamientoVisitas}
          label="Estacionamiento visitas"
          name="txtEstacionamientoVisitas"
          value={values.txtEstacionamientoVisitas}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtPortonElectrico}
          label="Portón eléctrico"
          name="txtPortonElectrico"
          value={values.txtPortonElectrico}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtSalaJuegos}
          label="Sala de juegos"
          name="txtSalaJuegos"
          value={values.txtSalaJuegos}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtAreasVerdes}
          label="Areas verdes"
          name="txtAreasVerdes"
          value={values.txtAreasVerdes}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtQuincho}
          label="Quincho"
          name="txtQuincho"
          value={values.txtQuincho}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtSauna}
          label="Sauna"
          name="txtSauna"
          value={values.txtSauna}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtCamaraSeguridad}
          label="Cámara de seguridad"
          name="txtCamaraSeguridad"
          value={values.txtCamaraSeguridad}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtSalaCine}
          label="Sala de Cine"
          name="txtSalaCine"
          value={values.txtSalaCine}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtCitofono}
          label="Citófono"
          name="txtCitofono"
          value={values.txtCitofono}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtJuegosInfantiles}
          label="Juegos infantiles"
          name="txtJuegosInfantiles"
          value={values.txtJuegosInfantiles}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtPiscina}
          label="Piscina"
          name="txtPiscina"
          value={values.txtPiscina}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtSalaEventos}
          label="Sala de eventos"
          name="txtSalaEventos"
          value={values.txtSalaEventos}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtBicicleteros}
          label="Bicicleteros"
          name="txtBicicleteros"
          value={values.txtBicicleteros}
        />
      </Col>
    </Row>
  </Container>
);
