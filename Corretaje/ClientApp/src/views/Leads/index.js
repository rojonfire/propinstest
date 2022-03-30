import React from "react";
import PageTitle from "../../components/common/PageTitle";

import { connect } from "react-redux";
import { Container, Row, Col } from "shards-react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Button";
import Swal from "sweetalert2";
import moment from "moment";
import { Formik, Form } from "formik";
import { SelectFieldGroup } from "../../utils/Input";
import "moment/locale/es";
import util from "../../utils/utilsFunctions";

class Leads extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {};

    const {} = this.props;
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Contactar a posibles vendedores"
            subtitle="Leads"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col>
            {" "}
            <div>Tarjeta propiedades broker</div>
            <Card />
          </Col>
          <Col>
            {" "}
            <div>Contactar posible vendedores para jefe de venta</div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Leads;
