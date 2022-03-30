/** @format */

import api from "../api";
import { REQUEST_STATE, STANDARD_ERROR_MESSAGES } from "../utils/constants";

export const RECEIVE_SUBIR_PROPIEDAD = "RECEIVE_SUBIR_PROPIEDAD",
  REQUEST_SUBIR_PROPIEDAD = "REQUEST_SUBIR_PROPIEDAD",
  ADD_CLIENTE = "ADD_CLIENTE",
  BEGIN_ALL_CLIENTES = "BEGIN_ALL_CLIENTES",
  GET_ALL_CLIENTES = "GET_ALL_CLIENTES",
  ADD_USUARIO = "ADD_USUARIO",
  GET_USER_BY_ROL = "GET_USER_BY_ROL",
  ADD_HORARIO_EMP = "ADD_HORARIO_EMP",
  GET_ALL_PROPIEDADES = "GET_ALL_PROPIEDADES",
  GET_ALL_VISITAS = "GET_ALL_VISITAS",
  GET_ALL_REGIONES = "GET_ALL_REGIONES",
  GET_HORARIO_BY_USER = "GET_HORARIO_BY_USER",
  CLEAR_ACTION = "CLEAR_ACTION",
  POST_UPDATE_PROPIEDAD = "POST_UPDATE_PROPIEDAD",
  POST_LOGIN_USUARIO = "POST_LOGIN_USUARIO",
  POST_INSERT_INMOBILIARIA = "POST_INSERT_INMOBILIARIA",
  GET_ALL_INMOBILIARIAS = "GET_ALL_INMOBILIARIAS",
  REQUEST_GET_ALL_INMOBILIARIAS = "REQUEST_GET_ALL_INMOBILIARIAS",
  PUT_UPDATE_INMOBILIARIA = "PUT_UPDATE_INMOBILIARIA",
  USUARIO_LOGOUT = "USUARIO_LOGOUT",
  RESET_INITIAL_VALUES = "RESET_INITIAL_VALUES",
  PUT_UPDATE_CLIENTE = "PUT_UPDATE_CLIENTE",
  GET_TIPOS_CONTRATOS = "GET_TIPOS_CONTRATOS",
  GET_ALL_USUARIOS = "GET_ALL_USUARIOS",
  POST_INSERT_TIPO_CONTRATO = "POST_INSERT_TIPO_CONTRATO",
  ADD_SERVICIO_BASE = "ADD_SERVICIO_BASE",
  GET_ALL_SERVICIOS_BASE = "GET_ALL_SERVICIOS_BASE",
  ADD_PLAN = "ADD_PLAN",
  INITIAL_MENSAJE = "INITIAL_MENSAJE",
  GET_ALL_PLANES = "GET_ALL_PLANES",
  REQUEST_GET_ALL_PLANES = "REQUEST_GET_ALL_PLANES",
  GET_PLAN_BY_ID = "GET_PLAN_BY_ID",
  GET_OFERTAS_BY_PUBLICACION = "GET_OFERTAS_BY_PUBLICACION",
  ADD_PROPIEDADES_IMAGES = "ADD_PROPIEDADES_IMAGES",
  RESET_PROPIEDADES_IMAGES = "RESET_PROPIEDADES_IMAGES",
  SET_LOADING = "SET_LOADING",
  ADD_VALORACION = "ADD_VALORACION",
  UPDATE_PLAN = "UPDATE_PLAN",
  UPDATE_PROPIEDAD = "UPDATE_PROPIEDAD",
  DELETE_PLAN = "DELETE_PLAN",
  ADD_SERVICIO_ADICIONAL = "ADD_SERVICIO_ADICIONAL",
  LIST_SERVICIOS_ADICIONALES = "LIST_SERVICIOS_ADICIONALES ",
  DELETE_SERVICIO_ADICIONAL = "DELETE_SERVICIO_ADICIONAL",
  UPDATE_SERVICIO_ADICIONAL = "UPDATE_SERVICIO_ADICIONAL",
  GET_ALL_AGENDAS = "GET_ALL_AGENDAS",
  UPDATE_AGENDAS = "UPDATE_AGENDAS",
  ADD_FOTOGRAFO_AGENDA = "ADD_FOTOGRAFO_AGENDA",
  INIT_PLAN = "INIT_PLAN",
  DELETE_PROPIEDAD = "DELETE_PROPIEDAD",
  GET_BLOQUES_FOTOGRAFO = "GET_BLOQUES_FOTOGRAFO",
  GET_BLOQUES_CLIENTE = "GET_BLOQUES_CLIENTE",
  SIGNATURE = "SIGNATURE",
  ADD_CLIENTE_AGENDA = "ADD_CLIENTE_AGENDA",
  POST_PROYECTO_RES = "POST_PROYECTO_RES",
  PUT_PROYECTO_RES = "PUT_PROYECTO_RES",
  POST_ADD_INMOBILIARIA = "POST_ADD_INMOBILIARIA",
  CHANGE_ROWS = "CHANGE_ROWS",
  GET_ALL_PROYECTOS = "GET_ALL_PROYECTOS",
  REQUEST_UPDATE_ESTADO_PROPIEDAD = "REQUEST_UPDATE_ESTADO_PROPIEDAD",
  SET_RESPONSE_MSG = "SET_RESPONSE_MSG",
  SET_PROPIEDADES_PAGINADAS = "SET_PROPIEDADES_PAGINADAS",
  REQUEST_GET_PROPIEDADES_PAGINADAS = "REQUEST_GET_PROPIEDADES_PAGINADAS",
  SET_PROPIEDAD = "SET_PROPIEDAD",
  REQUEST_GET_PROPIEDAD = "REQUEST_GET_PROPIEDAD",
  SET_TARJETA_PROP = "SET_TARJETA_PROP",
  REQUEST_POST_TARJETA_PROP = "REQUEST_POST_TARJETA_PROP",
  REQUEST_POST_UPLOAD_DATOS_TASACION = "REQUEST_POST_UPLOAD_DATOS_TASACION",
  REQUEST_DELETE_ALL_DATOS_TASACION = "REQUEST_DELETE_ALL_DATOS_TASACION",
  REQUEST_POST_UPLOAD_PI_PROPIEDADES = "REQUEST_POST_UPLOAD_PI_PROPIEDADES",
  REQUEST_POST_ADD_SUSCRIPCION = "REQUEST_POST_ADD_SUSCRIPCION",
  GET_SUSCRIPCION_EXPORT = "GET_SUSCRIPCION_EXPORT",
  REQUEST_GET_SUSCRIPCION_EXPORT = "REQUEST_GET_SUSCRIPCION_EXPORT",
  SET_SUSCRIPCION_LAST_UPDATED = "SET_SUSCRIPCION_LAST_UPDATED",
  REQUEST_SUSCRIPCION_LAST_UPDATED = "REQUEST_SUSCRIPCION_LAST_UPDATED",
  REQUEST_ADD_USUARIO = "REQUEST_ADD_USUARIO",
  REQUEST_UPDATE_USUARIO = "REQUEST_UPDATE_USUARIO",
  SET_VISITA_FOTOGRAFO = "SET_VISITA_FOTOGRAFO",
  SET_REQUEST_LOADING_VISITA_FOTOGRAFO = "SET_REQUEST_LOADING_VISITA_FOTOGRAFO",
  SET_AGENDA_FOTOGRAFO = "SET_AGENDA_FOTOGRAFO",
  SET_REQUEST_LOADING_AGENDA_FOTOGRAFO = "SET_REQUEST_LOADING_AGENDA_FOTOGRAFO",
  SET_USUARIOS_FILTRADOS = "SET_USUARIOS_FILTRADOS",
  SET_REQUEST_USUARIOS_FILTRADOS = "SET_REQUEST_USUARIOS_FILTRADOS",
  SET_ASIGNAR_BROKER = "SET_ASIGNAR_BROKER",
  SET_REQUEST_ASIGNAR_BROKER = "SET_REQUEST_ASIGNAR_BROKER",
  SET_SUSCRIPCIONES = "SET_SUSCRIPCIONES",
  SET_REQUEST_SUSCRIPCIONES = "SET_REQUEST_SUSCRIPCIONES",
  SET_SUSCRIPCION = "SET_SUSCRIPCION",
  SET_REQUEST_SUSCRIPCION = "SET_REQUEST_SUSCRIPCION",
  SET_UPDATE_SUSCRIPCION = "SET_UPDATE_SUSCRIPCION",
  SET_REQUEST_UPDATE_SUSCRIPCION = "SET_REQUEST_UPDATE_SUSCRIPCION",
  SET_AGENDA_CLIENTE = "SET_AGENDA_CLIENTE",
  SET_REQUEST_AGENDA_CLIENTE = "SET_REQUEST_AGENDA_CLIENTE",
  SET_VISITAS_BY_FECHA_AND_ID = "SET_VISITAS_BY_FECHA_AND_ID",
  SET_REQUEST_VISITAS_BY_FECHA_AND_ID = "SET_REQUEST_VISITAS_BY_FECHA_AND_ID",
  SET_REQUEST_AGENDAR_VISITA_BROKER_SUSCRIPTOR = "SET_REQUEST_AGENDAR_VISITA_BROKER_SUSCRIPTOR",
  SET_VISITAS_BROKER_SUSCRIPTOR = "SET_VISITAS_BROKER_SUSCRIPTOR",
  SET_REQUEST_VISITAS_BROKER_SUSCRIPTOR = "SET_REQUEST_VISITAS_BROKER_SUSCRIPTOR",
  SET_EMBAJADOR = "SET_EMBAJADOR",
  SET_REQUEST_REFERIR_EMBAJADOR = "SET_REQUEST_REFERIR_EMBAJADOR",
  SET_DATOS_BANCARIOS = "SET_DATOS_BANCARIOS",
  SET_BROKER = "SET_BROKER",
  SET_REQUEST_POST_BROKER = "SET_REQUEST_POST_BROKER",
  SET_REQUEST_GET_BROKER = "SET_REQUEST_GET_BROKER",
  SET_REQUEST_PUT_BROKER = "SET_REQUEST_PUT_BROKER",
  SET_REQUEST_CAMBIO_CONTRASEÑA = "SET_REQUEST_CAMBIO_CONTRASEÑA",
  SET_USUARIO = "SET_USUARIO",
  SET_REQUEST_GET_USUARIO = "SET_REQUEST_GET_USUARIO",
  SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE",
  SET_REQUEST_CONFIRMAR_VISITA = "SET_REQUEST_CONFIRMAR_VISITA",
  SET_REFERIR_VENDEDOR = "SET_REFERIR_VENDEDOR",
  SET_REQUEST_REFERIR_VENDEDOR = "SET_REQUEST_REFERIR_VENDEDOR",
  SET_VENDEDORES = "SET_VENDEDORES",
  SET_REQUEST_GET_VENDEDORES = "SET_REQUEST_GET_VENDEDORES",
  SET_REQUEST_USUARIO_CAMBIAR_CONTACTADO = "SET_REQUEST_USUARIO_CAMBIAR_CONTACTADO",
  SET_BROKERS = "SET_BROKERS",
  SET_REQUEST_GET_ALL_BROKERS = "SET_REQUEST_GET_ALL_BROKERS",
  SET_REQUEST_UPDATE_AGENDA_CLIENTE = "SET_REQUEST_UPDATE_AGENDA_CLIENTE",
  SET_REQUEST_AGENDAR_VISITA = "SET_REQUEST_AGENDAR_VISITA",
  SET_REQUEST_UPDATE_PLAN = "SET_REQUEST_UPDATE_PLAN",
  SET_REQUEST_ADD_PLAN = "SET_REQUEST_ADD_PLAN",
  SET_REQUEST_DELETE_PLAN = "SET_REQUEST_DELETE_PLAN",
  SET_REQUEST_ADD_SERVICIO_ADICIONAL = "SET_REQUEST_ADD_SERVICIO_ADICIONAL",
  SET_REQUEST_UPDATE_SERVICIO_ADICIONAL = "SET_REQUEST_UPDATE_SERVICIO_ADICIONAL",
  SET_REQUEST_DELETE_SERVICIO_ADICIONAL = "SET_REQUEST_DELETE_SERVICIO_ADICIONAL",
  SET_REQUEST_ADD_SERVICIO_BASE = "SET_REQUEST_ADD_SERVICIO_BASE",
  SET_USUARIOS_PAGINADOS = "SET_USUARIOS_PAGINADOS",
  SET_REQUEST_GET_USUARIOS_PAGINADOS = "SET_REQUEST_GET_USUARIOS_PAGINADOS",
  SET_LANDING_INMOBILIARIA = "SET_LANDING_INMOBILIARIA",
  SET_REQUEST_GET_LANDING_INMOBILIARIA = "SET_REQUEST_GET_LANDING_INMOBILIARIA",
  SET_REQUEST_POST_LANDING_INMOBILIARIA = "SET_REQUEST_POST_LANDING_INMOBILIARIA",
  SET_LANDING_INMOBILIARIAS = "SET_LANDING_INMOBILIARIAS",
  SET_REQUEST_GET_ALL_LANDING_INMOBILIARIAS = "SET_REQUEST_GET_ALL_LANDING_INMOBILIARIAS",
  SET_REQUEST_UPDATE_LANDING_INMOBILIARIA = "SET_REQUEST_UPDATE_LANDING_INMOBILIARIA";

