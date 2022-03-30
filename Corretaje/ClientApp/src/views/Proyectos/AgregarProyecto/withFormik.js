/** @format */

import {withFormik} from "formik";
import * as Yup from "yup";

export default withFormik({
    displayName: "WizardForm",
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        const {proyecto} = props;
        let initialValues = {
            txtNumeroPlanos: proyecto && proyecto.modelos ? proyecto.modelos.length : 0,

            txtDelete: proyecto && proyecto.delete ? proyecto.idinmobiliaria : false,
            txtDestacar: proyecto && proyecto.destacar ? proyecto.destacar : false,
            txtMeetingNumber: proyecto && proyecto.meetingNumber ? proyecto.meetingNumber : "",
            txtMeetingPassword: proyecto && proyecto.meetingPassword ? proyecto.meetingPassword : "",
            txtApiKey: proyecto && proyecto.apiKey ? proyecto.apiKey : "",
            txtApiSecret: proyecto && proyecto.apiSecret ? proyecto.apiSecret : "",
            txtUrlProyecto: proyecto && proyecto.urlProyecto ? proyecto.urlProyecto : "",
            txtSuperficieUtilDesde:
                proyecto && proyecto.superficieUtilDesde
                    ? proyecto.superficieUtilDesde
                    : "",
            txtSuperficieTotalesDesde:
                proyecto && proyecto.superficieTotalesDesde
                    ? proyecto.superficieTotalesDesde
                    : "",
            txtValorDesde: proyecto && proyecto.valorDesde ? proyecto.valorDesde : 0,
            txtEntrega: proyecto && proyecto.entrega ? proyecto.entrega : "",
            txtIdRegion: proyecto && proyecto.idRegion ? proyecto.idRegion : "",
            txtNumero: proyecto && proyecto.numero ? proyecto.numero : "",
            txtTipoOperacion: proyecto && proyecto.operacion ? proyecto.operacion : "",

            txtLat: proyecto && proyecto.loc && proyecto.loc.x ? proyecto.loc.x : "",
            txtLng: proyecto && proyecto.loc && proyecto.loc.y ? proyecto.loc.y : "",

            txtImages: proyecto && proyecto.imagenes ? proyecto.imagenes : [],
            txtModelos: proyecto && proyecto.modelos ? proyecto.modelos : [],

            txtAccesoControlado:
                proyecto && proyecto.carCom && proyecto.carCom.accesoControlado
                    ? proyecto.carCom.accesoControlado
                    : false,
            txtEstVisita:
                proyecto && proyecto.carCom && proyecto.carCom.estVisita
                    ? proyecto.carCom.estVisita
                    : false,
            txtPortonElec:
                proyecto && proyecto.proyCar && proyecto.proyCar.portonElec
                    ? proyecto.proyCar.portonElec
                    : false,
            txtSalonDeJuegos:
                proyecto && proyecto.carCom && proyecto.carCom.salonDeJuegos
                    ? proyecto.carCom.salonDeJuegos
                    : false,
            txtAreasVerdes:
                proyecto && proyecto.carCom && proyecto.carCom.areasVerdes
                    ? proyecto.carCom.areasVerdes
                    : false,
            txtQuincho:
                proyecto && proyecto.carCom && proyecto.carCom.quincho
                    ? proyecto.carCom.quincho
                    : false,
            txtSauna:
                proyecto && proyecto.carCom && proyecto.carCom.sauna
                    ? proyecto.carCom.sauna
                    : false,
            txtCamaraSeguridad:
                proyecto && proyecto.carCom && proyecto.carCom.camaraSeguridad
                    ? proyecto.carCom.camaraSeguridad
                    : false,
            txtBicicleteros:
                proyecto && proyecto.carCom && proyecto.carCom.bicicletros
                    ? proyecto.carCom.bicicletros
                    : false,
            txtSalaDeCine:
                proyecto && proyecto.carCom && proyecto.carCom.salaDeCine
                    ? proyecto.carCom.salaDeCine
                    : false,
            txtJuegosInf:
                proyecto && proyecto.carCom && proyecto.carCom.juegosInf
                    ? proyecto.carCom.juegosInf
                    : false,
            txtPiscina:
                proyecto && proyecto.carCom && proyecto.carCom.piscina
                    ? proyecto.carCom.piscina
                    : false,
            txtSalaDeEventos:
                proyecto && proyecto.carCom && proyecto.carCom.salaDeEventos
                    ? proyecto.carCom.salaDeEventos
                    : false,
            txtBodegaEcommerce:
                proyecto && proyecto.carCom && proyecto.carCom.bodegaEcommerce
                    ? proyecto.carCom.bodegaEcommerce
                    : false,
            txtTermopanel:
                proyecto && proyecto.carCom && proyecto.carCom.termopanel
                    ? proyecto.carCom.termopanel
                    : false,

            txtCalefaccion:
                proyecto && proyecto.proyCar && proyecto.proyCar.calefaccion
                    ? proyecto.proyCar.calefaccion
                    : "",
            txtAlarma:
                proyecto && proyecto.proyCar && proyecto.proyCar.alarma
                    ? proyecto.proyCar.alarma
                    : false,
            txtCocinaAmo:
                proyecto && proyecto.proyCar && proyecto.proyCar.cocinaAmo
                    ? proyecto.proyCar.cocinaAmo
                    : false,
            txtTipoPiso:
                proyecto && proyecto.proyCar && proyecto.proyCar.tipoPiso
                    ? proyecto.proyCar.tipoPiso
                    : false,

            txtComuna: proyecto && proyecto.comuna ? proyecto.comuna : "",
            txtNombreCalle:
                proyecto && proyecto.nombreCalle ? proyecto.nombreCalle : "",
            txtDireccionSalaVenta:
                proyecto && proyecto.direccionSalaVenta
                    ? proyecto.direccionSalaVenta
                    : "",
            txtTelefonoSalaVenta:
                proyecto && proyecto.telefonoSalaVenta
                    ? proyecto.telefonoSalaVenta
                    : "",
            txtEmailSalaVenta:
                proyecto && proyecto.emailSalaVenta
                    ? proyecto.emailSalaVenta
                    : "",
            txtObservacionesPublicas:
                proyecto && proyecto.observacionesPublicas
                    ? proyecto.observacionesPublicas
                    : "",
            txtTipoPrecio: "UF",
            txtTipoProyecto:
                proyecto && proyecto.tipoProyecto ? proyecto.tipoProyecto : "",
            txtTipoVia: proyecto && proyecto.tipoVia ? proyecto.tipoVia : "",
            txtEstado: proyecto && proyecto.estado !== undefined ? proyecto.estado : "",
            txtIdInmobiliaria:
                proyecto && proyecto.inmobiliariaId ? proyecto.inmobiliariaId : "",
            txtNombreInmobiliaria:
                proyecto && proyecto.nombreInmobiliaria
                    ? proyecto.nombreInmobiliaria
                    : "",
            txtNombre: proyecto && proyecto.nombre ? proyecto.nombre : "",
            txtRentabilidad:
                proyecto && proyecto.rentabilidad ? proyecto.rentabilidad : false,
            txtConectividad:
                proyecto && proyecto.conectividad ? proyecto.conectividad : false,
            txtTerminaciones:
                proyecto && proyecto.terminaciones ? proyecto.terminaciones : false,
            txtEquipamiento:
                proyecto && proyecto.equipamiento ? proyecto.equipamiento : false,
            txtHabilitarLive:
                proyecto && proyecto.habilitarLive ? proyecto.habilitarLive : false,
            textHtmlbuttonLink:
                proyecto && proyecto.htmlbuttonLink ? proyecto.htmlbuttonLink : "",
            txtUrlMattePort:
                proyecto && proyecto.urlMattePort ? proyecto.urlMattePort : "",

            txtPlanoNombre_0: proyecto && proyecto.modelos && proyecto.modelos[0] &&
            proyecto.modelos[0].nombre ? proyecto.modelos[0].nombre : "",
            txtPlanoSuperficieDesde_0: proyecto && proyecto.modelos && proyecto.modelos[0] &&
            proyecto.modelos[0].superficieDesde ? proyecto.modelos[0].superficieDesde : 0,
            txtPlanoValorDesde_0: proyecto && proyecto.modelos && proyecto.modelos[0] &&
            proyecto.modelos[0].valorDesde ? proyecto.modelos[0].valorDesde : 0,
            txtPlanoBanio_0: proyecto && proyecto.modelos && proyecto.modelos[0] &&
            proyecto.modelos[0].banio ? proyecto.modelos[0].banio : 0,
            txtPlanoDormitorio_0: proyecto && proyecto.modelos && proyecto.modelos[0] &&
            proyecto.modelos[0].dormitorio ? proyecto.modelos[0].dormitorio : 0,
            txtUrlMattePort_0: proyecto && proyecto.modelos && proyecto.modelos[0] &&
            proyecto.modelos[0].urlMattePort ? proyecto.modelos[0].urlMattePort : "",

            txtPlanoNombre_1: proyecto && proyecto.modelos && proyecto.modelos[1] &&
            proyecto.modelos[1].nombre ? proyecto.modelos[1].nombre : "",
            txtPlanoSuperficieDesde_1: proyecto && proyecto.modelos && proyecto.modelos[1] &&
            proyecto.modelos[1].superficieDesde ? proyecto.modelos[1].superficieDesde : 0,
            txtPlanoValorDesde_1: proyecto && proyecto.modelos && proyecto.modelos[1] &&
            proyecto.modelos[1].valorDesde ? proyecto.modelos[1].valorDesde : 0,
            txtPlanoBanio_1: proyecto && proyecto.modelos && proyecto.modelos[1] &&
            proyecto.modelos[1].banio ? proyecto.modelos[1].banio : 0,
            txtPlanoDormitorio_1: proyecto && proyecto.modelos && proyecto.modelos[1] &&
            proyecto.modelos[1].dormitorio ? proyecto.modelos[1].dormitorio : 0,
            txtUrlMattePort_1: proyecto && proyecto.modelos && proyecto.modelos[1] &&
            proyecto.modelos[1].urlMattePort ? proyecto.modelos[1].urlMattePort : "",

            txtPlanoNombre_2: proyecto && proyecto.modelos && proyecto.modelos[2] &&
            proyecto.modelos[2].nombre ? proyecto.modelos[2].nombre : "",
            txtPlanoSuperficieDesde_2: proyecto && proyecto.modelos && proyecto.modelos[2] &&
            proyecto.modelos[2].superficieDesde ? proyecto.modelos[2].superficieDesde : 0,
            txtPlanoValorDesde_2: proyecto && proyecto.modelos && proyecto.modelos[2] &&
            proyecto.modelos[2].valorDesde ? proyecto.modelos[2].valorDesde : 0,
            txtPlanoBanio_2: proyecto && proyecto.modelos && proyecto.modelos[2] &&
            proyecto.modelos[2].banio ? proyecto.modelos[2].banio : 0,
            txtPlanoDormitorio_2: proyecto && proyecto.modelos && proyecto.modelos[2] &&
            proyecto.modelos[2].dormitorio ? proyecto.modelos[2].dormitorio : 0,
            txtUrlMattePort_2: proyecto && proyecto.modelos && proyecto.modelos[2] &&
            proyecto.modelos[2].urlMattePort ? proyecto.modelos[2].urlMattePort : "",

            txtPlanoNombre_3: proyecto && proyecto.modelos && proyecto.modelos[3] &&
            proyecto.modelos[3].nombre ? proyecto.modelos[3].nombre : "",
            txtPlanoSuperficieDesde_3: proyecto && proyecto.modelos && proyecto.modelos[3] &&
            proyecto.modelos[3].superficieDesde ? proyecto.modelos[3].superficieDesde : 0,
            txtPlanoValorDesde_3: proyecto && proyecto.modelos && proyecto.modelos[3] &&
            proyecto.modelos[3].valorDesde ? proyecto.modelos[3].valorDesde : 0,
            txtPlanoBanio_3: proyecto && proyecto.modelos && proyecto.modelos[3] &&
            proyecto.modelos[3].banio ? proyecto.modelos[3].banio : 0,
            txtPlanoDormitorio_3: proyecto && proyecto.modelos && proyecto.modelos[3] &&
            proyecto.modelos[3].dormitorio ? proyecto.modelos[3].dormitorio : 0,
            txtUrlMattePort_3: proyecto && proyecto.modelos && proyecto.modelos[3] &&
            proyecto.modelos[3].urlMattePort ? proyecto.modelos[3].urlMattePort : "",

            txtPlanoNombre_4: proyecto && proyecto.modelos && proyecto.modelos[4] &&
            proyecto.modelos[4].nombre ? proyecto.modelos[4].nombre : "",
            txtPlanoSuperficieDesde_4: proyecto && proyecto.modelos && proyecto.modelos[4] &&
            proyecto.modelos[4].superficieDesde ? proyecto.modelos[4].superficieDesde : 0,
            txtPlanoValorDesde_4: proyecto && proyecto.modelos && proyecto.modelos[4] &&
            proyecto.modelos[4].valorDesde ? proyecto.modelos[4].valorDesde : 0,
            txtPlanoBanio_4: proyecto && proyecto.modelos && proyecto.modelos[4] &&
            proyecto.modelos[4].banio ? proyecto.modelos[4].banio : 0,
            txtPlanoDormitorio_4: proyecto && proyecto.modelos && proyecto.modelos[4] &&
            proyecto.modelos[4].dormitorio ? proyecto.modelos[4].dormitorio : 0,
            txtUrlMattePort_4: proyecto && proyecto.modelos && proyecto.modelos[4] &&
            proyecto.modelos[4].urlMattePort ? proyecto.modelos[4].urlMattePort : "",

            txtPlanoNombre_5: proyecto && proyecto.modelos && proyecto.modelos[5] &&
            proyecto.modelos[5].nombre ? proyecto.modelos[5].nombre : "",
            txtPlanoSuperficieDesde_5: proyecto && proyecto.modelos && proyecto.modelos[5] &&
            proyecto.modelos[5].superficieDesde ? proyecto.modelos[5].superficieDesde : 0,
            txtPlanoValorDesde_5: proyecto && proyecto.modelos && proyecto.modelos[5] &&
            proyecto.modelos[5].valorDesde ? proyecto.modelos[5].valorDesde : 0,
            txtPlanoBanio_5: proyecto && proyecto.modelos && proyecto.modelos[5] &&
            proyecto.modelos[5].banio ? proyecto.modelos[5].banio : 0,
            txtPlanoDormitorio_5: proyecto && proyecto.modelos && proyecto.modelos[5] &&
            proyecto.modelos[5].dormitorio ? proyecto.modelos[5].dormitorio : 0,
            txtUrlMattePort_5: proyecto && proyecto.modelos && proyecto.modelos[5] &&
            proyecto.modelos[5].urlMattePort ? proyecto.modelos[5].urlMattePort : "",

            txtPlanoNombre_6: proyecto && proyecto.modelos && proyecto.modelos[6] &&
            proyecto.modelos[6].nombre ? proyecto.modelos[6].nombre : "",
            txtPlanoSuperficieDesde_6: proyecto && proyecto.modelos && proyecto.modelos[6] &&
            proyecto.modelos[6].superficieDesde ? proyecto.modelos[6].superficieDesde : 0,
            txtPlanoValorDesde_6: proyecto && proyecto.modelos && proyecto.modelos[6] &&
            proyecto.modelos[6].valorDesde ? proyecto.modelos[6].valorDesde : 0,
            txtPlanoBanio_6: proyecto && proyecto.modelos && proyecto.modelos[6] &&
            proyecto.modelos[6].banio ? proyecto.modelos[6].banio : 0,
            txtPlanoDormitorio_6: proyecto && proyecto.modelos && proyecto.modelos[6] &&
            proyecto.modelos[6].dormitorio ? proyecto.modelos[6].dormitorio : 0,
            txtUrlMattePort_6: proyecto && proyecto.modelos && proyecto.modelos[6] &&
            proyecto.modelos[6].urlMattePort ? proyecto.modelos[6].urlMattePort : "",

            txtPlanoNombre_7: proyecto && proyecto.modelos && proyecto.modelos[7] &&
            proyecto.modelos[7].nombre ? proyecto.modelos[7].nombre : "",
            txtPlanoSuperficieDesde_7: proyecto && proyecto.modelos && proyecto.modelos[7] &&
            proyecto.modelos[7].superficieDesde ? proyecto.modelos[7].superficieDesde : 0,
            txtPlanoValorDesde_7: proyecto && proyecto.modelos && proyecto.modelos[7] &&
            proyecto.modelos[7].valorDesde ? proyecto.modelos[7].valorDesde : 0,
            txtPlanoBanio_7: proyecto && proyecto.modelos && proyecto.modelos[7] &&
            proyecto.modelos[7].banio ? proyecto.modelos[7].banio : 0,
            txtPlanoDormitorio_7: proyecto && proyecto.modelos && proyecto.modelos[7] &&
            proyecto.modelos[7].dormitorio ? proyecto.modelos[7].dormitorio : 0,
            txtUrlMattePort_7: proyecto && proyecto.modelos && proyecto.modelos[7] &&
            proyecto.modelos[7].urlMattePort ? proyecto.modelos[7].urlMattePort : "",

            txtPlanoNombre_8: proyecto && proyecto.modelos && proyecto.modelos[8] &&
            proyecto.modelos[8].nombre ? proyecto.modelos[8].nombre : "",
            txtPlanoSuperficieDesde_8: proyecto && proyecto.modelos && proyecto.modelos[8] &&
            proyecto.modelos[8].superficieDesde ? proyecto.modelos[8].superficieDesde : 0,
            txtPlanoValorDesde_8: proyecto && proyecto.modelos && proyecto.modelos[8] &&
            proyecto.modelos[8].valorDesde ? proyecto.modelos[8].valorDesde : 0,
            txtPlanoBanio_8: proyecto && proyecto.modelos && proyecto.modelos[8] &&
            proyecto.modelos[8].banio ? proyecto.modelos[8].banio : 0,
            txtPlanoDormitorio_8: proyecto && proyecto.modelos && proyecto.modelos[8] &&
            proyecto.modelos[8].dormitorio ? proyecto.modelos[8].dormitorio : 0,
            txtUrlMattePort_8: proyecto && proyecto.modelos && proyecto.modelos[8] &&
            proyecto.modelos[8].urlMattePort ? proyecto.modelos[8].urlMattePort : "",

            txtPlanoNombre_9: proyecto && proyecto.modelos && proyecto.modelos[9] &&
            proyecto.modelos[9].nombre ? proyecto.modelos[9].nombre : "",
            txtPlanoSuperficieDesde_9: proyecto && proyecto.modelos && proyecto.modelos[9] &&
            proyecto.modelos[9].superficieDesde ? proyecto.modelos[9].superficieDesde : 0,
            txtPlanoValorDesde_9: proyecto && proyecto.modelos && proyecto.modelos[9] &&
            proyecto.modelos[9].valorDesde ? proyecto.modelos[9].valorDesde : 0,
            txtPlanoBanio_9: proyecto && proyecto.modelos && proyecto.modelos[9] &&
            proyecto.modelos[9].banio ? proyecto.modelos[9].banio : 0,
            txtPlanoDormitorio_9: proyecto && proyecto.modelos && proyecto.modelos[9] &&
            proyecto.modelos[9].dormitorio ? proyecto.modelos[9].dormitorio : 0,
            txtUrlMattePort_9: proyecto && proyecto.modelos && proyecto.modelos[9] &&
            proyecto.modelos[9].urlMattePort ? proyecto.modelos[9].urlMattePort : "",

            txtPlanoNombre_10: proyecto && proyecto.modelos && proyecto.modelos[10] &&
            proyecto.modelos[10].nombre ? proyecto.modelos[10].nombre : "",
            txtPlanoSuperficieDesde_10: proyecto && proyecto.modelos && proyecto.modelos[10] &&
            proyecto.modelos[10].superficieDesde ? proyecto.modelos[10].superficieDesde : 0,
            txtPlanoValorDesde_10: proyecto && proyecto.modelos && proyecto.modelos[10] &&
            proyecto.modelos[10].valorDesde ? proyecto.modelos[10].valorDesde : 0,
            txtPlanoBanio_10: proyecto && proyecto.modelos && proyecto.modelos[10] &&
            proyecto.modelos[10].banio ? proyecto.modelos[10].banio : 0,
            txtPlanoDormitorio_10: proyecto && proyecto.modelos && proyecto.modelos[10] &&
            proyecto.modelos[10].dormitorio ? proyecto.modelos[10].dormitorio : 0,
            txtUrlMattePort_10: proyecto && proyecto.modelos && proyecto.modelos[10] &&
            proyecto.modelos[10].urlMattePort ? proyecto.modelos[10].urlMattePort : "",

            txtPlanoNombre_11: proyecto && proyecto.modelos && proyecto.modelos[11] &&
            proyecto.modelos[11].nombre ? proyecto.modelos[11].nombre : "",
            txtPlanoSuperficieDesde_11: proyecto && proyecto.modelos && proyecto.modelos[11] &&
            proyecto.modelos[11].superficieDesde ? proyecto.modelos[11].superficieDesde : 0,
            txtPlanoValorDesde_11: proyecto && proyecto.modelos && proyecto.modelos[11] &&
            proyecto.modelos[11].valorDesde ? proyecto.modelos[11].valorDesde : 0,
            txtPlanoBanio_11: proyecto && proyecto.modelos && proyecto.modelos[11] &&
            proyecto.modelos[11].banio ? proyecto.modelos[11].banio : 0,
            txtPlanoDormitorio_11: proyecto && proyecto.modelos && proyecto.modelos[11] &&
            proyecto.modelos[11].dormitorio ? proyecto.modelos[11].dormitorio : 0,
            txtUrlMattePort_11: proyecto && proyecto.modelos && proyecto.modelos[11] &&
            proyecto.modelos[11].urlMattePort ? proyecto.modelos[11].urlMattePort : "",

            txtPlanoNombre_12: proyecto && proyecto.modelos && proyecto.modelos[12] &&
            proyecto.modelos[12].nombre ? proyecto.modelos[12].nombre : "",
            txtPlanoSuperficieDesde_12: proyecto && proyecto.modelos && proyecto.modelos[12] &&
            proyecto.modelos[12].superficieDesde ? proyecto.modelos[12].superficieDesde : 0,
            txtPlanoValorDesde_12: proyecto && proyecto.modelos && proyecto.modelos[12] &&
            proyecto.modelos[12].valorDesde ? proyecto.modelos[12].valorDesde : 0,
            txtPlanoBanio_12: proyecto && proyecto.modelos && proyecto.modelos[12] &&
            proyecto.modelos[12].banio ? proyecto.modelos[12].banio : 0,
            txtPlanoDormitorio_12: proyecto && proyecto.modelos && proyecto.modelos[12] &&
            proyecto.modelos[12].dormitorio ? proyecto.modelos[12].dormitorio : 0,
            txtUrlMattePort_12: proyecto && proyecto.modelos && proyecto.modelos[12] &&
            proyecto.modelos[12].urlMattePort ? proyecto.modelos[12].urlMattePort : "",

            txtPlanoNombre_13: proyecto && proyecto.modelos && proyecto.modelos[13] &&
            proyecto.modelos[13].nombre ? proyecto.modelos[13].nombre : "",
            txtPlanoSuperficieDesde_13: proyecto && proyecto.modelos && proyecto.modelos[13] &&
            proyecto.modelos[13].superficieDesde ? proyecto.modelos[13].superficieDesde : 0,
            txtPlanoValorDesde_13: proyecto && proyecto.modelos && proyecto.modelos[13] &&
            proyecto.modelos[13].valorDesde ? proyecto.modelos[13].valorDesde : 0,
            txtPlanoBanio_13: proyecto && proyecto.modelos && proyecto.modelos[13] &&
            proyecto.modelos[13].banio ? proyecto.modelos[13].banio : 0,
            txtPlanoDormitorio_13: proyecto && proyecto.modelos && proyecto.modelos[13] &&
            proyecto.modelos[13].dormitorio ? proyecto.modelos[13].dormitorio : 0,
            txtUrlMattePort_13: proyecto && proyecto.modelos && proyecto.modelos[13] &&
            proyecto.modelos[13].urlMattePort ? proyecto.modelos[13].urlMattePort : "",

            txtPlanoNombre_14: proyecto && proyecto.modelos && proyecto.modelos[14] &&
            proyecto.modelos[14].nombre ? proyecto.modelos[14].nombre : "",
            txtPlanoSuperficieDesde_14: proyecto && proyecto.modelos && proyecto.modelos[14] &&
            proyecto.modelos[14].superficieDesde ? proyecto.modelos[14].superficieDesde : 0,
            txtPlanoValorDesde_14: proyecto && proyecto.modelos && proyecto.modelos[14] &&
            proyecto.modelos[14].valorDesde ? proyecto.modelos[14].valorDesde : 0,
            txtPlanoBanio_14: proyecto && proyecto.modelos && proyecto.modelos[14] &&
            proyecto.modelos[14].banio ? proyecto.modelos[14].banio : 0,
            txtPlanoDormitorio_14: proyecto && proyecto.modelos && proyecto.modelos[14] &&
            proyecto.modelos[14].dormitorio ? proyecto.modelos[14].dormitorio : 0,
            txtUrlMattePort_14: proyecto && proyecto.modelos && proyecto.modelos[14] &&
            proyecto.modelos[14].urlMattePort ? proyecto.modelos[14].urlMattePort : "",
        };
        return initialValues;
    },

    validationSchema: (e) => {
        const shape = {
            // txtMeetingNumber: Yup.number()
            //     .required('Indique el ID de la sala')
            //     .typeError("Solo se permiten números en el ID de la sala"),
            // txtMeetingPassword: Yup.string()
            //     .required("Indique la contraseña de la sala"),
            // txtApiKey: Yup.string()
            //     .required("Indique la Api Key de la sala"),
            // txtApiSecret: Yup.string()
            //     .required("Indique la Api Secret de la sala"),
            // txtUrlProyecto: Yup.string()
            //     .required("Indique el Url del proyecto"),
            txtSuperficieUtilDesde: Yup.number()
                .required("Indique la cantidad de metros útiles")
                .typeError("Solo se perminten numeros en los metros útiles"),
            txtSuperficieTotalesDesde: Yup.number()
                .required("Indique la cantidad de metros totales")
                .typeError("Solo se perminten numeros en los metros totales"),
            txtValorDesde: Yup.number()
                .required('Indique el valor')
                .typeError("Solo se permiten números en el valor"),
            txtIdRegion: Yup.number()
                .required("Indique la región"),
            txtNumero: Yup.number()
                .required("Indique el numero de la calle")
                .typeError("Solo se permiten numeros en el número de la calle"),
            txtLat: Yup.string()
                .required("Debe elegir una ubicación en el mapa"),
            txtImages: Yup.array()
                .of(
                    Yup.object().shape({
                        name: Yup.string().required("Agregue al menos una imagen"),
                        value: Yup.string(),
                        portada: Yup.boolean(),
                        downloadLink: Yup.string()
                    })
                )
                .required("Debes ingresar al menos una imagen"),
            txtCalefaccion: Yup.string()
                .required("Indique el tipo de calefacción"),
            txtTipoPiso: Yup.string()
                .required("Indique el tipo de calefacción"),
            txtComuna: Yup.string()
                .required("Indique la comuna"),
            txtNombreCalle: Yup.string()
                .required("Indique el nombre de la calle"),
            txtTipoProyecto: Yup.string()
                .required("Indique el tipo de proyecto"),
            txtTipoVia: Yup.string()
                .required("Indique el tipo de via"),
            txtEstado: Yup.number()
                .required("Indique el estado"),

            txtIdInmobiliaria: Yup.string()
                .required("Indique la inmobiliaria"),
            txtNombreInmobiliaria: Yup.string()
                .required("Indique la inmobiliaria"),
            txtNombre: Yup.string()
                .required("Indique el nombre del proyecto"),
        };

        var i;
        for (i = 0; i < e.rowsNumberProps.length; i++) {
            shape[`txtPlanoNombre_${i}`] = Yup.string()
                .required(`Indique el nombre del modelo ${i + 1}`);
            shape[`txtPlanoSuperficieDesde_${i}`] = Yup.number()
                .required(`Indique los metros del modelo ${i + 1}`);
            shape[`txtPlanoValorDesde_${i}`] = Yup.number()
                .required(`Indique el precio del modelo ${i + 1}`);
            shape[`txtPlanoBanio_${i}`] = Yup.number()
                .required(`Indique los baños del modelo ${i + 1}`);
            shape[`txtPlanoDormitorio_${i}`] = Yup.number()
                .required(`Indique los dormitorios del modelo ${i + 1}`);
        }
        return Yup.object().shape(shape);
    },

    handleSubmit: (values, {props, setSubmitting, resetForm}) => {
        if (!values.txtFechaTerm) {
            const hoy = new Date();
            values.txtFechaTerm = new Date(hoy.setMonth(hoy.getMonth() + 6));
        }

        const data = {
            Delete: false,
            Destacar: values.txtDestacar,
            SuperficieUtilDesde: values.txtSuperficieUtilDesde,
            Loc: {
                X: values.txtLat,
                Y: values.txtLng,
            },
            SuperficieTotalesDesde: values.txtSuperficieTotalesDesde,
            MeetingNumber: values.txtMeetingNumber,
            MeetingPassword: values.txtMeetingPassword,
            ApiKey: values.txtApiKey,
            ApiSecret: values.txtApiSecret,
            UrlProyecto: values.txtUrlProyecto,
            ValorDesde: values.txtValorDesde,
            Entrega: values.txtEntrega,
            IdRegion: values.txtIdRegion,
            Numero: values.txtNumero,
            Imagenes: values.txtImages,
            Modelos: [],

            CarCom: {
                AccesoControlado: values.txtAccesoControlado,
                EstVisita: values.txtEstVisita,
                PortonElec: values.txtPortonElec,
                SalonDeJuegos: values.txtSalonDeJuegos,
                AreasVerdes: values.txtAreasVerdes,
                Quincho: values.txtQuincho,
                Sauna: values.txtSauna,
                CamaraSeguridad: values.txtCamaraSeguridad,
                Bicicletros: values.txtBicicleteros,
                SalaDeCine: values.txtSalaDeCine,
                JuegosInf: values.txtJuegosInf,
                Piscina: values.txtPiscina,
                SalaDeEventos: values.txtSalaDeEventos,
                BodegaEcommerce: values.txtBodegaEcommerce,
                Termopanel: values.txtTermopanel,
            },
            ProyCar: {
                Calefaccion: values.txtCalefaccion,
                Alarma: values.txtAlarma,
                CocinaAmo: values.txtCocinaAmo,
                TipoPiso: values.txtTipoPiso,
            },

            Comuna: values.txtComuna,
            NombreCalle: values.txtNombreCalle,
            DireccionSalaVenta: values.txtDireccionSalaVenta,
            TelefonoSalaVenta: values.txtTelefonoSalaVenta,
            EmailSalaVenta: values.txtEmailSalaVenta,
            ObservacionesPublicas: values.txtObservacionesPublicas,
            TipoPrecio: "UF",
            TipoProyecto: values.txtTipoProyecto,
            TipoVia: values.txtTipoVia,
            Estado: values.txtEstado,
            InmobiliariaId: values.txtIdInmobiliaria,
            NombreInmobiliaria: values.txtNombreInmobiliaria,
            Nombre: values.txtNombre,
            Operacion: values.txtTipoOperacion,
            Rentabilidad: values.txtRentabilidad,
            Conectividad: values.txtConectividad,
            Terminaciones: values.txtTerminaciones,
            Equipamiento: values.txtEquipamiento,
            HabilitarLive: values.txtHabilitarLive,
            HtmlbuttonLink: values.textHtmlbuttonLink,
            UrlMattePort: values.txtUrlMattePort,
        };
        var i;
        for (i = 0; i < values.txtNumeroPlanos; i++) {
            let model = {
                Nombre: values[`txtPlanoNombre_${i}`],
                SuperficieDesde: values[`txtPlanoSuperficieDesde_${i}`],
                ValorDesde: values[`txtPlanoValorDesde_${i}`],
                Banio: values[`txtPlanoBanio_${i}`],
                Dormitorio: values[`txtPlanoDormitorio_${i}`],
                UrlMattePort: values[`txtUrlMatterPort_${i}`],
                Imagenes: values.txtModelos[i].imagenes
            }
            data.Modelos.push(model)
        }

        const {
            addProyecto,
            proyecto,
            updateProyecto
        } = props;

        if (proyecto && proyecto.id) {
            data.id = proyecto.id;
            console.log("data formik update:", data);
            updateProyecto(data)
        } else {
            console.log("data formik add:", data);
            addProyecto(data);
        }
    },
});
