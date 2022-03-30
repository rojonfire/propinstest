/** @format */

import React from "react";
import {
    FieldGroup,
    SelectFieldGroup,
    CheckFieldGroup,
    //DateFieldGroup
} from "../../../utils/Input";
import {Row, Col, Button} from "shards-react";
import {Link} from "react-router-dom";


export default (props) => {
    const {values, handleShow, itemInmobiliarias} = props;
    let user = JSON.parse(localStorage.getItem("user"));
    let listaInmobiliarias = [{value: "", label: "--Seleccione--"}];

    if (user && user.tipoCuenta === 6 && user.InmobiliariaId && itemInmobiliarias.length > 0 && !itemInmobiliarias[0].label) {
        const inmobiliaria = itemInmobiliarias.find((inmo) => inmo.id === user.InmobiliariaId);
        listaInmobiliarias.push({value: inmobiliaria.id, label: inmobiliaria.nombre});
    } else {
        itemInmobiliarias.map((i) =>
            listaInmobiliarias.push({value: i.id, label: i.nombre})
        );
    }

    if (
        values.txtIdInmobiliaria !== undefined &&
        values.txtIdInmobiliaria !== "" && itemInmobiliarias.length > 0 && !itemInmobiliarias[0].label
    ) {
        // console.log("itemInmobiliarias", itemInmobiliarias)
        values.txtNombreInmobiliaria = itemInmobiliarias.find(
            (inm) => inm.id === values.txtIdInmobiliaria
        ).nombre;
    }


    return (
        <div>
            <Row>
                {user.tipoCuenta !== 6 && (
                    <Col sm={4} md={4}>
                        <Link
                            style={{
                                color: "inherit",
                                textDecoration: "inherit"
                            }}
                            to={`/addinmobiliaria`}
                        >
                            <Button type="button" theme="primary form-control">
                                Agregar Inmobiliaria
                                <i
                                    style={{
                                        fontSize: 15,
                                        color: "#fff"
                                    }}
                                    className="material-icons"
                                >
                                    home
                                </i>
                            </Button>
                        </Link>
                    </Col>
                )}
                <Col sm={2}>
                    <CheckFieldGroup
                        label="Destacar"
                        name="txtDestacar"
                        checked={values.txtDestacar}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <SelectFieldGroup
                        name="txtIdInmobiliaria"
                        label="Inmobiliaria(*)"
                        arrayOps={listaInmobiliarias}
                        value={values.txtIdInmobiliaria}
                    />
                </Col>
                <Col sm={6}>
                    <FieldGroup
                        name="txtNombre"
                        label="Nombre del Proyecto(*)"
                        value={values.txtNombre}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <FieldGroup
                        name="txtEntrega"
                        label="Fecha de Entrega(*)"
                        value={values.txtEntrega}
                    />
                </Col>
                <Col sm={6}>
                    <SelectFieldGroup
                        name="txtTipoPrecio"
                        label="Tipo Moneda(*)"
                        arrayOps={[{value: "UF", label: "UF"}]}
                        value={values.txtTipoPrecio}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <FieldGroup
                        name="txtValorDesde"
                        label="Precio Desde(*)"
                        value={values.txtValorDesde}
                        type="number"
                    />
                </Col>
                <Col sm={6}>
                    <SelectFieldGroup
                        name="txtEstado"
                        label="Estado(*)"
                        arrayOps={[
                            {value: "", label: "--Seleccione--"},
                            {value: 0, label: "En Blanco"},
                            {value: 1, label: "En Verde"},
                            {value: 2, label: "Entrega Inmediata"},
                        ]}
                        value={values.txtEstado}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <FieldGroup
                        name="txtSuperficieUtilDesde"
                        label="Metro Utiles Desde(*)"
                        value={values.txtSuperficieUtilDesde}
                        type="number"
                    />
                </Col>
                <Col sm={6}>
                    <FieldGroup
                        name="txtSuperficieTotalesDesde"
                        label="Metro Totales Desde(*)"
                        value={values.txtSuperficieTotalesDesde}
                        type="number"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <SelectFieldGroup
                        name="txtTipoOperacion"
                        label="Tipo Operación(*)"
                        arrayOps={[
                            {value: "", label: "--Seleccione--"},
                            {value: "Venta", label: "Venta"},
                            {value: "Arriendo", label: "Arriendo"},
                        ]}
                        value={values.txtTipoOperacion}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <h4>Mostrar calificaciones:</h4>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <CheckFieldGroup
                        checked={values.txtRentabilidad}
                        name="txtRentabilidad"
                        label="Mostrar Rentabilidad"
                        value={values.txtRentabilidad}
                    />
                </Col>
                <Col sm={12}>
                    <CheckFieldGroup
                        checked={values.txtConectividad}
                        name="txtConectividad"
                        label="Mostrar Conectividad"
                        value={values.txtConectividad}
                    />
                </Col>
                <Col sm={12}>
                    <CheckFieldGroup
                        checked={values.txtTerminaciones}
                        name="txtTerminaciones"
                        label="Mostrar Terminaciones"
                        value={values.txtTerminaciones}
                    />
                </Col>
                <Col sm={12}>
                    <CheckFieldGroup
                        checked={values.txtEquipamiento}
                        name="txtEquipamiento"
                        label="Mostrar Equipamiento"
                        value={values.txtEquipamiento}
                    />
                </Col>
                <Col sm={12}>
                    <CheckFieldGroup
                        checked={values.txtHabilitarLive}

                        name="txtHabilitarLive"
                        label="Habilitar Live"
                        value={values.txtHabilitarLive}
                    />
                </Col>
            </Row>
            {props.values.txtHabilitarLive === true ?
                <div>
                    <Row>
                        <Col sm={12}>
                            <h4>Configuración:</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <FieldGroup
                                name="txtMeetingNumber"
                                label="Meeting Number (*)"
                                value={values.txtMeetingNumber}
                                type="text"
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldGroup
                                name="txtMeetingPassword"
                                label="Meeting Password (*)"
                                value={values.txtMeetingPassword}
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <FieldGroup
                                name="txtUrlProyecto"
                                label="Url Sitio Web Proyecto (*)"
                                value={values.txtUrlProyecto}
                                type="text"
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <FieldGroup
                                name="txtApiKey"
                                label="Api Key (*)"
                                value={values.txtApiKey}
                                type="text"
                            />
                        </Col>
                        <Col sm={6}>
                            <FieldGroup
                                name="txtApiSecret"
                                label="Api Secret (*)"
                                value={values.txtApiSecret}
                                type="text"
                            />
                        </Col>
                    </Row>
                </div> : null}
        </div>
    );
};
