import api from "../api";
import { REQUEST_STATE } from "../utils/types";
import { STANDARD_ERROR_MESSAGES } from "../utils/constants";

export const REQUEST_GET_PROPIEDADES = "REQUEST_GET_PROPIEDADES",
  REQUEST_GET_PROYECTOS = "REQUEST_GET_PROYECTOS",
  SET_LOGIN = "SET_LOGIN",
  SET_CONTACT = "SET_CONTACT",
  SET_USER = "SET_USER",
  SET_RUT = "SET_RUT",
  SET_ORDENES_COMPRA = "SET_ORDENES_COMPRA",
  SET_USERID = "SET_USERID",
  SET_VERIFICA_CEDULA = "SET_VERIFICA_CEDULA",
  LOGOUT = "LOGOUT",
  SET_CLIENTE_ID = "SET_CLIENTE_ID",
  SET_ACCESSTOKEN = "REQUEST_GET_PROPIEDAD_INFO",
  REQUEST_GET_PROPIEDAD_INFO = "REQUEST_GET_PROPIEDAD_INFO",
  REQUEST_GET_HORARIOS_USER = "REQUEST_GET_HORARIOS_USER",
  SET_PLAN_DETAILS = "SET_PLAN_DETAILS",
  REQUEST_ADD_HORARIO_FOTO = "REQUEST_ADD_HORARIO_FOTO",
  REQUEST_ADD_OFERTA = "REQUEST_ADD_OFERTA",
  REQUEST_INIT_PAYMENT = "REQUEST_INIT_PAYMENT",
  REQUEST_GET_HORARIOS_FOTOGRAFO = "REQUEST_GET_HORARIOS_FOTOGRAFO",
  CLEAN_MSJ_FOTO = "CLEAN_MSJ_FOTO",
  SET_PLANES = "SET_PLANES",
  REQUEST_GET_ALL_PLANES = "REQUEST_GET_ALL_PLANES",
  SET_SERVICIOS_ADICIONALES = "SET_SERVICIOS_ADICIONALES",
  CLEAN_MENSAJE_FOTO = "CLEAN_MENSAJE_FOTO",
  REQUEST_GET_PROPIEDADES_DESTACADAS = "REQUEST_GET_PROPIEDADES_DESTACADAS",
  SET_ACCOUNT = "SET_ACCOUNT",
  SET_PROPER = "SET_PROPER",
  SET_PAYMENT_SUCCESS = "SET_PAYMENT_SUCCESS",
  RECOVER_PASSWORD = "RECOVER_PASSWORD",
  CLEAN_TRX = "CLEAN_TRX",
  PUT_MONTO_OFERTA = "PUT_MONTO_OFERTA",
  POST_TASACION = "POST_TASACION",
  SET_LOADING = "SET_LOADING",
  CLEAN_TASACION = "CLEAN_TASACION",
  GET_VISITAS = "GET_VISITAS",
  DELETE_VISITAS = "DELETE_VISITAS",
  VALIDATE_TOKEN = "VALIDATE_TOKEN",
  RESTABLECER_PASSWORD = "RESTABLECER_PASSWORD",
  SET_ID_COMPRA = "SET_ID_COMPRA",
  SET_DATOS_PROPIEDAD = "SET_DATOS_PROPIEDAD",
  SET_SIGNATURE = "SET_SIGNATURE",
  SET_MEETING_START = "SET_MEETING_START",
  SIGNATURE = "SIGNATURE",
  REQUEST_GET_UF = "REQUEST_GET_UF",
  SET_INMOBILIARIA_ID = "SET_INMOBILIARIA_ID",
  SET_PROYECTO_ID = "SET_PROYECTO_ID",
  SET_INMOBILIARIA = "SET_INMOBILIARIA",
  SET_PROYECTO_DATA = "SET_PROYECTO_DATA",
  GET_EVALUACION = "GET_EVALUACION",
  SET_VERSION = "SET_VERSION",
  SET_JOINED_MEETING = "SET_JOINED_MEETING",
  SET_PLAN_CONTRATADO = "SET_PLAN_CONTRATADO",
  SET_ESTADO_REQUEST = "SET_ESTADO_REQUEST",
  SET_SERVICIOS_ADICIONALES_POR_PLAN = "SET_SERVICIOS_ADICIONALES_POR_PLAN",
  SET_PROPIEDADES_BY_ID_CLIENTE = "SET_PROPIEDADES_BY_ID_CLIENTE",
  SET_VISITA_FOTOGRAFO = "SET_VISITA_FOTOGRAFO",
  SET_REQUEST_LOADING_VISITA_FOTOGRAFO = "SET_REQUEST_LOADING_VISITA_FOTOGRAFO",
  SET_AGENDA_FOTOGRAFO = "SET_AGENDA_FOTOGRAFO",
  SET_REQUEST_LOADING_AGENDA_FOTOGRAFO = "SET_REQUEST_LOADING_AGENDA_FOTOGRAFO",
  SET_USER_DATA_PROFILE = "SET_USER_DATA_PROFILE",
  SET_REQUEST_UPDATE_USER = "SET_REQUEST_UPDATE_USER",
  SET_REQUEST_GET_SERVICIOS_ADICIONALES_BY_PLAN =
    "SET_REQUEST_GET_SERVICIOS_ADICIONALES_BY_PLAN",
  SET_REQUEST_CONTRATAR_SERVICIOS_ADICIONALES =
    "SET_REQUEST_CONTRATAR_SERVICIOS_ADICIONALES",
  SET_DATOS_PROPIEDAD_TASACION = "SET_DATOS_PROPIEDAD_TASACION",
  SET_RESULTADO_TASACION = "SET_RESULTADO_TASACION",
  SET_REQUEST_TASACION = "SET_REQUEST_TASACION",
  SET_PROPIEDADES_SIMILARES_TASACION = "SET_PROPIEDADES_SIMILARES_TASACION",
  SET_REQUEST_PROPIEDADES_SIMILARES_TASACION =
    "SET_REQUEST_PROPIEDADES_SIMILARES_TASACION",
  SET_VALORES_PRELIMINARES_TASACION = "SET_VALORES_PRELIMINARES_TASACION",
  SET_REQUEST_VALORES_PRELIMINARES_TASACION =
    "SET_REQUEST_VALORES_PRELIMINARES_TASACION",
  REQUEST_POST_ADD_SUSCRIPCION = "REQUEST_POST_ADD_SUSCRIPCION",
  SET_AGENDA_CLIENTE = "SET_AGENDA_CLIENTE",
  SET_REQUEST_AGENDA_CLIENTE = "SET_REQUEST_AGENDA_CLIENTE",
  SET_REQUEST_UPDATE_AGENDA_CLIENTE = "SET_REQUEST_UPDATE_AGENDA_CLIENTE",
  SET_VISITAS = "SET_VISITAS",
  SET_REQUEST_VISITAS = "SET_REQUEST_VISITAS",
  SET_FIND_TASACION_BY_PROPIEDAD = "SET_FIND_TASACION_BY_PROPIEDAD",
  SET_REQUEST_FIND_TASACION_BY_PROPIEDAD =
    "SET_REQUEST_FIND_TASACION_BY_PROPIEDAD",
  SET_REQUEST_INCREMENTAR_VISITAS_VIRTUALES =
    "SET_REQUEST_INCREMENTAR_VISITAS_VIRTUALES",
  SET_VISITAS_VIRTUALES = "SET_VISITAS_VIRTUALES",
  SET_REQUEST_VISITAS_VIRTUALES = "SET_REQUEST_VISITAS_VIRTUALES",
  SET_PROPIEDAD = "SET_PROPIEDAD",
  SET_REQUEST_PROPIEDAD = "SET_REQUEST_PROPIEDAD",
  SET_OFERTAS = "SET_OFERTAS",
  SET_REQUEST_OFERTAS = "SET_REQUEST_OFERTAS",
  SET_REQUEST_UPDATE_OFERTA = "SET_REQUEST_UPDATE_OFERTA",
  SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE",
  SET_OFERTAS_EMITIDAS = "SET_OFERTAS_EMITIDAS",
  SET_REQUEST_OFERTAS_EMITIDAS = "SET_REQUEST_OFERTAS_EMITIDAS",
  SET_REGISTRO_PROPER = "SET_REGISTRO_PROPER",
  SET_REQUEST_REGISTRO_PROPER = "SET_REQUEST_REGISTRO_PROPER",
  SET_REQUEST_REGISTRO = "SET_REQUEST_REGISTRO",
  SET_REQUEST_CAMBIO_CONTRASEÑA = "SET_REQUEST_CAMBIO_CONTRASEÑA",
  SET_REQUEST_SER_EMBAJADOR = "SET_REQUEST_SER_EMBAJADOR",
  SET_REFERIR_VENDEDOR = "SET_REFERIR_VENDEDOR",
  SET_REQUEST_REFERIR_VENDEDOR = "SET_REQUEST_REFERIR_VENDEDOR",
  SET_REQUEST_ACTUALIZAR_DATOS_BANCARIOS =
    "SET_REQUEST_ACTUALIZAR_DATOS_BANCARIOS",
  SET_REGISTERED = "SET_REGISTERED",
  SET_VISITA_AGENDADA = "SET_VISITA_AGENDADA",
  SET_REQUEST_AGENDAR_VISITA = "SET_REQUEST_AGENDAR_VISITA",
  SET_TIPO_PLAN_SELECCIONADO = "SET_TIPO_PLAN_SELECCIONADO",
  SET_PLAN = "SET_PLAN",
  SET_REQUEST_GET_PLAN = "SET_REQUEST_GET_PLAN",
  SET_LANDING_INMOBILIARIA = "SET_LANDING_INMOBILIARIA",
  SET_REQUEST_GET_LANDING_INMOBILIARIA = "SET_REQUEST_GET_LANDING_INMOBILIARIA",
  SET_REQUEST_GET_INMOBILIARIA_BY_ID = "SET_REQUEST_GET_INMOBILIARIA_BY_ID";

