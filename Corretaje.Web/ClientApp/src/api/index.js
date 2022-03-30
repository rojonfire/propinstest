import axios from "axios";
import { urlService } from "../utils/url";

if (window.localStorage.bearer && window.localStorage.bearer !== "") {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${window.localStorage.bearer}`;
}

const setBearer = (bearer) => {
  if (bearer) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${bearer}`;
    window.localStorage.bearer = bearer;
  } else {
    delete axios.defaults.headers.common["Authorization"];
    delete window.localStorage.bearer;
  }
};

const apiGetPropiedades = async (query) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Propiedad/BusquedaPropiedades`,
      data: query,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetPropiedad = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Propiedad/${id}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetProyectos = async (query) => {
  let data = {
    inmobiliariaId: query.idInmo,
    estado: parseInt(query.estadoPro),
    tipoProyecto: query.tipoProyecto,
    comuna: query.direccion,
    operacion: query.tipoOperacion,
  };
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/ProyectoInmobiliario/BusquedaProyectos`,
      data: data,
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetPropiedadInfo = async (query, clienteId) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Propiedad/BusquedaPropiedadHome?propiedadId=${query}&clienteId=${clienteId}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetUsuarioByMail = async (mail, token) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Usuario/UsuarioByEmail?mail=${mail}&token=${token}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetUsuarioByGmail = async (mail, token) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Usuario/UsuarioByGmail?mail=${mail}&token=${token}`,
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetHorarioByUser = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Horario/GetHorariosByUser?userId=${id}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetPayment = async (dato) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/OrdenDeCompra/AgregarOrdenDeCompra`,
      data: dato,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiPostTicket = async (ticket) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Ticket`,
      data: ticket,
    });

    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiPostCreaCuenta = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Usuario`,
      data,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiPostCreaProper = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Proper`,
      data,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const GetReferidoById = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Proper/GetReferidoById/${id}`,
    });
    return res.data.value;
  } catch (error) {
    console.log(error);
  }
};

const apiUpdateReferido = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Proper/UpdateReferido`,
      data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const apiGetPropiedadesId = async (data) => {
  console.log(data);
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Propiedad/PropiedadesReferidas`,
      data,
    });
    return res.data.value.data;
  } catch (error) {
    console.log(error);
  }
};

const apiPostLogin = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Usuario/LoginUsuarioWeb`,
      data: data,
    });

    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiUpdateProper = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Proper/UpdateProper`,
      data,
    });
    return res.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

const apiPostUpdateUser = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Usuario/UpdateUsuario`,
      data,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiPostCreaTasacion = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Tasacion`,
      data,
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetProperById = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Proper/GetProperById/${id}`,
    });
    return res.data.value.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

const apiReferir = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Proper/Referir`,
      data,
    });
    return res.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

const apiGetUsuarioById = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Usuario/GetUsuarioById/${id}`,
    });

    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetUsuario = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Usuario/GetUsuario/`,
    });

    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetPlanes = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/ServicioBase/GetTodosLosServiciosBaseParaProcesoDeCompra`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetTodosLosPlanes = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Plan`,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiGetPlanById = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Plan/${id}`,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiGetServiciosAdicionales = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/ServicioAdicional/GetAllServiciosAdicionales`,
    });

    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiLogin = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Usuario/LoginUsuarioWeb`,
      data: {
        email: email,
        password: password,
      },
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiAddHorarioFotografo = async (obj) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/AgendarVisita/AddAgendarVisita`,
      data: obj,
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiAddOferta = async (values) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Oferta/AgregarOferta`,
      data: values,
    });

    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetHorariosFotografo = async (values) => {
  const { fechad, fechah, estado } = values;

  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/AgendarVisita/GetAllVisitasAgendadasByEstadoAndRangoDeFechas?estado=${estado}&fechaInicio=${fechad}&fechaFin=${fechah}`,
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetPropiedadesDestacadas = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Propiedad/PropiedadesDestacadasHome?limit=5`,
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};
const apiGetUF = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/SBIF`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetOfertasPropiedades = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Oferta/GetOfertasVigentesByPropietarioId?propietarioId=${id}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetOfertasPropiedadesByOfertador = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Oferta/GetOfertaByOfertadorId?ofertadorId=${id}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetVisitas = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Agenda/GetVisitas?id=${id}`,
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiDeleteVisita = async (id, tipo) => {
  try {
    const call = tipo === "FOTO" ? "CancelarVisitaFotografo" : "CancelarVisita";
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Agenda/${call}?visitaId=${id}`,
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiAceptarOferta = async (id) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${urlService}/api/Oferta/AceptarOferta?ofertaId=${id}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

