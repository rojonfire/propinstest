/** @format */

import React, { Component } from "react";
import { Formik, Form } from "formik";
import { Alert, Button, Container } from "shards-react";

import AgendaForm from "./AgendaForm";
import {
  diasSemana,
  initialValues,
  schema,
  userFeedBack
} from "./AgendasUtils";
import api from "../../api";

class Cliente extends Component {
  constructor(props) {
    super(props);
    this.state = { bloques: [], mensaje: "" };
  }
  componentDidMount() {
    this.apiGetBloques();
  }

  apiGetBloques = async () => {
    const {
      match: {
        params: { clienteId }
      }
    } = this.props;

    try {
      const res = await api.apiGetBloquesCliente(clienteId);
      console.log("Cliente -> apiGetBloques -> res", res);
      console.log(
        "Cliente -> apiGetBloques -> res.data.value.data",
        res.data.value.data
      );
      this.setState({ bloques: initialValues(res.data.value.data) });
    } catch (e) {
      console.error(e);
    }
  };

  apiUpdateAgenda = async agenda => {
    try {
      const res = await api.apiUpdateClienteAgenda(agenda);
      this.setState({ mensaje: res.data.value.mensaje });
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { bloques } = this.state;

    return (
      <div>
        <Formik
          validationSchema={schema}
          initialValues={{ bloques }}
          enableReinitialize
          onSubmit={values => {
            const {
              match: {
                params: { clienteId }
              }
            } = this.props;
            this.setState({ bloques: values.bloques, mensaje: "" });
            let bloques = values.bloques.map(bloqueJSON => {
              let tramo = JSON.parse(bloqueJSON);
              tramo = { dia: tramo.index, tramo: tramo.bloque, clienteId };
              return tramo;
            });
            this.apiUpdateAgenda(bloques);
          }}
          render={props => {
            const { values, errors, touched } = props;
            return (
              <Container fluid className="main-content-container px-4">
                {userFeedBack(this.state.mensaje)}
                <Form>
                  <AgendaForm
                    rangBloque={1}
                    values={values}
                    minHour={8}
                    maxHour={22}
                    diasSemana={diasSemana}
                  />
                  {touched.bloques &&
                  typeof errors.bloques === "string" &&
                  errors.bloques ? (
                    <Alert bsStyle="danger">{errors.bloques}</Alert>
                  ) : null}
                  <Button theme="success" type="submit">
                    Guardarr
                  </Button>
                </Form>
              </Container>
            );
          }}
        />
      </div>
    );
  }
}

export default Cliente;
