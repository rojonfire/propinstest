/** @format */

import {
  RECEIVE_SUBIR_PROPIEDAD,
  ADD_CLIENTE,
  ADD_USUARIO,
  POST_ADD_INMOBILIARIA,
  GET_ALL_CLIENTES,
  BEGIN_ALL_CLIENTES,
  GET_USER_BY_ROL,
  ADD_HORARIO_EMP,
  GET_ALL_PROPIEDADES,
  GET_ALL_VISITAS,
  GET_ALL_REGIONES,
  POST_LOGIN_USUARIO,
  GET_HORARIO_BY_USER,
  CLEAR_ACTION,
  POST_UPDATE_PROPIEDAD,
  POST_INSERT_INMOBILIARIA,
  GET_ALL_INMOBILIARIAS,
  REQUEST_GET_ALL_INMOBILIARIAS,
  GET_ALL_USUARIOS,
  USUARIO_LOGOUT,
  PUT_UPDATE_INMOBILIARIA,
  RESET_INITIAL_VALUES,
  PUT_UPDATE_CLIENTE,
  GET_TIPOS_CONTRATOS,
  POST_INSERT_TIPO_CONTRATO,
  GET_ALL_SERVICIOS_BASE,
  ADD_PLAN,
  INITIAL_MENSAJE,
  ADD_SERVICIO_BASE,
  GET_ALL_PLANES,
  REQUEST_GET_ALL_PLANES,
  GET_PLAN_BY_ID,
  GET_OFERTAS_BY_PUBLICACION,
  ADD_PROPIEDADES_IMAGES,
  RESET_PROPIEDADES_IMAGES,
  ADD_VALORACION,
  SET_LOADING,
  UPDATE_PLAN,
  DELETE_PLAN,
  ADD_SERVICIO_ADICIONAL,
  LIST_SERVICIOS_ADICIONALES,
  DELETE_SERVICIO_ADICIONAL,
  UPDATE_SERVICIO_ADICIONAL,
  GET_ALL_AGENDAS,
  UPDATE_AGENDAS,
  DELETE_PROPIEDAD,
  SIGNATURE,
  GET_ALL_PROYECTOS,
  POST_PROYECTO_RES,
  PUT_PROYECTO_RES,
  CHANGE_ROWS,
  REQUEST_UPDATE_ESTADO_PROPIEDAD,
  SET_RESPONSE_MSG,
  SET_PROPIEDADES_PAGINADAS,
  REQUEST_GET_PROPIEDADES_PAGINADAS,
  SET_PROPIEDAD,
  REQUEST_GET_PROPIEDAD,
  SET_TARJETA_PROP,
  REQUEST_POST_TARJETA_PROP,
  REQUEST_POST_UPLOAD_DATOS_TASACION,
  REQUEST_DELETE_ALL_DATOS_TASACION,
  REQUEST_POST_UPLOAD_PI_PROPIEDADES,
  REQUEST_POST_ADD_SUSCRIPCION,
  GET_SUSCRIPCION_EXPORT,
  REQUEST_GET_SUSCRIPCION_EXPORT,
  SET_SUSCRIPCION_LAST_UPDATED,
  REQUEST_SUSCRIPCION_LAST_UPDATED,
  REQUEST_ADD_USUARIO,
  REQUEST_UPDATE_USUARIO,
  SET_VISITA_FOTOGRAFO,
  SET_REQUEST_LOADING_VISITA_FOTOGRAFO,
  SET_AGENDA_FOTOGRAFO,
  SET_REQUEST_LOADING_AGENDA_FOTOGRAFO,
  SET_USUARIOS_FILTRADOS,
  SET_REQUEST_USUARIOS_FILTRADOS,
  SET_ASIGNAR_BROKER,
  SET_REQUEST_ASIGNAR_BROKER,
  SET_SUSCRIPCIONES,
  SET_REQUEST_SUSCRIPCIONES,
  SET_SUSCRIPCION,
  SET_REQUEST_SUSCRIPCION,
  SET_UPDATE_SUSCRIPCION,
  SET_REQUEST_UPDATE_SUSCRIPCION,
  SET_AGENDA_CLIENTE,
  SET_REQUEST_AGENDA_CLIENTE,
  SET_VISITAS_BY_FECHA_AND_ID,
  SET_REQUEST_VISITAS_BY_FECHA_AND_ID,
  SET_REQUEST_AGENDAR_VISITA_BROKER_SUSCRIPTOR,
  SET_VISITAS_BROKER_SUSCRIPTOR,
  SET_REQUEST_VISITAS_BROKER_SUSCRIPTOR,
  SET_EMBAJADOR,
  SET_REQUEST_REFERIR_EMBAJADOR,
  SET_BROKER,
  SET_REQUEST_POST_BROKER,
  SET_REQUEST_GET_BROKER,
  SET_REQUEST_PUT_BROKER,
  SET_REQUEST_CAMBIO_CONTRASEÑA,
  SET_USUARIO,
  SET_REQUEST_GET_USUARIO,
  SET_ERROR_MESSAGE,
  SET_REQUEST_CONFIRMAR_VISITA,
  SET_REFERIR_VENDEDOR,
  SET_REQUEST_REFERIR_VENDEDOR,
  SET_VENDEDORES,
  SET_REQUEST_GET_VENDEDORES,
  SET_REQUEST_USUARIO_CAMBIAR_CONTACTADO,
  SET_BROKERS,
  SET_REQUEST_GET_ALL_BROKERS,
  SET_REQUEST_UPDATE_AGENDA_CLIENTE,
  SET_REQUEST_AGENDAR_VISITA,
  SET_REQUEST_UPDATE_PLAN,
  SET_REQUEST_ADD_PLAN,
  SET_REQUEST_DELETE_PLAN,
  SET_REQUEST_ADD_SERVICIO_ADICIONAL,
  SET_REQUEST_UPDATE_SERVICIO_ADICIONAL,
  SET_REQUEST_DELETE_SERVICIO_ADICIONAL,
  SET_REQUEST_ADD_SERVICIO_BASE,
  SET_USUARIOS_PAGINADOS,
  SET_REQUEST_GET_USUARIOS_PAGINADOS,
  SET_LANDING_INMOBILIARIA,
  SET_REQUEST_GET_LANDING_INMOBILIARIA,
  SET_REQUEST_POST_LANDING_INMOBILIARIA,
  SET_LANDING_INMOBILIARIAS,
  SET_REQUEST_GET_ALL_LANDING_INMOBILIARIAS,
  SET_REQUEST_UPDATE_LANDING_INMOBILIARIA
} from "../action";

