/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchGetAllServiciosBase,
  fetchListServicioAdicionals,
  fetchAddPlan,
  initializeMensaje
} from '../../action';
import { Formik, Form, ErrorMessage } from 'formik';
import { Alert } from 'react-bootstrap';
import { FieldGroup, CheckFieldGroup, RadioFieldGroup } from '../../utils/Input';
import ErrorLabel from '../../utils/ErrorLabel';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import { Container, Row, Col, Button } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';

class PlanForm extends Component {
  constructor(...args) {
    super(...args);
    this.state = { 
      validated: false, 
      checked: false, 
      nombre: '', 
      precio: '', 
      serviciosBase: {}, 
      serviciosAdicionales : {}, 
      textoDescuento: '',
      fast: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    const { initMensaje, fetchGetAllServiciosBase, fetchGetAllServiciosAdicionales } = this.props;
    fetchGetAllServiciosBase();
    fetchGetAllServiciosAdicionales();
    initMensaje();
  };

  handleChange(e, values, checkboxName) {
    if (checkboxName == "checked") {
      this.setState({
        checked: !this.state.checked
      });
    } else {
      this.setState({
        fast: !this.state.fast
      });
    }
    this.setState({ 
      nombre: values.nombre,
      precio: values.precio,
      serviciosBase: values.serviciosBase,
      serviciosAdicionales: values.serviciosAdicionales,
      textoDescuento: (!this.state.checked) ? values.textoDescuento : '',
     });
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
  }

  renderList = (servicios, errors, values, tipoDeServicio) => {
    return servicios.map(
      servicio => {
        if (tipoDeServicio == "base") {
          
          const thisvalues = values.serviciosBase[servicio.id];
          return (
            <tr key={servicio.id}>
              <td>{servicio.nombre}</td>

              <td>
                <CheckFieldGroup
                  name={`serviciosBase.${servicio.id}`}
                  id={`serviciosBase.${servicio.id}`}
                  type="radio"
                  value={JSON.stringify(servicio)}
                  checked={thisvalues === JSON.stringify(servicio)}
                />
              </td>

              <td>
                <CheckFieldGroup
                  name={`serviciosBase.${servicio.id}`}
                  id={servicio.id}
                  type="radio"
                  value={false}
                  checked={thisvalues === 'false'}
                />
              </td>
              {errors.serviciosBase && errors.serviciosBase[servicio.id] ? (
                <td>
                  <ErrorLabel>{errors.serviciosBase[servicio.id]}</ErrorLabel>
                </td>
              ) : (
                <td> </td>
              )}
            </tr>
          );
        } else {

          const thisvalues = values.serviciosAdicionales[servicio.id];
          return (
            <tr key={servicio.id}>
              <td>{servicio.nombre}</td>
  
              <td>
                <CheckFieldGroup
                  name={`serviciosAdicionales.${servicio.id}`}
                  id={`serviciosAdicionales.${servicio.id}`}
                  type="radio"
                  value={JSON.stringify(servicio)}
                  checked={thisvalues === JSON.stringify(servicio)}
                />
              </td>
  
              <td>
                <CheckFieldGroup
                  name={`serviciosAdicionales.${servicio.id}`}
                  id={servicio.id}
                  type="radio"
                  value={false}
                  checked={thisvalues === 'false'}
                />
              </td>
              {errors.serviciosAdicionales && errors.serviciosAdicionales[servicio.id] ? (
                <td>
                  <ErrorLabel>{errors.serviciosAdicionales[servicio.id]}</ErrorLabel>
                </td>
              ) : (
                <td> </td>
              )}
            </tr>
          );
        }

      },
      { errors }
    );
  };


  userFeedBack = () => {
    const { requestAddPlan, history, errorMessage } = this.props;

    if (requestAddPlan == "LOADING") swal.showLoading();

    if (requestAddPlan == "SUCCESS") {
      swal.fire({
        icon: 'success',
        title: 'Bien...',
        text: 'Plan creado!',
        onAfterClose: () => {
          history.push("/planes")
        }
      });
    }
    if (requestAddPlan == 'ERROR') {
      swal.fire({
        icon: 'error',
        title: 'Error...',
        text: errorMessage
      });
    }
  }

  render() {
    const { serviciosBase } = this.props;
    if (!serviciosBase) {
      return (
        <div>
          Parece que no hay servicios base, agregue uno{' '}
          <Link to="/servicioBase">aqui</Link>
        </div>
      );
    }
    const { serviciosAdicionales } = this.props;

    const validation = values => {
      const errors = {};
      const { serviciosBase } = this.props;
      const { serviciosAdicionales } = this.props;

      if (values.nombre == null || values.nombre == "") {
        errors.nombre = 'Ingrese el nombre';
      }

      if (values.esVenta == null || values.esVenta == undefined) {
        errors.esVenta = 'Ingrese si es venta o arriendo';
      }

      if (values.precio === "") {
        errors.precio = 'Ingrese el precio';
      }

      if (isNaN(values.precio)) {
        errors.precio = 'Solo acepta valores numericos';
      }

      serviciosBase.forEach(element => {
        if (values.serviciosBase && !values.serviciosBase[element.id]) {
          errors.serviciosBase = {
            ...errors.serviciosBase,
            [element.id]: 'Campo requerido'
          };
        }
      });

      serviciosAdicionales.forEach(element => {
        if (values.serviciosAdicionales && !values.serviciosAdicionales[element.id]) {
          errors.serviciosAdicionales = {
            ...errors.serviciosAdicionales,
            [element.id]: 'Campo requerido'
          };
        }
      });

      const todosNo =
        Object.values(values.serviciosBase).every(ser => {
          return !JSON.parse(ser);
        }) &&
        Object.values(values.serviciosBase).length === serviciosBase.length;
      if (todosNo) {
        errors.todosNo = 'Al menos un servicio tiene que ser agregado';
      }

      return errors;
    };

    return (
      <Container fluid className="main-content-container px-4">
        {this.userFeedBack()}
        <PageTitle
          sm="4"
          title="Agregar Plan"
          subtitle="Planes"
          className="text-sm-left"
        />
        <Formik
          initialValues={{
            nombre: this.state.nombre,
            esVenta: null,
            precio: this.state.precio,
            serviciosBase: this.state.serviciosBase,
            serviciosAdicionales : this.state.serviciosAdicionales,
            textoDescuento: this.state.textoDescuento,
            descuento: this.state.checked,
            fast: this.state.fast
          }}
          enableReinitialize={true}
          validate={validation}
          //validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            values.serviciosBase = Object.values(values.serviciosBase)
              .filter(servicio => {
                return JSON.parse(servicio);
              })
              .map(servicio => {
                let servi = JSON.parse(servicio);
                delete servi.rent;
                delete servi.sale;
                return servi;
              });

            values.serviciosAdicionales = Object.values(values.serviciosAdicionales)
              .filter(servicio => {
                return JSON.parse(servicio);
              })
              .map(servicio => {
                let servi = JSON.parse(servicio);
                delete servi.rent;
                delete servi.sale;
                return servi;
              });

            const data = {
              ...values,
              esVenta: values.esVenta == 'true'
            }
            
            this.props.fetchAddPlan(data);
            //resetForm();
          }}
        >
          {({ errors, values }) => {
            return (
              <Form>
                <Row>
                  <Col md={4}>
                    <div className="form-group d-inline mr-1dot5rem">
                      <label for="esVenta">
                        <RadioFieldGroup
                          name="esVenta"
                          label="Venta"
                          value={true}
                        />
                      </label>
                    </div>                    
                    <div className="form-group d-inline">
                      <label for="esVenta">
                        <RadioFieldGroup
                          name="esVenta"
                          label="Arriendo"
                          value={false}
                        />
                      </label>
                    </div>
                    <div className="validation-error-message">
                      <ErrorMessage name="esVenta" />
                    </div>                    
                  </Col>
                </Row>
                <Row></Row>
                <Row className={"mt-1rem"}>
                  <Col md={10}>
                    <CheckFieldGroup
                      label="Plan Fast"
                      name="fast"
                      onChange={e => this.handleChange(e, values, "fast")}
                      checked={this.state.fast}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FieldGroup
                      name="nombre"
                      label="Nombre"
                      id="nombre"
                      type="text"
                    />
                  </Col>
                  <Col md={6}>
                    <FieldGroup
                      name="precio"
                      label="Precio"
                      id="precio"
                      type="number"
                    />
                  </Col>
                </Row>                
                <Row>
                  <Col md={6}>
                    <CheckFieldGroup
                    name="descuento"
                    label="Descuento"
                    id="descuento"
                    checked={this.state.checked}
                    onChange={e => this.handleChange(e, values, "checked")} />
                  </Col>
                  <Col md={6}>
                    {this.state.checked && (
                      <FieldGroup
                      name="textoDescuento"
                      label="Mensaje descuento"
                      id="textoDescuento"
                      type="text"
                    />)
                    }
                  </Col>
                </Row>
                <table className="table hover mb-0">
                  <thead>
                    <tr>
                      <th>Servicios Base</th>

                      <th>Si</th>
                      <th>No</th>
                      <th style={{ width: '15%' }}> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderList(serviciosBase, errors, values, "base")}
                  </tbody>
                  
                </table>

                <table className="table hover mb-0">
                  <thead>
                    <tr>
                      <th>Servicios Adicionales</th>

                      <th>Si</th>
                      <th>No</th>
                      <th style={{ width: '15%' }}> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderList(serviciosAdicionales, errors, values, "adicional")}
                  </tbody>
                  </table>
                {errors.todosNo && <Alert>{errors.todosNo}</Alert>}
                <Button type="submit" className="btn btn-primary mb-5">
                  Agregar
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    serviciosBase: state.app.itemServicios,
    serviciosAdicionales: state.app.servicioAdicionales,
    errorMessage: state.app.errorMessage,
    requestAddPlan: state.app.requestAddPlan
  };
};

const mapDispatchToProps = dispatch => ({
  fetchGetAllServiciosBase: () => dispatch(fetchGetAllServiciosBase()),
  fetchGetAllServiciosAdicionales: () => dispatch(fetchListServicioAdicionals()),
  fetchAddPlan: plan => dispatch(fetchAddPlan(plan)),
  initMensaje: () => dispatch(initializeMensaje()),
  dispatch: (action) => {
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanForm);