//contraofertar
const apiContraofertar = async (id, monto) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${urlService}/api/Oferta/UpdateOfertaEstado?ofertaId=${id}&monto=${monto}`,
    });

    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiDeclinarOferta = async (id) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${urlService}/api/Oferta/DeclinarOferta?ofertaId=${id}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetContratoArriendo = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Contrato/GetPdfContratoDeArrendamiento`,
      data: data,
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetContratoVenta = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Contrato/GetPdfPromesaDeCompraVenta`,
      data: data,
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiPostRestablecer = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Usuario/RestablecerContraseña?password=${data.password}&email=${data.email}`,
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiValidaToken = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/RecuperarCuenta?id=${id}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiPostRecuperar = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/RecuperarCuenta`,
      data,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetTasacionesByUserId = async (userId) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Tasacion?idUser=${userId}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetTasacionBase64 = async (tasacionId) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Tasacion/GetPdf?id=${tasacionId}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiPostAgregarOrdenSinAddins = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/OrdenDeCompra/AgregarOrdenDeCompraSinAddins`,
      data: data,
    });

    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiPostUpdateContratoAval = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Contrato/Update`,
      data,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiPostVerificaCedula = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Usuario/ValidaCedula`,
      data,
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiVerificaVisitaFotografos = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Agenda/VerificaVisitaFotografo?userId=${id}`,
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiPostArmaAgendaCliente = async (data) => {
  try {
    /*const res = await axios({
          method: "POST",
          url: `${urlService}/api/Agenda/UpdateBloquesCliente`, //AddBloquesUsuario,
          data
        });*/

    const res = await axios.put(
      `${urlService}/api/Agenda/UpdateBloquesCliente`,
      [...data]
    );

    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiPostNotificacionOrdenCompra = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/OrdenDeCompra/NotificarRespuestaTransaccion`,
      data,
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiPostAgendaVisitaUsuario = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Agenda/AgendarVisita`,
      data,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiPostAgendaVisitaAgente = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Agenda/AgendarVisitaAgente`,
      data,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiPostAgendaVisitaFotografo = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Agenda/AgendarVisitaFotografo`,
      data,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetAgendaCliente = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Agenda/GetBloquesCliente?id=${id}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetAgendaClienteByPropiedadId = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Agenda/GetBloquesClienteByPropiedadId?propiedadId=${id}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetAgendaAllBLoquesProyecto = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Agenda/GetAllBloquesAgenteByProjectId?proyectoId=${id}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetAgendaFotografo = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Agenda/GetBloquesFotografos`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetVisitasFotografoByFecha = async (fecha) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Agenda/GetVisitasFotografo/${fecha}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetVisitasClienteByFechaYId = async (id, fecha) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Agenda/GetVisitas/${id}/${fecha}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const botQnAReply = async (question) => {
  var newQ = { question: question };
  try {
    const res = await axios({
      method: "POST",
      url: `https://qnacorretaje.azurewebsites.net/qnamaker/knowledgebases/31c21ffd-8ccd-4a70-b166-56537f95c241/generateAnswer`,
      data: newQ,
      headers: {
        Authorization: `EndpointKey 7de3a596-c039-4d81-9150-5b782c229d1d`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const setSubscription = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Suscripcion`,
      data,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiAddServicioAdicional = async (id, data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/OrdenDeCompra/AgregarServicioAdicional?ordenCompraId=${id}`,
      data,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetSignature = async (meetConfig, role, proyectoId) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/zoom/meeting/connectionsignature?meetingNumber=${meetConfig}&role=${role}&proyectoInmobiliarioId=${proyectoId}`,
    });
    return res.data.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetInmobiliaria = async (inmobiliariaId) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Inmobiliaria/${inmobiliariaId}`,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiPostCalificacionAgente = async (calificacion) => {
  try {
    return await axios({
      method: "Post",
      url: `${urlService}/api/Anfitrion`,
      data: calificacion,
    });
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiPostCalificacionProyecto = async (calificacion) => {
  try {
    return await axios({
      method: "Post",
      url: `${urlService}/api/ProyectoInmobiliario/Evaluar`,
      data: calificacion,
    });
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetUnProyecto = async (proyectoId) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/ProyectoInmobiliario/${proyectoId}`,
    });
    return res.data.data;
  } catch (error) {
    return error.response.data;
  }
};

const apiGetEvaluacion = async (proyectoId) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/ProyectoInmobiliario/Evaluar/GetEvaluacion/${proyectoId}`,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const apiGetCitaUsuario = async (usuarioId, proyectoInmobiliarioId) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Agenda/GetCitaUsuario?usuarioId=${usuarioId}&proyectoInmobiliarioId=${proyectoInmobiliarioId}`,
    });
    return res.data.value.data;
  } catch (error) {
    return error.response.data;
  }
};

const apiGetAllCitas = async (proyectoId) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Agenda/GetCitasProyecto?proyectoInmobiliarioId=${proyectoId}`,
    });
    return res.data.value.data;
  } catch (error) {
    return error.response.data;
  }
};

const apiContratarPlan = async (planDetails) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/ContratacionPlan`,
      data: planDetails,
    });
    return res.data.value;
  } catch (error) {
    return error.response.data;
  }
};

const apiGetServiciosAdicionalesByPlanId = async (idPlan) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/servicioAdicional/getserviciosadicionalesbyplanid?planId=${idPlan}`,
    });
    return res.data.value;
  } catch (error) {
    return error.response.data;
  }
};

const apiGetPropiedadesByClienteId = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/propiedad/GetPropiedadesByClienteId`,
    });
    return res.data.value;
  } catch (error) {
    return error.response.data;
  }
};

const apiPostContratarServiciosAdicionales = async (
  idPropiedad,
  serviciosAdicionales
) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/ContratacionPlan/ContratarServiciosAdicionales?IdPropiedad=${idPropiedad}`,
      data: serviciosAdicionales,
    });
    return res.data.value;
  } catch (error) {
    return error.response.data;
  }
};