// * DISPATCH FUNCS

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});

const cleanTasacion = (tasacionUser) => ({
  type: CLEAN_TASACION,
  tasacionUser,
});

const requestGetPropiedades = (respuesta, totalPages, currentPage) => ({
  type: REQUEST_GET_PROPIEDADES,
  respuesta,
  totalPages,
  currentPage,
});

const requestGetProyectos = (respuesta, totalPages, currentPage) => ({
  type: REQUEST_GET_PROYECTOS,
  respuesta,
  totalPages,
  currentPage,
});

const requestGetHorFot = (horariosFoto) => ({
  type: REQUEST_GET_HORARIOS_FOTOGRAFO,
  horariosFoto,
});

const requestGetPropiedadInfo = (propiedad) => ({
  type: REQUEST_GET_PROPIEDAD_INFO,
  propiedad,
});

const requestGetHorarioByUser = (horarios) => ({
  type: REQUEST_GET_HORARIOS_USER,
  horarios,
});

const requestInitPayment = (data) => ({
  type: REQUEST_INIT_PAYMENT,
  data,
});

const requestAddHoraFoto = (mensajeFoto) => ({
  type: REQUEST_ADD_HORARIO_FOTO,
  mensajeFoto,
});

const cleanMsjFoto = (mensajeFoto) => ({
  type: CLEAN_MSJ_FOTO,
  mensajeFoto,
});

const requestPostTasacion = (tasacionUser) => ({
  type: POST_TASACION,
  tasacionUser,
});

const requestUpdateMontoOferta = (respuestaMontoOferta) => ({
  type: PUT_MONTO_OFERTA,
  respuestaMontoOferta,
});

export const setPlanDetails = (details) => ({
  type: SET_PLAN_DETAILS,
  details,
});

export const setDataTrx = (data) => ({
  type: REQUEST_INIT_PAYMENT,
  data,
});

export const setIdCompra = (id) => (dispatch) => {
  dispatch({
    type: SET_ID_COMPRA,
    idcompra: id,
  });
};

export const setDatosPropiedad = (datosProps) => (dispatch) => {
  dispatch({
    type: SET_DATOS_PROPIEDAD,
    datosProps,
  });
};

const requestGetPropiedadesDestacadas = (destacados) => ({
  type: REQUEST_GET_PROPIEDADES_DESTACADAS,
  destacados,
});

const requestGetUF = (uf) => ({
  type: REQUEST_GET_UF,
  uf,
});

const setMeetingStartAction = (meetingStart) => ({
  type: SET_MEETING_START,
  meetingStart,
});

const joinedMeetingAction = (joinedMeeting) => ({
  type: SET_JOINED_MEETING,
  joinedMeeting,
});

const setSignatureAction = (tokenZoom) => ({
  type: SET_SIGNATURE,
  tokenZoom,
});

const setInmobiliariaAction = (inmobiliariaData) => ({
  type: SET_INMOBILIARIA,
  inmobiliariaData,
});

const setRequestGetInmobiliariaById = (requestGetInmobiliariaById) => ({
  type: SET_REQUEST_GET_INMOBILIARIA_BY_ID,
  requestGetInmobiliariaById,
});

const setProperAction = (properId) => ({
  type: SET_PROPER,
  properId,
});

const setInmobiliariaIdAction = (inmobiliariaId) => ({
  type: SET_INMOBILIARIA_ID,
  inmobiliariaId,
});

const setProyectoIdAction = (proyectoId) => ({
  type: SET_PROYECTO_ID,
  proyectoId,
});

const setProyectoDataAction = (proyectoData) => ({
  type: SET_PROYECTO_DATA,
  proyectoData,
});

const getEvaluacionAction = (evaluacionesProyectos) => ({
  type: GET_EVALUACION,
  evaluacionesProyectos,
});

export const setPlanContratado = (planContratado) => ({
  type: SET_PLAN_CONTRATADO,
  planContratado,
});

export const setEstadoRequest = (estado) => ({
  type: SET_ESTADO_REQUEST,
  estado,
});

export const setServiciosAdicionalesPorPlan = (serviciosAdicionales) => ({
  type: SET_SERVICIOS_ADICIONALES_POR_PLAN,
  serviciosAdicionales,
});

export const setPropiedadesPorCliente = (propiedadesCliente) => ({
  type: SET_PROPIEDADES_BY_ID_CLIENTE,
  propiedadesCliente,
});

export const setVisitaFotografo = (visitaFotografo) => ({
  type: SET_VISITA_FOTOGRAFO,
  visitaFotografo,
});

