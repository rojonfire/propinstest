/** @format */

import { withFormik } from 'formik';
import * as Yup from 'yup';
import moment from "moment";

export default withFormik({
  displayName: 'WizardForm',
  enableReinitialize: true,
  mapPropsToValues: props => {
    let propiedad = undefined;
    if (props != undefined && props.location != undefined && props.location.state != undefined && props.location.state.propiedad != undefined) {
      propiedad = props.location.state.propiedad;
    }

    const initialValues = {
      txtimageContainerName:
        propiedad && propiedad.imageContainerName
          ? propiedad.imageContainerName
          : '',
      txtIdCliente: propiedad && propiedad.idCliente ? propiedad.idCliente : '',
      txtGlosa: propiedad && propiedad.glosa ? propiedad.glosa : '',
      txtFechaTerm:
        propiedad && propiedad.fechaTermino
          ? new Date(propiedad.fechaTermino)
          : null,
      txtDisponibilidad:
        propiedad && propiedad.disponibilidad
          ? new Date(propiedad.disponibilidad)
          : null,
      txtTipoMoneda: 'UF',
      txtValor: propiedad && propiedad.valor ? propiedad.valor : '',
      txtDormitorios:
        propiedad && propiedad.dormitorios ? propiedad.dormitorios : '',
      txtBanios: propiedad && propiedad.banio ? propiedad.banio : '',
      txtMtroUtiles:
        propiedad && propiedad.superficieUtil ? propiedad.superficieUtil : '',
      txtMtrototales:
        propiedad && propiedad.superficieTotales
          ? propiedad.superficieTotales
          : '',
      txtLat:
        propiedad && propiedad.loc && propiedad.loc.x ? propiedad.loc.x : '',
      txtLng:
        propiedad && propiedad.loc && propiedad.loc.y ? propiedad.loc.y : '',
      txtTipoPropiedad:
        propiedad && propiedad.tipoPropiedad ? propiedad.tipoPropiedad : '',
      txtTipoPropInt:
        propiedad && propiedad.tipoPropiedadInt
          ? propiedad.tipoPropiedadInt
          : '',
      txtOrientacion:
        propiedad && propiedad.orientacion ? propiedad.orientacion : '',
      txtRol: propiedad && propiedad.rol ? propiedad.rol : '',
      txtContribuciones:
        propiedad && propiedad.contribuciones ? propiedad.contribuciones : '',
      txtGastosComunes:
        propiedad && propiedad.gastosComunes ? propiedad.gastosComunes : '',
      txtAnioConstruccion:
        propiedad && propiedad.anioConstruccion
          ? propiedad.anioConstruccion
          : 0,
      txtPisoNumero:
        propiedad && propiedad.pisoNumero ? propiedad.pisoNumero : 0,
      txtCondominio:
        propiedad && propiedad.condominio ? propiedad.condominio : '',
      txtCantEstacionamiento:
        propiedad && propiedad.cantEstacionamiento
          ? propiedad.cantEstacionamiento
          : '',
      txtBodegas: propiedad && propiedad.bodega ? propiedad.bodega : 0,
      txtTieneBodega: propiedad && propiedad.tieneBodega ? propiedad.tieneBodega : false,
      txtRegion: propiedad && propiedad.region ? propiedad.region : '',
      txtComuna: propiedad && propiedad.comuna ? propiedad.comuna : '',
      txtBarrio: propiedad && propiedad.barrio ? propiedad.barrio : '',
      txtVia: propiedad && propiedad.via ? propiedad.via : '',
      txtNombreCalle:
        propiedad && propiedad.nombreCalle ? propiedad.nombreCalle : '',
      txtNumero: propiedad && propiedad.numero ? propiedad.numero : '',
      txtAmoblado: propiedad && propiedad.amoblado ? propiedad.amoblado : false,
      txtCalleOpcion:
        propiedad && propiedad.dormitorios ? propiedad.dormitorios : 'REAL',
      txtAp: propiedad && propiedad.numeroDepartamento ? propiedad.numeroDepartamento : 0,
      txtExclusividad:
        propiedad && propiedad.exclusividad ? propiedad.exclusividad : false,
      txtDestacado:
        propiedad && propiedad.destacar ? propiedad.destacar : false,
      txtCalefaccion:
        propiedad && propiedad.propCar && propiedad.propCar.calefaccion
          ? propiedad.propCar.calefaccion
          : '',
      txtSalaEstar:
        propiedad && propiedad.propCar && propiedad.propCar.salaDeEstar
          ? propiedad.propCar.salaDeEstar
          : false,
      txtAlarma:
        propiedad && propiedad.propCar && propiedad.propCar.alarma
          ? propiedad.propCar.alarma
          : false,
      txtEscritorio:
        propiedad && propiedad.propCar && propiedad.propCar.escritorio
          ? propiedad.propCar.escritorio
          : false,
      txtLogia:
        propiedad && propiedad.propCar && propiedad.propCar.logia
          ? propiedad.propCar.logia
          : false,
      txtPortonElectrico:
        propiedad && propiedad.carCom && propiedad.carCom.portonElec
          ? propiedad.carCom.portonElec
          : false,
      txtCocinaAmoblada:
        propiedad && propiedad.propCar && propiedad.propCar.cocinaAmo
          ? propiedad.propCar.cocinaAmo
          : false,
      txtAccesoControlado:
        propiedad && propiedad.carCom && propiedad.carCom.accesoControlado
          ? propiedad.carCom.accesoControlado
          : false,
      txtEstacionamientoVisitas:
        propiedad && propiedad.carCom && propiedad.carCom.estVisita
          ? propiedad.carCom.estVisita
          : false,
      txtPortonAutomatico:
        propiedad && propiedad.propCar && propiedad.propCar.portonAut
          ? propiedad.propCar.portonAut
          : false,
      txtSalaJuegos:
        propiedad && propiedad.carCom && propiedad.carCom.salonDeJuegos
          ? propiedad.carCom.salonDeJuegos
          : false,
      txtAreasVerdes:
        propiedad && propiedad.carCom && propiedad.carCom.areasVerdes
          ? propiedad.carCom.areasVerdes
          : false,
      txtQuincho:
        propiedad && propiedad.carCom && propiedad.carCom.quincho
          ? propiedad.carCom.quincho
          : false,
      txtSauna:
        propiedad && propiedad.carCom && propiedad.carCom.sauna
          ? propiedad.carCom.sauna
          : false,
      txtCamaraSeguridad:
        propiedad && propiedad.carCom && propiedad.carCom.camaraSeguridad
          ? propiedad.carCom.camaraSeguridad
          : false,
      txtSalaCine:
        propiedad && propiedad.carCom && propiedad.carCom.salaDeCine
          ? propiedad.carCom.salaDeCine
          : false,
      txtCitofono:
        propiedad && propiedad.carCom && propiedad.carCom.citofono
          ? propiedad.carCom.citofono
          : false,
      txtJuegosInfantiles:
        propiedad && propiedad.carCom && propiedad.carCom.juegosInf
          ? propiedad.carCom.juegosInf
          : false,
      txtPiscina:
        propiedad && propiedad.carCom && propiedad.carCom.piscina
          ? propiedad.carCom.piscina
          : false,
      txtSalaEventos:
        propiedad && propiedad.carCom && propiedad.carCom.salaDeEventos
          ? propiedad.carCom.salaDeEventos
          : false,
      txtBicicleteros:
        propiedad && propiedad.carCom && propiedad.carCom.bicicletros
          ? propiedad.carCom.bicicletros
          : false,
      txtImages: propiedad && propiedad.imagenes ? propiedad.imagenes : [],
      txtObsPrivadas:
        propiedad && propiedad.observacionesInternas
          ? propiedad.observacionesInternas
          : '',
      txtObsPublicas:
        propiedad && propiedad.observacionesPublicas
          ? propiedad.observacionesPublicas
          : '',
      referenciaCalle:
        propiedad && propiedad.referenciaCalle ? propiedad.referenciaCalle : '',
      referenciaCalleA:
        propiedad && propiedad.referenciaCalleA
          ? propiedad.referenciaCalleA
          : '',
      referenciaCalleB:
        propiedad && propiedad.referenciaCalleB
          ? propiedad.referenciaCalleB
          : '',
      txtUrlMattePort:
        propiedad && propiedad.urlMattePort ? propiedad.urlMattePort : '',
      txtPlanContratado: propiedad && propiedad.planContratado && propiedad.planContratado.id ? propiedad.planContratado.id : '',
      txtHoraVisitaFotografo: propiedad && propiedad.horaVisitaFotografo ? propiedad.horaVisitaFotografo : '',
      txtFechaVisitaFotografo: propiedad && propiedad.fechaVisitaFotografoString ? moment(propiedad.fechaVisitaFotografo) : '',
      txtIdFotografo: propiedad && propiedad.idFotografo ? propiedad.idFotografo : ''
    };
    return initialValues;
  },
  validationSchema: () =>
    Yup.object().shape({
      txtIdCliente: Yup.string().required('Indique el cliente'),
      txtDisponibilidad: Yup.date()
        .required('Indique la disponibilidad')
        .typeError('ingrese una fecha de disponibilidad valida'),
      txtValor: Yup.number()
        .required('Indique el precio')
        .typeError('Solo se perminten numeros en el precio'),
      txtDormitorios: Yup.number().when('txtTipoPropiedad', (tipo, schema) =>
        tipo === 'Oficina'
          ? schema
              .required('Indique la cantidad de privadas')
              .typeError('Solo se perminten numeros en los privadas')
          : schema
              .required('Indique la cantidad de dormitorios')
              .typeError('Solo se perminten numeros en los dormitorios')
      ),
      txtBanios: Yup.number()
        .required('Indique la cantidad de baños ')
        .typeError('Solo se perminten numeros en los baños'),
      txtMtroUtiles: Yup.number()
        .required('Indique la cantidad de metros utiles')
        .typeError('Solo se perminten numeros en los metros utiles'),
      txtMtrototales: Yup.number()
        .required('Indique la cantidad de metros totales')
        .typeError('Solo se perminten numeros en los metro totales'),
      /*txtUrlMattePort: Yup.string()
        .required("Ingrese la url de la propiedad")
        .url("Link no valido"),*/
      txtGlosa: Yup.string().required('Indique la glosa'),
      txtTipoPropiedad: Yup.string().required('Indique el tipo de propiedad'),
      //txtTipoPropInt: Yup.string().required("Indique el tipo de interior"),
      txtOrientacion: Yup.string().required(
        'Indique la orientacion de la propiedad'
      ),
      //txtRol: Yup.string().required("Indique el rol"),
      txtAp: Yup.string().when('txtTipoPropiedad', {
        is: b => {
          return b === 'Departamento' || b === 'Oficina';
        },
        then: Yup.string().required('Indique el numero de apartamento')
      }),
      // txtContribuciones: Yup.string().when("txtTipoOperacion", {
      //   is: b => {
      //     return b === "Venta";
      //   },
      //   then: Yup.number()
      //     .required("Indique las contribuciones")
      //     .typeError("Solo se perminten numeros en las contribuciones")
      // }),
      txtGastosComunes: Yup.number()
        .required('Indique el monto de los gastos comunes')
        .typeError('Solo se perminten numeros en los gastos comunes'),
      txtAnioConstruccion: Yup.number().typeError(
        'Solo se perminten numeros en el año de construcción'
      ),
      txtPisoNumero: Yup.number().when('txtTipoPropiedad', {
        is: b => {
          return b === 'Departamento' || b === 'Oficina';
        },
        then: Yup.number()
          .required('Indique el numero del piso')
          .typeError('Solo se perminten numeros en el numero de piso')
      }),
      //txtCondominio: Yup.string().required("Indique el condominio"),
      txtCantEstacionamiento: Yup.number()
        .required('Inidique la cantidad de estacionamientos')
        .typeError('Solo se perminten numeros en los estacionamientos'),
      txtBodegas: Yup.number()
        .required('Indique el número de bodegas')
        .typeError('Solo se permiten numeros en el número de bodega'),
      txtComuna: Yup.string().required('Indique la comuna'),
      txtVia: Yup.string().required('Indique la via '),
      txtNombreCalle: Yup.string().required('Indique el nombre de la calle'),
      txtNumero: Yup.number()
        .required('Indique el numero de la calle')
        .typeError('Solo se permiten numeros en el número de la calle'),
      txtAmoblado: Yup.string().required('Indique si esta amoblado'),
      txtCalleOpcion: Yup.string().required('Indique la calle'),

      txtExclusividad: Yup.string().required('Indique si es exclusivo'),
      txtDestacado: Yup.string().required('Indique si esta destacada'),
      txtObsPublicas: Yup.string().required(
        'Indique las observaciones publicas'
      ),
      txtObsPrivadas: Yup.string().required(
        'Indique las observaciones privadas'
      ),
      referenciaCalleA: Yup.string().when('txtCalleOpcion', {
        is: 'INTERSECCION',
        then: Yup.string().required("Debes ingresar la calle de referencia 'A'")
      }),
      referenciaCalleB: Yup.string().when('txtCalleOpcion', {
        is: 'INTERSECCION',
        then: Yup.string().required("Debes ingresar la calle de referencia 'B'")
      }),
      referenciaCalle: Yup.string().when('txtCalleOpcion', {
        is: 'REFERENCIA',
        then: Yup.string().required('Debes ingresar la calle de referencia')
      }),
      txtLat: Yup.string().required('Debe elegir una ubicación en el mapa'),
      txtPlanContratado: Yup.string().required('Debe elegir un plan para la propiedad')
      /*txtImages: Yup.array()
        .of(
          Yup.object().shape({
            name: Yup.string().required("Agregue al menos una imagen"),
            value: Yup.string(),
            portada: Yup.boolean(),
            downloadLink: Yup.string()
          })
        )
        .required("Debes ingresar al menos una imagen")
        .test("hasPortada", "Seleccione al menos una portada", function(value) {
          const { path, createError } = this;

          const portada = value.find(imagen => imagen.esPortada);
          if (!portada) {
            return createError({
              path,
              message: "Seleccione al menos una portada"
            });
          } else {
            return createError({ path, message: "" });
          }
        })*/
    }),
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    if (!values.txtFechaTerm) {
      const hoy = new Date();
      values.txtFechaTerm = new Date(hoy.setMonth(hoy.getMonth() + 6));
    }

    let propiedad = undefined;
    if (props != undefined && props.location != undefined && props.location.state != undefined && props.location.state.propiedad != undefined) {
      propiedad = props.location.state.propiedad;
    }
    let noEditoVisitaFotografo = false;
    if (propiedad && propiedad.id && values.txtHoraVisitaFotografo && props && props.state && props.state.idFotografo == null) {
      noEditoVisitaFotografo = true;
    }
    const data = {
      imageContainerName: values.txtimageContainerName,
      idCliente: values.txtIdCliente,
      fechaTermino: values.txtFechaTerm,
      disponibilidad: values.txtDisponibilidad,
      exclusividad: values.txtExclusividad,
      tipoPrecio: values.txtTipoMoneda,
      valor: values.txtValor,
      dormitorios: values.txtDormitorios,
      banio: values.txtBanios,
      superficieUtil: values.txtMtroUtiles,
      superficieTotales: values.txtMtrototales,
      cantEstacionamiento: values.txtCantEstacionamiento,
      bodega: values.txtBodegas,
      glosa: values.txtGlosa,
      region: values.txtRegion,
      comuna: values.txtComuna,
      barrio: values.txtBarrio,
      via: values.txtVia,
      nombreCalle: values.txtNombreCalle,
      numero: values.txtNumero,
      ap: values.txtAp,
      referenciaCalleA: values.referenciaCalleA,
      referenciaCalleB: values.referenciaCalleB,
      referenciaCalle: values.referenciaCalle,
      observacionesPublicas: values.txtObsPublicas,
      observacionesInternas: values.txtObsPrivadas,
      destacar: values.txtDestacado,
      rol: values.txtRol,
      anioConstruccion: values.txtAnioConstruccion,
      pisoNumero: values.txtPisoNumero,
      tipoPropiedad: values.txtTipoPropiedad,
      tipoPropiedadInt: values.txtTipoPropInt,
      amoblado: values.txtAmoblado,
      orientacion: values.txtOrientacion,
      condominio: values.txtCondominio,
      contribuciones: values.txtContribuciones,
      gastosComunes: values.txtGastosComunes,
      carCom: {
        accesoControlado: values.txtAccesoControlado,
        estVisita: values.txtEstacionamientoVisitas,
        portonElec: values.txtPortonElectrico,
        salonDeJuegos: values.txtSalaJuegos,
        areasVerdes: values.txtAreasVerdes,
        quincho: values.txtQuincho,
        sauna: values.txtSauna,
        camaraSeguridad: values.txtCamaraSeguridad,
        bicicletros: values.txtBicicleteros,
        salaDeCine: values.txtSalaCine,
        citofono: values.txtCitofono,
        juegosInf: values.txtJuegosInfantiles,
        piscina: values.txtPiscina,
        salaDeEventos: values.txtSalaEventos
      },
      propCar: {
        salaDeEstar: values.txtSalaEstar,
        calefaccion: values.txtCalefaccion,
        alarma: values.txtAlarma,
        escritorio: values.txtEscritorio,
        logia: values.txtLogia,
        portonAut: values.txtPortonAutomatico,
        cocinaAmo: values.txtCocinaAmoblada
      },
      loc: {
        x: values.txtLat,
        y: values.txtLng
      },
      imagenes: values.txtImages,
      urlMattePort: values.txtUrlMattePort,
      idPlan: values.txtPlanContratado,
      fechaVisitaFotografoString: noEditoVisitaFotografo ? values.txtFechaVisitaFotografo : values.txtFechaVisitaFotografo != null && values.txtFechaVisitaFotografo != "" ? moment(values.txtFechaVisitaFotografo).format("YYYY-MM-DD") : new Date(),
      horaVisitaFotografo: noEditoVisitaFotografo ? values.txtHoraVisitaFotografo : (props.state && props.state.tramoSeleccionado) ? props.state.tramoSeleccionado : "",
      idFotografo: noEditoVisitaFotografo ? values.idFotografo : (props.state && props.state.idFotografo) ? props.state.idFotografo : null
    };
    const { addPropiedad, updatePropiedad } = props;

    if (propiedad && propiedad.id) {
      data.id = propiedad.id;
      updatePropiedad(data);
    } else {
      addPropiedad(data);
    }
  }
});