const apiPostTasarPropiedad = async (tipo, datosPropiedad) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Tasacion/GetTasacion?tipo=${tipo}`,
      data: datosPropiedad,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiGetPropiedadesSimilaresTasacion = async (
  tipo,
  datosPropiedad,
  pageSize,
  page
) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/DatosTasacion/GetPropiedadesSimilares?page=${page}&pageSize=${pageSize}&tipo=${tipo}`,
      data: datosPropiedad,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiGetValoresPreliminaresTasacion = async (datosPropiedad, tipo) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/DatosTasacion/GetValoresPreliminares?tipo=${tipo}`,
      data: datosPropiedad,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiPostSuscripcion = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/suscripcion`,
      data: data,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiPostTasacionPropiedad = async (idPropiedad) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/tasacion/GetTasacionPropiedad?idPropiedad=${idPropiedad}`,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiFindTasacionByPropiedadId = async (idPropiedad) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/tasacion/GetByPropiedadId?idPropiedad=${idPropiedad}`,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiGetVisitasByPropiedadId = async (idPropiedad) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/agenda/getVisitasByPropiedadId?idPropiedad=${idPropiedad}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiPostIncrementarVisitasVirtuales = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/agenda/IncrementarVisitaVirtual`,
      data: data,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetVisitasVirtualesByPropiedadAndPeriodo = async (
  idPropiedad,
  periodo
) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/agenda/GetVisitasVirtualesByPropiedadAndPeriodo?idPropiedad=${idPropiedad}&periodo=${periodo}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetOfertasByPublicacionId = async (idPublicacion) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/oferta/GetOfertasByPublicacionId?publicacionId=${idPublicacion}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiPostCambiarContraseña = async (usuarioData) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/usuario/CambiarContraseña`,
      data: usuarioData,
    });
    return res.data.value;
  } catch (error) {
    return error.response.data.value;
  }
};