const initialStateValues = {
  loading: false,
  respuesta: [],
  mensaje: "",
  itemsClientes: [],
  itemsUsuarios: [],
  itemPropiedades: [],
  itemVisitas: [],
  itemRegiones: [],
  itemUsuario: [],
  horario: [],
  itemInmobiliarias: [],
  requestGetAllInmobiliarias: "IDLE",
  itemProyectos: [],
  tiposContrato: [],
  itemServicios: [],
  itemPlanes: [],
  requestGetPlanes: "IDLE",
  itemOfertas: [],
  imagenesPropiedad: [],
  valoracion: {},
  servicioAdicionales: [],
  agendas: [],
  agendaFotografo: [],
  rowsNumberProps: [0],
  requestUpdateEstadoPropiedad: "IDLE",
  responseMessage: null,
  propiedadesPaginadas: null,
  requestPropiedadesPaginadas: "IDLE",
  propiedad: null,
  requestGetPropiedad: "IDLE",
  tarjetaProp: null,
  requestPostTarjetaProp: "IDLE",
  requestPostUploadDatosTasacion: "IDLE",
  requestDeleteAllDatosTasacion: "IDLE",
  requestPostUploadPIPropiedades: "IDLE",
  requestPostAddSuscripcion: "IDLE",
  suscripcionExcel: null,
  requestSuscripcionExcel: "IDLE",
  suscripcionLastUpdated: null,
  requestSuscripcionLastUpdated: "IDLE",
  requestAddUsuario: "IDLE",
  requestUpdateUsuario: "IDLE",
  requestLoadingVisitaFotografo: false,
  visitaFotografo: null,
  agendaFotografo: null,
  requestLoadingAgendaFotografo: false,
  usuariosFiltrados: null,
  requestUsuarioFiltrados: "IDLE",
  propiedadBroker: null,
  requestPropiedadBroker: "IDLE",
  suscripciones: null,
  requestSuscripciones: "IDLE",
  suscripcion: null,
  requestSuscripcion: "IDLE",
  updateSuscripcion: null,
  requestUpdateSuscripcion: "IDLE",
  agendaCliente: null,
  requestAgendaCliente: "IDLE",
  visitasCliente: null,
  requestVisitasCliente: "IDLE",
  requestAgendarVisitaBroker: "IDLE",
  visitasBrokerSuscriptor: null,
  requestVisitasBrokerSuscriptor: "IDLE",
  embajador: null,
  requestReferirEmbajador: "IDLE",
  broker: null,
  requestPostBroker: "IDLE",
  requestGetBroker: "IDLE",
  requestPutBroker: "IDLE",
  requestCambioContraseña: "IDLE",
  usuario: null,
  requestGetUsuario: "IDLE",
  errorMessage: "",
  requestConfirmarVisita: "IDLE",
  vendedor: null,
  requestReferirVendedor: "IDLE",
  vendedores: null,
  requestGetVendedores: "IDLE",
  requestCambiarContactado: "IDLE",
  brokers: null,
  requestGetAllBrokers: "IDLE",
  requestUpdateAgendaCliente: "IDLE",
  requestAgendarVisita: "IDLE",
  requestUpdatePlan: "IDLE",
  requestAddPlan: "IDLE",
  requestDeletePlan: "IDLE",
  requestAddServicioAdicional: "IDLE",
  requestUpdateServicioAdicional: "IDLE",
  requestDeleteServicioAdicional: "IDLE",
  requestAddServicioBase: "IDLE",
  usuariosPaginados: null,
  requestGetUsuariosPaginados: "IDLE",
  landingInmobiliaria: null,
  requestGetLandingInmobiliaria: "IDLE",
  requestPostLandingInmobiliaria: "IDLE",
  landingInmobiliarias: null,
  requestGetAllLandingInmobiliarias: "IDLE",
  requestUpdateLandingInmobiliaria: "IDLE",
};

