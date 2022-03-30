/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import ServicioForm from './ServicioForm';
import { validation } from './FormValidation';
import {
  initializeMensaje,
  fetchListServicioAdicionals,
  fetchUpdateServicioAdicional
} from '../../action';
import { Container, Row, Col } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';

class EditarServicio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      servicio: {}
    };
  }

  componentDidMount() {
    const {
      initializeMensaje,
      getlistServicios,
      listServicios,
      match
    } = this.props;

    initializeMensaje();
    getlistServicios();

    if (match.params && match.params.id) {
      const servicio = listServicios.find(serv => {
        return serv.id === match.params.id;
      });
      this.setState({ servicio });
    }
  }

  render() {
    const { errorMessage, requestUpdateServicioAdicional, history } = this.props;
    const { servicio } = this.state;

    if (!servicio) {
      return <div>Hubo un problema con este servicio</div>;
    }

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Servicios Adicional Propins"
            subtitle="Servicios"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col md={8}>
            <Formik
              initialValues={servicio}
              enableReinitialize={true}
              validationSchema={validation}
              onSubmit={(values, { resetForm }) => {
                const { editarServicio } = this.props;
                editarServicio(values);
                this.setState({ servicio: values });
                resetForm();
              }}
              render={({ values, submitForm }) => {
                return (
                  <ServicioForm
                    values={values}
                    onSubmit={submitForm}
                    mensaje={errorMessage}
                    requestState={requestUpdateServicioAdicional}
                    history={history}
                  />
                );
              }}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.app.errorMessage,
    listServicios: state.app.servicioAdicionales,
    requestUpdateServicioAdicional: state.app.requestUpdateServicioAdicional
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getlistServicios: () => dispatch(fetchListServicioAdicionals()),
    initializeMensaje: () => dispatch(initializeMensaje()),
    editarServicio: serv => dispatch(fetchUpdateServicioAdicional(serv))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditarServicio);