// * DISPATCH FUNCS

const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});

const postInsertTipocontrato = (mensaje) => ({
  type: POST_INSERT_TIPO_CONTRATO,
  mensaje,
});

const getsTiposDeContrato = (tiposContrato) => ({
  type: GET_TIPOS_CONTRATOS,
  tiposContrato,
});

const resetInitialstate = (initialState) => ({
  type: RESET_INITIAL_VALUES,
  initialState,
});

const receiveSubirPropiedad = (mensaje) => ({
  type: RECEIVE_SUBIR_PROPIEDAD,
  mensaje,
});

const addCliente = (mensaje) => ({
  type: ADD_CLIENTE,
  mensaje,
});

const addUsuario = (payload) => ({
  type: ADD_USUARIO,
  payload,
});

const addInmobiliaria = (mensaje) => ({
  type: POST_ADD_INMOBILIARIA,
  mensaje,
});

const getClientes = (itemsClientes) => ({
  type: GET_ALL_CLIENTES,
  itemsClientes,
});

const getPropiedades = (itemPropiedades) => ({
  type: GET_ALL_PROPIEDADES,
  itemPropiedades,
});

const getVisitas = (itemVisitas) => ({
  type: GET_ALL_VISITAS,
  itemVisitas,
});

const getUserByRol = (itemsUsuarios) => ({
  type: GET_USER_BY_ROL,
  itemsUsuarios,
});

const addHorarioEmp = (mensaje) => ({
  type: ADD_HORARIO_EMP,
  mensaje,
});

const getRegiones = (itemRegiones) => ({
  type: GET_ALL_REGIONES,
  itemRegiones,
});

const loginUsuario = (itemUsuario) => ({
  type: POST_LOGIN_USUARIO,
  itemUsuario,
});

const getHorarioByUser = (horario) => ({
  type: GET_HORARIO_BY_USER,
  horario,
});

const clearAction = (mensaje) => ({
  type: CLEAR_ACTION,
  mensaje,
});

const updatePropiedad = (mensaje) => ({
  type: POST_UPDATE_PROPIEDAD,
  mensaje,
});

const insertInmobiliaria = (mensaje) => ({
  type: POST_INSERT_INMOBILIARIA,
  mensaje,
});

const getAllInmobiliarias = (itemInmobiliarias) => ({
  type: GET_ALL_INMOBILIARIAS,
  itemInmobiliarias,
});

const setRequestGetAllInmobiliarias = (requestGetAllInmobiliarias) => ({
  type: REQUEST_GET_ALL_INMOBILIARIAS,
  requestGetAllInmobiliarias,
});

const getUsuarios = (itemsUsuarios) => ({
  type: GET_ALL_USUARIOS,
  itemsUsuarios,
});

const logoutUsuario = (itemUsuario) => ({
  type: USUARIO_LOGOUT,
  itemUsuario,
});

const updateInmobiliaria = (mensaje) => ({
  type: PUT_UPDATE_INMOBILIARIA,
  mensaje,
});

const updateCliente = (payload) => ({
  type: PUT_UPDATE_CLIENTE,
  payload,
});

const addServicioBase = (mensaje) => ({
  type: ADD_SERVICIO_BASE,
  mensaje,
});

const getServiciosBase = (itemServicios) => ({
  type: GET_ALL_SERVICIOS_BASE,
  itemServicios,
});

const addPlan = (mensaje) => ({
  type: ADD_PLAN,
  mensaje,
});

const initialMensaje = (mensaje) => ({
  type: INITIAL_MENSAJE,
  mensaje,
});

const getPlanes = (itemPlanes) => ({
  type: GET_ALL_PLANES,
  itemPlanes,
});

const setRequestGetPlanes = (requestGetPlanes) => ({
  type: REQUEST_GET_ALL_PLANES,
  requestGetPlanes,
});

