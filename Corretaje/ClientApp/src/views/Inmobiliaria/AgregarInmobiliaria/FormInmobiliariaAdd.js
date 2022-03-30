/** @format */

import React, { Component, Fragment } from "react";
import { FieldGroup } from "../../../utils/Input";
import { fileValidator } from "../../../utils/parsers";
import { Row, Col } from "shards-react";

const UPLOAD_MIME_TYPES = [
  "image/png",
  "image/x-citrix-png",
  "image/x-png",
  "image/jpeg",
  "image/x-citrix-jpeg",
  "image/pjpeg",
];

export class FormInmobiliariaAdd extends Component {
  state = {
    logoCarga: "Cargar Imagen",
  };

  selectImage = (event) => {
    const file = event.target.files[0];
    const fileError = fileValidator(file);
    if (!fileError) {
      this.handleSelectedFile(file);
    }
  };

  fileValidator = (file) => {
    let { type, size } = file;
    size = size / 1024;
    if (!UPLOAD_MIME_TYPES.includes(type)) {
      return "El tipo de archivo es inválido!";
    } else if (size > 5000) {
      return "El archivo es muy pesado!";
    }
    return null;
  };

  fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  handleSelectedFile = (selectedFile) => {
    const { values } = this.props;
    let isAlreadySelected = false;
    if (!isAlreadySelected) {
      this.fileToBase64(selectedFile).then((file64) => {
        file64 = {
          name: selectedFile.name,
          value: file64,
          downloadLink: file64,
          esPortada: false,
          containerName: selectedFile.name,
        };
        this.setState({
          logoCarga: selectedFile.name,
        });
        values.Logo = file64;
      });
    }
  };

  render() {
    const { values } = this.props;
    return (
      <Fragment>
        <Row>
          <Col md={6}>
            <FieldGroup
              value={values ? values.Nombre : ""}
              id="txtNombre"
              type="text"
              name="Nombre"
              label="Nombre"
            />
          </Col>
          <Col md={6}>
            <FieldGroup
              value={values ? values.Direccion : ""}
              id="txtDireccion"
              type="text"
              name="Direccion"
              label="Dirección"
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FieldGroup
              value={values ? values.Telefono : ""}
              id="txtTelefono"
              type="text"
              name="Telefono"
              label="Telefono"
            />
          </Col>
          <Col md={6}>
            <FieldGroup
              value={values ? values.Mail : ""}
              id="txtMail"
              type="text"
              name="Mail"
              label="Correo electrónico"
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label
              className=""
              htmlFor={`Logo`}
            >
              Logo
            </label>

            <div className="custom-file archivo-anexo" id="Logo" lang="es">
              <input
                type="file"
                className="custom-file-input"
                accept="image/*"
                name="Logo"               
                onChange={(e) => this.selectImage(e)}
              />
              <label
                className="custom-file-label"
                htmlFor="Logo"
                style={{ margin: "0px" }}
              >
                {values && values.Logo && values.Logo.name ? values.Logo.name : this.state.logoCarga}
                {/* {this.state.logoCarga} */}
                {/* {values !== undefined
                  ? values.Logo !== undefined
                    ? values.Logo.name > 20
                      ? values.Logo.name.substring(0, 15) + "..."
                      : values.Logo.name
                    : "Adjuntar"
                  : "Adjuntar"} */}
              </label>
            </div>
          </Col>
          <Col sm={6}>
            <FieldGroup
              id="txtUrlInmobiliaria"
              name="UrlInmobiliaria"
              label="Url Sitio Web Inmobiliaria"
              value={values ? values.UrlInmobiliaria : ""}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default FormInmobiliariaAdd;
