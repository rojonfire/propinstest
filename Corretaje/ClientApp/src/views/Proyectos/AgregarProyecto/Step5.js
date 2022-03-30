/** @format */
import React, { useEffect, useState } from "react";
import {
  FieldGroup,
  SelectFieldGroup,
  CheckFieldGroup,
  DateFieldGroup,
} from "../../../utils/Input";
import { Row, Col, Button } from "shards-react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}
const Step5 = ({ values, errors }) => {
  const [value, setValue] = useState(true);
  const [rows, setRows] = useState(values && values.txtModelos && values.txtModelos.length ? Array(values.txtModelos.length).fill(0) : [0]);
  const [images, setImages] = useState([]);

  const forceUpdate = useForceUpdate();
  const add = () => {
    let tempRow = rows;
    tempRow.push(0);
    values.txtNumeroPlanos = tempRow.length;
    setRows(tempRow);
  };
  function addNewRow() {
    add();
    forceUpdate();
  }
  function removeRow() {
    rem();
    forceUpdate();
  }
  const rem = () => {
    let tempRow = rows;
    tempRow.splice(-1, 1);
    values.txtNumeroPlanos = tempRow.length;
    setRows(tempRow);
  };
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#fff",
      color: "#000",
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const useStyles1 = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    table: {
      minWidth: 500,
    },
    tableWrapper: {
      overflowX: "auto",
    },
  }));
  const classes = useStyles1;
  const selectImage = (event, Index, numero) => {
    const file = event.target.files[0];
    const fileError = fileValidator(file);
    if (!fileError) {
      handleSelectedFile(file, Index, numero);
    } else {
      errors.txtPlanoImages = fileError;
      setValue(!value);
    }
  };
  const fileValidator = (file) => {
    let { type, size } = file;
    size = size / 1024;
    if (!UPLOAD_MIME_TYPES.includes(type)) {
      return "El tipo de archivo es inválido!";
    } else if (size > 5000) {
      return "El archivo es muy pesado!";
    }
    return null;
  };
  const handleSelectedFile = (selectedFile, Index, numero) => {
    let isAlreadySelected = false;
    if (!isAlreadySelected) {
      fileToBase64(selectedFile).then((file64) => {
        file64 = {
          name: selectedFile.name,
          value: file64,
          modeloIndex: Index,
          numeroEnPlano: numero,
        };
        if (values.txtModelos[Index].imagenes === undefined || values.txtModelos[Index].imagenes === null) {
          values.txtModelos[Index].imagenes = [];
        }
        if (
          values.txtModelos[Index].imagenes.find(
            (i) => i.numeroEnPlano === numero
          ) !== undefined
        ) {
          let ele = values.txtModelos[Index].imagenes.indexOf(
            values.txtModelos[Index].imagenes.find(
              (i) => i.numeroEnPlano === numero
            )
          );
          values.txtModelos[Index].imagenes[ele].name = file64.name;
          values.txtModelos[Index].imagenes[ele].value = file64.value;
          values.txtModelos[Index].imagenes[ele].modeloIndex =
            file64.modeloIndex;
          values.txtModelos[Index].imagenes[ele].numeroEnPlano =
            file64.numeroEnPlano;
        } else {
          values.txtModelos[Index].imagenes = [
            ...values.txtModelos[Index].imagenes,
            file64,
          ].sort((a, b) => (a.numeroEnPlano > b.numeroEnPlano ? 1 : -1));
        }
        forceUpdate();
      });
    }
  };
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const UPLOAD_MIME_TYPES = [
    // 'change',
    "image/png",
    "image/x-citrix-png",
    "image/x-png",
    "image/jpeg",
    "image/x-citrix-jpeg",
    "image/pjpeg",
  ];
  while (values.txtModelos[rows.length - 1] === undefined) {
    values.txtModelos.push({
      imagenes: [],
    });
  }
  // console.log("values:", values);
  return (
    <div>
      <FieldGroup
        // label="Numero Modelos"
        name={`txtNumeroPlanos`}
        value={Array(rows).fill(0).length}
        style={{display: "none"}}
      />
      Ingrese los datos de los modelos.
      <br/>
      Si la tipología tiene plano, agregarlo como primera imagen.
      <br/>
      Procurar que las imágenes sean de buena resolución, al menos 600x600.
      <Table className={classes.table} aria-label=" pagination table">
        <TableHead>
          <TableRow></TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            return (
              <>
                <TableRow>
                  <StyledTableCell align="left">
                    {" "}
                    <h4 style={{ paddingTop: "20px" }}>{`Tipología ${index +
                      1}`}</h4>{" "}
                  </StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </TableRow>
                <TableRow key={row.id}>
                  <TableCell align="left">
                    <div style={{ height: "70px" }}>
                      <FieldGroup
                        label="Nombre(*)"
                        name={`txtPlanoNombre_${index}`}
                        // value={values[`txtPlanoNombre_${index}`] || null}
                        value={values[`txtPlanoNombre_${index}`] || ""}
                      />
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div style={{ height: "70px" }}>
                      <FieldGroup
                        label="Superficie Desde(*)"
                        name={`txtPlanoSuperficieDesde_${index}`}
                        value={
                          values[`txtPlanoSuperficieDesde_${index}`] || 0
                        }
                        type="number"
                      />
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div style={{ height: "70px" }}>
                      <FieldGroup
                        label="Valor Desde(*)"
                        name={`txtPlanoValorDesde_${index}`}
                        value={values[`txtPlanoValorDesde_${index}`] || 0}
                        type="number"
                      />
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div style={{ height: "70px" }}>
                      <FieldGroup
                        label="Baños(*)"
                        name={`txtPlanoBanio_${index}`}
                        // arrayOps={[
                        //   { value: 0, label: "--Seleccione--" },
                        //   { value: 1, label: 1 },
                        //   { value: 2, label: 2 },
                        //   { value: 3, label: 3 },
                        //   { value: 4, label: 4 },
                        //   { value: 5, label: 5 },
                        //   { value: 6, label: 6 },
                        //   { value: 7, label: 7 },
                        //   { value: 8, label: 8 },
                        //   { value: 9, label: 9 },
                        //   { value: 10, label: 10 },
                        // ]}
                        type="number"
                        value={values[`txtPlanoBanio_${index}`] || 0}
                      />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <div style={{ height: "70px" }}>
                      <FieldGroup
                        label="Dormitorios(*)"
                        name={`txtPlanoDormitorio_${index}`}
                        // arrayOps={[
                        //   { value: 0, label: "--Seleccione--" },
                        //   { value: 1, label: 1 },
                        //   { value: 2, label: 2 },
                        //   { value: 3, label: 3 },
                        //   { value: 4, label: 4 },
                        //   { value: 5, label: 5 },
                        //   { value: 6, label: 6 },
                        //   { value: 7, label: 7 },
                        //   { value: 8, label: 8 },
                        //   { value: 9, label: 9 },
                        //   { value: 10, label: 10 },
                        // ]}
                        type="number"
                        value={values[`txtPlanoDormitorio_${index}`] || 0}
                      />
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div style={{ height: "70px" }}>
                      <FieldGroup
                        name={`txtUrlMattePort_${index}`}
                        label="Url Matterport(*)"
                        value={values[`txtUrlMattePort_${index}`] || ""}
                      />
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div style={{ height: "52px" }}>
                      <label
                        className=""
                        htmlFor={`txtPlanoImage_${index}_1`}
                        style={{ margin: "0px" }}
                      >
                        1ª Imagen
                      </label>
                      <div
                        className="custom-file archivo-anexo"
                        id={`txtPlanoImage_${index}_1`}
                        lang="es"
                      >
                        <input
                          type="file"
                          className="custom-file-input"
                          name={`txtPlanoImage_${index}_1`}
                          label={"Your label here."}
                          onChange={(e) => selectImage(e, index, 1)}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor={`txtPlanoImage_${index}_1`}
                          style={{ margin: "0px" }}
                        >
                          {values !== undefined && values.txtModelos[index].imagenes !== null
                            ? values.txtModelos[index].imagenes[0] !== undefined
                              ? values.txtModelos[index].imagenes[0].name
                                  .length > 20
                                ? values.txtModelos[
                                    index
                                  ].imagenes[0].name.substring(0, 15) + "..."
                                : values.txtModelos[index].imagenes[0].name
                              : "Adjuntar"
                            : "Adjuntar"}
                        </label>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div style={{ height: "52px" }}>
                      <label
                        className=""
                        htmlFor={`txtPlanoImage_${index}_2`}
                        style={{ margin: "0px" }}
                      >
                        2ª Imagen
                      </label>
                      <div
                        className="custom-file archivo-anexo"
                        id={`txtPlanoImage_${index}_2`}
                        lang="es"
                      >
                        <input
                          type="file"
                          className="custom-file-input"
                          name={`txtPlanoImage_${index}_2`}
                          label={"Your label here."}
                          onChange={(e) => selectImage(e, index, 2)}
                          disabled={ values.txtModelos[index].imagenes === null ||
                            values.txtModelos[index].imagenes[0] === undefined
                              ? true
                              : false
                          }
                        />
                        <label
                          className="custom-file-label"
                          htmlFor={`txtPlanoImage_${index}`}
                          style={{ margin: "0px" }}
                        >
                          {values !== undefined && values.txtModelos[index].imagenes !== null
                            ? values.txtModelos[index].imagenes[1] !== undefined
                              ? values.txtModelos[index].imagenes[1].name
                                  .length > 20
                                ? values.txtModelos[
                                    index
                                  ].imagenes[1].name.substring(0, 15) + "..."
                                : values.txtModelos[index].imagenes[1].name
                              : "Adjuntar"
                            : "Adjuntar"}
                        </label>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow key={row.id}>
                  <TableCell align="left">
                    <div style={{ height: "52px" }}>
                      <label
                        className=""
                        htmlFor={`txtPlanoImage_${index}_3`}
                        style={{ margin: "0px" }}
                      >
                        3ª Imagen
                      </label>
                      <div
                        className="custom-file archivo-anexo"
                        id={`txtPlanoImage_${index}_3`}
                        lang="es"
                      >
                        <input
                          type="file"
                          className="custom-file-input"
                          name={`txtPlanoImage_${index}_3`}
                          label={"Your label here."}
                          onChange={(e) => selectImage(e, index, 3)}
                          disabled={ values.txtModelos[index].imagenes === null ||
                            values.txtModelos[index].imagenes[1] === undefined
                              ? true
                              : false
                          }
                        />
                        <label
                          className="custom-file-label"
                          htmlFor={`txtPlanoImage_${index}_3`}
                          style={{ margin: "0px" }}
                        >
                          {values !== undefined && values.txtModelos[index].imagenes !== null
                            ? values.txtModelos[index].imagenes[2] !== undefined
                              ? values.txtModelos[index].imagenes[2].name
                                  .length > 20
                                ? values.txtModelos[
                                    index
                                  ].imagenes[2].name.substring(0, 15) + "..."
                                : values.txtModelos[index].imagenes[2].name
                              : "Adjuntar"
                            : "Adjuntar"}
                        </label>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div style={{ height: "52px" }}>
                      <label
                        className=""
                        htmlFor={`txtPlanoImage_${index}_4`}
                        style={{ margin: "0px" }}
                      >
                        4ª Imagen
                      </label>
                      <div
                        className="custom-file archivo-anexo"
                        id={`txtPlanoImage_${index}_4`}
                        lang="es"
                      >
                        <input
                          type="file"
                          className="custom-file-input"
                          name={`txtPlanoImage_${index}_4`}
                          label={"Your label here."}
                          onChange={(e) => selectImage(e, index, 4)}
                          disabled={ values.txtModelos[index].imagenes === null ||
                            values.txtModelos[index].imagenes[2] === undefined
                              ? true
                              : false
                          }
                        />
                        <label
                          className="custom-file-label"
                          htmlFor={`txtPlanoImage_${index}_4`}
                          style={{ margin: "0px" }}
                        >
                          {values !== undefined && values.txtModelos[index].imagenes !== null
                            ? values.txtModelos[index].imagenes[3] !== undefined
                              ? values.txtModelos[index].imagenes[3].name
                                  .length > 20
                                ? values.txtModelos[
                                    index
                                  ].imagenes[3].name.substring(0, 15) + "..."
                                : values.txtModelos[index].imagenes[3].name
                              : "Adjuntar"
                            : "Adjuntar"}
                        </label>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div style={{ height: "52px" }}>
                      <label
                        className=""
                        htmlFor={`txtPlanoImage_${index}_5`}
                        style={{ margin: "0px" }}
                      >
                        5ª Imagen
                      </label>
                      <div
                        className="custom-file archivo-anexo"
                        id={`txtPlanoImage_${index}_5`}
                        lang="es"
                      >
                        <input
                          type="file"
                          className="custom-file-input"
                          name={`txtPlanoImage_${index}_5`}
                          label={"Your label here."}
                          onChange={(e) => selectImage(e, index, 5)}
                          disabled={ values.txtModelos[index].imagenes === null ||
                            values.txtModelos[index].imagenes[3] === undefined
                              ? true
                              : false
                          }
                        />
                        <label
                          className="custom-file-label"
                          htmlFor={`txtPlanoImage_${index}_5`}
                          style={{ margin: "0px" }}
                        >
                          {values !== undefined && values.txtModelos[index].imagenes !== null
                            ? values.txtModelos[index].imagenes[4] !== undefined
                              ? values.txtModelos[index].imagenes[4].name
                                  .length > 20
                                ? values.txtModelos[
                                    index
                                  ].imagenes[4].name.substring(0, 15) + "..."
                                : values.txtModelos[index].imagenes[4].name
                              : "Adjuntar"
                            : "Adjuntar"}
                        </label>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div style={{ height: "52px" }}>
                      <label
                        className=""
                        htmlFor={`txtPlanoImage_${index}_6`}
                        style={{ margin: "0px" }}
                      >
                        6ª Imagen
                      </label>
                      <div
                        className="custom-file archivo-anexo"
                        id={`txtPlanoImage_${index}_6`}
                        lang="es"
                      >
                        <input
                          type="file"
                          className="custom-file-input"
                          name={`txtPlanoImage_${index}_6`}
                          label={"Your label here."}
                          onChange={(e) => selectImage(e, index, 6)}
                          disabled={ values.txtModelos[index].imagenes === null ||
                            values.txtModelos[index].imagenes[4] === undefined
                              ? true
                              : false
                          }
                        />
                        <label
                          className="custom-file-label"
                          htmlFor={`txtPlanoImage_${index}_6`}
                          style={{ margin: "0px" }}
                        >
                          {values !== undefined && values.txtModelos[index].imagenes !== null
                            ? values.txtModelos[index].imagenes[5] !== undefined
                              ? values.txtModelos[index].imagenes[5].name
                                  .length > 20
                                ? values.txtModelos[
                                    index
                                  ].imagenes[5].name.substring(0, 15) + "..."
                                : values.txtModelos[index].imagenes[5].name
                              : "Adjuntar"
                            : "Adjuntar"}
                        </label>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow key={row.id}>
                  <TableCell align="left">
                    <div style={{ height: "52px" }}>
                      <label
                        className=""
                        htmlFor={`txtPlanoImage_${index}_7`}
                        style={{ margin: "0px" }}
                      >
                        7ª Imagen
                      </label>
                      <div
                        className="custom-file archivo-anexo"
                        id={`txtPlanoImage_${index}_7`}
                        lang="es"
                      >
                        <input
                          type="file"
                          className="custom-file-input"
                          name={`txtPlanoImage_${index}_7`}
                          label={"Your label here."}
                          onChange={(e) => selectImage(e, index, 7)}
                          disabled={ values.txtModelos[index].imagenes === null ||
                            values.txtModelos[index].imagenes[5] === undefined
                              ? true
                              : false
                          }
                        />
                        <label
                          className="custom-file-label"
                          htmlFor={`txtPlanoImage_${index}_7`}
                          style={{ margin: "0px" }}
                        >
                          {values !== undefined && values.txtModelos[index].imagenes !== null
                            ? values.txtModelos[index].imagenes[6] !== undefined
                              ? values.txtModelos[index].imagenes[6].name
                                  .length > 20
                                ? values.txtModelos[
                                    index
                                  ].imagenes[6].name.substring(0, 15) + "..."
                                : values.txtModelos[index].imagenes[6].name
                              : "Adjuntar"
                            : "Adjuntar"}
                        </label>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div style={{ height: "52px" }}>
                      <label
                        className=""
                        htmlFor={`txtPlanoImage_${index}_8`}
                        style={{ margin: "0px" }}
                      >
                        8ª Imagen
                      </label>
                      <div
                        className="custom-file archivo-anexo"
                        id={`txtPlanoImage_${index}_8`}
                        lang="es"
                      >
                        <input
                          type="file"
                          className="custom-file-input"
                          name={`txtPlanoImage_${index}_8`}
                          label={"Your label here."}
                          onChange={(e) => selectImage(e, index, 8)}
                          disabled={ values.txtModelos[index].imagenes === null ||
                            values.txtModelos[index].imagenes[6] === undefined
                              ? true
                              : false
                          }
                        />
                        <label
                          className="custom-file-label"
                          htmlFor={`txtPlanoImage_${index}_8`}
                          style={{ margin: "0px" }}
                        >
                          {values !== undefined && values.txtModelos[index].imagenes !== null
                            ? values.txtModelos[index].imagenes[7] !== undefined
                              ? values.txtModelos[index].imagenes[7].name
                                  .length > 20
                                ? values.txtModelos[
                                    index
                                  ].imagenes[7].name.substring(0, 15) + "..."
                                : values.txtModelos[index].imagenes[7].name
                              : "Adjuntar"
                            : "Adjuntar"}
                        </label>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div style={{ height: "52px" }}>
                      <label
                        className=""
                        htmlFor={`txtPlanoImage_${index}_9`}
                        style={{ margin: "0px" }}
                      >
                        9ª Imagen
                      </label>
                      <div
                        className="custom-file archivo-anexo"
                        id={`txtPlanoImage_${index}_5`}
                        lang="es"
                      >
                        <input
                          type="file"
                          className="custom-file-input"
                          name={`txtPlanoImage_${index}_9`}
                          label={"Your label here."}
                          onChange={(e) => selectImage(e, index, 9)}
                          disabled={ values.txtModelos[index].imagenes === null ||
                            values.txtModelos[index].imagenes[7] === undefined
                              ? true
                              : false
                          }
                        />
                        <label
                          className="custom-file-label"
                          htmlFor={`txtPlanoImage_${index}_9`}
                          style={{ margin: "0px" }}
                        >
                          {values !== undefined && values.txtModelos[index].imagenes !== null
                            ? values.txtModelos[index].imagenes[8] !== undefined
                              ? values.txtModelos[index].imagenes[8].name
                                  .length > 20
                                ? values.txtModelos[
                                    index
                                  ].imagenes[8].name.substring(0, 15) + "..."
                                : values.txtModelos[index].imagenes[8].name
                              : "Adjuntar"
                            : "Adjuntar"}
                        </label>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div style={{ height: "52px" }}>
                      <label
                        className=""
                        htmlFor={`txtPlanoImage_${index}_10`}
                        style={{ margin: "0px" }}
                      >
                        10ª Imagen
                      </label>
                      <div
                        className="custom-file archivo-anexo"
                        id={`txtPlanoImage_${index}_10`}
                        lang="es"
                      >
                        <input
                          type="file"
                          className="custom-file-input"
                          name={`txtPlanoImage_${index}_10`}
                          label={"Your label here."}
                          onChange={(e) => selectImage(e, index, 10)}
                          disabled={ values.txtModelos[index].imagenes === null ||
                            values.txtModelos[index].imagenes[8] === undefined
                              ? true
                              : false
                          }
                        />
                        <label
                          className="custom-file-label"
                          htmlFor={`txtPlanoImage_${index}_10`}
                          style={{ margin: "0px" }}
                        >
                          {values !== undefined && values.txtModelos[index].imagenes !== null
                            ? values.txtModelos[index].imagenes[9] !== undefined
                              ? values.txtModelos[index].imagenes[9].name
                                  .length > 20
                                ? values.txtModelos[
                                    index
                                  ].imagenes[9].name.substring(0, 15) + "..."
                                : values.txtModelos[index].imagenes[9].name
                              : "Adjuntar"
                            : "Adjuntar"}
                        </label>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow key={row.id}>
                  <TableCell align="left">
                    <div style={{ height: "52px" }}>
                      <label
                        className=""
                        htmlFor={`txtPlanoImage_${index}_11`}
                        style={{ margin: "0px" }}
                      >
                        11ª Imagen
                      </label>
                      <div
                        className="custom-file archivo-anexo"
                        id={`txtPlanoImage_${index}_11`}
                        lang="es"
                      >
                        <input
                          type="file"
                          className="custom-file-input"
                          name={`txtPlanoImage_${index}_11`}
                          label={"Your label here."}
                          onChange={(e) => selectImage(e, index, 11)}
                          disabled={ values.txtModelos[index].imagenes === null ||
                            values.txtModelos[index].imagenes[9] === undefined
                              ? true
                              : false
                          }
                        />
                        <label
                          className="custom-file-label"
                          htmlFor={`txtPlanoImage_${index}_11`}
                          style={{ margin: "0px" }}
                        >
                          {values !== undefined && values.txtModelos[index].imagenes !== null
                            ? values.txtModelos[index].imagenes[10] !== undefined
                              ? values.txtModelos[index].imagenes[10].name
                                  .length > 20
                                ? values.txtModelos[
                                    index
                                  ].imagenes[10].name.substring(0, 15) + "..."
                                : values.txtModelos[index].imagenes[10].name
                              : "Adjuntar"
                            : "Adjuntar"}
                        </label>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div style={{ height: "52px" }}>
                      <label
                        className=""
                        htmlFor={`txtPlanoImage_${index}_12`}
                        style={{ margin: "0px" }}
                      >
                        12ª Imagen
                      </label>
                      <div
                        className="custom-file archivo-anexo"
                        id={`txtPlanoImage_${index}_12`}
                        lang="es"
                      >
                        <input
                          type="file"
                          className="custom-file-input"
                          name={`txtPlanoImage_${index}_12`}
                          label={"Your label here."}
                          onChange={(e) => selectImage(e, index, 8)}
                          disabled={ values.txtModelos[index].imagenes === null ||
                            values.txtModelos[index].imagenes[10] === undefined
                              ? true
                              : false
                          }
                        />
                        <label
                          className="custom-file-label"
                          htmlFor={`txtPlanoImage_${index}_12`}
                          style={{ margin: "0px" }}
                        >
                          {values !== undefined && values.txtModelos[index].imagenes !== null
                            ? values.txtModelos[index].imagenes[11] !== undefined
                              ? values.txtModelos[index].imagenes[11].name
                                  .length > 20
                                ? values.txtModelos[
                                    index
                                  ].imagenes[11].name.substring(0, 15) + "..."
                                : values.txtModelos[index].imagenes[11].name
                              : "Adjuntar"
                            : "Adjuntar"}
                        </label>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div style={{ height: "52px" }}>
                      <label
                        className=""
                        htmlFor={`txtPlanoImage_${index}_13`}
                        style={{ margin: "0px" }}
                      >
                        13ª Imagen
                      </label>
                      <div
                        className="custom-file archivo-anexo"
                        id={`txtPlanoImage_${index}_5`}
                        lang="es"
                      >
                        <input
                          type="file"
                          className="custom-file-input"
                          name={`txtPlanoImage_${index}_13`}
                          label={"Your label here."}
                          onChange={(e) => selectImage(e, index, 13)}
                          disabled={ values.txtModelos[index].imagenes === null ||
                            values.txtModelos[index].imagenes[11] === undefined
                              ? true
                              : false
                          }
                        />
                        <label
                          className="custom-file-label"
                          htmlFor={`txtPlanoImage_${index}_9`}
                          style={{ margin: "0px" }}
                        >
                          {values !== undefined && values.txtModelos[index].imagenes !== null
                            ? values.txtModelos[index].imagenes[12] !== undefined
                              ? values.txtModelos[index].imagenes[12].name
                                  .length > 20
                                ? values.txtModelos[
                                    index
                                  ].imagenes[12].name.substring(0, 15) + "..."
                                : values.txtModelos[index].imagenes[12].name
                              : "Adjuntar"
                            : "Adjuntar"}
                        </label>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div style={{ height: "52px" }}>
                      <label
                        className=""
                        htmlFor={`txtPlanoImage_${index}_14`}
                        style={{ margin: "0px" }}
                      >
                        14ª Imagen
                      </label>
                      <div
                        className="custom-file archivo-anexo"
                        id={`txtPlanoImage_${index}_14`}
                        lang="es"
                      >
                        <input
                          type="file"
                          className="custom-file-input"
                          name={`txtPlanoImage_${index}_14`}
                          label={"Your label here."}
                          onChange={(e) => selectImage(e, index, 10)}
                          disabled={ values.txtModelos[index].imagenes === null ||
                            values.txtModelos[index].imagenes[12] === undefined
                              ? true
                              : false
                          }
                        />
                        <label
                          className="custom-file-label"
                          htmlFor={`txtPlanoImage_${index}_14`}
                          style={{ margin: "0px" }}
                        >
                          {values !== undefined && values.txtModelos[index].imagenes !== null
                            ? values.txtModelos[index].imagenes[13] !== undefined
                              ? values.txtModelos[index].imagenes[13].name
                                  .length > 20
                                ? values.txtModelos[
                                    index
                                  ].imagenes[13].name.substring(0, 15) + "..."
                                : values.txtModelos[index].imagenes[13].name
                              : "Adjuntar"
                            : "Adjuntar"}
                        </label>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
      <div className="container" style={{ display: "flex", padding: "10px" }}>
        <Button
          type="button"
          theme="primary form-control"
          onClick={() => addNewRow()}
          style={{
            minWidth: "130px",
            margin: "5px",
          }}
        >
          Agregar Tipología
        </Button>
        <Button
          type="button"
          theme="primary form-control"
          onClick={() => removeRow()}
          style={{
            minWidth: "130px",
            margin: "5px",
          }}
        >
          Eliminar Tipología
        </Button>
      </div>
    </div>
  );
};
export default Step5;
