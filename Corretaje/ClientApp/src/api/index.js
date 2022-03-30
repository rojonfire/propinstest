/** @format */

import axios from "axios";
import { urlService } from "../utils/url";
import { authHeader } from "../../src/utils/AuthHeader";

axios.defaults.headers.common["Authorization"] = authHeader();

const fetchAddPropiedad = async propiedad => {
  try {
    console.log("--api--");
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Propiedad`,
      data: propiedad
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    console.error("error: ", error);
  }
};

const apiAddUsuario = async usuario => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Usuario`,
      data: usuario
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiAddInmobiliaria = async inmobiliaria => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Inmobiliaria`,
      data: inmobiliaria
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiUpdateInmobiliaria = async (id, inmobiliaria) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${urlService}/api/Inmobiliaria?id=${id}`,
      data: inmobiliaria
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiAddCliente = async cliente => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Cliente`,
      data: cliente
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetAllClientes = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Cliente`
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
};

const apiGetUsersByrol = async rol => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Usuario/GetUsuarioPorRol?rol=${rol}`
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
};

const apiGetAllPropiedades = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Propiedad/GetPropiedadCliente`
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
};

const apiGetAllInmobiliarias = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Inmobiliaria`
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
};

const apiGetAllVisitas = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Visita/GetVisitas`
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
};

const apiInsertHorario = async horario => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Horario`,
      data: horario
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetAllRegiones = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Utils/GetRegiones`
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
};

const apiLoginUsuario = async (pass, mail) => {
  try {
    const usuario = {
      email: mail,
      password: pass
    };
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/BackOffice/Login`,
      data: usuario
    });

    const { data, estado, mensaje } = res.data.value;
    const validRes =
      mensaje === "Login Correcto" && estado === 1
        ? {
            Usr: {
              Nombres: data.nombres,
              Mail: data.email,
              Token: data.token,
              userId: data.id,
              // OrdenesCompra: data.ordenesCompra,
              Rut: data.rut,
              tipoCuenta: data.tipoCuenta,
              InmobiliariaId: data.inmobiliariaId
            },
            Estado: estado,
            Mensaje: mensaje
          }
        : { Usr: null, Estado: estado, Mensaje: mensaje };

    if (estado === 1) {
      localStorage.setItem("user", JSON.stringify(validRes.Usr));
      axios.defaults.headers.common["Authorization"] = authHeader();
    }

    return [validRes];
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
};

const apiGetHorarioByUser = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Horario`
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
};

const apiUpdatePropiedad = async obj => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${urlService}/api/Propiedad`,
      data: obj
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiInsertInmobiliaria = async obj => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Inmobiliaria`,
      data: obj
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const getAllInmobiliariasApi = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Inmobiliaria`
    });
    return res.data.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiListUsuarios = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Usuario`
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiInmoUsuarios = async (userId) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Usuario/GetUsuariosByAdminInmobiliariaId?usuarioId=${userId}`
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiListTiposDeContratos = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/TipoContrato`
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiUpdateCliente = async cliente => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${urlService}/api/Cliente`,
      data: cliente
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiInsertTipoContrato = async obj => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/TipoContrato`,
      data: obj
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiAddServicioBase = async obj => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/ServicioBase/AgregarServicioBase`,
      data: obj
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiListServiciosBases = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/ServicioBase/GetTodosLosServiciosBase`
    });
    return res.data.value.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiAddPlan = async obj => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Plan/AgregarPlan`,
      data: obj
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiListPlanes = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Plan`
    });

    return res;
  } catch (error) {
    return error.response;
  }
};

const apiGetPlanById = async planId => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Plan/GetPlanById/?planId=${planId}` //,
      // data: { planId }
    });
    //
    return res.data.value.data;
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
};

const apiGetOfertasByPublicacion = async id => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Oferta/GetOfertasByPublicacionId?publicacionId=${id}`
    });

    return res.data.value.data;
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
};

const apiAddValoracion = async valoracion => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/ValoracionUsuario/AddValoracionUsuario`,
      data: valoracion
    });

    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiUpdatePlan = async obj => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${urlService}/api/Plan/Actualizar`,
      data: obj
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiDeletePlan = async id => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `${urlService}/api/Plan/EliminarPlan?planId=${id}`
    });

    return res;
  } catch (error) {
    return error.response;
  }
};

