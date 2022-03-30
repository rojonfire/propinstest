/** @format */

import React, { Component, Fragment } from "react";
import { Col, Row, Card, CardBody, CardHeader } from "shards-react";

import { FieldArray } from "formik";

import { CheckFieldGroup } from "../../utils/Input";

export default class AgendaForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      diasDisponibles: [],
      update: true
    };
  }

  renderTable = () => {
    const { diasSemana, values } = this.props;
    console.log("AgendaForm -> renderTable -> values", values);
    let bloques = [];

    if (window.location.href.includes("agendas/cliente/")) {
      bloques = [
        "08:00-09:00",
        "09:00-10:00",
        "10:00-11:00",
        "11:00-12:00",
        "12:00-13:00",
        "13:00-14:00",
        "14:00-15:00",
        "15:00-16:00",
        "16:00-17:00",
        "17:00-18:00",
        "18:00-19:00",
        "19:00-20:00"
      ];
    } else {
      bloques = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
    }

    return (
      <FieldArray
        name="bloques"
        render={helpers => {
          return (
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Crea tu horario, el que mas te acomode.</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Horas</th>
                      {diasSemana.map(dia => {
                        return <th key={dia}>{dia}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {bloques.map(bloque => {
                      return (
                        <tr key={bloque}>
                          <td>{bloque}</td>
                          {diasSemana.map((diaSemana, index) => {
                            const jsonValue = JSON.stringify({ index, bloque });
                            return (
                              <td key={jsonValue}>
                                <CheckFieldGroup
                                  name="bloques"
                                  value={jsonValue}
                                  checked={
                                    values.bloques &&
                                    values.bloques.includes(jsonValue)
                                  }
                                  onChange={e => {
                                    const seleccionado =
                                      e.currentTarget.checked;

                                    if (seleccionado) {
                                      helpers.form.values.bloques = [
                                        ...helpers.form.values.bloques,
                                        jsonValue
                                      ];
                                      this.setState({
                                        update: !this.state.update
                                      });
                                    } else {
                                      helpers.form.values.bloques = helpers.form.values.bloques.filter(
                                        val => val !== jsonValue
                                      );

                                      this.setState({
                                        update: !this.state.update
                                      });
                                    }
                                  }}
                                />
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          );
        }}
      />
    );
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Col>{this.renderTable()}</Col>
        </Row>
      </Fragment>
    );
  }
}