const getPlan = (plan) => ({
  type: GET_PLAN_BY_ID,
  plan,
});

const initPlan = () => ({
  type: GET_PLAN_BY_ID,
  plan: undefined,
});

const getOfertasByPublicacion = (itemOfertas) => ({
  type: GET_OFERTAS_BY_PUBLICACION,
  itemOfertas,
});

const addImagesPropiedad = (imagenesPropiedad) => ({
  type: ADD_PROPIEDADES_IMAGES,
  imagenesPropiedad,
});

const addValoracion = (valoracion) => ({
  type: ADD_VALORACION,
  valoracion,
});

const udpdatePlan = (mensaje) => ({
  type: UPDATE_PLAN,
  mensaje,
});
const udpdatePPropiedad = (mensaje) => ({
  type: UPDATE_PROPIEDAD,
  mensaje,
});

const postProyectoResAction = (mensaje) => ({
  type: POST_PROYECTO_RES,
  mensaje,
});

const putProyectoResAction = (mensaje) => ({
  type: PUT_PROYECTO_RES,
  mensaje,
});

const deletePlan = (mensaje, id) => ({
  type: DELETE_PLAN,
  payload: {
    mensaje,
    id,
  },
});

const addServicioAdcional = ({ data, mensaje }) => ({
  type: ADD_SERVICIO_ADICIONAL,
  payload: { mensaje, data },
});

const listServiciosAdicionales = (payload) => ({
  type: LIST_SERVICIOS_ADICIONALES,
  payload,
});
const DeleteServicioAdicional = (id) => ({
  type: DELETE_SERVICIO_ADICIONAL,
  id,
});
const UpdateServicioAdicional = (payload) => ({
  type: UPDATE_SERVICIO_ADICIONAL,
  payload,
});

const getAllAgendas = (agendas) => ({
  type: GET_ALL_AGENDAS,
  agendas,
});

const updateAgendasWithAnfitrion = (payload) => ({
  type: UPDATE_AGENDAS,
  payload,
});

const deletePropiedad = (payload) => ({
  type: DELETE_PROPIEDAD,
  payload,
});

const getAllProyectosAction = (itemProyectos) => ({
  type: GET_ALL_PROYECTOS,
  itemProyectos,
});

const cambiarNumeroTipologiasAction = (rowsNumberProps) => ({
  type: CHANGE_ROWS,
  rowsNumberProps,
});

const setRequestUpdateEstadoPropiedad = (requestUpdateEstadoPropiedad) => ({
  type: REQUEST_UPDATE_ESTADO_PROPIEDAD,
  requestUpdateEstadoPropiedad,
});

const setResponseMessage = (responseMessage) => ({
  type: SET_RESPONSE_MSG,
  responseMessage,
});

export const setPropiedadesPaginadas = (propiedadesPaginadas) => ({
  type: SET_PROPIEDADES_PAGINADAS,
  propiedadesPaginadas,
});

const setRequestPropiedadesPaginadas = (requestPropiedadesPaginadas) => ({
  type: REQUEST_GET_PROPIEDADES_PAGINADAS,
  requestPropiedadesPaginadas,
});

export const setPropiedad = (propiedad) => ({
  type: SET_PROPIEDAD,
  propiedad,
});

const setRequestGetPropiedad = (requestGetPropiedad) => ({
  type: REQUEST_GET_PROPIEDAD,
  requestGetPropiedad,
});

const setTarjetaProp = (tarjetaProp) => ({
  type: SET_TARJETA_PROP,
  tarjetaProp,
});

const setRequestPostTarjetaProp = (requestPostTarjetaProp) => ({
  type: REQUEST_POST_TARJETA_PROP,
  requestPostTarjetaProp,
});

const setRequestPostUploadDatosTasacion = (requestPostUploadDatosTasacion) => ({
  type: REQUEST_POST_UPLOAD_DATOS_TASACION,
  requestPostUploadDatosTasacion,
});

const setRequestDeleteAllDatosTasacion = (requestDeleteAllDatosTasacion) => ({
  type: REQUEST_DELETE_ALL_DATOS_TASACION,
  requestDeleteAllDatosTasacion,
});

const setRequestPostUploadPIPropiedades = (requestPostUploadPIPropiedades) => ({
  type: REQUEST_POST_UPLOAD_PI_PROPIEDADES,
  requestPostUploadPIPropiedades,
});

const setRequestPostAddSuscripcion = (requestPostAddSuscripcion) => ({
  type: REQUEST_POST_ADD_SUSCRIPCION,
  requestPostAddSuscripcion,
});

export const setSuscripcionExcel = (suscripcionExcel) => ({
  type: GET_SUSCRIPCION_EXPORT,
  suscripcionExcel,
});

const setRequestSuscripcionExcel = (requestSuscripcionExcel) => ({
  type: REQUEST_GET_SUSCRIPCION_EXPORT,
  requestSuscripcionExcel,
});

const setSuscripcionLastUpdated = (suscripcionLastUpdated) => ({
  type: SET_SUSCRIPCION_LAST_UPDATED,
  suscripcionLastUpdated,
});

const setRequestSuscripcionLastUpdated = (requestSuscripcionLastUpdated) => ({
  type: REQUEST_SUSCRIPCION_LAST_UPDATED,
  requestSuscripcionLastUpdated,
});

const setRequestAddUsuario = (requestAddUsuario) => ({
  type: REQUEST_ADD_USUARIO,
  requestAddUsuario,
});

const setRequestUpdateUsuario = (requestUpdateUsuario) => ({
  type: REQUEST_UPDATE_USUARIO,
  requestUpdateUsuario,
});

export const setVisitaFotografo = visitaFotografo => ({
  type: SET_VISITA_FOTOGRAFO,
  visitaFotografo
});

export const setRequestLoadingVisitaFotografo = requestLoadingVisitaFotografo => ({
  type: SET_REQUEST_LOADING_VISITA_FOTOGRAFO,
  requestLoadingVisitaFotografo
});

export const setAgendaFotografo = agendaFotografo => ({
  type: SET_AGENDA_FOTOGRAFO,
  agendaFotografo
});

export const setRequestLoadingAgendaFotografo = requestLoadingAgendaFotografo => ({
  type: SET_REQUEST_LOADING_AGENDA_FOTOGRAFO,
  requestLoadingAgendaFotografo
});

const setUsuariosFiltrados = usuariosFiltrados => ({
  type: SET_USUARIOS_FILTRADOS,
  usuariosFiltrados
});

const setRequestUsuariosFiltrados = requestUsuarioFiltrados => ({
  type: SET_REQUEST_USUARIOS_FILTRADOS,
  requestUsuarioFiltrados
});

const setAsignarBroker = propiedadBroker => ({
  type: SET_ASIGNAR_BROKER,
  propiedadBroker
});

const setRequestAsignarBroker = requestPropiedadBroker => ({
  type: SET_REQUEST_ASIGNAR_BROKER,
  requestPropiedadBroker
});

const setSuscripciones = suscripciones => ({
  type: SET_SUSCRIPCIONES,
  suscripciones
});

const setRequestSuscripciones = requestSuscripciones => ({
  type: SET_REQUEST_SUSCRIPCIONES,
  requestSuscripciones
});

export const setSuscripcion = suscripcion => ({
  type: SET_SUSCRIPCION,
  suscripcion
});

const setRequestSuscripcion = requestSuscripcion => ({
  type: SET_REQUEST_SUSCRIPCION,
  requestSuscripcion
});

export const setUpdateSuscripcion = updateSuscripcion => ({
  type: SET_UPDATE_SUSCRIPCION,
  updateSuscripcion
});

const setRequestUpdateSuscripcion = requestUpdateSuscripcion => ({
  type: SET_REQUEST_UPDATE_SUSCRIPCION,
  requestUpdateSuscripcion
});

export const setAgendaCliente = agendaCliente => ({
  type: SET_AGENDA_CLIENTE,
  agendaCliente
});

const setRequestAgendaCliente = requestAgendaCliente => ({
  type: SET_REQUEST_AGENDA_CLIENTE,
  requestAgendaCliente
});

export const setVisitasByFechaAndId = visitasCliente => ({
  type: SET_VISITAS_BY_FECHA_AND_ID,
  visitasCliente
});

const setRequestVisitasByFechaAndId = requestVisitasCliente => ({
  type: SET_REQUEST_VISITAS_BY_FECHA_AND_ID,
  requestVisitasCliente
});

const setRequestAgendarVisitaBrokerSuscriptor = requestAgendarVisitaBroker => ({
  type: SET_REQUEST_AGENDAR_VISITA_BROKER_SUSCRIPTOR,
  requestAgendarVisitaBroker
});