export const setRequestLoadingVisitaFotografo = (
  requestLoadingVisitaFotografo
) => ({
  type: SET_REQUEST_LOADING_VISITA_FOTOGRAFO,
  requestLoadingVisitaFotografo,
});

export const setAgendaFotografo = (agendaFotografo) => ({
  type: SET_AGENDA_FOTOGRAFO,
  agendaFotografo,
});

export const setRequestLoadingAgendaFotografo = (
  requestLoadingAgendaFotografo
) => ({
  type: SET_REQUEST_LOADING_AGENDA_FOTOGRAFO,
  requestLoadingAgendaFotografo,
});

export const setUserDataProfile = (userData) => ({
  type: SET_USER_DATA_PROFILE,
  userData,
});

export const setRequestStateUpdateUser = (requestStateUpdateUser) => ({
  type: SET_REQUEST_UPDATE_USER,
  requestStateUpdateUser,
});

export const setRequestStateGetServiciosAdicionalesByPlan = (
  requestStateGetServiciosAdicionalesByPlan
) => ({
  type: SET_REQUEST_GET_SERVICIOS_ADICIONALES_BY_PLAN,
  requestStateGetServiciosAdicionalesByPlan,
});

export const setRequestStateContratarServiciosAdicionales = (
  requestStateContratarServiciosAdicionales
) => ({
  type: SET_REQUEST_CONTRATAR_SERVICIOS_ADICIONALES,
  requestStateContratarServiciosAdicionales,
});

export const setDatosPropiedadTasacion = (datosPropiedadTasacion) => ({
  type: SET_DATOS_PROPIEDAD_TASACION,
  datosPropiedadTasacion,
});

export const setResultadoTasacion = (resultadoTasacion) => ({
  type: SET_RESULTADO_TASACION,
  resultadoTasacion,
});

export const setRequestStateTasacion = (requestStateTasacion) => ({
  type: SET_REQUEST_TASACION,
  requestStateTasacion,
});

export const setPropiedadesSimilaresTasacion = (
  propiedadesSimilaresTasacion
) => ({
  type: SET_PROPIEDADES_SIMILARES_TASACION,
  propiedadesSimilaresTasacion,
});

export const setRequestStatePropiedadesSimilaresTasacion = (
  requestStatePropiedadesSimilaresTasacion
) => ({
  type: SET_REQUEST_PROPIEDADES_SIMILARES_TASACION,
  requestStatePropiedadesSimilaresTasacion,
});

export const setValoresPreliminaresTasacion = (
  valoresPreliminaresTasacion
) => ({
  type: SET_VALORES_PRELIMINARES_TASACION,
  valoresPreliminaresTasacion,
});

export const setRequestValoresPreliminaresTasacion = (
  requestStateValoresPreliminaresTasacion
) => ({
  type: SET_REQUEST_VALORES_PRELIMINARES_TASACION,
  requestStateValoresPreliminaresTasacion,
});

const setRequestPostAddSuscripcion = (requestPostAddSuscripcion) => ({
  type: REQUEST_POST_ADD_SUSCRIPCION,
  requestPostAddSuscripcion,
});

export const setAgendaCliente = (agendaCliente) => ({
  type: SET_AGENDA_CLIENTE,
  agendaCliente,
});

const setRequestAgendaCliente = (requestAgendaCliente) => ({
  type: SET_REQUEST_AGENDA_CLIENTE,
  requestAgendaCliente,
});

const setRequestUpdateAgendaCliente = (requestUpdateAgendaCliente) => ({
  type: SET_REQUEST_UPDATE_AGENDA_CLIENTE,
  requestUpdateAgendaCliente,
});

const setFindTasacionByPropiedad = (tasacionByPropiedad) => ({
  type: SET_FIND_TASACION_BY_PROPIEDAD,
  tasacionByPropiedad,
});

const setRequestFindTasacionByPropiedad = (requestTasacionByPropiedad) => ({
  type: SET_REQUEST_FIND_TASACION_BY_PROPIEDAD,
  requestTasacionByPropiedad,
});

const setVisitas = (visitasUsuario) => ({
  type: SET_VISITAS,
  visitasUsuario,
});

const setRequestVisitas = (requestVisitasUsuario) => ({
  type: SET_REQUEST_VISITAS,
  requestVisitasUsuario,
});

const setRequestIncrementarVisitasVirtuales = (
  requestIncrementarVisitasVirtuales
) => ({
  type: SET_REQUEST_INCREMENTAR_VISITAS_VIRTUALES,
  requestIncrementarVisitasVirtuales,
});

const setVisitasVirtuales = (visitasVirtuales) => ({
  type: SET_VISITAS_VIRTUALES,
  visitasVirtuales,
});

const setRequestVisitasVirtuales = (requestVisitasVirtuales) => ({
  type: SET_REQUEST_VISITAS_VIRTUALES,
  requestVisitasVirtuales,
});

const setPropiedad = (propiedad) => ({
  type: SET_PROPIEDAD,
  propiedad,
});

const setRequestPropiedad = (requestPropiedad) => ({
  type: SET_REQUEST_PROPIEDAD,
  requestPropiedad,
});

//recibidas
const setOfertas = (ofertas) => ({
  type: SET_OFERTAS,
  ofertas,
});

const setRequestOfertas = (requestOfertas) => ({
  type: SET_REQUEST_OFERTAS,
  requestOfertas,
});

const setRequestUpdateOferta = (requestUpdateOferta) => ({
  type: SET_REQUEST_UPDATE_OFERTA,
  requestUpdateOferta,
});

export const setErrorMessage = (errorMessage) => ({
  type: SET_ERROR_MESSAGE,
  errorMessage,
});

const setOfertasEmitidas = (ofertasEmitidas) => ({
  type: SET_OFERTAS_EMITIDAS,
  ofertasEmitidas,
});

const setRequestOfertasEmitidas = (requestOfertasEmitidas) => ({
  type: SET_REQUEST_OFERTAS_EMITIDAS,
  requestOfertasEmitidas,
});

const setRegistroProper = (registroProper) => ({
  type: SET_REGISTRO_PROPER,
  registroProper,
});

const setRequestRegistroProper = (requestRegistroProper) => ({
  type: SET_REQUEST_REGISTRO_PROPER,
  requestRegistroProper,
});

export const setRecoverPassword = (recover) => ({
  type: RECOVER_PASSWORD,
  recover,
});

export const setAccount = (userAccount) => ({
  type: SET_ACCOUNT,
  userAccount,
});

export const setRequestRegistro = (requestRegistro) => ({
  type: SET_REQUEST_REGISTRO,
  requestRegistro,
});

const setRequestCambioContraseña = (requestCambioContraseña) => ({
  type: SET_REQUEST_CAMBIO_CONTRASEÑA,
  requestCambioContraseña,
});

const setRequestSerEmbajador = (requestSerEmbajador) => ({
  type: SET_REQUEST_SER_EMBAJADOR,
  requestSerEmbajador,
});

const setReferirVendedor = (vendedor) => ({
  type: SET_REFERIR_VENDEDOR,
  vendedor,
});

const setRequestReferirVendedor = (requestReferirVendedor) => ({
  type: SET_REQUEST_REFERIR_VENDEDOR,
  requestReferirVendedor,
});

const setRequestActualizarDatosBancarios = (
  requestActualizarDatosBancarios
) => ({
  type: SET_REQUEST_ACTUALIZAR_DATOS_BANCARIOS,
  requestActualizarDatosBancarios,
});

