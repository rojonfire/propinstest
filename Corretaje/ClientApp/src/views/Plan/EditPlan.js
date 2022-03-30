/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchGetAllServiciosBase,
  fetchUpdatePLan,
  initializeMensaje,
  fetchGetPlanById,
  fetchGetAllPlanes,
  initializePlan,
  fetchListServicioAdicionals
} from '../../action';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Alert, Button, Container, Row, Col } from 'shards-react';
import { CheckFieldGroup, FieldGroup, RadioFieldGroup } from '../../utils/Input';
import ErrorLabel from './index';
import PageTitle from '../../components/common/PageTitle';
import swal from 'sweetalert2';

class EditPlan extends Component {
  constructor(...args) {
    super(...args);
    this.state = { 
      validated: false, 
      checked: false,
      plan: {},
      fast: false,
      nombre: '', 
      precio: '', 
      textoDescuento: '',
      esVenta: true
    };
  }

  componentDidMount = () => {
    const {
      initMensaje,
      fetchGetAllServiciosBase,
      fetchGetPlan,
      fetchGetAllServiciosAdicionales,
      match,
    } = this.props;

    fetchGetPlan(match.params.id);
    fetchGetAllServiciosBase();
    fetchGetAllServiciosAdicionales();
    initMensaje();
  };

  componentDidUpdate(prevProps) {
    const {
      plan
    } = this.props;
    if (prevProps.plan != plan && plan != null) {
      this.setState({
        fast: plan.fast,
        nombre: plan.nombre,
        precio: plan.precio,
        checked: plan.descuento,
        textoDescuento: !this.state.checked ? plan.textoDescuento : '',
        esVenta: plan.esVenta
      });
    }
  }

  componentWillUnmount() {
    this.props.initPlan();
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
  }

  handleChange(e, values, checkboxName) {
    if (checkboxName == "checked") {
      this.setState({
        checked: !this.state.checked
      });
    } else if (checkboxName == "fast") {
      this.setState({
        fast: !this.state.fast
      });
    } else if (checkboxName == "esVenta") {
      this.setState({
        esVenta: !values.esVenta
      });
    }
    
    this.setState({ 
      nombre: values.nombre,
      precio: values.precio,
      serviciosBase: values.serviciosBase,
      serviciosAdicionales: values.serviciosAdicionales,
      textoDescuento: (!this.state.checked) ? values.textoDescuento : ''
     });
  }

  renderList = (servicios, errors, values, tipoDeServicio) => {
    if (servicios != null && Array.isArray(servicios)) {
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
    }
    
  };

  userFeedBack = () => {
    const { requestUpdatePlan, history, errorMessage } = this.props;

    if (requestUpdatePlan === "LOADING") swal.showLoading();

    if (requestUpdatePlan === "SUCCESS") {
      swal.fire({
        icon: 'success',
        title: 'Bien...',
        text: 'Plan actualizado!',
        onAfterClose: () => {
          history.push("/planes")
        }
      });
    }
    if (requestUpdatePlan === 'ERROR') {
      swal.fire({
        icon: 'error',
        title: 'Error...',
        text: errorMessage
      });
    }
  };

