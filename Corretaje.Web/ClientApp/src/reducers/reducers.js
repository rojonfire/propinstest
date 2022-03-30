import {
  REQUEST_GET_PROPIEDADES,
  REQUEST_GET_PROYECTOS,
  REQUEST_GET_PROPIEDAD_INFO,
  REQUEST_GET_HORARIOS_USER,
  REQUEST_INIT_PAYMENT,
  SET_PLAN_DETAILS,
  SET_USER,
  SET_ACCOUNT,
  LOGOUT,
  SET_CONTACT,
  REQUEST_ADD_HORARIO_FOTO,
  REQUEST_GET_HORARIOS_FOTOGRAFO,
  CLEAN_MSJ_FOTO,
  SET_PLANES,
  REQUEST_GET_ALL_PLANES,
  SET_SERVICIOS_ADICIONALES,
  REQUEST_GET_PROPIEDADES_DESTACADAS,
  REQUEST_GET_UF,
  GET_VISITAS,
  RECOVER_PASSWORD,
  PUT_MONTO_OFERTA,
  DELETE_VISITAS,
  VALIDATE_TOKEN,
  RESTABLECER_PASSWORD,
  POST_TASACION,
  CLEAN_TASACION,
  SET_LOADING,
  SET_LOGIN,
  SET_DATOS_PROPIEDAD,
  SET_MEETING_START,
  SET_SIGNATURE,
  SET_INMOBILIARIA_ID,
  SET_PROYECTO_ID,
  SET_INMOBILIARIA,
  SET_REQUEST_GET_INMOBILIARIA_BY_ID,
  SET_PROYECTO_DATA,
  GET_EVALUACION,
  SET_JOINED_MEETING,
  SET_PLAN_CONTRATADO,
  SET_ESTADO_REQUEST,
  SET_SERVICIOS_ADICIONALES_POR_PLAN,
  SET_PROPIEDADES_BY_ID_CLIENTE,
  SET_VISITA_FOTOGRAFO,
  SET_REQUEST_LOADING_VISITA_FOTOGRAFO,
  SET_AGENDA_FOTOGRAFO,
  SET_REQUEST_LOADING_AGENDA_FOTOGRAFO,
  SET_USER_DATA_PROFILE,
  SET_REQUEST_UPDATE_USER,
  SET_REQUEST_GET_SERVICIOS_ADICIONALES_BY_PLAN,
  SET_DATOS_PROPIEDAD_TASACION,
  SET_RESULTADO_TASACION,
  SET_REQUEST_TASACION,
  SET_PROPIEDADES_SIMILARES_TASACION,
  SET_REQUEST_PROPIEDADES_SIMILARES_TASACION,
  SET_VALORES_PRELIMINARES_TASACION,
  SET_REQUEST_VALORES_PRELIMINARES_TASACION,
  REQUEST_POST_ADD_SUSCRIPCION,
  SET_AGENDA_CLIENTE,
  SET_REQUEST_AGENDA_CLIENTE,
  SET_REQUEST_UPDATE_AGENDA_CLIENTE,
  SET_VISITAS,
  SET_REQUEST_VISITAS,
  SET_FIND_TASACION_BY_PROPIEDAD,
  SET_REQUEST_FIND_TASACION_BY_PROPIEDAD,
  SET_REQUEST_INCREMENTAR_VISITAS_VIRTUALES,
  SET_VISITAS_VIRTUALES,
  SET_REQUEST_VISITAS_VIRTUALES,
  SET_PROPIEDAD,
  SET_REQUEST_PROPIEDAD,
  SET_OFERTAS,
  SET_REQUEST_OFERTAS,
  SET_REQUEST_UPDATE_OFERTA,
  SET_ERROR_MESSAGE,
  SET_OFERTAS_EMITIDAS,
  SET_REQUEST_OFERTAS_EMITIDAS,
  SET_REGISTRO_PROPER,
  SET_REQUEST_REGISTRO_PROPER,
  SET_REQUEST_REGISTRO,
  SET_REQUEST_CAMBIO_CONTRASEÑA,
  SET_REQUEST_SER_EMBAJADOR,
  SET_REFERIR_VENDEDOR,
  SET_REQUEST_REFERIR_VENDEDOR,
  SET_REQUEST_ACTUALIZAR_DATOS_BANCARIOS,
  SET_REGISTERED,
  SET_VISITA_AGENDADA,
  SET_REQUEST_AGENDAR_VISITA,
  SET_TIPO_PLAN_SELECCIONADO,
  SET_PLAN,
  SET_REQUEST_GET_PLAN,
  SET_LANDING_INMOBILIARIA,
  SET_REQUEST_GET_LANDING_INMOBILIARIA
} from "../action";

