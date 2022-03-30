/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import PageTitle from "../../components/common/PageTitle";
import { Container, Alert, Button, Row } from "shards-react";
import AgendaForm from "./AgendaForm";
import {
  diasSemana,
  initialValues,
  schema,
  userFeedBack,
} from "./AgendasUtils";
import api from "../../api";

class Fotografo extends Component {
  constructor(props) {
    super(props);
    this.state = { bloques: [], mensaje: "" };
  }

  componentDidMount() {
    const { fotografo } = this.props;
    this.apiGetBloques(fotografo.userId);
  }

  apiGetBloques = async () => {
    const {
      fotografo: { userId },
    } = this.props;

    try {
      const res = await api.apiGetBloquesFotografo(userId);
      this.setState({ bloques: initialValues(res.data.value.data) });
    } catch (e) {
      console.error(e);
    }
  };

  apiUpdateAgenda = async (agenda) => {
    try {
      const res = await api.apiUpdateFotografoAgenda(agenda);
      this.setState({ mensaje: res.data.value.mensaje });
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { bloques } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Agenda Fotografo"
            subtitle="Fotografo"
            className="text-sm-left"
          />
        </Row>
        <br />
        <Formik
          validationSchema={schema}
          initialValues={{ bloques }}
          enableReinitialize
          onSubmit={(values) => {
            const { fotografo } = this.props;
            const fotografoId = fotografo.userId;
            this.setState({ bloques: values.bloques, mensaje: "" });

            let bloques = values.bloques.map((bloqueJSON) => {
              let tramo = JSON.parse(bloqueJSON);
              tramo = { dia: tramo.index, tramo: tramo.bloque, fotografoId };
              return tramo;
            });
            this.apiUpdateAgenda(bloques);
          }}
          render={(props) => {
            const { values, errors, touched } = props;
            return (
              <Form>
                {" "}
                <AgendaForm
                  rangBloque={3}
                  values={values}
                  minHour={8}
                  maxHour={20}
                  diasSemana={diasSemana}
                />
                {touched.bloques &&
                typeof errors.bloques === "string" &&
                errors.bloques ? (
                  <Alert theme="danger">{errors.bloques}</Alert>
                ) : null}
                {userFeedBack(this.state.mensaje)}
                <Button theme="success" type="submit">
                  Guardar
                </Button>
              </Form>
            );
          }}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fotografo: state.app.itemUsuario[0].Usr,
  };
};

export default connect(mapStateToProps, null)(Fotografo);