const apiPutSerEmbajador = async () => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${urlService}/api/usuario/QuieroSerEmbajador`,
    });
    return res.data.value;
  } catch (error) {
    return error.response.data.value;
  }
};

const apiPostReferirVendedor = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/usuario/ReferirVendedor`,
      data,
    });

    return res;
  } catch (error) {
    return error.response;
  }
};

const apiPutActualizarDatosBancarios = async (data) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${urlService}/api/usuario/datosbancarios`,
      data,
    });

    return res.data.value;
  } catch (error) {
    return error.response.data.value;
  }
};

const apiGetLandingInmobiliariaByPathname = async (pathname) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/landinginmobiliaria/getbypathname?pathname=${pathname}`
    });

    return res;
  } catch (error) {
    return error.response;
  }
};

export default {
  apiAddServicioAdicional,
  apiGetVisitasFotografoByFecha,
  apiGetVisitasClienteByFechaYId,
  apiGetAgendaFotografo,
  apiPostAgendaVisitaFotografo,
  apiPostAgendaVisitaUsuario,
  setBearer,
  apiPostNotificacionOrdenCompra,
  apiPostVerificaCedula,
  apiGetPropiedades,
  apiGetPropiedad,
  apiGetProyectos,
  apiPostUpdateContratoAval,
  apiGetPropiedadInfo,
  apiGetHorarioByUser,
  apiGetPayment,
  apiLogin,
  apiPostTicket,
  apiUpdateProper,
  apiAddHorarioFotografo,
  apiAddOferta,
  apiGetHorariosFotografo,
  apiPostCreaCuenta,
  apiPostCreaProper,
  GetReferidoById,
  apiGetPropiedadesId,
  apiUpdateReferido,
  apiGetProperById,
  apiReferir,
  apiPostRestablecer,
  apiPostRecuperar,
  apiGetVisitas,
  apiDeleteVisita,
  apiPostLogin,
  apiGetPlanes,
  apiGetTodosLosPlanes,
  apiGetPlanById,
  apiValidaToken,
  apiGetServiciosAdicionales,
  apiGetOfertasPropiedades,
  apiAceptarOferta,
  apiContraofertar,
  apiDeclinarOferta,
  apiGetPropiedadesDestacadas,
  apiGetUF,
  apiGetContratoArriendo,
  botQnAReply,
  apiGetOfertasPropiedadesByOfertador,
  apiGetContratoVenta,
  apiPostCreaTasacion,
  apiGetTasacionesByUserId,
  apiGetTasacionBase64,
  apiPostAgregarOrdenSinAddins,
  apiGetUsuarioById,
  apiPostUpdateUser,
  apiGetUsuarioByMail,
  apiGetUsuarioByGmail,
  apiPostArmaAgendaCliente,
  apiGetAgendaCliente,
  apiGetAgendaClienteByPropiedadId,
  apiVerificaVisitaFotografos,
  apiGetSignature,
  setSubscription,
  apiGetInmobiliaria,
  apiPostCalificacionAgente,
  apiPostCalificacionProyecto,
  apiGetUnProyecto,
  apiGetAgendaAllBLoquesProyecto,
  apiPostAgendaVisitaAgente,
  apiGetEvaluacion,
  apiGetCitaUsuario,
  apiGetAllCitas,
  apiContratarPlan,
  apiGetServiciosAdicionalesByPlanId,
  apiGetPropiedadesByClienteId,
  apiGetUsuario,
  apiPostContratarServiciosAdicionales,
  apiPostTasarPropiedad,
  apiGetPropiedadesSimilaresTasacion,
  apiGetValoresPreliminaresTasacion,
  apiPostSuscripcion,
  apiPostTasacionPropiedad,
  apiFindTasacionByPropiedadId,
  apiGetVisitasByPropiedadId,
  apiPostIncrementarVisitasVirtuales,
  apiGetVisitasVirtualesByPropiedadAndPeriodo,
  apiGetOfertasByPublicacionId,
  apiPostCambiarContraseña,
  apiPutSerEmbajador,
  apiPostReferirVendedor,
  apiPutActualizarDatosBancarios,
  apiGetLandingInmobiliariaByPathname
};