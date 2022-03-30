/** @format */

import React, { useState } from 'react';
import {
  FieldGroup,
  SelectFieldGroup,
  CheckFieldGroup,
  RadioFieldGroup,
  TextAreaFieldGroup
} from '../../../utils/Input';
import { Row, Col } from 'react-bootstrap';
import { Map, Marker } from 'google-maps-react';
import MapSearchBox from '../../../componentes/MapSearchBox';
import { ErrorMessage } from 'formik';
import { BARRIOS_COMUNAS } from "../../../utils/constants";

export default ({
  touched,
  errors,
  onMapClick,
  setCoords,
  itemsRegiones,
  //itemComunas,
  onChangeComuna,
  markerPosition,
  values,
  referencia,
  interseccion,
  handleReferencia,
  showCoord,
  setFieldValue,
  setInputValue
}) => {
  const editLat =
    values.propiedad && values.propiedad.loc && values.propiedad.loc.x
      ? values.propiedad.loc.x
      : -33.43616371280176;
  const editLng =
    values.propiedad && values.propiedad.loc && values.propiedad.loc.y
      ? values.propiedad.loc.y
      : -70.63379790744193;

  const [lat, setLat] = useState(editLat);
  const [lng, setLng] = useState(editLng);
  const [comunaVal, setComunaVal] = useState(values.txtComuna);
  const [barriosItems, setBarriosItems] = useState([]);

  onChangeComuna = (e) => {
    let Barrios = [];
    setComunaVal(e.target.value);
    setInputValue('txtComuna', e.target.value);
    Barrios.push({label: "--Seleccione--", value: ""});
    if (e.target.value in BARRIOS_COMUNAS) {
      BARRIOS_COMUNAS[e.target.value].map(p => Barrios.push({label: p, value: p}));
      setBarriosItems(Barrios);
    } else {
      setBarriosItems([]);
    }

  }

  let itemComunas = [{label: "--Seleccione--", value: ""}];
  Object.keys(BARRIOS_COMUNAS).forEach(c => itemComunas.push({label: c, value: c}));

  if ((barriosItems == null || barriosItems == undefined || barriosItems.length == 0) && Object.keys(BARRIOS_COMUNAS).includes(values.txtComuna)) {
    let Barrios = [];
    BARRIOS_COMUNAS[values.txtComuna].map(p => Barrios.push({label: p, value: p}));
    setBarriosItems(Barrios);
  }

  return (
    <div>
      <Row>
        {showCoord ? (
          <div>
            <FieldGroup name="txtLat" label="LAt" value={values.txtLat} />
            <FieldGroup name="txtLng" label="Lon" value={values.txtLng} />
          </div>
        ) : (
          ''
        )}
        <Col sm={8}>
          <FieldGroup
            name="txtGlosa"
            label="Glosa(*)"
            value={values.txtGlosa}
            maxLength={60}
          />
        </Col>
        <Col sm={2} style={{ paddingTop: '2%' }}>
          <CheckFieldGroup
            label="Amoblado"
            name="txtAmoblado"
            value={values.txtAmoblado}
            checked={values.txtAmoblado}
          />
        </Col>
        <Col sm={2} style={{ paddingTop: '2%' }}>
          <CheckFieldGroup
            label="Bodega"
            name="txtTieneBodega"
            value={values.txtTieneBodega}
            checked={values.txtTieneBodega}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <SelectFieldGroup
            name="txtTipoPropiedad"
            label="Tipo Propiedad(*)"
            arrayOps={[
              { value: '', label: '--Seleccione--' },
              { value: 'Casa', label: 'Casa' },
              { value: 'Departamento', label: 'Departamento' },
              { value: 'Oficina', label: 'Oficina' }
            ]}
            value={values.txtTipoPropiedad}
          />
        </Col>
        <Col sm={4}>
          <SelectFieldGroup
            name="txtTipoPropInt"
            label="Tipo(*)"
            arrayOps={[
              { value: '', label: '--Seleccione--' },
              { value: '1 Ambiente', label: '1 Ambiente' },
              { value: 'Loft', label: 'Loft' },
              { value: 'Studio', label: 'Studio' },
              { value: 'Clasico', label: 'Clasico' },
              { value: 'Apto Oficina', label: 'Apto Oficina' }
            ]}
            value={values.txtTipoPropInt}
          />
        </Col>
        <Col sm={4}>
          <FieldGroup
            name="txtOrientacion"
            label="Orientación(*)"
            value={values.txtOrientacion}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <FieldGroup name="txtRol" label="Rol(*)" value={values.txtRol} />
        </Col>
        <Col sm={4}>
          {' '}
          <FieldGroup
            name="txtContribuciones"
            label="Contribuciones(*)"
            value={values.txtContribuciones}
          />
        </Col>
        <Col sm={4}>
          <FieldGroup
            name="txtGastosComunes"
            label="Gastos Comunes(*)"
            value={values.txtGastosComunes}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <FieldGroup
            name="txtAnioConstruccion"
            label="Año Construcción"
            value={values.txtAnioConstruccion}
          />
        </Col>
        {values.txtTipoPropiedad && (
          <Col sm={4}>
            <FieldGroup
              name="txtDormitorios"
              label={
                values.txtTipoPropiedad === 'Oficina'
                  ? 'Privadas(*)'
                  : 'Dormitorios(*)'
              }
              value={values.txtDormitorios}
            />
          </Col>
        )}
        {(values.txtTipoPropiedad === 'Departamento' ||
          values.txtTipoPropiedad === 'Oficina') && (
          <Col sm={4}>
            {' '}
            <FieldGroup
              name="txtPisoNumero"
              label="Piso Número(*)"
              value={values.txtPisoNumero}
            />
          </Col>
        )}
      </Row>
      <Row>
        <Col sm={4}>
          <SelectFieldGroup
            name="txtCondominio"
            label="Condominio(*)"
            arrayOps={[
              { value: '', label: '--Seleccione--' },
              { value: 'Abierto', label: 'Abierto' },
              { value: 'Cerrado', label: 'Cerrado' }
            ]}
            value={values.txtCondominio}
          />
        </Col>
        <Col sm={4}>
          <FieldGroup
            name="txtCantEstacionamiento"
            label="Estacionamientos(*)"
            min="0"
            value={values.txtCantEstacionamiento}
          />
        </Col>
        <Col sm={4}>
          <FieldGroup
            name="txtBodegas"
            label="Bodegas"
            min="0"
            value={values.txtBodegas}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <SelectFieldGroup
            label="Región(*)"
            name="txtRegion"
            arrayOps={itemsRegiones}
            value={15}
            disabled
          />
        </Col>
        <Col sm={6}>
          <SelectFieldGroup
            onChange={onChangeComuna}
            label="Comuna(*)"
            name="txtComuna"
            arrayOps={itemComunas || []}
            value={comunaVal}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <SelectFieldGroup
            label="Barrio"
            name="txtBarrio"
            arrayOps={barriosItems || []}
            value={values.txtBarrio}
          />
        </Col>
        <Col sm={6}>
          <SelectFieldGroup
            name="txtVia"
            label="Vía(*)"
            arrayOps={[
              { value: '', label: '--Seleccione--' },
              { value: 'Calle', label: 'Calle' },
              { value: 'Pasaje', label: 'Pasaje' },
              { value: 'Avenida', label: 'Avenida' }
            ]}
            value={values.txtVia}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          {' '}
          <FieldGroup
            type="text"
            label="Nombre(*)"
            name="txtNombreCalle"
            value={values.txtNombreCalle}
          />
        </Col>
        <Col sm={4}>
          <FieldGroup
            name="txtNumero"
            label="Numero(*)"
            value={values.txtNumero}
          />
        </Col>
        {(values.txtTipoPropiedad === 'Departamento' ||
          values.txtTipoPropiedad === 'Oficina') && (
          <Col sm={4}>
            <FieldGroup name="txtAp" label="Ap(*)" value={values.txtAp} />
          </Col>
        )}
      </Row>
      <Row>
        <Col sm={4}>
          <div className="form-group">
            <label>
              <RadioFieldGroup
                name="txtCalleOpcion"
                label="Real"
                value="REAL"
                className="inline"
                checked={values.txtCalleOpcion === 'REAL'}
              />
            </label>
          </div>
        </Col>
        <Col sm={4}>
          <div className="form-group">
            <label>
              <RadioFieldGroup
                name="txtCalleOpcion"
                label="Interseccion calle"
                value="INTERSECCION"
                className="inline"
                checked={values.txtCalleOpcion === 'INTERSECCION'}
              />
            </label>
          </div>
        </Col>
        <Col sm={4}>
          <div className="form-group">
            <label>
              <RadioFieldGroup
                name="txtCalleOpcion"
                label="Referencia"
                value="REFERENCIA"
                checked={values.txtCalleOpcion === 'REFERENCIA'}
                className="inline"
              />
            </label>
          </div>
        </Col>
      </Row>
      {values.txtCalleOpcion === 'REFERENCIA' && (
        <Row>
          <Col sm={12}>
            <FieldGroup
              type="text"
              label="Calle de referencia(*)"
              name="referenciaCalle"
              value={values.referenciaCalle}
            />
          </Col>
        </Row>
      )}
      {values.txtCalleOpcion === 'INTERSECCION' && (
        <Row>
          <Col sm={6}>
            <FieldGroup
              type="text"
              label="Calle de referencia A(*)"
              name="referenciaCalleA"
              value={values.referenciaCalleA}
            />
          </Col>
          <Col sm={6}>
            <FieldGroup
              type="text"
              label="Calle de referencia B(*)"
              name="referenciaCalleB"
              value={values.referenciaCalleB}
            />
          </Col>
        </Row>
      )}
      <Row>
        <Col sm={12}>
          <TextAreaFieldGroup
            name="txtObsPublicas"
            label="Observaciones Publicas(*)"
            value={values.txtObsPublicas}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <TextAreaFieldGroup
            name="txtObsPrivadas"
            label="Observaciones Privadas(*)"
            value={values.txtObsPrivadas}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <div
            style={{
              width: '100%',
              height: '400px'
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
              />
            </Map>
          </div>
          <ErrorMessage name="txtLng" />
        </Col>
      </Row>
    </div>
  );
};