export const setVisitasBrokerSuscriptor = visitasBrokerSuscriptor => ({
  type: SET_VISITAS_BROKER_SUSCRIPTOR,
  visitasBrokerSuscriptor
});

const setRequestVisitasBrokerSuscriptor = requestVisitasBrokerSuscriptor => ({
  type: SET_REQUEST_VISITAS_BROKER_SUSCRIPTOR,
  requestVisitasBrokerSuscriptor
});

const setEmbajador = embajador => ({
  type: SET_EMBAJADOR,
  embajador
});

const setRequestReferirEmbajador = requestReferirEmbajador => ({
  type: SET_REQUEST_REFERIR_EMBAJADOR,
  requestReferirEmbajador
});

export const setBroker = broker => ({
  type: SET_BROKER,
  broker
});

const setRequestPostBroker = requestPostBroker => ({
  type: SET_REQUEST_POST_BROKER,
  requestPostBroker
});

const setRequestGetBroker = requestGetBroker => ({
  type: SET_REQUEST_GET_BROKER,
  requestGetBroker
});

const setRequestPutBroker = requestPutBroker => ({
  type: SET_REQUEST_PUT_BROKER,
  requestPutBroker
});

const setRequestCambioContraseña = requestCambioContraseña => ({
  type: SET_REQUEST_CAMBIO_CONTRASEÑA,
  requestCambioContraseña
});

export const setUsuario = usuario => ({
  type: SET_USUARIO,
  usuario
});

const setRequestGetUsuario = requestGetUsuario => ({
  type: SET_REQUEST_GET_USUARIO,
  requestGetUsuario
});

export const setErrorMessage = errorMessage => ({
  type: SET_ERROR_MESSAGE,
  errorMessage
});

export const setRequestConfirmarVisita = requestConfirmarVisita => ({
  type: SET_REQUEST_CONFIRMAR_VISITA,
  requestConfirmarVisita
});

const setReferirVendedor = vendedor => ({
  type: SET_REFERIR_VENDEDOR,
  vendedor
});

const setRequestReferirVendedor = requestReferirVendedor => ({
  type: SET_REQUEST_REFERIR_VENDEDOR,
  requestReferirVendedor
});

const setVendedores = vendedores => ({
  type: SET_VENDEDORES,
  vendedores
});

const setRequestGetVendedores = requestGetVendedores => ({
  type: SET_REQUEST_GET_VENDEDORES,
  requestGetVendedores
});

export const setRequestUsuarioCambiarContactado = requestCambiarContactado => ({
  type: SET_REQUEST_USUARIO_CAMBIAR_CONTACTADO,
  requestCambiarContactado
});

const setBrokers = brokers => ({
  type: SET_BROKERS,
  brokers
});

const setRequestGetAllBrokers = requestGetAllBrokers => ({
  type: SET_REQUEST_GET_ALL_BROKERS,
  requestGetAllBrokers
});

const setRequestUpdateAgendaCliente = requestUpdateAgendaCliente => ({
  type: SET_REQUEST_UPDATE_AGENDA_CLIENTE,
  requestUpdateAgendaCliente
});

const setRequestAgendarVisita = requestAgendarVisita => ({
  type: SET_REQUEST_AGENDAR_VISITA,
  requestAgendarVisita
});

const setRequestUpdatePlan = requestUpdatePlan => ({
  type: SET_REQUEST_UPDATE_PLAN,
  requestUpdatePlan
});

const setRequestAddPlan = requestAddPlan => ({
  type: SET_REQUEST_ADD_PLAN,
  requestAddPlan
});

const setRequestDeletePlan = requestDeletePlan => ({
  type: SET_REQUEST_DELETE_PLAN,
  requestDeletePlan
});

const setRequestAddServicioAdicional = requestAddServicioAdicional => ({
  type: SET_REQUEST_ADD_SERVICIO_ADICIONAL,
  requestAddServicioAdicional
});

const setRequestUpdateServicioAdicional = requestUpdateServicioAdicional => ({
  type: SET_REQUEST_UPDATE_SERVICIO_ADICIONAL,
  requestUpdateServicioAdicional
});

const setRequestDeleteServicioAdicional = requestDeleteServicioAdicional => ({
  type: SET_REQUEST_DELETE_SERVICIO_ADICIONAL,
  requestDeleteServicioAdicional
});

const setRequestAddServicioBase = requestAddServicioBase => ({
  type: SET_REQUEST_ADD_SERVICIO_BASE,
  requestAddServicioBase
});

const setUsuariosPaginados = usuariosPaginados => ({
  type: SET_USUARIOS_PAGINADOS,
  usuariosPaginados
});

const setRequestGetUsuariosPaginados = requestGetUsuariosPaginados => ({
  type: SET_REQUEST_GET_USUARIOS_PAGINADOS,
  requestGetUsuariosPaginados
});

export const setLandingInmobiliaria = landingInmobiliaria => ({
  type: SET_LANDING_INMOBILIARIA,
  landingInmobiliaria
});

const setRequestGetLandingInmobiliaria = requestGetLandingInmobiliaria => ({
  type: SET_REQUEST_GET_LANDING_INMOBILIARIA,
  requestGetLandingInmobiliaria
});

const setRequestPostLandingInmobiliaria = requestPostLandingInmobiliaria => ({
  type: SET_REQUEST_POST_LANDING_INMOBILIARIA,
  requestPostLandingInmobiliaria
});

const setLandingInmobiliarias = landingInmobiliarias => ({
  type: SET_LANDING_INMOBILIARIAS,
  landingInmobiliarias
});

const setRequestGetAllLandingInmobiliarias = requestGetAllLandingInmobiliarias => ({
  type: SET_REQUEST_GET_ALL_LANDING_INMOBILIARIAS,
  requestGetAllLandingInmobiliarias
});

const setRequestUpdateLandingInmobiliaria = requestUpdateLandingInmobiliaria => ({
  type: SET_REQUEST_UPDATE_LANDING_INMOBILIARIA,
  requestUpdateLandingInmobiliaria
});

// * FETCHING FUNCS

export const fetchGetTiposContrato = () => async (dispatch) => {
  try {
    const res = await api.apiListTiposDeContratos();
    dispatch(getsTiposDeContrato(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fecthUpdateCliente = (obj) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await api.apiUpdateCliente(obj);

    dispatch(updateCliente(res.value));
  } catch (error) {
    console.error("error: ", error);
  }
  dispatch(setLoading(false));
};

export const fetchCLearInitialstate = () => (dispatch) => {
  dispatch(resetInitialstate());
};

export const cambiarNumeroTipologias = (rowsNumberProps) => (dispatch) => {
  dispatch(cambiarNumeroTipologiasAction(rowsNumberProps));
};

export const fetchClearUserSession = () => (dispatch) => {
  dispatch(logoutUsuario([]));
};

export const fetchClearAction = () => (dispatch) => {
  dispatch(clearAction(""));
};

export const fetchAddPropiedad = (propiedad) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    console.log("--action--");
    const res = await api.fetchAddPropiedad(propiedad);
    console.log(res);

    dispatch(receiveSubirPropiedad(res));
    dispatch(setLoading(false));
  } catch (e) {
    console.log(e);
    console.error("e: ", e);
  }
};

