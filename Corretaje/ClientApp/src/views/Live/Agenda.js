import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";

import { Container, Row, Col } from "shards-react";

import api from "../../api";

import swal from "sweetalert2";

import PageTitle from "../../components/common/PageTitle";
import AgendaHora from "./AgendaHora";

import { initialValues } from "../Agendas/AgendasUtils";

const LiveAgenda = (props) => {
  const [proyecto, setProyecto] = useState("");
  const [allBloque, setAllBloque] = useState([]);
  const [allUnavailable, setAllUnavailable] = useState([]);
  const [allData, setAllData] = useState([]);

  const [estadoCarga, setEstadoCarga] = useState(false);

  const [estadoAdd, setEstadoAdd] = useState(false);

  useEffect(() => {
    cargaLista();
  }, []);

  const { userId } = JSON.parse(localStorage.user);

  const cargaBloque = async (proyecto) => {
    swal.showLoading();
    // console.log("proyecto cargaBloque:", proyecto)
    try {
      const res = await api.getBloqueProyecto(userId, proyecto);
      const allRes = await api.apiGetAgendaAllBLoquesProyecto(proyecto);
      // console.log("res.data.bloques cargaBloque:", res.data.bloques)
      // console.log("allRes.bloques cargaBloque:", allRes.bloques)
      console.log("allRes cargaBloque:", allRes)

      if (res.estado === 0) {
        swal.fire({
          icon: "error",
          title: res.mensaje,
        });
      } else {
        if (res.data.bloques.toString() !== "{}") {
          const bloques = initialValues(res.data);
          // console.log("bloques:", bloques)
          let dataBloque = [];
          bloques.map((x) => dataBloque.push(JSON.parse(x)));
          setAllBloque(dataBloque);
        }
        if (allRes && allRes.bloques && allRes.bloques.toString() !== "{}") {
          const blocked = initialValues(allRes);
          let dataBlocked = [];
          blocked.map((x) => dataBlocked.push(JSON.parse(x)));
          setAllUnavailable(dataBlocked);
        } else {
          setAllUnavailable([]);
        }
        setEstadoCarga(true);
        swal.close();
      }
    } catch (error) {
      console.log("cargaBloque -> error", error);
    }
  };

  const cargaLista = async () => {
    swal.showLoading();
    try {
      const res = await api.getAllProyectosAgenteApi(userId);
      if (res.estado === 0) {
        swal.fire({
          icon: "warning",
          title: "No tiene proyectos asignados",
        });
      } else {
        swal.close();
        setAllData(res.data.proyectos);
        if (res.data.proyectos.length === 1) {
          setProyecto(res.data.proyectos[0].id);
          cargaBloque(res.data.proyectos[0].id);
        }
      }
    } catch (error) {
      console.log("cargaLista -> error-------", error);
    }
  };

  const onChangeCheck = (bool, index, bloque) => {
    const obj = { index: index, bloque: bloque };
    let carga;
    const filtro = allBloque.filter((o) => {
      return o.index === index && o.bloque === bloque;
    });

    if (filtro.length !== 0) {
      let data = [];
      allBloque.map((x) => {
        if (x.index === index && x.bloque === bloque) {
          return null;
        } else {
          data.push(x);
        }
        return null;
      });
      carga = data;
    } else {
      carga = [...allBloque, obj];
    }
    setAllBloque(carga);
  };

  const AgendaView = () => {
    let allUnavailableDef = allUnavailable
    var i;
    for (i = 0; i < allBloque.length; i++) {
      var j;
      for (j = 0; j < allUnavailable.length; j++) {
        if (JSON.stringify(allBloque[i]) === JSON.stringify(allUnavailableDef[j])) {
          allUnavailableDef.splice(j, 1)
        }
      }
    }
    return (
      <Formik
        initialValues={allBloque}
        enableReinitialize
        render={(props) => {
          const { values } = props;
          return (
            <Form
              style={{
                width: "98%",
                marginLeft: "1%",
                marginRight: "1%",
              }}
            >
              <AgendaHora
                rangBloque={1}
                values={values}
                allUnavailable={allUnavailableDef}
                minHour={8}
                maxHour={22}
                onActionChange={(bool, idx, block) =>
                  onChangeCheck(bool, idx, block)
                }
              />
            </Form>
          );
        }}
      />
    );
  };

  const guardarAgenda = async () => {
    setEstadoAdd(true);
    swal.showLoading();
    let dataBloque = [];
    console.log("guardarAgenda -> allBloque", allBloque);
    allBloque.map((x) => {
      const obj = {
        agenteId: userId,
        proyectoId: proyecto,
        dia: x.index,
        tramo: x.bloque,
      };
      dataBloque.push(obj);
      return null;
    });

    try {
      const res = await api.crearBloqueProyecto(dataBloque);
      if (res.estado === 0) {
        swal.fire({
          icon: "error",
          title: res.mensaje,
        });
      } else {
        swal.fire({
          icon: "success",
          title: "Exito",
          text: "Horario guardado",
        });
        setProyecto("");
        setEstadoAdd(false);
        setEstadoCarga(false);
        setAllBloque([]);
        cargaLista();
      }
    } catch (error) {
      console.log("guardarAgenda -> error", error);
    } finally {
      setEstadoAdd(false);
    }
  };

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Horario Agente"
          subtitle="Live"
          className="text-sm-left"
        />
      </Row>
      <Row>
        <Col md={4}>
          <label>SELECCIONE PROYECTO</label>
          <select
            value={proyecto}
            onChange={(e) => {
              setProyecto(e.target.value);
              cargaBloque(e.target.value);
            }}
            className="form-control  "
          >
            {allData.length === 1 ? (
              allData.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.nombre}
                </option>
              ))
            ) : (
              <>
                <option disabled value="">
                  Selección...
                </option>
                {allData.length &&
                  allData.map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.nombre}
                    </option>
                  ))}
              </>
            )}
          </select>
        </Col>
      </Row>
      <Row>{estadoCarga && AgendaView()}</Row>
      <Row>
        {estadoCarga && (
          <Col md={3}>
            <button
              style={{
                marginTop: "10px",
              }}
              onClick={() => guardarAgenda()}
              className="form-control btn btn-primary"
            >
              {!estadoAdd ? "Guardar" : "Cargando..."}
            </button>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default LiveAgenda;
