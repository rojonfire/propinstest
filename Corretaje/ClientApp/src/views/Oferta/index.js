import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGetOfertasByPublicacion } from "../../action";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
// [
// 	{
// 		montoDeOferta: 20300,
// 		montoDePublicacion: 20000,
// 		estado: 0,
// 		evaluacion: 0,
// 		mensajes: [
// 			{ fechaEmision: '2019-04-04T22:39:34.119Z', emitidoPorUsuarioId: 'farellano@cleverit.cl', texto: '' }
// 		],
// 		descripcion: 'Venta',
// 		id: '5ca687a67f935a5b08e41687',
// 		ofertadorId: '5c9e1f4eaa02b21f58d6d863',
// 		propietarioId: '5ca2175358fdcb98c45d5945',
// 		publicacionId: '5ca225c458fdcb98c45d5949'
// 	},
// 	{
// 		montoDeOferta: 20300,
// 		montoDePublicacion: 20000,
// 		estado: 0,
// 		evaluacion: 0,
// 		mensajes: [
// 			{ fechaEmision: '2019-04-04T22:39:34.119Z', emitidoPorUsuarioId: 'lbenavides@cleverit.cl', texto: '' }
// 		],
// 		descripcion: 'Venta',
// 		id: '5ca687a67f935a5b08e41688',
// 		ofertadorId: '5c9e1f4eaa02b21f58d6d863',
// 		propietarioId: '5ca2175358fdcb98c45d5946',
// 		publicacionId: '5ca225c458fdcb98c45d5949'
// 	}
// ];
export class listOfertas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ofertas: [
        {
          montoDeOferta: 20300,
          montoDePublicacion: 20000,
          estado: 0,
          evaluacion: 0,
          mensajes: [
            {
              fechaEmision: "2019-04-04T22:39:34.119Z",
              emitidoPorUsuarioId: "farellano@cleverit.cl",
              texto: ""
            }
          ],
          descripcion: "Venta",
          id: "5ca687a67f935a5b08e41687",
          ofertadorId: "5c9e1f4eaa02b21f58d6d863",
          propietarioId: "5ca2175358fdcb98c45d5945",
          publicacionId: "5ca225c458fdcb98c45d5949"
        },
        {
          montoDeOferta: 20300,
          montoDePublicacion: 20000,
          estado: 0,
          evaluacion: 0,
          mensajes: [
            {
              fechaEmision: "2019-04-04T22:39:34.119Z",
              emitidoPorUsuarioId: "lbenavides@cleverit.cl",
              texto: ""
            }
          ],
          descripcion: "Venta",
          id: "5ca687a67f935a5b08e41688",
          ofertadorId: "5c9e1f4eaa02b21f58d6d863",
          propietarioId: "5ca2175358fdcb98c45d5946",
          publicacionId: "5ca225c458fdcb98c45d5949"
        }
      ]
    };
  }

  componentDidMount = () => {
    const { getOfertas, match } = this.props;

    getOfertas(match.params.id);
  };

  showUsuario = (cell, row) => {
    return cell[0].emitidoPorUsuarioId;
  };

  opcionesOfertas = (cell, row, enumObject, rowIndex) => {
    //! esta función ya no se usará

    return (
      <div>
        {/*
				//?revisar porque no funciona con un select
				 */}
        {/* <SelectFieldGroup
					name="txtTipoOperacion"
					label="Tipo Operación"
					arrayOps={[
						{ value: '', label: '--Seleccione--' },
						{ value: 'Aceptar', label: 'Aceptar' },
						{ value: 'Declinar', label: 'Declinar' },
						{ value: 'Rechazar', label: 'Rechazar' },
						{ value: 'Eliminar', label: 'Eliminar' }
					]}
				/> */}
        <ToggleButtonGroup variant={"success"} type="radio" name="radiogroup">
          <ToggleButton value={"Aceptar"}>Aceptar</ToggleButton>
          <ToggleButton value={"Declinar"}>Declinar</ToggleButton>
          <ToggleButton value={"Rechazar"}>Rechazar</ToggleButton>
          <ToggleButton value={"Eliminar"}>Eliminar</ToggleButton>
          {/* <ToggleButton value={3}>3</ToggleButton> */}
        </ToggleButtonGroup>
        {/* <button>Hola</button> */}
      </div>
    );
  };

  render() {
    const { ofertas } = this.props;

    if (!ofertas || ofertas.length === 0) {
      return <div>Aun no hay ofertas disponibles </div>;
    }

    return (
      <BootstrapTable data={ofertas}>
        <TableHeaderColumn hidden={true} isKey dataField="id">
          Id
        </TableHeaderColumn>
        <TableHeaderColumn dataField="montoDeOferta">
          Monto De la Oferta
        </TableHeaderColumn>
        <TableHeaderColumn dataField="montoDePublicacion">
          Monto de la Publicacion
        </TableHeaderColumn>
        <TableHeaderColumn dataField="descripcion">
          Descripcion
        </TableHeaderColumn>
        <TableHeaderColumn dataField="evaluacion">evaluacion</TableHeaderColumn>
        <TableHeaderColumn dataField="mensajes" dataFormat={this.showUsuario}>
          Usuario
        </TableHeaderColumn>
        {/* <TableHeaderColumn dataField="button" width="30%" dataFormat={this.opcionesOfertas.bind(this)} /> //! ya no es necesario */}
      </BootstrapTable>
    );
  }
}

const mapStateToProps = state => {
  return { ofertas: state.app.itemOfertas };
};

const mapDispatchToProps = dispatch => ({
  getOfertas: id => dispatch(fetchGetOfertasByPublicacion(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(listOfertas);
