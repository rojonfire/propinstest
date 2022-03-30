/** @format */

import React, { useState } from "react";
import {
  FieldGroup,
  SelectFieldGroup,
  CheckFieldGroup,
  DateFieldGroup,
} from "../../../utils/Input";
import { Row, Col, Button } from "shards-react";
import DatePicker from "react-date-picker";
import moment from "moment";

export default (props) => {
  const {
    clientes,
    values,
    handleShow,
    planes,
    timeOptions,
    setInputValue,
    requestLoadingVisitaFotografo,
    handleTimeChange,
  } = props;
  const [fechaFotografo, setFechaFotografo] = useState(
    values &&
      values.txtFechaVisitaFotografo &&
      new Date(values.txtFechaVisitaFotografo)
      ? new Date(values.txtFechaVisitaFotografo)
      : new Date()
  );
  const [horaFotografo, setHoraFotografo] = useState(
    `${values.txtIdFotografo};${values.txtHoraVisitaFotografo}`
  );
  const handleDateChange = (e) => {
    setInputValue("txtFechaVisitaFotografo", new Date(e));
    setFechaFotografo(new Date(e));
    handleTimeChangeLocal(null);
  };

  const handleTimeChangeLocal = (e) => {
    if (e && e.target && e.target.value && e.target.value.includes(";")) {
      handleTimeChange(e);
      setInputValue("txtHoraVisitaFotografo", e.target.value);
      setHoraFotografo(e.target.value);
    } else {
      handleTimeChange("");
      setInputValue("txtHoraVisitaFotografo", "");
      setHoraFotografo("");
    }
  };

  const renderTimePicker = (options) => {
    if (requestLoadingVisitaFotografo) {
      return <div>Cargando horas...</div>;
    }
    if (options != undefined && options.length > 1) {
      return (
        <SelectFieldGroup
          name="txtHoraVisitaFotografo"
          label="Hora visita fotógrafo"
          arrayOps={options}
          //value={values.txtPlanContratado}
          value={horaFotografo}
          onChange={handleTimeChangeLocal}
        />
      );
    } else {
      return <div />;
    }
  };

  return (
    <div>
      <Row>
        <Col sm={2}>
          <CheckFieldGroup
            label="Exclusividad"
            name="txtExclusividad"
            // indeterminate={true}
            checked={values.txtExclusividad}
          />
        </Col>
        <Col sm={2}>
          <CheckFieldGroup
            label="Destacado"
            name="txtDestacado"
            checked={values.txtDestacado}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <SelectFieldGroup
            name="txtIdCliente"
            label="Cliente(*)"
            arrayOps={clientes}
            value={values.txtIdCliente}
          />
        </Col>
        <Col sm={6}>
          <DateFieldGroup
            name="txtDisponibilidad"
            label="Disponibilidad(*)"
            value={values.txtDisponibilidad}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <SelectFieldGroup
            name="txtTipoMoneda"
            label="Tipo Moneda(*)"
            arrayOps={[
              { value: "UF", label: "UF" },
              { value: "CLP", label: "CLP" },
            ]}
            value={values.txtTipoMoneda}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <FieldGroup
            name="txtValor"
            label="Precio(*)"
            value={values.txtValor}
          />
        </Col>
        <Col sm={6}>
          <FieldGroup
            name="txtBanios"
            label="Baños(*)"
            value={values.txtBanios}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <FieldGroup
            name="txtMtroUtiles"
            label="Metro Utiles(*)"
            value={values.txtMtroUtiles}
          />
        </Col>
        <Col sm={6}>
          <FieldGroup
            name="txtMtrototales"
            label="Metro Totales(*)"
            value={values.txtMtrototales}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <FieldGroup
            name="txtUrlMattePort"
            label="Url Matterport(*)"
            value={values.txtUrlMattePort}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <SelectFieldGroup
            name="txtPlanContratado"
            label="Plan contratado"
            arrayOps={planes}
            value={values.txtPlanContratado}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <div>Fecha Visita Fotografo</div>
          <DatePicker
            name="txtFechaVisitaFotografo"
            value={fechaFotografo}
            onChange={handleDateChange}
            minDate={
              new Date(
                moment()
                  .add(2, "days")
                  .format("YYYY-MM-DD")
              )
            }
            //maxDate={this.state.endDate}
          />
        </Col>
        <Col sm={6}>
          {renderTimePicker(timeOptions, "")}
          {/*validarTramoError()*/}
        </Col>
      </Row>
    </div>
  );
};