export const fetchAddCliente = (cliente) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const resAdd = await api.apiAddCliente(cliente);

    const resFetch = await api.apiGetAllClientes();
    dispatch(addCliente(resAdd.value.mensaje));
    dispatch(getClientes(resFetch));
    dispatch(setLoading(false));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchAddUsuario = (usuario) => async (dispatch) => {
  dispatch(setRequestAddUsuario(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiAddUsuario(usuario);
    dispatch(addUsuario(res));
    dispatch(setRequestAddUsuario(REQUEST_STATE.SUCCESS));
  } catch (error) {
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestGetPlanes(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestAddUsuario(REQUEST_STATE.IDLE));
  }
};

export const fetchAddInmobiliaria = (inmobiliaria) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = {
      direccion: inmobiliaria.Direccion,
      logo: inmobiliaria.Logo,
      mail: inmobiliaria.Mail,
      nombre: inmobiliaria.Nombre,
      telefono: inmobiliaria.Telefono,
      urlInmobiliaria: inmobiliaria.UrlInmobiliaria
    };
    const res = await api.apiAddInmobiliaria(data);
    dispatch(addInmobiliaria(res.mensaje));
    dispatch(setLoading(false));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchUpdateInmobiliaria = (id, inmobiliaria) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = {
      direccion: inmobiliaria.Direccion,
      logo: inmobiliaria.Logo,
      mail: inmobiliaria.Mail,
      nombre: inmobiliaria.Nombre,
      telefono: inmobiliaria.Telefono,
      urlInmobiliaria: inmobiliaria.UrlInmobiliaria
    };
    const res = await api.apiUpdateInmobiliaria(id, data);
    dispatch(updateInmobiliaria(res.mensaje));
    dispatch(setLoading(false));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchGetAllClientes = () => async (dispatch) => {
  try {
    const res = await api.apiGetAllClientes();
    dispatch(getClientes(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchGetAllVisitas = () => async (dispatch) => {
  try {
    const res = await api.apiGetAllVisitas();
    dispatch(getVisitas(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchGetAllPropiedades = () => async (dispatch) => {
  try {
    const res = await api.apiGetAllPropiedades();
    dispatch(getPropiedades(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchGetAllInmobiliarias = () => async (dispatch) => {
  dispatch(setRequestGetAllInmobiliarias(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiGetAllInmobiliarias();
    dispatch(getAllInmobiliarias(res.data));
    dispatch(setRequestGetAllInmobiliarias(REQUEST_STATE.SUCCESS));
  } catch (error) {
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestGetAllInmobiliarias(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestGetAllInmobiliarias(REQUEST_STATE.IDLE));
  }
};

export const fetchGetUsersByRol = (rol) => async (dispatch) => {
  try {
    const res = await api.apiGetUsersByrol(rol);
    dispatch(getUserByRol(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchAddHorarioEmp = (horario) => async (dispatch) => {
  try {
    const res = await api.apiInsertHorario(horario);
    dispatch(addHorarioEmp(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchAllRegiones = () => async (dispatch) => {
  try {
    const res = await api.apiGetAllRegiones();
    dispatch(getRegiones(res));
  } catch (error) {}
};

export const fetchPostLoginUser = (pass, mail) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await api.apiLoginUsuario(pass, mail);

    dispatch(loginUsuario(res));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.error("error: ", error);
  }
};

export const fetchHorarioByUser = () => async (dispatch) => {
  try {
    const res = await api.apiGetHorarioByUser();
    dispatch(getHorarioByUser(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchPostUpdatePropiedad = (obj) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await api.apiUpdatePropiedad(obj);

    dispatch(updatePropiedad(res));
    dispatch(setLoading(false));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchPostInsertInmobiliaria = (params) => async (dispatch) => {
  try {
    const res = await api.apiInsertInmobiliaria(params);
    dispatch(insertInmobiliaria(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchGetAllUsuarios = () => async (dispatch) => {
  try {
    const res = await api.apiListUsuarios();

    dispatch(getUsuarios(res.data));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchGetInmoUsuarios = (userId) => async (dispatch) => {
  try {
    const res = await api.apiInmoUsuarios(userId);

    dispatch(getUsuarios(res.data));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fecthPostTipoContrato = (data) => async (dispatch) => {
  try {
    const res = await api.apiInsertTipoContrato(data);
    dispatch(postInsertTipocontrato(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchAddServicioBase = (servicioBase) => async (dispatch) => {
  dispatch(setRequestAddServicioBase(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiAddServicioBase(servicioBase);
    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(addServicioBase(res));
        dispatch(setRequestAddServicioBase(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje))
        dispatch(setRequestAddServicioBase(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]))
        dispatch(setRequestAddServicioBase(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestAddServicioBase(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestAddServicioBase(REQUEST_STATE.IDLE));
  }
};

export const fetchGetAllServiciosBase = () => async (dispatch) => {
  try {
    const res = await api.apiListServiciosBases();
    dispatch(getServiciosBase(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchAddPlan = (plan) => async (dispatch) => {
  dispatch(setRequestAddPlan(REQUEST_STATE.LOADING));  
  try {
    const res = await api.apiAddPlan(plan);
    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setRequestAddPlan(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje))
        dispatch(setRequestAddPlan(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]))
        dispatch(setRequestAddPlan(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestAddPlan(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestAddPlan(REQUEST_STATE.IDLE));
  }
};

export const initializeMensaje = () => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(initialMensaje({}));
  dispatch(setLoading(false));
};

export const fetchGetAllPlanes = () => async (dispatch) => {
  dispatch(setRequestGetPlanes(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiListPlanes();

    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(getPlanes(res.data.data));
        dispatch(setRequestGetPlanes(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje))
        dispatch(setRequestGetPlanes(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]))
        dispatch(setRequestGetPlanes(REQUEST_STATE.ERROR));
      }
    }    
  } catch (error) {
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestGetPlanes(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestGetPlanes(REQUEST_STATE.IDLE));
  }
};

export const fetchGetPlanById = (id) => async (dispatch) => {
  try {
    const res = await api.apiGetPlanById(id);
    dispatch(getPlan(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchGetOfertasByPublicacion = (id) => async (dispatch) => {
  try {
    const res = await api.apiGetOfertasByPublicacion(id);
    dispatch(getOfertasByPublicacion(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchAddImages = (imagenes) => (dispatch) => {
  dispatch(addImagesPropiedad(imagenes));
};
export const fetchResetImages = () => (dispatch) => {
  const imagenes = [];
  dispatch(addImagesPropiedad(imagenes));
};

export const fetchAddValoracion = (valoracion) => async (dispatch) => {
  try {
    const res = await api.apiAddValoracion(valoracion);
    dispatch(addValoracion(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchUpdatePLan = (plan) => async (dispatch) => {
  dispatch(setRequestUpdatePlan(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiUpdatePlan(plan);

    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setRequestUpdatePlan(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje))
        dispatch(setRequestUpdatePlan(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]))
        dispatch(setRequestUpdatePlan(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    console.error("error: ", error);
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestUpdatePlan(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestUpdatePlan(REQUEST_STATE.IDLE));
  }
};

export const fetchUpdatePropiedad = (propiedad) => async (dispatch) => {
  try {
    const res = await api.apiUpdatePropiedad(propiedad);
    dispatch(udpdatePPropiedad(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchDeletePlan = (id) => async (dispatch) => {
  dispatch(setRequestDeletePlan(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiDeletePlan(id);
    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(deletePlan("Plan eliminado", id));
        dispatch(setRequestDeletePlan(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje))
        dispatch(setRequestDeletePlan(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]))
        dispatch(setRequestDeletePlan(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestDeletePlan(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestDeletePlan(REQUEST_STATE.IDLE));
  }
};

export const fetchAddServicioAdicional = (ServicioAdicional) => async (
  dispatch
) => {
  dispatch(setRequestAddServicioAdicional(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiAddServicioAdicional(ServicioAdicional);
    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(addServicioAdcional(res.data));
        dispatch(setRequestAddServicioAdicional(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje))
        dispatch(setRequestAddServicioAdicional(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]))
        dispatch(setRequestAddServicioAdicional(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestAddServicioAdicional(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestAddServicioAdicional(REQUEST_STATE.IDLE));
  }
};

export const fetchListServicioAdicionals = () => async (dispatch) => {
  try {
    const res = await api.apiListServicioAdicional();
    dispatch(listServiciosAdicionales(res.data.value));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchDeleteServicioAdicional = (id) => async (dispatch) => {
  dispatch(setRequestDeleteServicioAdicional(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiDeleteServicioAdicional(id);
    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(DeleteServicioAdicional(id));
        dispatch(setRequestDeleteServicioAdicional(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje))
        dispatch(setRequestDeleteServicioAdicional(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]))
        dispatch(setRequestDeleteServicioAdicional(REQUEST_STATE.ERROR));
      }
    }
    
  } catch (error) {
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestDeleteServicioAdicional(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestDeleteServicioAdicional(REQUEST_STATE.IDLE));
  }
};

export const fetchUpdateServicioAdicional = (ServicioAdicional) => async (
  dispatch
) => {
  dispatch(setRequestUpdateServicioAdicional(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiUpdateServicioAdicional(ServicioAdicional);
    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(UpdateServicioAdicional(res.data));
        dispatch(setRequestUpdateServicioAdicional(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje))
        dispatch(setRequestUpdateServicioAdicional(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]))
        dispatch(setRequestUpdateServicioAdicional(REQUEST_STATE.ERROR));
      }
    }

  } catch (error) {
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestUpdateServicioAdicional(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestUpdateServicioAdicional(REQUEST_STATE.IDLE));
  }
};

export const fetchGetAllAgendas = () => async (dispatch) => {
  try {
    const res = await api.apiGetAllAgendas();
    dispatch(getAllAgendas(res.data.value.data));
  } catch (error) {
    console.error("error: ", error);
  }
};
export const fetchUpdateAgendasWithAnfitrion = (agenda) => async (dispatch) => {
  try {
    const res = await api.apiUpdateAgendaWithAnfitrion(agenda);

    dispatch(updateAgendasWithAnfitrion(res.data.value));
  } catch (error) {
    console.error("error: ", error);
  }
};
export const initializePlan = () => async (dispatch) => {
  try {
    dispatch(initPlan());
  } catch (error) {
    console.error("error: ", error);
  }
};
export const fetchDeletePropiedad = (id, estado) => async (dispatch) => {
  try {
    const res = await api.apiDeletePropiedad(id, estado);
    const payload = { res, id };
    dispatch(deletePropiedad(payload));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const fetchGetSignature = (meetingNumber, role, proyectoId) => async (dispatch) => {
  try {
    const res = await api.apiGetSignature(meetingNumber, role, proyectoId);
    dispatch({
      type: SIGNATURE,
      signature: res,
    });
  } catch (error) {
    console.error("error: ", error);
  }
};

export const postProyecto = (proyecto) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await api.apiPostProyecto(proyecto, proyecto.InmobiliariaId);
    dispatch(postProyectoResAction(res));
    dispatch(setLoading(false));
  } catch (e) {
    console.error("e: ", e);
  }
};

export const putProyecto = (proyecto) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await api.apiPutProyecto(proyecto, proyecto.InmobiliariaId);
    dispatch(putProyectoResAction(res));
    dispatch(setLoading(false));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const getAllProyectos = () => async (dispatch) => {
  try {
    const res = await api.getAllProyectosApi();
    dispatch(getAllProyectosAction(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const getUserProyectos = (userId) => async (dispatch) => {
  try {
    const res = await api.getUserProyectosApi(userId);
    dispatch(getAllProyectosAction(res));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const updateEstadoPropiedad = (id, data) => async (dispatch) => {
  dispatch(setRequestUpdateEstadoPropiedad(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiUpdateEstadoPropiedad(id, data);
    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setResponseMessage(res));
        dispatch(setRequestUpdateEstadoPropiedad(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje))
        dispatch(setRequestUpdateEstadoPropiedad(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]))
        dispatch(setRequestUpdateEstadoPropiedad(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    console.error("error: ", error);
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestUpdateEstadoPropiedad(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestUpdateEstadoPropiedad(REQUEST_STATE.IDLE));
  }
};

export const getPropiedadesPaginadas = (estado, idBroker, page, pageSize) => async (dispatch) => {
  dispatch(setRequestPropiedadesPaginadas(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiGetAllPropiedadesPaginadas(estado, idBroker, page, pageSize);
    dispatch(setRequestPropiedadesPaginadas(REQUEST_STATE.SUCCESS));
    dispatch(setPropiedadesPaginadas(res.data));
  } catch (error) {
    console.error("error: ", error);
    dispatch(setRequestPropiedadesPaginadas(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestPropiedadesPaginadas(REQUEST_STATE.IDLE));
  }
};

export const getPropiedadById = (id) => async (dispatch) => {
  dispatch(setRequestGetPropiedad(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiGetPropiedadById(id);
    dispatch(setRequestGetPropiedad(REQUEST_STATE.SUCCESS));
    dispatch(setPropiedad(res));
  } catch (error) {
    console.error("error: ", error);
    dispatch(setRequestGetPropiedad(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestGetPropiedad(REQUEST_STATE.IDLE));
  }
};

export const postTarjetaProp = (id) => async (dispatch) => {
  dispatch(setRequestPostTarjetaProp(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPostGenerarTarjetaProp(id);
    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setTarjetaProp(res));
        dispatch(setRequestPostTarjetaProp(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje))
        dispatch(setRequestPostTarjetaProp(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]))
        dispatch(setRequestPostTarjetaProp(REQUEST_STATE.ERROR));
      }
    }
    
  } catch (error) {
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestPostTarjetaProp(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestPostTarjetaProp(REQUEST_STATE.IDLE));
  }
};

export const postUploadDatosTasacion = (file, tipo) => async (dispatch) => {
  dispatch(setRequestPostUploadDatosTasacion(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPostUploadDatosTasacion(file, tipo);
    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setRequestPostUploadDatosTasacion(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje))
        dispatch(setRequestPostUploadDatosTasacion(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]))
        dispatch(setRequestPostUploadDatosTasacion(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    console.error("error: ", error);
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestPostUploadDatosTasacion(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestPostUploadDatosTasacion(REQUEST_STATE.IDLE));
  }
};

export const deleteAllDatosTasacion = () => async (dispatch) => {
  dispatch(setRequestDeleteAllDatosTasacion(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiDeleteAllDatosTasacion();
    dispatch(setRequestDeleteAllDatosTasacion(REQUEST_STATE.SUCCESS));
  } catch (error) {
    console.error("error: ", error);
    dispatch(setRequestDeleteAllDatosTasacion(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestDeleteAllDatosTasacion(REQUEST_STATE.IDLE));
  }
};

export const postUploadPropiedadesPI = (tipo, file) => async (dispatch) => {
  dispatch(setRequestPostUploadPIPropiedades(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPostUploadPIPropiedades(tipo, file);

    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setRequestPostUploadPIPropiedades(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje))
        dispatch(setRequestPostUploadPIPropiedades(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]))
        dispatch(setRequestPostUploadPIPropiedades(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestPostUploadPIPropiedades(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestPostUploadPIPropiedades(REQUEST_STATE.IDLE));
  }
};

export const postAddSuscripcion = (data) => async (dispatch) => {
  dispatch(setRequestPostAddSuscripcion(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPostSuscripcion(data);
    dispatch(setRequestPostAddSuscripcion(REQUEST_STATE.SUCCESS));
  } catch (error) {
    console.error("error: ", error);
    dispatch(setRequestPostAddSuscripcion(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestPostAddSuscripcion(REQUEST_STATE.IDLE));
  }
};

export const getSuscripcionExport = () => async (dispatch) => {
  dispatch(setRequestSuscripcionExcel(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiGetSuscripcionExportar();
    dispatch(setSuscripcionExcel(res));
    dispatch(setRequestSuscripcionExcel(REQUEST_STATE.SUCCESS));
  } catch (error) {
    console.error("error: ", error);
    dispatch(setRequestSuscripcionExcel(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestSuscripcionExcel(REQUEST_STATE.IDLE));
  }
};

export const getSuscripcionLastUpdated = () => async (dispatch) => {
  dispatch(setRequestSuscripcionLastUpdated(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiGetSuscripcionLastUpdated();
    dispatch(setSuscripcionLastUpdated(res));
    dispatch(setRequestSuscripcionLastUpdated(REQUEST_STATE.SUCCESS));
  } catch (error) {
    console.error("error: ", error);
    dispatch(setRequestSuscripcionLastUpdated(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestSuscripcionLastUpdated(REQUEST_STATE.IDLE));
  }
};

export const updateUsuario = (data) => async (dispatch) => {
  dispatch(setRequestUpdateUsuario(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPostUpdateUser(data);
    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setRequestUpdateUsuario(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje))
        dispatch(setRequestUpdateUsuario(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]))
        dispatch(setRequestUpdateUsuario(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestUpdateUsuario(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestUpdateUsuario(REQUEST_STATE.IDLE));
  }
};

export const getVisitasFotografoByFecha = (fecha) => async dispatch => {
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

export const getAgendaFotografo = () => async dispatch => {
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

export const getUsuariosFiltrados = (tipoCuenta) => async dispatch => {
  dispatch(setRequestUsuariosFiltrados(REQUEST_STATE.LOADING));
  try {
      const res = await api.apiGetUsuariosFiltrar(tipoCuenta);
      dispatch(setUsuariosFiltrados(res.data));
      dispatch(setRequestUsuariosFiltrados(REQUEST_STATE.SUCCESS));
  } catch (error) {
      console.error("error: ", error);
      dispatch(setRequestUsuariosFiltrados(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestUsuariosFiltrados(REQUEST_STATE.IDLE));
  }
};

export const putPropiedadAsignarBroker = (idPropiedad, idBroker) => async dispatch => {
  dispatch(setRequestAsignarBroker(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPutPropiedadAsignarBroker(idPropiedad, idBroker);
    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setAsignarBroker(res.data));
        dispatch(setRequestAsignarBroker(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje))
        dispatch(setRequestAsignarBroker(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]))
        dispatch(setRequestAsignarBroker(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
    dispatch(setErrorMessage("Ha habido un error"));
    dispatch(setRequestAsignarBroker(REQUEST_STATE.ERROR));
  } finally {
    dispatch(setRequestAsignarBroker(REQUEST_STATE.IDLE));
  }
};

export const getSuscripciones = (page, pageSize) => async dispatch => {
  dispatch(setRequestSuscripciones(REQUEST_STATE.LOADING));
  try {
      const res = await api.apiGetSuscripciones(page, pageSize);
      dispatch(setSuscripciones(res.data));
      dispatch(setRequestSuscripciones(REQUEST_STATE.SUCCESS));
  } catch (error) {
      console.error("error: ", error);
      dispatch(setRequestSuscripciones(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestSuscripciones(REQUEST_STATE.IDLE));
  }
};

export const updateSuscripcion = (id, suscripcion) => async dispatch => {
  dispatch(setRequestUpdateSuscripcion(REQUEST_STATE.LOADING));
  try {
      const res = await api.apiUpdateSuscripcion(id, suscripcion);
      dispatch(setUpdateSuscripcion(res.data));
      dispatch(setRequestUpdateSuscripcion(REQUEST_STATE.SUCCESS));
  } catch (error) {
      console.error("error: ", error);
      dispatch(setRequestUpdateSuscripcion(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestUpdateSuscripcion(REQUEST_STATE.IDLE));
  }
};

export const getAgendaClienteByPropiedadId = (idPropiedad) => async dispatch => {
  dispatch(setRequestAgendaCliente(REQUEST_STATE.LOADING));
  try {
      const res = await api.apiGetAgendaClienteByPropiedadId(idPropiedad);
      dispatch(setAgendaCliente(res.data));
      dispatch(setRequestAgendaCliente(REQUEST_STATE.SUCCESS));
  } catch (error) {
      console.error("error: ", error);
      dispatch(setRequestAgendaCliente(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestAgendaCliente(REQUEST_STATE.IDLE));
  }
};

export const getVisitasClienteByFechaAndId = (fecha, id) => async dispatch => {
  dispatch(setRequestVisitasByFechaAndId(REQUEST_STATE.LOADING));
  try {
      const res = await api.apiGetVisitasClienteByFechaYId(id, fecha);
      dispatch(setVisitasByFechaAndId(res.data));
      dispatch(setRequestVisitasByFechaAndId(REQUEST_STATE.SUCCESS));
  } catch (error) {
      console.error("error: ", error);
      dispatch(setRequestVisitasByFechaAndId(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestVisitasByFechaAndId(REQUEST_STATE.IDLE));
  }
};

export const postAgendarVisitaBrokerSuscriptor = (data) => async dispatch => {
  dispatch(setRequestAgendarVisitaBrokerSuscriptor(REQUEST_STATE.LOADING));
  try {
      const res = await api.apiPostAgendarVisitaBrokerSuscriptor(data);
      dispatch(setRequestAgendarVisitaBrokerSuscriptor(REQUEST_STATE.SUCCESS));
  } catch (error) {
      console.error("error: ", error);
      dispatch(setRequestAgendarVisitaBrokerSuscriptor(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestAgendarVisitaBrokerSuscriptor(REQUEST_STATE.IDLE));
  }
};

export const getVisitasFiltradas = (fechaInicial, fechaFinal, idBroker, idSuscripcion, mostrarSoloSinConfirmar, mostrarSoloTramos, incluirVisitasPasadas, incluirVisitasFuturas) => async dispatch => {
  dispatch(setRequestVisitasBrokerSuscriptor(REQUEST_STATE.LOADING));
  try {
      const res = await api.apiGetVisitasFiltradas(fechaInicial, fechaFinal, idBroker, idSuscripcion, mostrarSoloSinConfirmar, mostrarSoloTramos, incluirVisitasPasadas, incluirVisitasFuturas);
      dispatch(setVisitasBrokerSuscriptor(res.data));
      dispatch(setRequestVisitasBrokerSuscriptor(REQUEST_STATE.SUCCESS));
  } catch (error) {
      console.error("error: ", error);
      dispatch(setRequestVisitasBrokerSuscriptor(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestVisitasBrokerSuscriptor(REQUEST_STATE.IDLE));
  }
};

export const getSuscripcion = (id) => async dispatch => {
  dispatch(setRequestSuscripcion(REQUEST_STATE.LOADING));
  try {
      const res = await api.apiGetSuscripcion(id);
      dispatch(setSuscripcion(res.data));
      dispatch(setRequestSuscripcion(REQUEST_STATE.SUCCESS));
  } catch (error) {
      console.error("error: ", error);
      dispatch(setRequestSuscripcion(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestSuscripcion(REQUEST_STATE.IDLE));
  }
};

export const postReferirEmbajador = (data) => async dispatch => {
  dispatch(setRequestReferirEmbajador(REQUEST_STATE.LOADING));
  try {
      const res = await api.apiPostReferirEmbajador(data);
      if (res && res.data) {
        if (res.data.estado == 1) {
          dispatch(setEmbajador(res.data));
          dispatch(setRequestReferirEmbajador(REQUEST_STATE.SUCCESS));
        } else {
          dispatch(setErrorMessage(res.data.mensaje))
          dispatch(setRequestReferirEmbajador(REQUEST_STATE.ERROR));
        }
      } else {
        if (res.status) {
          dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]))
          dispatch(setRequestReferirEmbajador(REQUEST_STATE.ERROR));
        }
      }      
  } catch (error) {
      console.error("error: ", error);
      dispatch(setErrorMessage("Ha habido un error"));
      dispatch(setRequestReferirEmbajador(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestReferirEmbajador(REQUEST_STATE.IDLE));
  }
};

export const postBroker = (data) => async dispatch => {
  dispatch(setRequestPostBroker(REQUEST_STATE.LOADING));
  try {
      const res = await api.apiPostBroker(data);
      dispatch(setBroker(res.data));
      dispatch(setRequestPostBroker(REQUEST_STATE.SUCCESS));
  } catch (error) {
      console.error("error: ", error);
      dispatch(setRequestPostBroker(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestPostBroker(REQUEST_STATE.IDLE));
  }
};

export const getBrokerByEmail = (email) => async dispatch => {
  dispatch(setRequestGetBroker(REQUEST_STATE.LOADING));
  try {
      const res = await api.apiGetBrokerByEmail(email);
      dispatch(setBroker(res.data));
      dispatch(setRequestGetBroker(REQUEST_STATE.SUCCESS));
  } catch (error) {
      console.error("error: ", error);
      dispatch(setRequestGetBroker(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestGetBroker(REQUEST_STATE.IDLE));
  }
};

export const putBroker = (id, broker) => async dispatch => {
  dispatch(setRequestPutBroker(REQUEST_STATE.LOADING));
  try {
      const res = await api.apiPutBroker(id, broker);
      dispatch(setBroker(res.data));
      dispatch(setRequestPutBroker(REQUEST_STATE.SUCCESS));
  } catch (error) {
      console.error("error: ", error);
      dispatch(setRequestPutBroker(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestPutBroker(REQUEST_STATE.IDLE));
  }
};

export const postCambiarContraseña = (data) => async dispatch => {
  dispatch(setRequestCambioContraseña(REQUEST_STATE.LOADING));
    try {
      const res = await api.apiPostCambiarContraseña(data);
      if (res != null && res.estado != null && res.estado == 1) {
        dispatch(setRequestCambioContraseña(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setRequestCambioContraseña(REQUEST_STATE.ERROR));
        if (res != null && res.mensaje != null && res.mensaje != undefined) {
          dispatch(setErrorMessage(res.mensaje))
        } else {
          dispatch(setErrorMessage("Ha habido un error cambiando su contraseña. Verifique que la contraseña antigua ingresada sea la correcta e inténtelo de nuevo"))
        }
      }
    } catch (error) {
      console.error("error: ", error);
      dispatch(setErrorMessage("Ha habido un error cambiando su contraseña. Verifique que la contraseña antigua ingresada sea la correcta e inténtelo de nuevo"))
      dispatch(setRequestCambioContraseña(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestCambioContraseña(REQUEST_STATE.IDLE));
  }
};

export const getUsuario = () => async dispatch => {
  dispatch(setRequestGetUsuario(REQUEST_STATE.LOADING));
  try {
      const res = await api.apiGetUsuario();
      dispatch(setUsuario(res.data));
      dispatch(setRequestGetUsuario(REQUEST_STATE.SUCCESS));
  } catch (error) {
      console.error("error: ", error);
      dispatch(setRequestGetUsuario(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestGetUsuario(REQUEST_STATE.IDLE));
  }
};

export const confirmarVisita = (idVisita, visitaRealizada) => async dispatch => {
  dispatch(setRequestConfirmarVisita(REQUEST_STATE.LOADING));
  try {
      const res = await api.apiPutConfirmarVisita(idVisita, visitaRealizada);
      dispatch(setRequestConfirmarVisita(REQUEST_STATE.SUCCESS));
  } catch (error) {
      console.error("error: ", error);
      dispatch(setRequestConfirmarVisita(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestConfirmarVisita(REQUEST_STATE.IDLE));
  }
};

export const postReferirVendedor = (data) => async dispatch => {
  dispatch(setRequestReferirVendedor(REQUEST_STATE.LOADING));
  try {
      const res = await api.apiPostReferirVendedor(data);
      dispatch(setReferirVendedor(res));
      dispatch(setRequestReferirVendedor(REQUEST_STATE.SUCCESS));
  } catch (error) {
      console.error("error: ", error);
      dispatch(setRequestReferirVendedor(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestReferirVendedor(REQUEST_STATE.IDLE));
  }
};

export const getVendedores = (page, rowsPerPage) => async dispatch => {
  dispatch(setRequestGetVendedores(REQUEST_STATE.LOADING));
  try {
      const res = await api.apiGetVendedores(page, rowsPerPage);
      dispatch(setVendedores(res.data));
      dispatch(setRequestGetVendedores(REQUEST_STATE.SUCCESS));
  } catch (error) {
      console.error("error: ", error);
      dispatch(setRequestGetVendedores(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestGetVendedores(REQUEST_STATE.IDLE));
  }
};

export const putUsuarioCambiarContactado = (idUsuario) => async dispatch => {
  dispatch(setRequestUsuarioCambiarContactado(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPutUsuarioCambiarContactado(idUsuario);

    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setRequestUsuarioCambiarContactado(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje))
        dispatch(setRequestUsuarioCambiarContactado(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]))
        dispatch(setRequestUsuarioCambiarContactado(REQUEST_STATE.ERROR));
      }
    }

  } catch (error) {
      console.error("error: ", error);
      dispatch(setErrorMessage("Ha habido un error"))
      dispatch(setRequestUsuarioCambiarContactado(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestUsuarioCambiarContactado(REQUEST_STATE.IDLE));
  }
};

export const getAllBrokers = () => async dispatch => {
  dispatch(setRequestGetAllBrokers(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiGetAllBrokers();
    if (res != null && res.estado != null && res.estado == 1) {
      dispatch(setRequestGetAllBrokers(REQUEST_STATE.SUCCESS));
      dispatch(setBrokers(res.data));
    } else {
      dispatch(setRequestGetAllBrokers(REQUEST_STATE.ERROR));
      if (res != null && res.mensaje != null && res.mensaje != undefined) {
        dispatch(setErrorMessage(res.mensaje))
      } else {
        dispatch(setErrorMessage("Ha habido un error con tu solicitud"))
      }
    }
  } catch (error) {
      console.error("error: ", error);
      dispatch(setErrorMessage("Ha habido un error con tu solicitud"))
      dispatch(setRequestGetAllBrokers(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestGetAllBrokers(REQUEST_STATE.IDLE));
  }
};

export const updateAgendaCliente = (data) => async dispatch => {
  dispatch(setRequestUpdateAgendaCliente(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiUpdateClienteAgenda(data);
    if (res != null && res.estado != null && res.estado == 1) {
      dispatch(setRequestUpdateAgendaCliente(REQUEST_STATE.SUCCESS));
    } else {
      dispatch(setRequestUpdateAgendaCliente(REQUEST_STATE.ERROR));
      if (res != null && res.mensaje != null && res.mensaje != undefined) {
        dispatch(setErrorMessage(res.mensaje))
      } else {
        dispatch(setErrorMessage("Ha habido un error actualizando la agenda. Inténtelo de nuevo más tarde"))
      }
    }
  } catch (error) {
      console.error("error: ", error);
      dispatch(setErrorMessage("Ha habido un error actualizando la agenda. Inténtelo de nuevo más tarde"))
      dispatch(setRequestUpdateAgendaCliente(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestUpdateAgendaCliente(REQUEST_STATE.IDLE));
  }
};

export const postAgendarVisitaUsuario = (data) => async dispatch => {
  dispatch(setRequestAgendarVisita(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPostAgendaVisitaUsuario(data);

    if (res && res.data) {
      if (res.data.estado == 1) {
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
      dispatch(setErrorMessage("Ha habido un error actualizando la agenda. Inténtelo de nuevo más tarde"))
      dispatch(setRequestAgendarVisita(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestAgendarVisita(REQUEST_STATE.IDLE));
  }
};

export const getUsuariosPaginados = (pageSize, page, tipoCuenta, referidoPor, soloEmbajadores) => async dispatch => {
  dispatch(setRequestGetUsuariosPaginados(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiGetUsuariosPaginados(pageSize, page, tipoCuenta, referidoPor, soloEmbajadores);
    if (res != null && res.estado != null && res.estado == 1) {
      dispatch(setUsuariosPaginados(res.data))
      dispatch(setRequestGetUsuariosPaginados(REQUEST_STATE.SUCCESS));
    } else {
      dispatch(setRequestGetUsuariosPaginados(REQUEST_STATE.ERROR));
      if (res != null && res.mensaje != null && res.mensaje != undefined) {
        dispatch(setErrorMessage(res.mensaje))
      } else {
        dispatch(setErrorMessage("Ha habido un error consultando los usuarios. Vuelva a intentarlo más tarde"))
      }
    }
  } catch (error) {
      console.error("error: ", error);
      dispatch(setErrorMessage("Ha habido un error consultando los usuarios. Vuelva a intentarlo más tarde"))
      dispatch(setRequestGetUsuariosPaginados(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestGetUsuariosPaginados(REQUEST_STATE.IDLE));
  }
};

export const getLandingInmobiliariaById = (id) => async dispatch => {
  dispatch(setRequestGetLandingInmobiliaria(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiGetLandingInmobiliariaById(id);

    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setLandingInmobiliaria(res.data))
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
      dispatch(setErrorMessage("Ha habido un error"))
      dispatch(setRequestGetLandingInmobiliaria(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestGetLandingInmobiliaria(REQUEST_STATE.IDLE));
  }
};

export const postLandingInmobiliaria = (data) => async dispatch => {
  dispatch(setRequestPostLandingInmobiliaria(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPostLandingInmobiliaria(data);

    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setLandingInmobiliaria(res.data))
        dispatch(setRequestPostLandingInmobiliaria(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje));
        dispatch(setRequestPostLandingInmobiliaria(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]));
        dispatch(setRequestPostLandingInmobiliaria(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
      console.error("error: ", error);
      dispatch(setErrorMessage("Ha habido un error"))
      dispatch(setRequestPostLandingInmobiliaria(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestPostLandingInmobiliaria(REQUEST_STATE.IDLE));
  }
};

export const getAllLandingInmobiliarias = () => async dispatch => {
  dispatch(setRequestGetAllLandingInmobiliarias(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiGetLandingInmobiliarias();

    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setLandingInmobiliarias(res.data.data));
        dispatch(setRequestGetAllLandingInmobiliarias(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje));
        dispatch(setRequestGetAllLandingInmobiliarias(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]));
        dispatch(setRequestGetAllLandingInmobiliarias(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
      console.error("error: ", error);
      dispatch(setErrorMessage("Ha habido un error"))
      dispatch(setRequestGetAllLandingInmobiliarias(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestGetAllLandingInmobiliarias(REQUEST_STATE.IDLE));
  }
};

export const updateLandingInmobiliaria = (id, data) => async dispatch => {
  dispatch(setRequestUpdateLandingInmobiliaria(REQUEST_STATE.LOADING));
  try {
    const res = await api.apiPutLandingInmobiliaria(id, data);

    if (res && res.data) {
      if (res.data.estado == 1) {
        dispatch(setLandingInmobiliaria(res.data))
        dispatch(setRequestUpdateLandingInmobiliaria(REQUEST_STATE.SUCCESS));
      } else {
        dispatch(setErrorMessage(res.data.mensaje));
        dispatch(setRequestUpdateLandingInmobiliaria(REQUEST_STATE.ERROR));
      }
    } else {
      if (res.status) {
        dispatch(setErrorMessage(STANDARD_ERROR_MESSAGES[res.status]));
        dispatch(setRequestUpdateLandingInmobiliaria(REQUEST_STATE.ERROR));
      }
    }
  } catch (error) {
      console.error("error: ", error);
      dispatch(setErrorMessage("Ha habido un error"))
      dispatch(setRequestUpdateLandingInmobiliaria(REQUEST_STATE.ERROR));
    } finally {
      dispatch(setRequestUpdateLandingInmobiliaria(REQUEST_STATE.IDLE));
  }
};
