import React from "react";
import PageTitle from "../../../components/common/PageTitle";
import { postAddSuscripcion, updateSuscripcion } from "../../../action";
import { connect } from "react-redux";
import { Container, Row } from "shards-react";
import Swal from 'sweetalert2'
import FormularioSuscripcion from './FormularioSuscripcion';

class AgregarEditarSuscripcion extends React.Component {
  constructor(...args) {
    super(...args);
  }

  onSubmit = (values) => {
    const { match } = this.props;
    let val = 0;

    val = values.Comuna1 !== "" ? val + 3 : val;
    val = values.Comuna2 !== "" ? val + 2 : val;
    val = values.Comuna3 !== "" ? val + 1 : val;
    val = values.Dormitorio_Desde !== "" ? val + 1 : val;
    val = values.Dormitorio_Hasta !== "" ? val + 1 : val;
    val = values.Bano_Desde !== "" ? val + 1 : val;
    val = values.Bano_Hasta !== "" ? val + 1 : val;
    val = values.Estacionamiento !== "" ? val + 1 : val;
    val = values.Valor_Desde !== "" ? val + 1 : val;
    val = values.Valor_Hasta !== "" ? val + 1 : val;
    val = values.M2Totales_Desde !== "" ? val + 1 : val;
    val = values.M2Totales_Hasta !== "" ? val + 1 : val;
    val = values.M2Utiles_Desde !== "" ? val + 1 : val;
    val = values.M2Utiles_Hasta !== "" ? val + 1 : val;
    
    const data = {
      nombreUsuario: values.Nombre,
      emailUsuario: values.Correo,
      telefono: values.Celular,
      idUsuario: null,
      idCliente: null,
      comunaUno: values.Comuna1,
      comunaDos: values.Comuna2,
      comunaTres: values.Comuna3,
      tipoPropiedad: values.TipoPropiedad,
      cantidadDormitoriosDesde: values.Dormitorio_Desde ? values.Dormitorio_Desde : 0,
      cantidadDormitoriosHasta: values.Dormitorio_Hasta ? values.Dormitorio_Hasta : 0,
      cantidadBanosDesde: values.Bano_Desde ? values.Bano_Desde : 0,
      cantidadBanosHasta: values.Bano_Hasta ? values.Bano_Hasta : 0,
      cantidadEstacionamientos: values.Estacionamiento ? values.Estacionamiento : 0,
      valorDesde: values.Valor_Desde ? values.Valor_Desde : 0,
      valorHasta: values.Valor_Hasta ? values.Valor_Hasta : 0,
      metrosTotalesDesde: values.M2Totales_Desde ? values.M2Totales_Desde : 0,
      metrosTotalesHasta: values.M2Totales_Hasta ? values.M2Totales_Hasta : 0,
      metrosUtilesDesde: values.M2Utiles_Desde ? values.M2Utiles_Desde : 0 ,
      metrosUtilesHasta: values.M2Utiles_Hasta ? values.M2Utiles_Hasta : 0,
      esVenta: values.tipo == "venta" ? true : false,
      puntaje: val
    }

    const { postAddSuscripcion, updateSuscripcion } = this.props;

    if (match && match.params && match.params.id) {
      updateSuscripcion(match.params.id, data);
    } else {
      postAddSuscripcion(data);
    }

  };

  feedback = () => {
    const { requestUpdateSuscripcion, requestPostAddSuscripcion, history } = this.props;
    if (requestUpdateSuscripcion === "LOADING" || requestPostAddSuscripcion === "LOADING") {
      Swal.showLoading();
    }
    if (requestUpdateSuscripcion === "SUCCESS") {
      Swal.fire({
        title: "Suscripción editada",
        text: "Se ha editado la suscripción exitosamente",
        type: "success",
        onAfterClose: () => {
          history.push("/suscripcion");
        }
      });
    }
    if (requestPostAddSuscripcion === "SUCCESS") {
      Swal.fire({
        title: "Suscripción",
        text: "Se ha añadido la suscripción exitosamente",
        type: "success",
        onAfterClose: () => {
          history.push("/suscripcion");
        }
      });
    }

    if (requestPostAddSuscripcion === "ERROR") {
      Swal.fire("Error", "No se ha podido añadir la suscripción", "error");
    }

    if (requestUpdateSuscripcion === "ERROR") {
      Swal.fire("Error", "No se ha podido editar la suscripción", "error");
    }
  };

  render() {
    const { suscripcion } = this.props;
    
    return (
      <Container fluid className="main-content-container px-4">
        { this.feedback() }
        <Row noGutters className="page-header">
          <PageTitle
            sm="4"
            title="Suscripción"
            subtitle="Suscripción"
            className="text-sm-left"
          />
        </Row>
        <FormularioSuscripcion values={suscripcion} onSubmit={this.onSubmit} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    requestPostAddSuscripcion: state.app.requestPostAddSuscripcion,
    suscripcion: state.app.suscripcion,
    requestUpdateSuscripcion: state.app.requestUpdateSuscripcion
  };
};

const mapDispatchToProps = (dispatch) => ({
  postAddSuscripcion: (data) => dispatch(postAddSuscripcion(data)),
  updateSuscripcion: (id, suscripcion) => dispatch(updateSuscripcion(id, suscripcion)),
  dispatch: (action) => {
    dispatch(action);
  },
});

AgregarEditarSuscripcion = connect(
  mapStateToProps,
  mapDispatchToProps
)(AgregarEditarSuscripcion);

export default AgregarEditarSuscripcion;
