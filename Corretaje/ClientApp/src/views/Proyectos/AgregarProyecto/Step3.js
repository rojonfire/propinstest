import React from "react";
import { CheckFieldGroup, SelectFieldGroup } from "../../../utils/Input";

import { Container, Row, Col } from "shards-react";

import PageTitle from "../../../components/common/PageTitle";

export default ({ touched, errors, values }) => (
  <Container fluid className="main-content-container px-4">
    <PageTitle
      sm="4"
      title="Caraterísticas de las propiedades"
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
            { value: "Losa", label: "Losa" },
            { value: "Radiador", label: "Radiador" },
            { value: "Electrica", label: "Eléctrica" },
            { value: "Otro", label: "Otro" }
          ]}
          value={values.txtCalefaccion}
        />
      </Col>
      <Col sm={4}>
        <SelectFieldGroup
          name="txtTipoPiso"
          label="Tipo de Piso"
          arrayOps={[
            { value: "", label: "--Seleccione--" },
            { value: "Porcelanato", label: "Porcelanato" },
            { value: "Piso Flotante", label: "Piso Flotante" },
            { value: "Ceramico", label: "Ceramico" },
            { value: "Parquet", label: "Parquet" },
            { value: "Fotolaminado", label: "Fotolaminado" },
          ]}
          value={values.txtTipoPiso}
        />
      </Col>
    </Row>

    <Row>
      {/* <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtEscritorio}
          label="Escritorio"
          name="txtEscritorio"
          value={values.txtEscritorio}
        />
      </Col> */}
      {/* <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtLogia}
          label="Logia"
          name="txtLogia"
          value={values.txtLogia}
        />
      </Col> */}
      {/* <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtPortonAutomatico}
          label="Portón automático"
          name="txtPortonAutomatico"
          value={values.txtPortonAutomatico}
        />
      </Col> */}
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtCocinaAmo}
          label="Cocina Amoblada"
          name="txtCocinaAmo"
          value={values.txtCocinaAmo}
        />
      </Col>
      {/* <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtSalaEstar}
          label="Sala de estar"
          name="txtSalaEstar"
          value={values.txtSalaEstar}
        />
      </Col> */}
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
      title="Caraterísticas de la Comunidad"
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
          checked={values.txtEstVisita}
          label="Estacionamiento visitas"
          name="txtEstVisita"
          value={values.txtEstVisita}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtPortonElec}
          label="Portón eléctrico"
          name="txtPortonElec"
          value={values.txtPortonElec}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtSalonDeJuegos}
          label="Sala de juegos"
          name="txtSalonDeJuegos"
          value={values.txtSalonDeJuegos}
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
          checked={values.txtSalaDeCine}
          label="Sala de Cine"
          name="txtSalaDeCine"
          value={values.txtSalaDeCine}
        />
      </Col>
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtTermopanel}
          label="Termopanel"
          name="txtTermopanel"
          value={values.txtTermopanel}
        />
      </Col>
      {/* <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtCitofono}
          label="Citófono"
          name="txtCitofono"
          value={values.txtCitofono}
        />
      </Col> */}
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtJuegosInf}
          label="Juegos infantiles"
          name="txtJuegosInf"
          value={values.txtJuegosInf}
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
          checked={values.txtSalaDeEventos}
          label="Sala de eventos"
          name="txtSalaDeEventos"
          value={values.txtSalaDeEventos}
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
      <Col sm={4}>
        <CheckFieldGroup
          checked={values.txtBodegaEcommerce}
          label="Bodegas E-commerce"
          name="txtBodegaEcommerce"
          value={values.txtBodegaEcommerce}
        />
      </Col>
    </Row>
  </Container>
);