const apiAddServicioAdicional = async data => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/ServicioAdicional/AgregarServicioAdicional`,
      data: data
    });

    return res;
  } catch (error) {
    return error.response;
  }
};

const apiListServicioAdicional = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/ServicioAdicional/GetAllServiciosAdicionales`
    });

    return res;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiDeleteServicioAdicional = async servicioAdicionalId => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `${urlService}/api/ServicioAdicional/DeleteServicioAdicionalById?servicioAdicionalId=${servicioAdicionalId}`
    });

    return res;
  } catch (error) {
    return error.response;
  }
};

const apiUpdateServicioAdicional = async servicioAdicional => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${urlService}/api/ServicioAdicional/UpdateServicioAdicional`,
      data: servicioAdicional
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiGetAllAgendas = async () => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Agenda/GetHorarioClientesConServicioAnfitrion`
    });
    return res;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiUpdateAgendaWithAnfitrion = async visita => {
  try {
    const res = await axios.put(
      `${urlService}/api/Agenda/UpdateVisitas`,
      visita
    );
    return res;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiAddFotografoAgenda = async bloquesFotografo => {
  try {
    const res = await axios.post(
      `${urlService}/api/Agenda/AddBloquesFotografo`,
      [...bloquesFotografo]
    );
    return res;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiAddClienteAgenda = async bloquesCliente => {
  try {
    const res = await axios.post(`${urlService}/api/Agenda/AddBloquesCliente`, [
      ...bloquesCliente
    ]);
    return res;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiUpdateClienteAgenda = async bloquesCliente => {
  try {
    const res = await axios.put(
      `${urlService}/api/Agenda/UpdateBloquesCliente`,
      [...bloquesCliente]
    );
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiUpdateFotografoAgenda = async bloquesFotografo => {
  try {
    const res = await axios.put(
      `${urlService}/api/Agenda/UpdateBloquesFotografo`,
      [...bloquesFotografo]
    );
    return res;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiDeletePropiedad = async (id, estaDisponible) => {
  try {
    const res = await axios.put(
      `${urlService}/api/propiedad/${id}/${estaDisponible}`
    );
    return res;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetBloquesFotografo = async id => {
  try {
    const res = await axios.get(
      `${urlService}/api/Agenda/GetBloquesFotografo${id}`
    );

    return res;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetBloquesCliente = async id => {
  try {
    const res = await axios.get(
      `${urlService}/api/Agenda/GetBloquesCliente?id=${id}`
    );

    return res;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetVisitaFotografoById = async id => {
  try {
    const res = await axios.get(
      `${urlService}/api/Agenda/GetVisitasFotografoByFotografoId?id=${id}`
    );

    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetVisitasFotografoByFecha = async (fecha) => {
  try {
      const res = await axios.get(
        `${urlService}/api/Agenda/GetVisitasFotografo/${fecha}`
      );
      return res.data.value;
  } catch (error) {
      console.error("error: ", error);
  }
};

const apiGetAgendaFotografo = async () => {
  try {
      const res = await axios.get(
          `${urlService}/api/Agenda/GetBloquesFotografos`
      );
      return res.data.value;
  } catch (error) {
      console.error("error: ", error);
  }
};

const apiCancelaVisitaFotografoById = async id => {
  try {
    const res = await axios.get(
      `${urlService}/api/Agenda/CancelarVisitaFotografo?visitaId=${id}`
    );

    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiPostUpdateUser = async data => {
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/Usuario/UpdateUsuario`,
      data
    });
    return res;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

const apiGetSignature = async (meetingNumber, role, proyectoId) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/zoom/meeting/connectionsignature?meetingNumber=${meetingNumber}&role=${role}&proyectoInmobiliarioId=${proyectoId}`
    });
    return res.data.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiPostProyecto = async (proyecto, IdInmobiliaria) => {
  console.log(proyecto)
  try {
    const res = await axios({
      method: "POST",
      url: `${urlService}/api/ProyectoInmobiliario?id=${IdInmobiliaria}`,
      data: proyecto
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiPutProyecto = async (proyecto, IdInmobiliaria) => {
  console.log(proyecto)
  try {
    const res = await axios({
      method: "PUT",
       url: `${urlService}/api/ProyectoInmobiliario/inmobiliaria/${IdInmobiliaria}`,
      data: proyecto
    });
    res.data.status = res.status
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};

//=============== LIVE ======================

const getAllProyectosApi = async userId => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/ProyectoInmobiliario`
    });
    return res.data.data;
  } catch (error) {
    return error.response.data;
  }
};

const getUserProyectosApi = async userId => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/ProyectoInmobiliario/GetAllProyectosByUsuarioId?usuarioId=${userId}`
    });
    return res.data.data;
  } catch (error) {
    return error.response.data;
  }
};

const getAllProyectosAgenteApi = async userId => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/ProyectoInmobiliario/usuario/${userId}`
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const getBloqueProyecto = async (id, proyectoId) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Agenda/GetBloquesAgente?id=${id}&proyectoId=${proyectoId}`
    });
    return res.data.value;
  } catch (error) {
    return error.response.data.value;
  }
};

const crearBloqueProyecto = async arr => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${urlService}/api/Agenda/UpdateBloquesAgente`,
      data: arr
    });
    return res.data.value;
  } catch (error) {
    return error.response.data;
  }
};

const getProyectos = async id => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/ProyectoInmobiliario/GetAllProyectosByInmobiliariaId?inmobiliariaId=${id}`
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const cancelVisitaAgende = async id => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `${urlService}/api/Agenda/CancelarVisitaAgente?visitaId=${id}`
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const getVisitasAgente = async id => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Agenda/GetVisitasAgente?id=${id}`
    });
    return res.data.value.data;
  } catch (error) {
    return error.response.data;
  }
};

const apiGetAgendaAllBLoquesProyecto = async id => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlService}/api/Agenda/GetAllBloquesAgenteByProjectId?proyectoId=${id}`
    });
    return res.data.value.data[0];
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiUpdateEstadoPropiedad = async (id, dataNuevoEstado) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${urlService}/api/Propiedad/${id}/CambiarEstado`,
      data: dataNuevoEstado
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiGetAllPropiedadesPaginadas = async (estado, idBroker, page, pageSize) => {
  try {
    const res = await axios({
      method: "GET", 
      url: `${urlService}/api/Propiedad/ListarPropiedades?estado=${estado}&idBroker=${idBroker}&page=${page}&pageSize=${pageSize}`
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiGetPropiedadById = async (id) => {
  try {
    const res = await axios({
      method: "GET", 
      url: `${urlService}/api/Propiedad/${id}`
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
};

const apiPostGenerarTarjetaProp = async (id) => {
  try {
    const res = await axios({
      method: "POST", 
      url: `${urlService}/api/Propiedad/GenerarTarjetaProp?IdPropiedad=${id}`
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiPostUploadDatosTasacion = async (file, tipo) => {
  try {
    const res = await axios({
      method: "POST", 
      url: `${urlService}/api/DatosTasacion/Upload?tipo=${tipo}`,
      data: file
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiDeleteAllDatosTasacion = async () => {
  try {
    const res = await axios({
      method: "DELETE", 
      url: `${urlService}/api/DatosTasacion/DeleteAll`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
}

const apiPostUploadPIPropiedades = async (tipo, file) => {
  try {
    const res = await axios({
      method: "POST", 
      url: `${urlService}/api/propiedadpi/upload/${tipo}`,
      data: file
    });
    return res;
  } catch (error) {
    return error.response;
  }
}

const apiGetSuscripcion = async (id) => {
  try {
    const res = await axios({
      method: "GET", 
      url: `${urlService}/api/suscripcion/${id}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
}

const apiPostSuscripcion = async (data) => {
  try {
    const res = await axios({
      method: "POST", 
      url: `${urlService}/api/suscripcion`,
      data: data
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
}

const apiGetSuscripcionExportar = async () => {
  try {
    const res = await axios({
      method: "GET", 
      url: `${urlService}/api/suscripcion/export/`,
      responseType: 'blob',
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
}

const apiGetSuscripcionLastUpdated = async () => {
  try {
    const res = await axios({
      method: "GET", 
      url: `${urlService}/api/suscripcion/lastupdate/`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
}

const apiGetUsuariosFiltrar = async (tipoCuenta) => {
  try {
    const res = await axios({
      method: "GET", 
      url: `${urlService}/api/usuario/FiltrarUsuarios?tipocuenta=${tipoCuenta}`,
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
}

const apiPutPropiedadAsignarBroker = async (idPropiedad, idBroker) => {
  try {
    const res = await axios({
      method: "PUT", 
      url: `${urlService}/api/propiedad/AsignarBroker?idPropiedad=${idPropiedad}&idBroker=${idBroker}`,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const apiGetSuscripciones = async (page, pageSize) => {
  try {
    const res = await axios({
      method: "GET", 
      url: `${urlService}/api/suscripcion?page=${page}&pageSize=${pageSize}`,
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
}

const apiUpdateSuscripcion = async (id, suscripcion) => {
  try {
    const res = await axios({
      method: "PUT", 
      url: `${urlService}/api/suscripcion/${id}`,
      data: suscripcion
    });
    return res.data.value;
  } catch (error) {
    console.error("error: ", error);
  }
}

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

const apiPostAgendarVisitaBrokerSuscriptor = async (data) => {
  try {
      const res = await axios({
          method: "POST",
          url: `${urlService}/api/Agenda/AgendarVisitaBrokerSuscriptor`,
          data: data
      });
      return res.data.value;
  } catch (error) {
      console.error("error: ", error);
  }
};

const apiGetVisitasFiltradas = async (fechaInicial, fechaFinal, idBroker, idSuscripcion, mostrarSoloSinConfirmar, mostrarSoloTramos, incluirVisitasPasadas, incluirVisitasFuturas) => {
  try {
      const res = await axios({
          method: "GET",
          url: `${urlService}/api/Agenda/FiltrarVisitas?fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}&idBroker=${idBroker}&idSuscripcion=${idSuscripcion}&mostrarSoloSinConfirmar=${mostrarSoloSinConfirmar}&mostrarSoloTramos=${mostrarSoloTramos}&incluirVisitasPasadas=${incluirVisitasPasadas}&incluirVisitasFuturas=${incluirVisitasFuturas}`,
      });
      return res.data.value;
  } catch (error) {
      console.error("error: ", error);
  }
};

const apiPostReferirEmbajador = async (postData) => {
  try {
      const res = await axios({
          method: "POST",
          url: `${urlService}/api/embajador/referir`,
          data: postData
      });
      return res;
  } catch (error) {
    return error.response;
  }
};

const apiPostBroker = async (brokerData) => {
  try {
      const res = await axios({
          method: "POST",
          url: `${urlService}/api/broker`,
          data: brokerData
      });
      return res.data;
  } catch (error) {
      console.error("error: ", error);
  }
};

const apiGetBrokerByEmail = async (email) => {
  try {
      const res = await axios({
          method: "GET",
          url: `${urlService}/api/broker/getbrokerbyemail?email=${email}`,
      });
      return res.data;
  } catch (error) {
      console.error("error: ", error);
  }
};

const apiPutBroker = async (id, brokerData) => {
  try {
      const res = await axios({
          method: "PUT",
          url: `${urlService}/api/broker/${id}`,
          data: brokerData
      });
      return res.data;
  } catch (error) {
      console.error("error: ", error);
  }
};

const apiPostCambiarContraseña = async (usuarioData) => {
  try {
      const res = await axios({
          method: "POST",
          url: `${urlService}/api/usuario/CambiarContraseña`,
          data: usuarioData
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

const apiPutConfirmarVisita = async (idVisita, realizada) => {
  try {
      const res = await axios({
          method: "PUT",
          url: `${urlService}/api/Agenda/ConfirmarVisita?idVisita=${idVisita}&realizada=${realizada}`,
      });

      return res.data.value;
  } catch (error) {
      console.error("error: ", error);
  }
};

const apiPostReferirVendedor = async (data) => {
  try {
      const res = await axios({
          method: "POST",
          url: `${urlService}/api/usuario/ReferirVendedor`,
          data
      });

      return res.data.value;
  } catch (error) {
      console.error("error: ", error);
  }
};

const apiGetVendedores = async (page, rowsPerPage) => {
  try {
      const res = await axios({
          method: "GET",
          url: `${urlService}/api/usuario/vendedores?page=${page}&rowsPerPage=${rowsPerPage}`
      });

      return res.data.value;
  } catch (error) {
      console.error("error: ", error);
  }
};

const apiPutUsuarioCambiarContactado = async (idUsuario) => {
  try {
    const res = await axios({
        method: "PUT",
        url: `${urlService}/api/usuario/cambiarcontactado?idUsuario=${idUsuario}`
    });

    return res;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

const apiGetAllBrokers = async () => {
  try {
      const res = await axios({
          method: "GET",
          url: `${urlService}/api/broker`
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

const apiGetUsuariosPaginados = async (pageSize, page, tipoCuenta, referidoPor, soloEmbajadores) => {
  try {
      const res = await axios({
          method: "GET",
          url: `${urlService}/api/Usuario/ListarUsuarios?page=${page}&pageSize=${pageSize}&referidoPor=${referidoPor}&soloEmbajadores=${soloEmbajadores}&tipoCuenta=${tipoCuenta}`
      });
      return res.data;
  } catch (error) {
      console.error("error: ", error);
  }
};

const apiGetLandingInmobiliarias = async () => {
  try {
      const res = await axios({
          method: "GET",
          url: `${urlService}/api/LandingInmobiliaria`
      });
      return res;
  } catch (error) {
      return error.response;
  }
};

const apiGetLandingInmobiliariaById = async (id) => {
  try {
      const res = await axios({
          method: "GET",
          url: `${urlService}/api/LandingInmobiliaria/${id}`
      });
      return res;
  } catch (error) {
      return error.response;
  }
};

const apiPostLandingInmobiliaria = async (data) => {
  try {
      const res = await axios({
          method: "POST",
          url: `${urlService}/api/LandingInmobiliaria`,
          data
      });
      return res;
  } catch (error) {
      return error.response;
  }
};

const apiPutLandingInmobiliaria = async (id, data) => {
  try {
      const res = await axios({
          method: "PUT",
          url: `${urlService}/api/LandingInmobiliaria/${id}`,
          data
      });
      return res;
  } catch (error) {
      return error.response;
  }
};


export default {
  fetchAddPropiedad,
  apiPostProyecto,
  apiGetVisitaFotografoById,
  apiGetVisitasFotografoByFecha,
  apiGetAgendaFotografo,
  apiCancelaVisitaFotografoById,
  apiAddUsuario,
  apiAddInmobiliaria,
  apiAddCliente,
  apiGetAllClientes,
  apiGetUsersByrol,
  apiInsertHorario,
  apiGetAllPropiedades,
  apiGetAllInmobiliarias,
  apiGetAllVisitas,
  apiGetAllRegiones,
  apiLoginUsuario,
  apiGetHorarioByUser,
  apiUpdatePropiedad,
  apiInsertInmobiliaria,
  getAllInmobiliariasApi,
  getAllProyectosApi,
  getAllProyectosAgenteApi,
  apiListUsuarios,
  apiUpdateCliente,
  apiUpdateInmobiliaria,
  apiListTiposDeContratos,
  apiInsertTipoContrato,
  apiAddServicioBase,
  apiListServiciosBases,
  apiAddPlan,
  apiListPlanes,
  apiGetPlanById,
  apiGetOfertasByPublicacion,
  apiAddValoracion,
  apiUpdatePlan,
  apiDeletePlan,
  apiAddServicioAdicional,
  apiListServicioAdicional,
  apiDeleteServicioAdicional,
  apiUpdateServicioAdicional,
  apiGetAllAgendas,
  apiUpdateAgendaWithAnfitrion,
  apiAddFotografoAgenda,
  apiDeletePropiedad,
  apiGetBloquesFotografo,
  apiAddClienteAgenda,
  apiGetBloquesCliente,
  apiUpdateClienteAgenda,
  apiUpdateFotografoAgenda,
  apiGetSignature,
  apiPostUpdateUser,
  apiPutProyecto,
  getBloqueProyecto,
  crearBloqueProyecto,
  getProyectos,
  cancelVisitaAgende,
  getVisitasAgente,
  getUserProyectosApi,
  apiInmoUsuarios,
  apiGetAgendaAllBLoquesProyecto,
  apiUpdateEstadoPropiedad,
  apiGetAllPropiedadesPaginadas,
  apiGetPropiedadById,
  apiPostGenerarTarjetaProp,
  apiPostUploadDatosTasacion,
  apiDeleteAllDatosTasacion,
  apiPostUploadPIPropiedades,
  apiGetSuscripcion,
  apiPostSuscripcion,
  apiGetSuscripcionExportar,
  apiGetSuscripcionLastUpdated,
  apiGetUsuariosFiltrar,
  apiPutPropiedadAsignarBroker,
  apiGetSuscripciones,
  apiUpdateSuscripcion,
  apiGetAgendaClienteByPropiedadId,
  apiGetVisitasClienteByFechaYId,
  apiPostAgendarVisitaBrokerSuscriptor,
  apiGetVisitasFiltradas,
  apiPostReferirEmbajador,
  apiPostBroker,
  apiGetBrokerByEmail,
  apiPutBroker,
  apiPostCambiarContraseña,
  apiGetUsuario,
  apiPutConfirmarVisita,
  apiPostReferirVendedor,
  apiGetVendedores,
  apiPutUsuarioCambiarContactado,
  apiGetAllBrokers,
  apiPostAgendaVisitaUsuario,
  apiGetUsuariosPaginados,
  apiGetLandingInmobiliarias,
  apiGetLandingInmobiliariaById,
  apiPostLandingInmobiliaria,
  apiPutLandingInmobiliaria
};