const initialState = { ...initialStateValues };

const actionsMap = {
  [SET_LOADING]: (state, action) => {
    const { loading } = action;
    return {
      ...state,
      loading,
    };
  },
  [POST_INSERT_TIPO_CONTRATO]: (state, action) => {
    const { mensaje } = action;
    state = state || initialState;
    return {
      ...state,
      mensaje,
    };
  },
  [GET_TIPOS_CONTRATOS]: (state, action) => {
    const { tiposContrato } = action;
    state = state || initialState;
    return {
      ...state,
      tiposContrato,
    };
  },
  [PUT_UPDATE_CLIENTE]: (state, action) => {
    const { mensaje } = action.payload;
    state = state || initialState;
    return {
      ...state,
      mensaje,
    };
  },

  [PUT_UPDATE_INMOBILIARIA]: (state, action) => {
    const { mensaje } = action;
    state = state || initialState;
    return {
      ...state,
      mensaje,
    };
  },

  [RESET_INITIAL_VALUES]: (state, action) => {
    state = state || initialState;
    state = undefined;
    return {
      ...state,
      action,
    };
  },
  [USUARIO_LOGOUT]: (state, action) => {
    const { itemUsuario } = action;
    state = state || initialState;
    return {
      ...state,
      itemUsuario,
    };
  },
  [CLEAR_ACTION]: (state, action) => {
    const { mensaje } = action;
    state = state || initialState;
    return {
      ...state,
      mensaje,
    };
  },
  [CHANGE_ROWS]: (state, action) => {
    const { rowsNumberProps } = action;
    state = state || [0];
    return {
      ...state,
      rowsNumberProps,
    };
  },
  [RECEIVE_SUBIR_PROPIEDAD]: (state, action) => {
    const { mensaje } = action;
    state = state || initialState;
    return {
      ...state,
      mensaje,
      isLoading: false,
    };
  },

  [ADD_CLIENTE]: (state, action) => {
    const { mensaje } = action;
    state = state || initialState;
    return {
      ...state,
      mensaje,
      isLoading: false,
    };
  },

  [POST_ADD_INMOBILIARIA]: (state, action) => {
    const { mensaje } = action;
    state = state || initialState;
    return {
      ...state,
      mensaje,
      isLoading: false,
    };
  },
  
  [ADD_USUARIO]: (state, action) => {
    const {
      payload: { mensaje },
    } = action;
    state = state || initialState;
    return {
      ...state,
      mensaje,
      isLoading: false,
    };
  },

  [BEGIN_ALL_CLIENTES]: (state, action) => {
    state = state || initialState;
    return {
      ...state,
      loading: true,
      error: null,
    };
  },

  [GET_ALL_CLIENTES]: (state, action) => {
    const { itemsClientes } = action;

    state = state || initialState;
    return {
      ...state,
      itemsClientes,
      isLoading: false,
    };
  },

  [GET_USER_BY_ROL]: (state, action) => {
    const { itemsUsuarios } = action;

    state = state || initialState;
    return {
      ...state,
      itemsUsuarios,
      isLoading: false,
    };
  },

  [ADD_HORARIO_EMP]: (state, action) => {
    const { mensaje } = action;
    state = state || initialState;
    return {
      ...state,
      mensaje,
      isLoading: false,
    };
  },
  [GET_ALL_PROPIEDADES]: (state, action) => {
    const { itemPropiedades } = action;
    state = state || initialState;
    return {
      ...state,
      itemPropiedades,
      isLoading: false,
    };
  },
  [GET_ALL_VISITAS]: (state, action) => {
    const { itemVisitas } = action;
    state = state || initialState;
    return {
      ...state,
      itemVisitas,
      isLoading: false,
    };
  },
  [GET_ALL_REGIONES]: (state, action) => {
    const { itemRegiones } = action;
    state = state || initialState;
    return {
      ...state,
      itemRegiones,
      isLoading: false,
    };
  },
  [POST_LOGIN_USUARIO]: (state, action) => {
    const { itemUsuario } = action;
    state = state || initialState;
    return {
      ...state,
      itemUsuario,
      isLoading: false,
    };
  },
  [GET_HORARIO_BY_USER]: (state, action) => {
    const { horario } = action;
    state = state || initialState;
    return {
      ...state,
      horario,
      isLoading: false,
    };
  },
  [POST_UPDATE_PROPIEDAD]: (state, action) => {
    const { mensaje } = action;
    state = state || initialState;
    return {
      ...state,
      mensaje,
      isLoading: false,
    };
  },
  [POST_INSERT_INMOBILIARIA]: (state, action) => {
    const { mensaje } = action;
    state = state || initialState;
    return {
      ...state,
      mensaje,
      isLoading: false,
    };
  },
  [GET_ALL_INMOBILIARIAS]: (state, action) => {
    const { itemInmobiliarias } = action;
    state = state || initialState;
    return {
      ...state,
      itemInmobiliarias,
      isLoading: false,
    };
  },
  [REQUEST_GET_ALL_INMOBILIARIAS]: (state, action) => {
    const { requestGetAllInmobiliarias } = action;
    state = state || initialState;
    return {
      ...state,
      requestGetAllInmobiliarias
    };
  },
  [GET_ALL_PROYECTOS]: (state, action) => {
    const { itemProyectos } = action;
    state = state || initialState;
    return {
      ...state,
      itemProyectos,
      isLoading: false,
    };
  },
  [GET_ALL_USUARIOS]: (state, action) => {
    const { itemsUsuarios } = action;
    state = state || initialState;
    return {
      ...state,
      itemsUsuarios,
      isLoading: false,
    };
  },
  [GET_ALL_SERVICIOS_BASE]: (state, action) => {
    const { itemServicios } = action;
    state = state || initialState;
    return {
      ...state,
      itemServicios,
      //isLoading: false,
    };
  },

  [ADD_PLAN]: (state, action) => {
    const { mensaje } = action;
    state = state || initialState;
    return {
      ...state,
      mensaje,
      isLoading: false,
    };
  },
  [INITIAL_MENSAJE]: (state, action) => {
    const { mensaje } = action;

    state = state || initialState;
    return {
      ...state,
      mensaje,
      isLoading: false,
    };
  },

  [ADD_SERVICIO_BASE]: (state, action) => {
    const { mensaje } = action;
    state = state || initialState;
    return {
      ...state,
      mensaje,
      isLoading: false,
    };
  },
  [GET_ALL_PLANES]: (state, action) => {
    const { itemPlanes } = action;
    state = state || initialState;
    return {
      ...state,
      itemPlanes,
      isLoading: false,
    };
  },
  [REQUEST_GET_ALL_PLANES]: (state, action) => {
    const { requestGetPlanes } = action;
    state = state || initialState;
    return {
      ...state,
      requestGetPlanes,
    };
  },
  [GET_PLAN_BY_ID]: (state, action) => {
    const { plan } = action;
    state = state || initialState;

    return {
      ...state,
      plan,
      isLoading: false,
    };
  },
  [GET_OFERTAS_BY_PUBLICACION]: (state, action) => {
    const { itemOfertas } = action;
    state = state || initialState;
    return {
      ...state,
      itemOfertas,
      isLoading: false,
    };
  },
  [ADD_PROPIEDADES_IMAGES]: (state, action) => {
    const { imagenesPropiedad } = action;
    state = state || initialState;
    return {
      ...state,
      imagenesPropiedad,
      isLoading: false,
    };
  },
  [RESET_PROPIEDADES_IMAGES]: (state, action) => {
    const { imagenesPropiedad } = action;
    state = state || initialState;
    return {
      ...state,
      imagenesPropiedad,
      isLoading: false,
    };
  },
  [ADD_VALORACION]: (state, action) => {
    const { valoracion } = action;
    state = state || initialState;
    return {
      ...state,
      valoracion,
      isLoading: false,
    };
  },
  [UPDATE_PLAN]: (state, action) => {
    const { mensaje } = action;
    state = state || initialState;
    return {
      ...state,
      mensaje,
      isLoading: false,
    };
  },
  [POST_PROYECTO_RES]: (state, action) => {
    const { mensaje } = action;
    state = state || initialState;
    return {
      ...state,
      mensaje,
      isLoading: false,
    };
  },
  [PUT_PROYECTO_RES]: (state, action) => {
    const { mensaje } = action;
    state = state || initialState;
    return {
      ...state,
      mensaje,
      isLoading: false,
    };
  },
  [DELETE_PLAN]: (state, action) => {
    const { mensaje, id } = action.payload;
    state = state || initialState;
    const itemPlanes =
      state.itemPlanes &&
      state.itemPlanes.filter((plan) => {
        return plan.id !== id;
      });

    return {
      ...state,
      mensaje,
      itemPlanes,
      isLoading: false,
    };
  },
  [ADD_SERVICIO_ADICIONAL]: (state, action) => {
    const { mensaje, data } = action.payload;
    state = state || initialState;

    const actuales = state.servicioAdicionales.filter(
      (dVal) => dVal.id !== data.id

      // !state.servicioAdicionales.find((serviAd) => serviAd.id === dVal.id)
    );

    const servicioAdicionales = [...actuales, data];

    return {
      ...state,
      mensaje,
      servicioAdicionales,
      isLoading: false,
    };
  },
  [LIST_SERVICIOS_ADICIONALES]: (state, action) => {
    const { data } = action.payload;
    state = state || initialState;
    const servicioAdicionales = [...data];

    return {
      ...state,
      servicioAdicionales,
      //isLoading: false,
    };
  },
  [DELETE_SERVICIO_ADICIONAL]: (state, action) => {
    const { id } = action;
    state = state || initialState;

    const servicioAdicionales =
      state.servicioAdicionales &&
      state.servicioAdicionales.filter((servicio) => {
        return servicio.id !== id;
      });

    return {
      ...state,
      servicioAdicionales,
      isLoading: false,
    };
  },
  [UPDATE_SERVICIO_ADICIONAL]: (state, action) => {
    const { mensaje } = action.payload;
    state = state || initialState;
    return {
      ...state,
      mensaje,
      isLoading: false,
    };
  },
  [GET_ALL_AGENDAS]: (state, action) => {
    const { agendas } = action;
    state = state || initialState;
    return {
      ...state,
      agendas,
      isLoading: false,
    };
  },
  [UPDATE_AGENDAS]: (state, action) => {
    const { data, mensaje } = action.payload;
    state = state || initialState;
    const sinEditar = state.agendas.filter((cita) => {
      return !data.find((editada) => cita.id === editada.id);
    });
    const agendas = [...sinEditar, ...data];
    return {
      ...state,
      agendas,
      mensaje,
      isLoading: false,
    };
  },
  [DELETE_PROPIEDAD]: (state, action) => {
    const { id } = action.payload;
    state = state || initialState;
    const itemPropiedades = state.itemPropiedades.map((datosCliente) => {
      const propiedad = datosCliente.propiedad.map((pro) => {
        return {
          ...pro,
          disponible: pro.id === id ? !pro.disponible : pro.disponible,
        };
      });
      return { ...datosCliente, propiedad };
    });

    return {
      ...state,
      itemPropiedades,
      isLoading: false,
    };
  },
  [SIGNATURE]: (state, action) => {
    const { signature } = action;
    return {
      ...state,
      signature,
    };
  },
  [REQUEST_UPDATE_ESTADO_PROPIEDAD]: (state, action) => {
    const { requestUpdateEstadoPropiedad } = action;
    return {
      ...state,
      requestUpdateEstadoPropiedad,
    };
  },
  [SET_RESPONSE_MSG]: (state, action) => {
    const { responseMessage } = action;
    return {
      ...state,
      responseMessage,
    };
  },
  [SET_PROPIEDADES_PAGINADAS]: (state, action) => {
    const { propiedadesPaginadas } = action;
    return {
      ...state,
      propiedadesPaginadas,
    };
  },
  [REQUEST_GET_PROPIEDADES_PAGINADAS]: (state, action) => {
    const { requestPropiedadesPaginadas } = action;
    return {
      ...state,
      requestPropiedadesPaginadas,
    };
  },
  [SET_PROPIEDAD]: (state, action) => {
    const { propiedad } = action;
    return {
      ...state,
      propiedad,
    };
  },
  [REQUEST_GET_PROPIEDAD]: (state, action) => {
    const { requestGetPropiedad } = action;
    return {
      ...state,
      requestGetPropiedad,
    };
  },
  [SET_TARJETA_PROP]: (state, action) => {
    const { tarjetaProp } = action;
    return {
      ...state,
      tarjetaProp,
    };
  },
  [REQUEST_POST_TARJETA_PROP]: (state, action) => {
    const { requestPostTarjetaProp } = action;
    return {
      ...state,
      requestPostTarjetaProp,
    };
  },
  [REQUEST_POST_UPLOAD_DATOS_TASACION]: (state, action) => {
    const { requestPostUploadDatosTasacion } = action;
    return {
      ...state,
      requestPostUploadDatosTasacion,
    };
  },
  [REQUEST_DELETE_ALL_DATOS_TASACION]: (state, action) => {
    const { requestDeleteAllDatosTasacion } = action;
    return {
      ...state,
      requestDeleteAllDatosTasacion,
    };
  },
  [REQUEST_POST_UPLOAD_PI_PROPIEDADES]: (state, action) => {
    const { requestPostUploadPIPropiedades } = action;
    return {
      ...state,
      requestPostUploadPIPropiedades,
    };
  },
  [REQUEST_POST_ADD_SUSCRIPCION]: (state, action) => {
    const { requestPostAddSuscripcion } = action;
    return {
      ...state,
      requestPostAddSuscripcion,
    };
  },
  [GET_SUSCRIPCION_EXPORT]: (state, action) => {
    const { suscripcionExcel } = action;
    return {
      ...state,
      suscripcionExcel,
    };
  },
  [REQUEST_GET_SUSCRIPCION_EXPORT]: (state, action) => {
    const { requestSuscripcionExcel } = action;
    return {
      ...state,
      requestSuscripcionExcel,
    };
  },
  [SET_SUSCRIPCION_LAST_UPDATED]: (state, action) => {
    const { suscripcionLastUpdated } = action;
    return {
      ...state,
      suscripcionLastUpdated,
    };
  },
  [REQUEST_SUSCRIPCION_LAST_UPDATED]: (state, action) => {
    const { requestSuscripcionLastUpdated } = action;
    return {
      ...state,
      requestSuscripcionLastUpdated,
    };
  },
  [REQUEST_ADD_USUARIO]: (state, action) => {
    const { requestAddUsuario } = action;
    return {
      ...state,
      requestAddUsuario,
    };
  },
  [REQUEST_UPDATE_USUARIO]: (state, action) => {
    const { requestUpdateUsuario } = action;
    return {
      ...state,
      requestUpdateUsuario,
    };
  },
  [SET_VISITA_FOTOGRAFO]: (state, action) => {
    let { visitaFotografo } = action;
    return {
      ...state,
      visitaFotografo
    }
  },
  [SET_REQUEST_LOADING_VISITA_FOTOGRAFO]: (state, action) => {
    let { requestLoadingVisitaFotografo } = action;
    return {
      ...state,
      requestLoadingVisitaFotografo
    }
  },
  [SET_AGENDA_FOTOGRAFO]: (state, action) => {
    let { agendaFotografo } = action;
    return {
      ...state,
      agendaFotografo
    }
  },
  [SET_REQUEST_LOADING_AGENDA_FOTOGRAFO]: (state, action) => {
    let { requestLoadingAgendaFotografo } = action;
    return {
      ...state,
      requestLoadingAgendaFotografo
    }
  },
  [SET_USUARIOS_FILTRADOS]: (state, action) => {
    let { usuariosFiltrados } = action;
    return {
      ...state,
      usuariosFiltrados
    }
  },
  [SET_REQUEST_USUARIOS_FILTRADOS]: (state, action) => {
    let { requestUsuarioFiltrados } = action;
    return {
      ...state,
      requestUsuarioFiltrados
    }
  },
  [SET_ASIGNAR_BROKER]: (state, action) => {
    let { propiedadBroker } = action;
    return {
      ...state,
      propiedadBroker
    }
  },
  [SET_REQUEST_ASIGNAR_BROKER]: (state, action) => {
    let { requestPropiedadBroker } = action;
    return {
      ...state,
      requestPropiedadBroker
    }
  },
  [SET_SUSCRIPCIONES]: (state, action) => {
    let { suscripciones } = action;
    return {
      ...state,
      suscripciones
    }
  },
  [SET_REQUEST_SUSCRIPCIONES]: (state, action) => {
    let { requestSuscripciones } = action;
    return {
      ...state,
      requestSuscripciones
    }
  },
  [SET_SUSCRIPCION]: (state, action) => {
    let { suscripcion } = action;
    return {
      ...state,
      suscripcion
    }
  },
  [SET_REQUEST_SUSCRIPCION]: (state, action) => {
    let { requestSuscripcion } = action;
    return {
      ...state,
      requestSuscripcion
    }
  },
  [SET_UPDATE_SUSCRIPCION]: (state, action) => {
    let { updateSuscripcion } = action;
    return {
      ...state,
      updateSuscripcion
    }
  },
  [SET_REQUEST_UPDATE_SUSCRIPCION]: (state, action) => {
    let { requestUpdateSuscripcion } = action;
    return {
      ...state,
      requestUpdateSuscripcion
    }
  },
  [SET_AGENDA_CLIENTE]: (state, action) => {
    let { agendaCliente } = action;
    return {
      ...state,
      agendaCliente
    }
  },
  [SET_REQUEST_AGENDA_CLIENTE]: (state, action) => {
    let { requestAgendaCliente } = action;
    return {
      ...state,
      requestAgendaCliente
    }
  },
  [SET_VISITAS_BY_FECHA_AND_ID]: (state, action) => {
    let { visitasCliente } = action;
    return {
      ...state,
      visitasCliente
    }
  },
  [SET_REQUEST_VISITAS_BY_FECHA_AND_ID]: (state, action) => {
    let { requestVisitasCliente } = action;
    return {
      ...state,
      requestVisitasCliente
    }
  },
  [SET_REQUEST_AGENDAR_VISITA_BROKER_SUSCRIPTOR]: (state, action) => {
    let { requestAgendarVisitaBroker } = action;
    return {
      ...state,
      requestAgendarVisitaBroker
    }
  },
  [SET_VISITAS_BROKER_SUSCRIPTOR]: (state, action) => {
    let { visitasBrokerSuscriptor } = action;
    return {
      ...state,
      visitasBrokerSuscriptor
    }
  },
  [SET_REQUEST_VISITAS_BROKER_SUSCRIPTOR]: (state, action) => {
    let { requestVisitasBrokerSuscriptor } = action;
    return {
      ...state,
      requestVisitasBrokerSuscriptor
    }
  },
  [SET_EMBAJADOR]: (state, action) => {
    let { embajador } = action;
    return {
      ...state,
      embajador
    }
  },
  [SET_REQUEST_REFERIR_EMBAJADOR]: (state, action) => {
    let { requestReferirEmbajador } = action;
    return {
      ...state,
      requestReferirEmbajador
    }
  },
  [SET_BROKER]: (state, action) => {
    let { broker } = action;
    return {
      ...state,
      broker
    }
  },
  [SET_REQUEST_POST_BROKER]: (state, action) => {
    let { requestPostBroker } = action;
    return {
      ...state,
      requestPostBroker
    }
  },
  [SET_REQUEST_GET_BROKER]: (state, action) => {
    let { requestGetBroker } = action;
    return {
      ...state,
      requestGetBroker
    }
  },
  [SET_REQUEST_PUT_BROKER]: (state, action) => {
    let { requestPutBroker } = action;
    return {
      ...state,
      requestPutBroker
    }
  },
  [SET_REQUEST_CAMBIO_CONTRASEÑA]: (state, action) => {
    let { requestCambioContraseña } = action;
    return {
      ...state,
      requestCambioContraseña
    }
  },
  [SET_USUARIO]: (state, action) => {
    let { usuario } = action;
    return {
      ...state,
      usuario
    }
  },
  [SET_REQUEST_GET_USUARIO]: (state, action) => {
    let { requestGetUsuario } = action;
    return {
      ...state,
      requestGetUsuario
    }
  },
  [SET_ERROR_MESSAGE]: (state, action) => {
    let { errorMessage } = action;
    return {
      ...state,
      errorMessage
    }
  },
  [SET_REQUEST_CONFIRMAR_VISITA]: (state, action) => {
    let { requestConfirmarVisita } = action;
    return {
      ...state,
      requestConfirmarVisita
    }
  },
  [SET_REFERIR_VENDEDOR]: (state, action) => {
    let { vendedor } = action;
    return {
      ...state,
      vendedor
    }
  },
  [SET_REQUEST_REFERIR_VENDEDOR]: (state, action) => {
    let { requestReferirVendedor } = action;
    return {
      ...state,
      requestReferirVendedor
    }
  },
  [SET_VENDEDORES]: (state, action) => {
    let { vendedores } = action;
    return {
      ...state,
      vendedores
    }
  },
  [SET_REQUEST_GET_VENDEDORES]: (state, action) => {
    let { requestGetVendedores } = action;
    return {
      ...state,
      requestGetVendedores
    }
  },
  [SET_REQUEST_USUARIO_CAMBIAR_CONTACTADO]: (state, action) => {
    let { requestCambiarContactado } = action;
    return {
      ...state,
      requestCambiarContactado
    }
  },
  [SET_BROKERS]: (state, action) => {
    let { brokers } = action;
    return {
      ...state,
      brokers
    }
  },
  [SET_REQUEST_GET_ALL_BROKERS]: (state, action) => {
    let { requestGetAllBrokers } = action;
    return {
      ...state,
      requestGetAllBrokers
    }
  },
  [SET_REQUEST_UPDATE_AGENDA_CLIENTE]: (state, action) => {
    let { requestUpdateAgendaCliente } = action;
    return {
      ...state,
      requestUpdateAgendaCliente
    }
  },
  [SET_REQUEST_AGENDAR_VISITA]: (state, action) => {
    let { requestAgendarVisita } = action;
    return {
      ...state,
      requestAgendarVisita
    }
  },
  [SET_REQUEST_UPDATE_PLAN]: (state, action) => {
    let { requestUpdatePlan } = action;
    return {
      ...state,
      requestUpdatePlan
    }
  },
  [SET_REQUEST_ADD_PLAN]: (state, action) => {
    let { requestAddPlan } = action;
    return {
      ...state,
      requestAddPlan
    }
  },
  [SET_REQUEST_DELETE_PLAN]: (state, action) => {
    let { requestDeletePlan } = action;
    return {
      ...state,
      requestDeletePlan
    }
  },
  [SET_REQUEST_ADD_SERVICIO_ADICIONAL]: (state, action) => {
    let { requestAddServicioAdicional } = action;
    return {
      ...state,
      requestAddServicioAdicional
    }
  },
  [SET_REQUEST_UPDATE_SERVICIO_ADICIONAL]: (state, action) => {
    let { requestUpdateServicioAdicional } = action;
    return {
      ...state,
      requestUpdateServicioAdicional
    }
  },
  [SET_REQUEST_DELETE_SERVICIO_ADICIONAL]: (state, action) => {
    let { requestDeleteServicioAdicional } = action;
    return {
      ...state,
      requestDeleteServicioAdicional
    }
  },
  [SET_REQUEST_ADD_SERVICIO_BASE]: (state, action) => {
    let { requestAddServicioBase } = action;
    return {
      ...state,
      requestAddServicioBase
    }
  },
  [SET_USUARIOS_PAGINADOS]: (state, action) => {
    let { usuariosPaginados } = action;
    return {
      ...state,
      usuariosPaginados
    }
  },
  [SET_REQUEST_GET_USUARIOS_PAGINADOS]: (state, action) => {
    let { requestGetUsuariosPaginados } = action;
    return {
      ...state,
      requestGetUsuariosPaginados
    }
  },
  [SET_LANDING_INMOBILIARIA]: (state, action) => {
    let { landingInmobiliaria } = action;
    return {
      ...state,
      landingInmobiliaria
    }
  },
  [SET_REQUEST_GET_LANDING_INMOBILIARIA]: (state, action) => {
    let { requestGetLandingInmobiliaria } = action;
    return {
      ...state,
      requestGetLandingInmobiliaria
    }
  },
  [SET_REQUEST_POST_LANDING_INMOBILIARIA]: (state, action) => {
    let { requestPostLandingInmobiliaria } = action;
    return {
      ...state,
      requestPostLandingInmobiliaria
    }
  },
  [SET_LANDING_INMOBILIARIAS]: (state, action) => {
    let { landingInmobiliarias } = action;
    return {
      ...state,
      landingInmobiliarias
    }
  },
  [SET_REQUEST_GET_ALL_LANDING_INMOBILIARIAS]: (state, action) => {
    let { requestGetAllLandingInmobiliarias } = action;
    return {
      ...state,
      requestGetAllLandingInmobiliarias
    }
  },
  [SET_REQUEST_UPDATE_LANDING_INMOBILIARIA]: (state, action) => {
    let { requestUpdateLandingInmobiliaria } = action;
    return {
      ...state,
      requestUpdateLandingInmobiliaria
    }
  },  
};

export default (state = initialState, action = {}) => {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
};
