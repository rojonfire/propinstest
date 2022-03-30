/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import ServicioForm from './ServicioForm';
import { validation } from './FormValidation';
import { fetchAddServicioAdicional, initializeMensaje } from '../../action';
import { Container, Row, Col } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';

class AgregarServicio extends Component {
  componentDidMount() {
    const { initializeMensaje } = this.props;
    initializeMensaje();
  }

  render() {
    const { errorMessage, requestAddServicioAdicional, history } = this.props;
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Agregar Servicio Adicional Propins"
            subtitle="Servicios"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col md={6}>
            <Formik
              initialValues={{
                nombre: '',
                subtitulo: '',
                precio: '',
                id: '',
                tipoMoneda: 'UF',
                imagen: ''
              }}
              validationSchema={validation}
              onSubmit={(values, { resetForm }) => {
                const { agregarServicio } = this.props;
                agregarServicio(values);
                resetForm();
              }}
              render={({ values, submitForm }) => {
                return (
                  <ServicioForm
                    values={values}
                    onSubmit={submitForm}
                    mensaje={errorMessage}
                    requestState={requestAddServicioAdicional}
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
  return { errorMessage: state.app.errorMessage, requestAddServicioAdicional: state.app.requestAddServicioAdicional };
};

const mapDispatchToProps = dispatch => {
  return {
    agregarServicio: servicio => dispatch(fetchAddServicioAdicional(servicio)),
    initializeMensaje: () => dispatch(initializeMensaje())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgregarServicio);
