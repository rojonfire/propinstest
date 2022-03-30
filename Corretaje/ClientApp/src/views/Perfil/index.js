/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  postCambiarContraseña,
  getUsuario
} from '../../action';
import { Formik, Form } from 'formik';
import { Alert } from 'react-bootstrap';
import { FieldGroup, CheckFieldGroup } from '../../utils/Input';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Swal from 'sweetalert2';
import { Container, Row, Col, Button } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import util from "../../utils/utilsFunctions";

class IndexPerfil extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
    };
    const { getUsuario } = this.props;
    getUsuario();
  }

  componentDidMount = () => {
  };

  onSubmitChangePassword = (formValues) => {
    const data = {
      contraseñaAntigua: formValues.oldPassword,
      contraseñaNueva: formValues.newPassword
    }
    
    const { postCambiarContraseña } = this.props;
    postCambiarContraseña(data);
  }

  feedback = () => {
    const {
      requestCambioContraseña,
      requestGetUsuario,
      errorMessage
    } = this.props;
    if (
      requestCambioContraseña === "LOADING" ||
      requestGetUsuario === "LOADING"
    ) {
      Swal.showLoading();
    }
    if (requestCambioContraseña === "SUCCESS") {
      Swal.fire({
        title: "Contraseña actualizada",
        text: "Se ha actualizado la contraseña exitosamente",
        icon: "success",
        onAfterClose: () => {
          window.location.reload();
        },
      });
    }
    if (requestGetUsuario === "SUCCESS") {
      Swal.close();
    }

    if (requestGetUsuario === "ERROR") {
      Swal.fire("Error", "Ha habido un error cargando los datos de su perfil. Intente recargar la página o volver a iniciar sesión");
    }

    if (requestCambioContraseña === "ERROR") {
      Swal.fire("Error", errorMessage);
    }
  };
  
  render() {
    const { usuario } = this.props;
    return (
      <Container fluid className="main-content-container px-4">
        {this.feedback()}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Mi perfil"
            subtitle="Mis datos personales"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col sm={4}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Mis datos personales
                </Typography>
                {usuario && (
                  <div>
                    <Typography variant="subtitle2" component="b">
                      Nombres:{' '}
                    </Typography>
                    <Typography variant="body2" component="b">
                      {usuario.nombres}
                    </Typography>
                    <br />
                    <Typography variant="subtitle2" component="b">
                      Apellidos:{' '}
                    </Typography>
                    <Typography variant="body2" component="b">
                      {usuario.apellidos}
                    </Typography>
                    <br />
                    <Typography variant="subtitle2" component="b">
                      Rut:{' '}
                    </Typography>
                    <Typography variant="body2" component="b">
                      {usuario.rut}
                    </Typography>
                    <br />
                    <Typography variant="subtitle2" component="b">
                      Email:{' '}
                    </Typography>
                    <Typography variant="body2" component="b">
                      {usuario.mail}
                    </Typography>
                    <br />
                    <Typography variant="subtitle2" component="b">
                      Teléfono:{' '}
                    </Typography>
                    <Typography variant="body2" component="b">
                      {usuario.telefono}
                    </Typography>
                    <br />
                    <Typography variant="subtitle2" component="b">
                      Tipo cuenta:{' '}
                    </Typography>
                    <Typography variant="body2" component="b">
                      {util.getTipoCuenta(usuario.tipoCuenta)}
                    </Typography>
                  </div>
                )}
              </CardContent>
              {usuario && (
              <CardActions>
                <Link to={`/updateUsuario/${usuario.userId}`}>
                  <Button size="small">Actualizar mis datos</Button>
                </Link>
              </CardActions>
              )}
            </Card>
          </Col>
          <Col sm={4}>
            <Card id="changePasswordCard">
              <CardContent>
                <Typography variant="h5" component="div">
                  Cambiar mi contraseña
                </Typography>
                {usuario && (
                  <Formik
                    initialValues={{
                      oldPassword: "",
                      newPassword: "",
                      confirmNewPassword: "",
                    }}
                    validate={validate}
                    onSubmit={this.onSubmitChangePassword}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue,
                      isSubmitting,
                    }) => (
                      <>
                        <Form onSubmit={handleSubmit} className="form-container">
                          <Row>
                            <Col>
                              <FieldGroup
                                name="oldPassword"
                                label="Contraseña antigua"
                                className="font-size-10 form-control mt-0"
                                labelClass="font-size-10 pb-0"
                                type="password"
                                errorMessageClassName="font-size-10"
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <FieldGroup
                                name="newPassword"
                                label="Contraseña nueva"
                                className="font-size-10 form-control mt-0"
                                labelClass="font-size-10 pb-0"
                                type="password"
                                errorMessageClassName="font-size-10"
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <FieldGroup
                                name="confirmNewPassword"
                                label="Confirmar contraseña nueva"
                                className="font-size-10 form-control mt-0"
                                labelClass="font-size-10 pb-0"
                                type="password"
                              />
                            </Col>
                          </Row>
                          <div className="center text-center">
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                            >
                              Enviar
                            </Button>
                          </div>
                        </Form>
                      </>
                    )}
                  </Formik>
                )}
              </CardContent>
            </Card>
          </Col>
        </Row>
        
      </Container>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.oldPassword) {
    errors.oldPassword = "Por favor ingrese su contraseña";
  }

  if (!formValues.newPassword) {
    errors.newPassword = "Por favor ingrese nueva contraseña";
  } else if (formValues.newPassword.length < 8) {
    errors.newPassword = "La contraseña debe ser de al menos 8 caracteres de largo";
  }

  if (!formValues.confirmNewPassword) {
    errors.confirmNewPassword = "Por favor ingrese su contraseña";
  } else if (formValues.newPassword !== formValues.confirmNewPassword) {
    errors.confirmNewPassword = "Las contraseñas no coinciden";
  }

  return errors;
}

const mapStateToProps = state => {
  return {
    usuario: state.app.usuario,
    requestCambioContraseña: state.app.requestCambioContraseña,
    requestGetUsuario: state.app.requestGetUsuario,
    errorMessage: state.app.errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch: (action) => {
    dispatch(action);
  },
  postCambiarContraseña: (data) => dispatch(postCambiarContraseña(data)),
  getUsuario: () => dispatch(getUsuario()),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPerfil);