export const setRegistered = (registered) => ({
  type: SET_REGISTERED,
  registered,
});

const setVisitaAgendada = (visitaAgendada) => ({
  type: SET_VISITA_AGENDADA,
  visitaAgendada,
});

const setRequestAgendarVisita = (requestAgendarVisita) => ({
  type: SET_REQUEST_AGENDAR_VISITA,
  requestAgendarVisita,
});

export const setTipoPlanSeleccionado = (tipoPlanSeleccionado) => ({
  type: SET_TIPO_PLAN_SELECCIONADO,
  tipoPlanSeleccionado,
});

const setPlanes = (planes) => ({
  type: SET_PLANES,
  planes,
});

const setRequestGetPlanes = (requestGetPlanes) => ({
  type: REQUEST_GET_ALL_PLANES,
  requestGetPlanes,
});

const setPlan = (plan) => ({
  type: SET_PLAN,
  plan,
});

const setRequestGetPlan = (requestGetPlan) => ({
  type: SET_REQUEST_GET_PLAN,
  requestGetPlan,
});

const setLandingInmobiliaria = (landingInmobiliaria) => ({
  type: SET_LANDING_INMOBILIARIA,
  landingInmobiliaria,
});

const setRequestGetLandingInmobiliaria = (requestGetLandingInmobiliaria) => ({
  type: SET_REQUEST_GET_LANDING_INMOBILIARIA,
  requestGetLandingInmobiliaria,
});

export const addSuccessTrx =
  (authorizationCode, commercecode, amount, buyOrder, token) => (dispatch) => {
    dispatch({
      type: SET_PAYMENT_SUCCESS,
      data: {
        authorizationCode,
        commercecode,
        amount,
        buyOrder,
        token,
      },
    });
  };

export const cleanTrx = () => (dispatch) => {
  dispatch({
    type: CLEAN_TRX,
  });
};

export const setVerifiedCedula = (verified) => (dispatch) => {
  dispatch({
    type: SET_VERIFICA_CEDULA,
    isVerifiedCedula: verified,
  });
};

export const loginFacebook =
  (
    mail,
    username,
    urlPhoto,
    id,
    token,
    rut,
    ordenes,
    verifiedCedula,
    clienteId
  ) =>
  (dispatch) => {
    try {
      const user = {
        name: username,
        email: mail,
        accessToken: token,
        urlPhoto: urlPhoto,
        rut: rut,
        userId: id,
        ordenesCompra: ordenes,
        verificaCedula: verifiedCedula,
        clienteId: clienteId,
      };

      dispatch({
        type: SET_LOGIN,
        data: {
          isLoggedIn: true,
          accessToken: user.accessToken,
        },
      });

      dispatch({
        type: SET_USER,
        user,
      });

      dispatch({
        type: SET_USERID,
        userId: id,
      });

      dispatch({
        type: SET_RUT,
        rut: user.rut,
      });

      dispatch({
        type: SET_ORDENES_COMPRA,
        ordenescompra: user.ordenesCompra,
      });

      dispatch({
        type: SET_VERIFICA_CEDULA,
        isVerifiedCedula: user.verificaCedula,
      });

      dispatch({
        type: SET_CLIENTE_ID,
        idCliente: user.clienteId,
      });
    } catch (e) {
      console.error(e);
    }
  };

export const loginGoogle =
  (mail, username, urlPhoto, id, token, rut, clienteId) => (dispatch) => {
    try {
      const user = {
        name: username,
        email: mail,
        accessToken: token,
        urlPhoto: urlPhoto,
        rut: rut,
        userId: id,
        clienteId: clienteId,
      };
      dispatch({
        type: SET_LOGIN,
        data: {
          isLoggedIn: true,
          accessToken: user.accessToken,
        },
      });

      dispatch({
        type: SET_USER,
        user,
      });

      dispatch({
        type: SET_USERID,
        userId: id,
      });

      dispatch({
        type: SET_RUT,
        rut: user.rut,
      });

      dispatch({
        type: SET_CLIENTE_ID,
        idCliente: user.clienteId,
      });
    } catch (e) {
      console.error(e);
    }
  };

export const fetchClienteId = (id) => (dispatch) => {
  dispatch({
    type: SET_CLIENTE_ID,
    idCliente: id,
  });
};

export const fetchOrdenesDeCompra = (ordenes) => (dispatch) => {
  dispatch({
    type: SET_ORDENES_COMPRA,
    ordenescompra: ordenes,
  });
};

export const fetchCleanMsjFoto = () => (dispatch) => {
  dispatch(cleanMsjFoto(undefined));
};

export const fetchCleanTasacion = () => (dispatch) => {
  dispatch(cleanTasacion(undefined));
};

export const cleanData = () => (dispatch) => {
  dispatch({
    type: SET_LOGIN,
    data: {},
  });
};

export const cleanInmobiliaria = () => (dispatch) => {
  dispatch({
    type: SET_INMOBILIARIA,
    inmobiliariaData: {},
  });
  dispatch({
    type: SET_INMOBILIARIA_ID,
    inmobiliariaId: "",
  });
};

export const cleanProyecto = () => (dispatch) => {
  dispatch({
    type: SET_PROYECTO_DATA,
    proyectoData: undefined,
  });
};

export const login = (sesion) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await api.apiPostLogin(sesion);
    const userData = data.data ? data.data : data;
    const succeed = data.estado;

    dispatch({
      type: SET_LOGIN,
      data: {},
    });

    if (!succeed) {
      dispatch({
        type: SET_LOGIN,
        data: {
          isLoggedIn: false,
          mensaje: data.mensaje,
        },
      });

      throw data.mensaje;
    }
    const user = {
      name: userData.nombres,
      email: userData.mail,
      accessToken: userData.token,
      userId: userData.userId,
      rut: userData.rut,
      ordenesCompra: userData.ordenCompra,
      urlPhoto: "",
      verificaCedula: userData.verificaCedula,
      clienteId: userData.clienteId,
      version: userData.version,
      properId: userData.properId,
      tipoCuenta: userData.tipoCuenta,
    };

    dispatch({
      type: SET_LOGIN,
      data: {
        isLoggedIn: true,
        accessToken: user.accessToken,
        version: user.version,
        properId: user.properId,
        tipoCuenta: userData.tipoCuenta,
      },
    });

    dispatch({
      type: SET_USERID,
      userId: user.userId,
    });

    dispatch({
      type: SET_USER,
      user,
    });

    dispatch({
      type: SET_RUT,
      rut: user.rut,
    });

    dispatch({
      type: SET_ORDENES_COMPRA,
      ordenescompra: user.ordenesCompra,
    });
    dispatch({
      type: SET_VERIFICA_CEDULA,
      isVerifiedCedula: user.verificaCedula,
    });

    dispatch({
      type: SET_CLIENTE_ID,
      idCliente: user.clienteId,
    });

    dispatch(setLoading(false));
  } catch (error) {
    console.log("error: ", error);
  } finally {
    // dispatch(history.back())
    dispatch(setLoading(false));
  }
};

export const setUser = (user) => (dispatch) => {
  dispatch({
    type: SET_USER,
    user,
  });
};

export const logout = () => ({
  type: LOGOUT,
});

