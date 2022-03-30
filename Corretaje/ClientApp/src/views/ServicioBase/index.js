/** @format */

import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { fetchAddServicioBase, initializeMensaje } from '../../action';

import { FieldGroup } from '../../utils/Input';

import { Container, Row, Button, Col } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';

import * as Yup from 'yup';

import swal from 'sweetalert2';

class ServicioBase extends Component {
  constructor(...args) {
    super(...args);

    this.state = { validated: false };
  }

  componentDidMount = () => {
    this.props.initMensaje();
  };

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
  }

  userFeedBack = () => {
    const { requestAddServicioBase, history, errorMessage } = this.props;

    if (requestAddServicioBase == "LOADING") swal.showLoading();

    if (requestAddServicioBase == "SUCCESS") {
      swal.fire({
        icon: 'success',
        title: 'Bien...',
        text: 'Servicio base creado!',
        onAfterClose: () => {
          history.push("/tables")
        }
      });
    }
    if (requestAddServicioBase == 'ERROR') {
      swal.fire({
        icon: 'error',
        title: 'Error...',
        text: errorMessage
      });
    }
  };

  render() {
    const SignupSchema = Yup.object().shape({
      nombre: Yup.string().required('Campo obligatorio')
    });
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Servicios Base Propins "
            subtitle="Servicios"
            className="text-sm-left"
          />
        </Row>

        <Row>
          <Col md={6}>
            <Formik
              initialValues={{
                nombre: ''
              }}
              validationSchema={SignupSchema}
              onSubmit={(values, { resetForm }) => {
                this.props.fetchAddServicioBase(values);
                resetForm();
              }}
            >
              {({ values }) => {
                return (
                  <Form>
                    <div>
                      <FieldGroup
                        name="nombre"
                        id="nombre"
                        label="Nombre"
                        value={values.nombre}
                      />
                    </div>
                    <Button type="submit" className="btn-primary">
                      Agregar
                    </Button>
                  </Form>
                );
              }}
            </Formik>
            {this.userFeedBack()}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { errorMessage: state.app.errorMessage, requestAddServicioBase: state.app.requestAddServicioBase };
};

const mapDispatchToProps = dispatch => ({
  fetchAddServicioBase: data => dispatch(fetchAddServicioBase(data)),
  initMensaje: () => dispatch(initializeMensaje())
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicioBase);