const initialStateValues = {
  loading: false,
  estado: null,
  respuesta: [],
  totalPages: 0,
  currentPage: 0,
  propiedad: {},
  horarios: [],
  data: "",
  plan: {
    hired: null,
    total: 0,
    precioPlan: 0,
    precioString: "",
    descuento: false,
    textoDescuento: null,
    nombrePlan: "",
    servicios: [],
    extras: []
  },
  user: {},
  ticket: {},
  userAccount: {},
  mensajeFoto: {},
  mensajeOferta: {},
  horariosFoto: [],
  planes: [],
  requestGetPlanes: 'IDLE',
  serviciosAdicionales: [],
  destacados: [],
  uf: 0,
  recover: {},
  contratoArriendo: {},
  contratoVenta: {},
  tasacionUser: {},
  visitas: {},
  hasDelete: false,
  tokenPassword: {},
  restablecer: {},
  datosProps: {},
  meetingStart: false,
  tokenZoom: null,
  evaluacionesProyectos: [],
  joinedMeeting: false,
  planContratado: null,
  propiedadesCliente: null,
  requestLoadingVisitaFotografo: false,
  visitaFotografo: null,
  agendaFotografo: null,
  requestLoadingAgendaFotografo: false,
  userData: null,
  requestStateUpdateUser: 'IDLE',
  requestStateGetServiciosAdicionalesByPlan: 'IDLE',
  datosPropiedadTasacion: null,
  requestStateTasacion: 'IDLE',
  resultadoTasacion: null,
  propiedadesSimilaresTasacion: null,
  requestStatePropiedadesSimilaresTasacion: 'IDLE',
  valoresPreliminaresTasacion: null,
  requestStateValoresPreliminaresTasacion: 'IDLE',
  requestPostAddSuscripcion: "IDLE",
  agendaCliente: null,
  requestAgendaCliente: "IDLE",
  requestUpdateAgendaCliente: "IDLE",
  visitasUsuario: null,
  requestVisitasUsuario: "IDLE",
  tasacionByPropiedad: null,
  requestTasacionByPropiedad: "IDLE",
  requestIncrementarVisitasVirtuales: "IDLE",
  visitasVirtuales: null,
  requestVisitasVirtuales: "IDLE",
  ofertas: null,
  requestOfertas: "IDLE",
  requestUpdateOferta: "IDLE",
  errorMessage: "",
  ofertasEmitidas: null,
  requestOfertasEmitidas: "IDLE",
  registroProper: null,
  requestRegistroProper: "IDLE",
  requestRegistro: "IDLE",
  requestCambioContraseña: "IDLE",
  requestSerEmbajador: "IDLE",
  vendedor: null,
  requestReferirVendedor: "IDLE",
  requestActualizarDatosBancarios: "IDLE",
  registered: false,
  visitaAgendada: null,
  requestAgendarVisita: "IDLE",
  tipoPlanSeleccionado: null,
  plan: null,
  requestGetPlan: "IDLE",
  requestGetInmobiliariaById: "IDLE",
  landingInmobiliaria: null,
  requestGetLandingInmobiliaria: "IDLE"
};

const initialState = { ...initialStateValues };