export const fetchAddTasacion = (values) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await api.apiPostCreaTasacion(values);

    dispatch(requestPostTasacion(res));
    dispatch(setLoading(false));
  } catch (error) {
    console.error("error: ", error);
    dispatch(setLoading(false));
  }
};

export const fetchGetHorarioFoto = (values) => async (dispatch) => {
  try {
    const res = await api.apiGetHorariosFotografo(values);

    dispatch(requestGetHorFot(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchGetProperById = (id) => async (dispatch) => {
  try {
    const res = await api.apiGetProperById(id);

    dispatch(setProperAction(res));
  } catch (error) {
    console.log("error: ", error);
  }
};

export const fetchGetHorarioByUser = (id) => async (dispatch) => {
  try {
    const res = await api.apiGetHorarioByUser(id);
    dispatch(requestGetHorarioByUser(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchGetPropiedadInfo = (id) => async (dispatch) => {
  try {
    const res = await api.apiGetPropiedadInfo(id);
    dispatch(requestGetPropiedadInfo(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchGetPropiedades =
  (query, totalPages, currentPage) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await api.apiGetPropiedades(query);

      if (currentPage === 0) {
        currentPage = 1;
        if (res) totalPages = Math.ceil(res.count / 9);
      }

      dispatch(requestGetPropiedades(res, totalPages, currentPage));
    } catch (error) {
      console.error("error: ", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchGetInitPayment = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await api.apiGetPayment(data);
    dispatch(requestInitPayment(res));
  } catch (error) {
    console.error("error: ", error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const sendContacto = (values) => async (dispatch) => {
  try {
    const res = await api.apiPostTicket(values);
    dispatch({
      type: SET_CONTACT,
      ticket: res,
    });
  } catch (error) {
    console.error("error: ", error);
  }
};

export const creaCuenta = (values) => async (dispatch) => {
  dispatch(setRequestRegistro(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPostCreaCuenta(values);
    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setAccount(res.data));
        dispatch(setRequestRegistro(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje));
        dispatch(setRequestRegistro(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]));
        dispatch(setRequestRegistro(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestRegistro(REQUEST_STATE.ERROR));
    console.error("error: ", error);
  } finally {
    dispatch(setRequestRegistro(REQUEST_STATE.IDLE));
  }
};

export const creaCuentaProper = (values) => async (dispatch) => {
  try {
    const res = await api.apiPostCreaProper(values);
    dispatch({
      type: SET_PROPER,
      properAccount: res,
    });
    return res.value;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const restablecerPassword = (values) => async (dispatch) => {
  try {
    const res = await api.apiPostRestablecer(values);
    dispatch({
      type: RESTABLECER_PASSWORD,
      restablecer: res.value,
      tokenPassword: {},
    });
  } catch (error) {
    console.error("error: ", error);
  }
};

export const clearCuenta = () => async (dispatch) => {
  try {
    dispatch(setAccount(null));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const clearTicket = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_CONTACT,
      ticket: {},
    });
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchGetPlanes = () => async (dispatch) => {
  try {
    const res = await api.apiGetPlanes();

    dispatch({
      type: SET_PLANES,
      planes: res,
    });
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchGetTodosLosPlanes = () => async (dispatch) => {
  dispatch(setRequestGetPlanes(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiGetTodosLosPlanes();

    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setPlanes(res.data.data));
        dispatch(setRequestGetPlanes(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje));
        dispatch(setRequestGetPlanes(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]));
        dispatch(setRequestGetPlanes(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestRegistro(REQUEST_STATE.ERROR));
    console.error("error: ", error);
  } finally {
    dispatch(setRequestGetPlanes(REQUEST_STATE.IDLE));    
  }
};

export const fetchGetPlanById = (id) => async (dispatch) => {
  dispatch(setRequestGetPlan(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiGetPlanById(id);

    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setPlan(res.data.data));
        dispatch(setRequestGetPlan(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje));
        dispatch(setRequestGetPlan(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]));
        dispatch(setRequestGetPlan(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestGetPlan(REQUEST_STATE.ERROR));
    console.error("error: ", error);
  } finally {
    dispatch(setRequestGetPlan(REQUEST_STATE.IDLE));    
  }
};

export const fetchGetServiciosAdicionales = () => async (dispatch) => {
  try {
    const res = await api.apiGetServiciosAdicionales();

    dispatch({
      type: SET_SERVICIOS_ADICIONALES,
      serviciosAdicionales: res,
    });
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchPostHorarioFoto = (values) => async (dispatch) => {
  try {
    const res = await api.apiAddHorarioFotografo(values);

    dispatch(requestAddHoraFoto(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchGetPropiedadesDestacadas = () => async (dispatch) => {
  try {
    const res = await api.apiGetPropiedadesDestacadas();
    dispatch(requestGetPropiedadesDestacadas(res.value.data));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchGetUF = () => async (dispatch) => {
  try {
    const res = await api.apiGetUF();

    dispatch(requestGetUF(res.valor));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchGetVisitas = (email) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await api.apiGetVisitas(email);

    dispatch({
      type: GET_VISITAS,
      visitas: res.value.data,
    });
  } catch (error) {
    console.error("error: ", error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchDeleteVisita = (id) => async (dispatch) => {
  try {
    const res = await api.apiDeleteVisita(id);
    dispatch({
      type: DELETE_VISITAS,
      hasDelete: !!res.value.id,
    });
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchUpdateMontoOferta = (id, monto) => async (dispatch) => {
  try {
    const res = await api.apiUpdateOfertaMonto(id, monto);
    dispatch(requestUpdateMontoOferta(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchRecuperaPassword = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await api.apiPostRecuperar(data);
    dispatch(setRecoverPassword(res));
    dispatch(setLoading(false));
  } catch (error) {
    console.error("error: ", error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchValidaToken = (id) => async (dispatch) => {
  try {
    const res = await api.apiValidaToken(id);
    dispatch({
      type: VALIDATE_TOKEN,
      tokenPassword: res.data,
      recover: {},
    });
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchGetSignature =
  (meetConfig, role, proyectoId) => async (dispatch) => {
    try {
      const res = await api.apiGetSignature(meetConfig, role, proyectoId);
      dispatch(setSignatureAction(res));
    } catch (error) {
      console.error("error: ", error);
    }
  };

export const cleanSignature = () => (dispatch) => {
  dispatch(setSignatureAction(null));
};

export const fetchGetInmobiliaria = (inmobiliariaId) => async (dispatch) => {
  dispatch(setRequestGetInmobiliariaById(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiGetInmobiliaria(inmobiliariaId);

    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setInmobiliariaAction(res.data.data));
        dispatch(setRequestGetInmobiliariaById(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje));
        dispatch(setRequestGetInmobiliariaById(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]));
        dispatch(setRequestGetInmobiliariaById(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestGetInmobiliariaById(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestGetInmobiliariaById(REQUEST_STATE.IDLE));
  }
};

export const setMeetingStart = (value) => (dispatch) => {
  try {
    dispatch(setMeetingStartAction(value));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const joinedZoomMeeting = (value) => (dispatch) => {
  try {
    dispatch(joinedMeetingAction(value));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const setInmobiliariaIdState = (value) => (dispatch) => {
  try {
    dispatch(setInmobiliariaIdAction(value));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const setProyectoIdState = (value) => (dispatch) => {
  try {
    dispatch(setProyectoIdAction(value));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const setProyectoData = (value) => (dispatch) => {
  try {
    dispatch(setProyectoDataAction(value));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchGetProyectos =
  (query, totalPages, currentPage) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await api.apiGetProyectos(query);

      if (currentPage === 0) {
        currentPage = 1;
        if (res) totalPages = Math.ceil(res.count / 9);
      }
      dispatch(requestGetProyectos(res, totalPages, currentPage));
    } catch (error) {
      console.error("error: ", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const postCalificacion = (calificacion) => async (dispatch) => {
  let calificacionAgente = {
    evaluacion: calificacion.evaluacion,
    proyectoInmobiliarioId: calificacion.proyectoInmobiliarioId,
    agenteId: calificacion.agenteId,
    comentario: calificacion.comentario,
    evaluadorId: calificacion.evaluadorId,
  };

  let calificacionProyecto = {
    evaluacionConectividad: calificacion.evaluacionConectividad,
    evaluacionEquipamiento: calificacion.evaluacionEquipamiento,
    evaluacionPlusvalia: calificacion.evaluacionPlusvalia,
    evaluacionRentabilidad: calificacion.evaluacionRentabilidad,
    evaluacionTerminaciones: calificacion.evaluacionTerminaciones,
    duracion: calificacion.duracion,
    proyectoInmobiliarioId: calificacion.proyectoInmobiliarioId,
    comentario: calificacion.comentarioProyecto,
    evaluadorId: calificacion.evaluadorId,
  };

  try {
    await api.apiPostCalificacionAgente(calificacionAgente);
    await api.apiPostCalificacionProyecto(calificacionProyecto);
  } catch (error) {
    console.error("error: ", error);
  }
};

export const getUnProyecto = async () => {
  try {
    return await api.apiGetUnProyecto();
  } catch (error) {
    console.error("error: ", error);
  }
};

export const getEvaluacion =
  (evaluacionesProyectos, searchVals) => async (dispatch) => {
    let i;
    for (i = 0; i < searchVals.length; i++) {
      if (
        evaluacionesProyectos.find(
          (valu) => valu.proyectoId === searchVals[i]
        ) === undefined
      ) {
        try {
          const res = await api.apiGetEvaluacion(searchVals[i]);
          evaluacionesProyectos.push({
            proyectoId: searchVals[i],
            evaluacionesProyectos: res.data,
          });
        } catch (error) {
          console.error("error: ", error);
        }
      }
    }
    dispatch(getEvaluacionAction(evaluacionesProyectos));
  };

export const contratarPlan = (planContratado) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setEstadoRequest(null));
  let estado = null;
  try {
    const res = await api.apiContratarPlan(planContratado);
    dispatch(setPlanContratado(res.data));
    estado = res.estado;
  } catch (error) {
    console.error("error: ", error);
    estado = 0;
  } finally {
    dispatch(setLoading(false));
    dispatch(setEstadoRequest(estado));
  }
};

export const getServiciosAdicionalesByPlanId = (idPlan) => async (dispatch) => {
  dispatch(setRequestStateGetServiciosAdicionalesByPlan(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiGetServiciosAdicionalesByPlanId(idPlan);
    dispatch(setServiciosAdicionalesPorPlan(res.data));
    dispatch(
      setRequestStateGetServiciosAdicionalesByPlan(REQUEST_STATE.SUCCESS)
    );
  } catch (error) {
    console.error("error: ", error);
    dispatch(setRequestStateGetServiciosAdicionalesByPlan(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestStateGetServiciosAdicionalesByPlan(REQUEST_STATE.IDLE));
  }
};

export const getPropiedadesByClienteId = () => async (dispatch) => {
  try {
    const res = await api.apiGetPropiedadesByClienteId();
    dispatch(setPropiedadesPorCliente(res.data));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const getVisitasFotografoByFecha = (fecha) => async (dispatch) => {
  dispatch(setRequestLoadingVisitaFotografo(true));
  try {
    const res = await api.apiGetVisitasFotografoByFecha(fecha);
    dispatch(setVisitaFotografo(res.data));
  } catch (error) {
    console.error("error: ", error);
  } finally {
    dispatch(setRequestLoadingVisitaFotografo(false));
  }
};

export const getAgendaFotografo = () => async (dispatch) => {
  dispatch(setRequestLoadingAgendaFotografo(true));
  try {
    const res = await api.apiGetAgendaFotografo();
    dispatch(setAgendaFotografo(res.data));
  } catch (error) {
    console.error("error: ", error);
  } finally {
    dispatch(setRequestLoadingAgendaFotografo(false));
  }
};

export const getUsuario = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await api.apiGetUsuario();
    dispatch(setUserDataProfile(res.data));
  } catch (error) {
    console.error("error: ", error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateUsuario = (userData) => async (dispatch) => {
  dispatch(setRequestStateUpdateUser(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPostUpdateUser(userData);

    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setRequestStateUpdateUser(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje));
        dispatch(setRequestStateUpdateUser(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]));
        dispatch(setRequestStateUpdateUser(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    console.error("error: ", error);
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestStateUpdateUser(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestStateUpdateUser(REQUEST_STATE.IDLE));
  }
};

export const postContratarServiciosAdicionales =
  (idPropiedad, serviciosAdicionales) => async (dispatch) => {
    dispatch(
      setRequestStateContratarServiciosAdicionales(REQUEST_STATE.LOADING)
    );
    try {
      const res = await api.apiPostContratarServiciosAdicionales(
        idPropiedad,
        serviciosAdicionales
      );
      dispatch(
        setRequestStateContratarServiciosAdicionales(REQUEST_STATE.SUCCESS)
      );
    } catch (error) {
      console.error("error: ", error);
      dispatch(
        setRequestStateContratarServiciosAdicionales(REQUEST_STATE.ERROR)
      );
    } finally {
      dispatch(
        setRequestStateContratarServiciosAdicionales(REQUEST_STATE.IDLE)
      );
    }
  };

export const postGetTasacion = (tipo, datosPropiedad) => async (dispatch) => {
  dispatch(setRequestStateTasacion(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPostTasarPropiedad(tipo, datosPropiedad);

    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setResultadoTasacion(res.data));
        dispatch(setRequestStateTasacion(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje));
        dispatch(setRequestStateTasacion(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]));
        dispatch(setRequestStateTasacion(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    console.error("error: ", error);
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestStateTasacion(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestStateTasacion(REQUEST_STATE.IDLE));
  }
};

export const postGetPropiedadesSimilaresTasacion =
  (tipo, datosPropiedad, pageSize, page) => async (dispatch) => {
    dispatch(
      setRequestStatePropiedadesSimilaresTasacion(REQUEST_STATE.LOADING)
    );
    try {
      const res = await api.apiGetPropiedadesSimilaresTasacion(
        tipo,
        datosPropiedad,
        pageSize,
        page
      );

      if (res && res.data) {
        if (res.data.estado == 1) {
          dispatch(setPropiedadesSimilaresTasacion(res.data));
          dispatch(
            setRequestStatePropiedadesSimilaresTasacion(REQUEST_STATE.SUCCESS)
          );
        } else {
          dispatch(setErrorMessage(res.data.mensaje));
          dispatch(
            setRequestStatePropiedadesSimilaresTasacion(REQUEST_STATE.ERROR)
          );
        }
      } else {
        if (res.status) {
          dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]));
          dispatch(
            setRequestStatePropiedadesSimilaresTasacion(REQUEST_STATE.ERROR)
          );
        }
      }
    } catch (error) {
      console.error("error: ", error);
      dispatch(setErrorMessage("Ha habido un error"));
      dispatch(
        setRequestStatePropiedadesSimilaresTasacion(REQUEST_STATE.ERROR)
      );
    } finally {
      dispatch(setRequestStatePropiedadesSimilaresTasacion(REQUEST_STATE.IDLE));
    }
  };

export const postGetValoresPreliminaresTasacion =
  (datosPropiedad, tipo) => async (dispatch) => {
    dispatch(setRequestValoresPreliminaresTasacion(REQUEST_STATE.LOADING));
    try {
      const res = await api.apiGetValoresPreliminaresTasacion(
        datosPropiedad,
        tipo
      );
      if (res && res.data) {
        if (res.data.estado == 1) {
          dispatch(setValoresPreliminaresTasacion(res.data));
          dispatch(
            setRequestValoresPreliminaresTasacion(REQUEST_STATE.SUCCESS)
          );
        } else {
          dispatch(setErrorMessage(res.data.mensaje));
          dispatch(setRequestValoresPreliminaresTasacion(REQUEST_STATE.ERROR));
        }
      } else {
        if (res.status) {
          dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]));
          dispatch(setRequestValoresPreliminaresTasacion(REQUEST_STATE.ERROR));
        }
      }
    } catch (error) {
      console.error("error: ", error);
      dispatch(setErrorMessage("Ha habido un error"));
      dispatch(setRequestValoresPreliminaresTasacion(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestValoresPreliminaresTasacion(REQUEST_STATE.IDLE));
    }
  };

export const postAddSuscripcion = (data) => async (dispatch) => {
  dispatch(setRequestPostAddSuscripcion(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPostSuscripcion(data);

    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setRequestPostAddSuscripcion(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje));
        dispatch(setRequestPostAddSuscripcion(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]));
        dispatch(setRequestPostAddSuscripcion(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    console.error("error: ", error);
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestPostAddSuscripcion(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestPostAddSuscripcion(REQUEST_STATE.IDLE));
  }
};

export const getAgendaClienteByPropiedadId =
  (idPropiedad) => async (dispatch) => {
    dispatch(setRequestAgendaCliente(REQUEST_STATE.LOADING));
    try {
      const res = await api.apiGetAgendaClienteByPropiedadId(idPropiedad);
      dispatch(setAgendaCliente(res));
      dispatch(setRequestAgendaCliente(REQUEST_STATE.SUCCESS));
    } catch (error) {
      console.error("error: ", error);
      dispatch(setRequestAgendaCliente(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestAgendaCliente(REQUEST_STATE.IDLE));
    }
  };

export const updateAgendaCliente = (data) => async (dispatch) => {
  dispatch(setRequestUpdateAgendaCliente(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPostArmaAgendaCliente(data);
    dispatch(setRequestUpdateAgendaCliente(REQUEST_STATE.SUCCESS));
  } catch (error) {
    console.error("error: ", error);
    dispatch(setRequestUpdateAgendaCliente(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestUpdateAgendaCliente(REQUEST_STATE.IDLE));
  }
};

export const getTasacionPropiedad = (idPropiedad) => async (dispatch) => {
  dispatch(setRequestStateTasacion(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPostTasacionPropiedad(idPropiedad);

    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setResultadoTasacion(res.data.data));
        dispatch(setRequestStateTasacion(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje));
        dispatch(setRequestStateTasacion(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]));
        dispatch(setRequestStateTasacion(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    console.error("error: ", error);
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestStateTasacion(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestStateTasacion(REQUEST_STATE.IDLE));
  }
};

export const findTasacionByPropiedadId = (idPropiedad) => async (dispatch) => {
  dispatch(setRequestFindTasacionByPropiedad(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiFindTasacionByPropiedadId(idPropiedad);

    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setResultadoTasacion(res.data.data));
        dispatch(setRequestFindTasacionByPropiedad(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje));
        dispatch(setRequestFindTasacionByPropiedad(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]));
        dispatch(setRequestFindTasacionByPropiedad(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    console.error("error: ", error);
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestFindTasacionByPropiedad(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestFindTasacionByPropiedad(REQUEST_STATE.IDLE));
  }
};

export const getVisitasByPropiedadId = (idPropiedad) => async (dispatch) => {
  dispatch(setRequestVisitas(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiGetVisitasByPropiedadId(idPropiedad);
    dispatch(setVisitas(res));
    dispatch(setRequestVisitas(REQUEST_STATE.SUCCESS));
  } catch (error) {
    console.error("error: ", error);
    dispatch(setRequestVisitas(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestVisitas(REQUEST_STATE.IDLE));
  }
};

export const postIncrementarVisitasVirtuales = (data) => async (dispatch) => {
  dispatch(setRequestIncrementarVisitasVirtuales(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPostIncrementarVisitasVirtuales(data);
    dispatch(setRequestIncrementarVisitasVirtuales(REQUEST_STATE.SUCCESS));
  } catch (error) {
    console.error("error: ", error);
    dispatch(setRequestIncrementarVisitasVirtuales(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestIncrementarVisitasVirtuales(REQUEST_STATE.IDLE));
  }
};

export const getVisitasVirtualesByPropiedadAndPeriodo =
  (idPropiedad, periodo) => async (dispatch) => {
    dispatch(setRequestVisitasVirtuales(REQUEST_STATE.LOADING));
    try {
      const res = await api.apiGetVisitasVirtualesByPropiedadAndPeriodo(
        idPropiedad,
        periodo
      );
      dispatch(setVisitasVirtuales(res));
      dispatch(setRequestVisitasVirtuales(REQUEST_STATE.SUCCESS));
    } catch (error) {
      console.error("error: ", error);
      dispatch(setRequestVisitasVirtuales(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestVisitasVirtuales(REQUEST_STATE.IDLE));
    }
  };

export const getPropiedad = (idPropiedad) => async (dispatch) => {
  dispatch(setRequestPropiedad(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiGetPropiedad(idPropiedad);
    dispatch(setPropiedad(res));
    dispatch(setRequestPropiedad(REQUEST_STATE.SUCCESS));
  } catch (error) {
    console.error("error: ", error);
    dispatch(setRequestPropiedad(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestPropiedad(REQUEST_STATE.IDLE));
  }
};

export const getOfertasByPublicacionId =
  (idPublicacion) => async (dispatch) => {
    dispatch(setRequestOfertas(REQUEST_STATE.LOADING));
    try {
      const res = await api.apiGetOfertasByPublicacionId(idPublicacion);
      dispatch(setOfertas(res));
      dispatch(setRequestOfertas(REQUEST_STATE.SUCCESS));
    } catch (error) {
      console.error("error: ", error);
      dispatch(setRequestOfertas(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestOfertas(REQUEST_STATE.IDLE));
    }
  };

export const aceptarOferta = (id) => async (dispatch) => {
  dispatch(setRequestUpdateOferta(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiAceptarOferta(id);
    if (res.estado === 0) {
      dispatch(setErrorMessage(res.mensaje));
      dispatch(setRequestUpdateOferta(REQUEST_STATE.ERROR));
    } else {
      dispatch(setRequestUpdateOferta(REQUEST_STATE.SUCCESS));
    }
  } catch (error) {
    console.error("error: ", error);
    dispatch(setRequestUpdateOferta(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestUpdateOferta(REQUEST_STATE.IDLE));
  }
};

export const contraofertar = (id, monto) => async (dispatch) => {
  dispatch(setRequestUpdateOferta(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiContraofertar(id, monto);
    if (res.estado === 0) {
      dispatch(setErrorMessage(res.mensaje));
      dispatch(setRequestUpdateOferta(REQUEST_STATE.ERROR));
    } else {
      dispatch(setRequestUpdateOferta(REQUEST_STATE.SUCCESS));
    }
  } catch (error) {
    console.error("error: ", error);
    dispatch(setRequestUpdateOferta(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestUpdateOferta(REQUEST_STATE.IDLE));
  }
};

export const declinarOferta = (id) => async (dispatch) => {
  dispatch(setRequestUpdateOferta(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiDeclinarOferta(id);
    if (res.estado === 0) {
      dispatch(setErrorMessage(res.mensaje));
      dispatch(setRequestUpdateOferta(REQUEST_STATE.ERROR));
    } else {
      dispatch(setRequestUpdateOferta(REQUEST_STATE.SUCCESS));
    }
  } catch (error) {
    console.error("error: ", error);
    dispatch(setRequestUpdateOferta(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestUpdateOferta(REQUEST_STATE.IDLE));
  }
};

export const getOfertasByOfertadorId = (id) => async (dispatch) => {
  dispatch(setRequestOfertasEmitidas(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiGetOfertasPropiedadesByOfertador(id);
    if (res.estado === 0) {
      dispatch(setErrorMessage(res.mensaje));
      dispatch(setRequestOfertasEmitidas(REQUEST_STATE.ERROR));
    } else {
      dispatch(setOfertasEmitidas(res));
      dispatch(setRequestOfertasEmitidas(REQUEST_STATE.SUCCESS));
    }
  } catch (error) {
    console.error("error: ", error);
    dispatch(setRequestOfertasEmitidas(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestOfertasEmitidas(REQUEST_STATE.IDLE));
  }
};

export const postRegistroProper = (data) => async (dispatch) => {
  dispatch(setRequestRegistroProper(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPostCreaProper(data);
    if (res.estado === 0) {
      dispatch(setErrorMessage(res.mensaje));
      dispatch(setRequestRegistroProper(REQUEST_STATE.ERROR));
    } else {
      dispatch(setRegistroProper(res));
      dispatch(setRequestRegistroProper(REQUEST_STATE.SUCCESS));
    }
  } catch (error) {
    console.error("error: ", error);
    dispatch(setRequestRegistroProper(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestRegistroProper(REQUEST_STATE.IDLE));
  }
};

export const postCambiarContraseña = (data) => async (dispatch) => {
  dispatch(setRequestCambioContraseña(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPostCambiarContraseña(data);
    if (res != null && res.estado != null && res.estado == 1) {
      dispatch(setRequestCambioContraseña(REQUEST_STATE.SUCCESS));
    } else {
      dispatch(setRequestCambioContraseña(REQUEST_STATE.ERROR));
      if (res != null && res.mensaje != null && res.mensaje != undefined) {
        dispatch(setErrorMessage(res.mensaje));
      } else {
        dispatch(
          setErrorMessage(
            "Ha habido un error cambiando su contraseña. Verifique que la contraseña antigua ingresada sea la correcta e inténtelo de nuevo"
          )
        );
      }
    }
  } catch (error) {
    console.error("error: ", error);
    dispatch(
      setErrorMessage(
        "Ha habido un error cambiando su contraseña. Verifique que la contraseña antigua ingresada sea la correcta e inténtelo de nuevo"
      )
    );
    dispatch(setRequestCambioContraseña(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestCambioContraseña(REQUEST_STATE.IDLE));
  }
};

export const putSerEmbajador = () => async (dispatch) => {
  dispatch(setRequestSerEmbajador(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPutSerEmbajador();
    if (res != null && res.estado != null && res.estado == 1) {
      dispatch(setRequestSerEmbajador(REQUEST_STATE.SUCCESS));
    } else {
      dispatch(setRequestSerEmbajador(REQUEST_STATE.ERROR));
      if (res != null && res.mensaje != null && res.mensaje != undefined) {
        dispatch(setErrorMessage(res.mensaje));
      } else {
        dispatch(setErrorMessage("Ha habido un error desconocido"));
      }
    }
  } catch (error) {
    console.error("error: ", error);
    dispatch(setErrorMessage("Ha habido un error desconocido"));
    dispatch(setRequestSerEmbajador(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestSerEmbajador(REQUEST_STATE.IDLE));
  }
};

export const postReferirVendedor = (data) => async (dispatch) => {
  dispatch(setRequestReferirVendedor(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPostReferirVendedor(data);

    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setReferirVendedor(res));
        dispatch(setRequestReferirVendedor(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje));
        dispatch(setRequestReferirVendedor(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]));
        dispatch(setRequestReferirVendedor(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    console.error("error: ", error);
    dispatch(setErrorMessage("Ha habido un error desconocido"));
    dispatch(setRequestReferirVendedor(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestReferirVendedor(REQUEST_STATE.IDLE));
  }
};

export const putActualizarDatosBancarios = (data) => async (dispatch) => {
  dispatch(setRequestActualizarDatosBancarios(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPutActualizarDatosBancarios(data);
    if (res != null && res.estado != null && res.estado == 1) {
      dispatch(setRequestActualizarDatosBancarios(REQUEST_STATE.SUCCESS));
      dispatch(setUserDataProfile(res.data));
    } else {
      dispatch(setRequestActualizarDatosBancarios(REQUEST_STATE.ERROR));
      if (res != null && res.mensaje != null && res.mensaje != undefined) {
        dispatch(setErrorMessage(res.mensaje));
      } else {
        dispatch(
          setErrorMessage(
            "Ha habido un error actualizando sus datos bancarios. Inténtelo de nuevo más tarde."
          )
        );
      }
    }
  } catch (error) {
    console.error("error: ", error);
    dispatch(setRequestActualizarDatosBancarios(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestActualizarDatosBancarios(REQUEST_STATE.IDLE));
  }
};

export const postAgendarVisita = (data) => async (dispatch) => {
  dispatch(setRequestAgendarVisita(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPostAgendaVisitaUsuario(data);

    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setVisitaAgendada(res.data.data));
        dispatch(setRequestAgendarVisita(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje));
        dispatch(setRequestAgendarVisita(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]));
        dispatch(setRequestAgendarVisita(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    console.error("error: ", error);
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestAgendarVisita(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestAgendarVisita(REQUEST_STATE.IDLE));
  }
};

export const getLandingInmobiliariaByPathname = (pathname) => async (dispatch) => {
  dispatch(setRequestGetLandingInmobiliaria(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiGetLandingInmobiliariaByPathname(pathname);

    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setLandingInmobiliaria(res.data.data));
        dispatch(setRequestGetLandingInmobiliaria(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje));
        dispatch(setRequestGetLandingInmobiliaria(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]));
        dispatch(setRequestGetLandingInmobiliaria(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    console.error("error: ", error);
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestGetLandingInmobiliaria(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestGetLandingInmobiliaria(REQUEST_STATE.IDLE));
  }
};