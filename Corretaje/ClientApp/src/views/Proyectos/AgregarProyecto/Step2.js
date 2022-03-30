/** @format */

import React, { useState } from "react";
import {
  FieldGroup,
  SelectFieldGroup,
  CheckFieldGroup,
  RadioFieldGroup,
  TextAreaFieldGroup,
} from "../../../utils/Input";
import { Row, Col } from "react-bootstrap";
import { Map, Marker } from "google-maps-react";
import MapSearchBox from "../../../componentes/MapSearchBox";
import { ErrorMessage } from "formik";

export default ({
  touched,
  errors,
  onMapClick,
  setCoords,
  itemsRegiones,
  itemComunas,
  onChangeComuna,
  markerPosition,
  values,
  referencia,
  interseccion,
  handleReferencia,
  showCoord,
}) => {
  const editLat =  
    values.txtLat     
      ? values.txtLat
      : -33.43616371280176;
  const editLng =  
     values.txtLng
      ? values.txtLng
      : -70.63379790744193;

  const [lat, setLat] = useState(editLat);
  const [lng, setLng] = useState(editLng);

  return (
    <div>
      <Row>
        {showCoord ? (
          <div>
            <FieldGroup name="txtLat" label="LAt" value={values.txtLat} />
            <FieldGroup name="txtLng" label="Lon" value={values.txtLng} />
          </div>
        ) : (
          ""
        )}
      </Row>
      <Row>
        <Col sm={4}>
          <SelectFieldGroup
            name="txtTipoProyecto"
            label="Tipo Proyecto(*)"
            arrayOps={[
              { value: "", label: "--Seleccione--" },
              { value: "Casa", label: "Casa" },
              { value: "Departamento", label: "Departamento" },
              { value: "Oficina", label: "Oficina" },
              { value: "Mixto", label: "Mixto" },
            ]}
            value={values.txtTipoProyecto}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <SelectFieldGroup
            label="Región(*)"
            name="txtIdRegion"
            arrayOps={itemsRegiones}
            value={values.txtIdRegion}
          />
        </Col>
        <Col sm={4}>
          <SelectFieldGroup
            label="Comuna(*)"
            name="txtComuna"
            arrayOps={itemComunas[values.txtIdRegion] || []}
            value={values.txtComuna}
          />
        </Col>
        <Col sm={4}>
          <SelectFieldGroup
            name="txtTipoVia"
            label="Tipo de Vía(*)"
            arrayOps={[
              { value: "", label: "--Seleccione--" },
              { value: "Calle", label: "Calle" },
              { value: "Pasaje", label: "Pasaje" },
              { value: "Avenida", label: "Avenida" },
            ]}
            value={values.txtTipoVia}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          {" "}
          <FieldGroup
            type="text"
            label="Nombre Calle(*)"
            name="txtNombreCalle"
            value={values.txtNombreCalle}
          />
        </Col>
        <Col sm={4}>
          <FieldGroup
            name="txtNumero"
            label="Numero Calle(*)"
            value={values.txtNumero}
            type="number"
          />
        </Col>
      </Row>      
      <Row>
        <Col sm={12}>
          <TextAreaFieldGroup
            name="txtObservacionesPublicas"
            label="Observaciones Publicas"
            value={values.txtObservacionesPublicas}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={4}> 
        <label>Datos Sala de Ventas</label>
        </Col>
      </Row>
      <Row>
      <Col sm={4}>
          {" "}
          <FieldGroup
            type="text"
            label="Dirección"
            name="txtDireccionSalaVenta"
            value={values.txtDireccionSalaVenta}
          />
        </Col>
        <Col sm={4}>
          <FieldGroup
            name="txtTelefonoSalaVenta"
            label="Teléfono"
            value={values.txtTelefonoSalaVenta}
            type="text"
          />
        </Col>
        <Col sm={4}>
          <FieldGroup
            name="txtEmailSalaVenta"
            label="Correo electrónico"
            value={values.txtEmailSalaVenta}
            type="text"
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <div
            style={{
              width: "100%",
              height: "400px",
            }}
          >
            <Map
              className="google-map"
              google={window.google}
              onClick={onMapClick}
              initialCenter={{
                lat,
                lng
              }}
              zoom={15}
            >
              <MapSearchBox
                setLat={setLat}
                setLng={setLng}
                setCoords={setCoords}
              />
              <Marker
                title={markerPosition.title}
                name={markerPosition.name}
                position={markerPosition.position}
                // position={values.txtLat, values.txtLng}
              />
            </Map>
          </div>
          <ErrorMessage name="txtLng" />
        </Col>
      </Row>
    </div>
  );
};