  render() {
    const { serviciosBase, serviciosAdicionales, plan } = this.props;
    const { fast, nombre, precio, textoDescuento, checked, esVenta } = this.state;

    if (!serviciosBase || !plan) {
      return <div>Cargando...</div>;
    }

    const validation = values => {
      const errors = {};
      const { serviciosBase } = this.props;
      
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

    let serviciosSeleccionados = {};
    let serviciosAdicionalesSeleccionados = {};

    plan &&
      plan.serviciosBase &&
      serviciosBase.forEach(t => {
        if (plan.serviciosBase.find(t2 => t2.id === t.id)) {
          serviciosSeleccionados = {
            ...serviciosSeleccionados,
            [t.id]: JSON.stringify(t)
          };
        } else {
          serviciosSeleccionados = {
            ...serviciosSeleccionados,
            [t.id]: 'false'
          };
        }
      });

    plan &&
    plan.serviciosAdicionales &&
    serviciosAdicionales.forEach(t => {
      if (plan.serviciosAdicionales.find(t2 => t2.id === t.id)) {
        serviciosAdicionalesSeleccionados = {
          ...serviciosAdicionalesSeleccionados,
          [t.id]: JSON.stringify(t)
        };
      } else {
        serviciosAdicionalesSeleccionados = {
          ...serviciosAdicionalesSeleccionados,
          [t.id]: 'false'
        };
      }
    });

    const initialValues = {
      id: plan.id,
      fast,
      precio,
      nombre,
      textoDescuento,
      esVenta,
      descuento: checked,
      serviciosBase: serviciosSeleccionados,
      serviciosAdicionales: serviciosAdicionalesSeleccionados
    };

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Editar plan"
            subtitle=""
            className="text-sm-left"
          />
        </Row>
        {this.userFeedBack()}
        <Formik
          initialValues={initialValues}
          validate={validation}
          enableReinitialize={true}
          onSubmit={values => {
            this.initialValues = {
              ...this.initialValues,
              serviciosBase: values.serviciosBase,
              serviciosAdicionales: !values.fast ? values.serviciosAdicionales : []
            };

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

            values.serviciosAdicionales = !values.fast ? Object.values(values.serviciosAdicionales)
              .filter(servicio => {
                return JSON.parse(servicio);
              })
              .map(servicio => {
                let servi = JSON.parse(servicio);
                delete servi.rent;
                delete servi.sale;
                return servi;
              }) : [];

            const data = {
              ...values,
              esVenta: this.state.esVenta
            }

            this.props.fetchUpdatePLan(data);
          }}
        >
          {({ errors, values }) => {
            return (
              <Form>
                <Field name="id" hidden disabled />
                <Row>
                  <Col md={4}>
                    <div className="form-group d-inline mr-1dot5rem">
                      <label for="esVenta">
                        <RadioFieldGroup
                          name="esVenta"
                          label="Venta"
                          checked={esVenta}
                          value={true}
                          onChange={e => this.handleChange(e, values, "esVenta")}
                        />
                      </label>
                    </div>                    
                    <div className="form-group d-inline">
                      <label for="esVenta">
                        <RadioFieldGroup
                          name="esVenta"
                          label="Arriendo"
                          checked={!esVenta}
                          value={false}
                          onChange={e => this.handleChange(e, values, "esVenta")}
                        />
                      </label>
                    </div>
                    <div className="validation-error-message">
                      <ErrorMessage name="esVenta" />
                    </div>                    
                  </Col>
                </Row>
                <Row>
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
                <Row>
                  <Col md={12}>
                    <h3>Servicios Base</h3>
                    <table className="table mb-0">
                      <thead>
                        <tr>
                          <th>Servicio</th>
                          <th>Si</th>
                          <th>No</th>
                          <th style={{ width: '15%' }}> </th>
                        </tr>
                      </thead>
                      {this.renderList(serviciosBase, errors, values, "base")}

                    </table>
                    {errors.serviciosError && (
                      <Alert>{errors.serviciosError}</Alert>
                    )}
                  </Col>
                </Row>
                { !this.state.fast && (
                  <Row>
                    <Col md={12}>
                      <h3>Servicios Adicionales</h3>
                      <table className="table mb-0">
                        <thead>
                          <tr>
                            <th>Servicio</th>
                            <th>Si</th>
                            <th>No</th>
                            <th style={{ width: '15%' }}> </th>
                          </tr>
                        </thead>
                        {this.renderList(serviciosAdicionales, errors, values, "adicional")}
                      
                      </table>
                      {errors.serviciosError && (
                        <Alert>{errors.serviciosError}</Alert>
                      )}
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col md={12}>
                    <Button type="submit" className="btn btn-primary">
                      Guardar
                    </Button>
                  </Col>
                </Row>
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
    plan: state.app.plan,
    errorMessage: state.app.errorMessage,
    requestUpdatePlan: state.app.requestUpdatePlan
  };
};

const mapDispatchToProps = dispatch => ({
  fetchGetAllServiciosBase: () => dispatch(fetchGetAllServiciosBase()),
  fetchGetAllServiciosAdicionales: () => dispatch(fetchListServicioAdicionals()),
  fetchUpdatePLan: plan => dispatch(fetchUpdatePLan(plan)),
  initMensaje: () => dispatch(initializeMensaje()),
  fetchGetPlan: id => dispatch(fetchGetPlanById(id)),
  getAllPlanes: () => dispatch(fetchGetAllPlanes()),
  initPlan: () => dispatch(initializePlan())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPlan);