const actionsMap = {
  [CLEAN_MSJ_FOTO]: (state, action) => {
    const { mensajeFoto } = action;
    state = state || initialState;
    return {
      ...state,
      mensajeFoto,
      isLoading: false
    };
  },

  [CLEAN_TASACION]: (state, action) => {
    const { tasacionUser } = action;
    state = state || initialState;
    return {
      ...state,
      tasacionUser,
      isLoading: false
    };
  },

  [POST_TASACION]: (state, action) => {
    const { tasacionUser } = action;
    state = state || initialState;
    return {
      ...state,
      tasacionUser,
      isLoading: false
    };
  },

  [PUT_MONTO_OFERTA]: (state, action) => {
    const { respuestaMontoOferta } = action;
    state = state || initialState;
    return {
      ...state,
      respuestaMontoOferta,
      isLoading: false
    };
  },

  [RECOVER_PASSWORD]: (state, action) => {
    const { recover } = action;
    state = state || initialState;
    return {
      ...state,
      recover,
      tokenPassword: {}
    };
  },

  [REQUEST_GET_HORARIOS_FOTOGRAFO]: (state, action) => {
    const { horariosFoto } = action;

    state = state || initialState;
    return {
      ...state,
      horariosFoto,
      isLoading: false
    };
  },

  [REQUEST_ADD_HORARIO_FOTO]: (state, action) => {
    const { mensajeFoto } = action;
    state = state || initialState;
    return {
      ...state,
      mensajeFoto,
      isLoading: false
    };
  },

  [REQUEST_INIT_PAYMENT]: (state, action) => {
    const { data } = action;
    state = state || initialState;
    return {
      ...state,
      data,
      isLoading: false
    };
  },

  [REQUEST_GET_PROPIEDADES]: (state, action) => {
    const { respuesta, totalPages, currentPage } = action;
    state = state || initialState;
    return {
      ...state,
      respuesta,
      isLoading: false,
      currentPage,
      totalPages
    };
  },

  [REQUEST_GET_PROYECTOS]: (state, action) => {
    const { respuesta, totalPages, currentPage } = action;
    state = state || initialState;
    return {
      ...state,
      respuesta,
      isLoading: false,
      currentPage,
      totalPages
    };
  },

  [REQUEST_GET_PROPIEDAD_INFO]: (state, action) => {
    const { propiedad } = action;
    state = state || initialState;
    return {
      ...state,
      propiedad,
      isLoading: false
    };
  },

  [REQUEST_GET_HORARIOS_USER]: (state, action) => {
    const { horarios } = action;
    state = state || initialState;
    return {
      ...state,
      horarios
    };
  },

  [SET_PLAN_DETAILS]: (state, action) => {
    let { plan } = state;
    const { details } = action;

    plan = { ...plan, ...details };

    return {
      ...state,
      plan
    };
  },
  [GET_VISITAS]: (state, action) => {
    let { visitas } = action;

    return {
      ...state,
      visitas,
      hasDelete: false
    };
  },
  [DELETE_VISITAS]: (state, action) => {
    let { hasDelete } = action;

    return {
      ...state,
      hasDelete
    };
  },
  [SET_USER]: (state, action) => {
    let { user } = action;

    return {
      ...state,
      user
    };
  },
  [SET_ACCOUNT]: (state, action) => {
    let { userAccount } = action;
    return {
      ...state,
      userAccount
    };
  },
  [LOGOUT]: (state, action) => {
    return {
      ...initialState
    };
  },
  [SET_LOGIN]: (state, action) => {
    let { data } = action;
    return {
      ...state,
      data
    };
  },
  [SET_CONTACT]: (state, action) => {
    let { ticket } = action;
    return {
      ...state,
      ticket
    };
  },

  [SET_PLANES]: (state, action) => {
    let { planes } = action;

    return {
      ...state,
      planes
    };
  },
  [REQUEST_GET_ALL_PLANES]: (state, action) => {
    let { requestGetPlanes } = action;

    return {
      ...state,
      requestGetPlanes
    };
  },  
  [SET_SERVICIOS_ADICIONALES]: (state, action) => {
    let { serviciosAdicionales } = action;

    return {
      ...state,
      serviciosAdicionales
    };
  },
  [REQUEST_GET_PROPIEDADES_DESTACADAS]: (state, action) => {
    let { destacados } = action;

    return {
      ...state,
      destacados
    };
  },
  [REQUEST_GET_UF]: (state, action) => {
    let { uf } = action;

    return {
      ...state,
      uf
    };
  },
  [SET_LOADING]: (state, action) => {
    const { loading } = action;
    return {
      ...state,
      loading
    };
  },
  [VALIDATE_TOKEN]: (state, action) => {
    let { tokenPassword } = action;
    return {
      ...state,
      tokenPassword,
      recover: {},
      restablecer: {},
      data: {}
    };
  },
  [RESTABLECER_PASSWORD]: (state, action) => {
    let { restablecer } = action;
    return {
      ...state,
      restablecer
    };
  },
  [SET_DATOS_PROPIEDAD]: (state, action) => {
    let { datosProps } = action;
    return {
      ...state,
      datosProps
    };
  },
  [SET_MEETING_START]: (state, action) => {
    let { meetingStart } = action;
    return {
      ...state,
      meetingStart
    };
  },
  [SET_SIGNATURE]: (state, action) => {
    let { tokenZoom } = action;
    return {
      ...state,
      tokenZoom
    };
  },
  [SET_INMOBILIARIA]: (state, action) => {
    let {inmobiliariaData} = action;
    return {
      ...state,
      inmobiliariaData
    }
  },
  [SET_REQUEST_GET_INMOBILIARIA_BY_ID]: (state, action) => {
    let {requestGetInmobiliariaById} = action;
    return {
      ...state,
      requestGetInmobiliariaById
    }
  },
  [SET_INMOBILIARIA_ID]: (state, action) => {
    let { inmobiliariaId } = action;
    return {
      ...state,
      inmobiliariaId
    }
  },
  [SET_PROYECTO_ID]: (state, action) => {
    let { proyectoId } = action;
    return {
      ...state,
      proyectoId
    }
  },
  [SET_PROYECTO_DATA]: (state, action) => {
    let { proyectoData } = action;
    return {
      ...state,
      proyectoData
    }
  },
  [GET_EVALUACION]: (state, action) => {
    let { evaluacionesProyectos } = action;
    return {
      ...state,
      evaluacionesProyectos
    }
  },
  [SET_JOINED_MEETING]: (state, action) => {
    let { joinedMeeting } = action;
    return {
      ...state,
      joinedMeeting
    }
  },
  [SET_PLAN_CONTRATADO]: (state, action) => {
    let { planContratado } = action;
    return {
      ...state,
      planContratado
    }
  },
  [SET_ESTADO_REQUEST]: (state, action) => {
    let { estado } = action;
    return {
      ...state,
      estado
    }
  },
  [SET_SERVICIOS_ADICIONALES_POR_PLAN]: (state, action) => {
    let { serviciosAdicionales } = action;
    return {
      ...state,
      serviciosAdicionales
    }
  },
  [SET_PROPIEDADES_BY_ID_CLIENTE]: (state, action) => {
    let { propiedadesCliente } = action;
    return {
      ...state,
      propiedadesCliente
    }
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

  [SET_USER_DATA_PROFILE]: (state, action) => {
    let { userData } = action;
    return {
      ...state,
      userData
    }
  },

  [SET_REQUEST_UPDATE_USER]: (state, action) => {
    let { requestStateUpdateUser } = action;
    return {
      ...state,
      requestStateUpdateUser
    }
  },
  [SET_REQUEST_GET_SERVICIOS_ADICIONALES_BY_PLAN]: (state, action) => {
    let { requestStateGetServiciosAdicionalesByPlan } = action;
    return {
      ...state,
      requestStateGetServiciosAdicionalesByPlan
    }
  },
  [SET_DATOS_PROPIEDAD_TASACION]: (state, action) => {
    let { datosPropiedadTasacion } = action;
    return {
      ...state,
      datosPropiedadTasacion
    }
  },
  [SET_RESULTADO_TASACION]: (state, action) => {
    let { resultadoTasacion } = action;
    return {
      ...state,
      resultadoTasacion
    }
  },
  [SET_REQUEST_TASACION]: (state, action) => {
    let { requestStateTasacion } = action;
    return {
      ...state,
      requestStateTasacion
    }
  },
  [SET_PROPIEDADES_SIMILARES_TASACION]: (state, action) => {
    let { propiedadesSimilaresTasacion } = action;
    return {
      ...state,
      propiedadesSimilaresTasacion
    }
  },
  [SET_REQUEST_PROPIEDADES_SIMILARES_TASACION]: (state, action) => {
    let { requestStatePropiedadesSimilaresTasacion } = action;
    return {
      ...state,
      requestStatePropiedadesSimilaresTasacion
    }
  },
  [SET_VALORES_PRELIMINARES_TASACION]: (state, action) => {
    let { valoresPreliminaresTasacion } = action;
    return {
      ...state,
      valoresPreliminaresTasacion
    }
  },
  [SET_REQUEST_VALORES_PRELIMINARES_TASACION]: (state, action) => {
    let { requestStateValoresPreliminaresTasacion } = action;
    return {
      ...state,
      requestStateValoresPreliminaresTasacion
    }
  },
  [REQUEST_POST_ADD_SUSCRIPCION]: (state, action) => {
    const { requestPostAddSuscripcion } = action;
    return {
      ...state,
      requestPostAddSuscripcion,
    };
  },
  [SET_AGENDA_CLIENTE]: (state, action) => {
    const { agendaCliente } = action;
    return {
      ...state,
      agendaCliente,
    };
  },
  [SET_REQUEST_AGENDA_CLIENTE]: (state, action) => {
    const { requestAgendaCliente } = action;
    return {
      ...state,
      requestAgendaCliente,
    };
  },
  [SET_REQUEST_UPDATE_AGENDA_CLIENTE]: (state, action) => {
    const { requestUpdateAgendaCliente } = action;
    return {
      ...state,
      requestUpdateAgendaCliente,
    };
  },
  [SET_FIND_TASACION_BY_PROPIEDAD]: (state, action) => {
    const { tasacionByPropiedad } = action;
    return {
      ...state,
      tasacionByPropiedad,
    };
  },
  [SET_REQUEST_FIND_TASACION_BY_PROPIEDAD]: (state, action) => {
    const { requestTasacionByPropiedad } = action;
    return {
      ...state,
      requestTasacionByPropiedad,
    };
  },
  [SET_VISITAS]: (state, action) => {
    const { visitasUsuario } = action;
    return {
      ...state,
      visitasUsuario,
    };
  },
  [SET_REQUEST_VISITAS]: (state, action) => {
    const { requestVisitasUsuario } = action;
    return {
      ...state,
      requestVisitasUsuario,
    };
  },
  [SET_REQUEST_INCREMENTAR_VISITAS_VIRTUALES]: (state, action) => {
    const { requestIncrementarVisitasVirtuales } = action;
    return {
      ...state,
      requestIncrementarVisitasVirtuales,
    };
  },
  [SET_VISITAS_VIRTUALES]: (state, action) => {
    const { visitasVirtuales } = action;
    return {
      ...state,
      visitasVirtuales,
    };
  },
  [SET_REQUEST_VISITAS_VIRTUALES]: (state, action) => {
    const { requestVisitasVirtuales } = action;
    return {
      ...state,
      requestVisitasVirtuales,
    };
  },
  [SET_PROPIEDAD]: (state, action) => {
    const { propiedad } = action;
    return {
      ...state,
      propiedad,
    };
  },
  [SET_REQUEST_PROPIEDAD]: (state, action) => {
    const { requestPropiedad } = action;
    return {
      ...state,
      requestPropiedad,
    };
  },
  [SET_OFERTAS]: (state, action) => {
    const { ofertas } = action;
    return {
      ...state,
      ofertas,
    };
  },
  [SET_REQUEST_OFERTAS]: (state, action) => {
    const { requestOfertas } = action;
    return {
      ...state,
      requestOfertas,
    };
  },
  [SET_REQUEST_UPDATE_OFERTA]: (state, action) => {
    const { requestUpdateOferta } = action;
    return {
      ...state,
      requestUpdateOferta,
    };
  },
  [SET_ERROR_MESSAGE]: (state, action) => {
    const { errorMessage } = action;
    return {
      ...state,
      errorMessage,
    };
  },
  [SET_OFERTAS_EMITIDAS]: (state, action) => {
    const { ofertasEmitidas } = action;
    return {
      ...state,
      ofertasEmitidas,
    };
  },
  [SET_REQUEST_OFERTAS_EMITIDAS]: (state, action) => {
    const { requestOfertasEmitidas } = action;
    return {
      ...state,
      requestOfertasEmitidas,
    };
  },
  [SET_REGISTRO_PROPER]: (state, action) => {
    const { registroProper } = action;
    return {
      ...state,
      registroProper,
    };
  },
  [SET_REQUEST_REGISTRO_PROPER]: (state, action) => {
    const { requestRegistroProper } = action;
    return {
      ...state,
      requestRegistroProper,
    };
  },
  [SET_REQUEST_REGISTRO]: (state, action) => {
    const { requestRegistro } = action;
    return {
      ...state,
      requestRegistro,
    };
  },
  [SET_REQUEST_CAMBIO_CONTRASEÑA]: (state, action) => {
    const { requestCambioContraseña } = action;
    return {
      ...state,
      requestCambioContraseña,
    };
  },
  [SET_REQUEST_SER_EMBAJADOR]: (state, action) => {
    const { requestSerEmbajador } = action;
    return {
      ...state,
      requestSerEmbajador,
    };
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
  [SET_REQUEST_ACTUALIZAR_DATOS_BANCARIOS]: (state, action) => {
    let { requestActualizarDatosBancarios } = action;
    return {
      ...state,
      requestActualizarDatosBancarios
    }
  },
  [SET_REGISTERED]: (state, action) => {
    let { registered } = action;
    return {
      ...state,
      registered
    }
  },
  [SET_VISITA_AGENDADA]: (state, action) => {
    let { visitaAgendada } = action;
    return {
      ...state,
      visitaAgendada
    }
  },
  [SET_REQUEST_AGENDAR_VISITA]: (state, action) => {
    let { requestAgendarVisita } = action;
    return {
      ...state,
      requestAgendarVisita
    }
  },
  [SET_TIPO_PLAN_SELECCIONADO]: (state, action) => {
    let { tipoPlanSeleccionado } = action;
    return {
      ...state,
      tipoPlanSeleccionado
    }
  },
  [SET_PLAN]: (state, action) => {
    let { plan } = action;
    return {
      ...state,
      plan
    }
  },
  [SET_REQUEST_GET_PLAN]: (state, action) => {
    let { requestGetPlan } = action;
    return {
      ...state,
      requestGetPlan
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
};

export default (state = initialState, action = {}) => {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
};