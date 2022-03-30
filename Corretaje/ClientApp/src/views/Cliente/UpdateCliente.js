/** @format */

import React from 'react';
import { FormClienteAdd } from './FormClienteAdd';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Container
} from 'shards-react';

import Dialog from 'react-bootstrap-dialog';

import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import {
  fecthUpdateCliente,
  fetchClearAction,
  fetchGetAllClientes,
  initializeMensaje
} from '../../action';
import { validateValues } from './formValidation';
import PageTitle from '../../components/common/PageTitle';

import swal from 'sweetalert2';

class AddCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      cliente: {}
    };
  }

  componentDidMount() {
    const { match, getClientes, itemsClientes, initMensaje } = this.props;
    getClientes();
    initMensaje();
    if (match.params && match.params.id) {
      let initCliente = itemsClientes.find(cl => cl.id === match.params.id);

      this.setState({ cliente: initCliente });
    }
  }

  userFeedBack = () => {
    const { mensaje, loading } = this.props;

    if (loading) swal.showLoading();

    if (loading &&  typeof mensaje === 'string') {
      mensaje === 'Cliente actualizado'
        ? swal.fire({
            type: 'success',
            title: 'Bien...',
            text: mensaje
          })
        : swal.fire({
            type: 'info',
            title: 'Atención',
            text: 'Ocurrio un error'
          });
    }

    return null;
  };

  render() {
    const { cliente } = this.state;

    if (!cliente) {
      return <div>Error con el cliente seleccionado</div>;
    }

    return (
      <Container fluid className="main-content-container px-4">
        <PageTitle sm="12" title="" subtitle="" show={false} />
        {this.userFeedBack()}
        <Formik
          enableReinitialize="true"
          initialValues={cliente}
          validate={validateValues}
          onSubmit={(values, { resetForm }) => {
            const { updateCliente } = this.props;

            values.value = '';
            values.version = !values.version ? 0 : values.version;

            updateCliente(values);
          }}
        >
          {({ values, submitForm }) => {
            return (
              <Form className="form-container">
                <Card>
                  <CardHeader className="border-bottom">
                    <h6 className="m-0">Actualizar datos de cliente</h6>
                  </CardHeader>
                  <CardBody>
                    <FormClienteAdd values={values} />
                  </CardBody>
                  <CardFooter>
                    <Button
                      onClick={() => submitForm()}
                      className="btn-primary"
                    >
                      Guardar
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
            );
          }}
        </Formik>
        <Dialog
          ref={el => {
            this.dialog = el;
          }}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const {
    app: { mensaje, itemsClientes, loading }
  } = state;
  return { mensaje, itemsClientes, loading };
};

const mapDispatchToProps = dispatch => ({
  updateCliente: cliente => dispatch(fecthUpdateCliente(cliente)),
  getClientes: () => dispatch(fetchGetAllClientes()),
  getClearAction: () => dispatch(fetchClearAction()),
  initMensaje: () => dispatch(initializeMensaje())
});

AddCliente = connect(mapStateToProps, mapDispatchToProps)(AddCliente);

export default AddCliente;
