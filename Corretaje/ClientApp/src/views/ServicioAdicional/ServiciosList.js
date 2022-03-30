/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchListServicioAdicionals,
  fetchDeleteServicioAdicional
} from '../../action';
import { Container, Row } from 'shards-react';
import { Link } from 'react-router-dom';
import icon from '../../utils/images';
import ReactSVG from 'react-svg';
import PageTitle from '../../components/common/PageTitle';
import swal from 'sweetalert2';

class ServiciosList extends Component {
  componentDidMount() {
    const { sertvicioAdiconalList } = this.props;
    sertvicioAdiconalList();
  }

  renderList = () => {
    const { servicioAdicionales, deleteService } = this.props;

    return servicioAdicionales.map(serv => {
      let img = null;

      switch (serv.imagen) {
        case 'anfitrion':
          img = (
            <ReactSVG
              svgStyle={{
                maxWidth: '30px',
                maxHeight: '30px'
              }}
              loading={() => <span>Cargando</span>}
              src={icon.anfitriones}
            />
          );
          break;
        case 'tasacion':
          img = (
            <ReactSVG
              svgStyle={{
                maxWidth: '30px',
                maxHeight: '30px'
              }}
              loading={() => <span>Cargando</span>}
              src={icon.tasacion}
            />
          );
          break;
        case 'planos':
          img = (
            <ReactSVG
              svgStyle={{
                maxWidth: '30px',
                maxHeight: '30px'
              }}
              loading={() => <span>Cargando</span>}
              src={icon.planos}
            />
          );
          break;
        case 'destacados':
          img = (
            <ReactSVG
              svgStyle={{
                maxWidth: '30px',
                maxHeight: '30px'
              }}
              loading={() => <span>Cargando</span>}
              src={icon.destacados}
            />
          );
          break;
        case 'redessoc':
          img = (
            <ReactSVG
              svgStyle={{
                maxWidth: '30px',
                maxHeight: '30px'
              }}
              loading={() => <span>Cargando</span>}
              src={icon.publicidad}
            />
          );
          break;
        default:
          img = <div style={{ color: 'red' }}>No disponible</div>;
      }
      return serv ? (
        <tr key={serv.id}>
          <td>{img}</td>
          <td>{serv.nombre}</td>
          <td>{serv.precio}</td>
          <td>{serv.subtitulo}</td>
          <td>
            <Link
              style={{
                color: 'inherit',
                textDecoration: 'inherit'
              }}
              to={`/servicioAdicional/editar/${serv.id}`}
            >
              <i
                style={{
                  fontSize: 30,
                  color: '#007bff'
                }}
                className="material-icons"
              >
                edit
              </i>
            </Link>
          </td>
          <td>
            <i
              style={{
                fontSize: 30,
                color: '#f14',
                cursor: 'pointer'
              }}
              className="material-icons"
              onClick={() => {
                deleteService(serv.id);
              }}
            >
              delete
            </i>
          </td>
        </tr>
      ) : null;
    });
  };

  userFeedBack = () => {
    const { requestDeleteServicioAdicional, history, errorMessage } = this.props;

    if (requestDeleteServicioAdicional == "LOADING") swal.showLoading();

    if (requestDeleteServicioAdicional == "SUCCESS") {
      swal.fire({
        icon: 'success',
        title: 'Bien...',
        text: 'Servicio eliminado!',
        onAfterClose: () => {
          history.push("/tables")
        }
      });
    }

    if (requestDeleteServicioAdicional == 'ERROR') {
      swal.fire({
        icon: 'error',
        title: 'Error...',
        text: errorMessage
      });
    }
  };

  render() {
    const { servicioAdicionales } = this.props;

    if (servicioAdicionales.length < 1) {
      return <div>No hay servicio disponibles</div>;
    }
    return (
      <Container fluid className="main-content-container px-4">
        { this.userFeedBack() }
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Lista de servicios"
            subtitle="Servicios"
            className="text-sm-left"
          />
        </Row>

        <table className="table mb-0">
          <thead className="bg-light">
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Subtitulo</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>{this.renderList()}</tbody>
        </table>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { 
    servicioAdicionales: state.app.servicioAdicionales, 
    requestDeleteServicioAdicional: state.app.requestDeleteServicioAdicional,
    errorMessage: state.app.errorMessage
  };
};

const mapDispatchToprops = dispatch => {
  return {
    sertvicioAdiconalList: () => dispatch(fetchListServicioAdicionals()),
    deleteService: id => dispatch(fetchDeleteServicioAdicional(id))
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(ServiciosList);
