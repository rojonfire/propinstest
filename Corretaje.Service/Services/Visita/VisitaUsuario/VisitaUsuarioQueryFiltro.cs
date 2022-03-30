using Corretaje.Service.IServices.IVisita.IVisitaUsuario;
using Corretaje.Service.Services.Visita.VisitaBase;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Corretaje.Service.Services.Visita.VisitaUsuario
{
    public class VisitaUsuarioQueryFiltro : VisitaQueryFiltro<Domain.Agenda.VisitaUsuario>, IVisitaUsuarioQueryFiltro
    {
        public FilterDefinition<Domain.Agenda.VisitaUsuario> FindByUsuarioIdAndFecha(string id, DateTime fecha)
        {
            return Builders<Domain.Agenda.VisitaUsuario>.Filter.Where(
                visitaUsuario =>
                visitaUsuario.UsuarioId == id &&
                visitaUsuario.Fecha >= fecha);
        }

        public FilterDefinition<Domain.Agenda.VisitaUsuario> Filter(string fechaInicial, string fechaFinal, string idBroker = null, string idSuscripcion = null, bool mostrarSoloSinConfirmar = false, bool incluirTodasLasVisitasPasadas = false, bool incluirTodasLasVisitasFuturas = false)
        {
            FilterDefinition<Domain.Agenda.VisitaUsuario> filter = FilterDefinition<Domain.Agenda.VisitaUsuario>.Empty;
            if (fechaInicial != null && fechaInicial != "")
            {
                DateTime fechaInicialFormatted = Convert.ToDateTime(fechaInicial);

                if (fechaFinal != null && fechaFinal != "")
                {
                    DateTime fechaFinalFormatted = Convert.ToDateTime(fechaFinal);
                    filter &= FindByRangoFechas(fechaInicialFormatted, fechaFinalFormatted);

                }
                else
                {
                    if (incluirTodasLasVisitasPasadas)
                    {
                        filter &= FindByOlderThanDate(fechaInicialFormatted);
                    }
                    else if (incluirTodasLasVisitasFuturas)
                    {
                        filter &= FindByNewerThanDate(fechaInicialFormatted);
                    }
                    else
                    {
                        filter &= FindByFecha(fechaInicialFormatted);
                    }
                }
            }


            if (mostrarSoloSinConfirmar)
            {
                filter &= FindByVisitaSinConfirmar();
            }

            if (idBroker != null && idBroker != "")
            {
                filter &= FindByBrokerId(idBroker);
            }

            if (idSuscripcion != null && idSuscripcion != "")
            {
                filter &= FindBySuscripcionId(idSuscripcion);
            }

            return filter;
        }

        private FilterDefinition<Domain.Agenda.VisitaUsuario> FindByBrokerId(string brokerId)
        {
            return Builders<Domain.Agenda.VisitaUsuario>.Filter.Where(visitaBrokerSuscriptor => visitaBrokerSuscriptor.IdBroker == brokerId);
        }

        private FilterDefinition<Domain.Agenda.VisitaUsuario> FindBySuscripcionId(string suscripcionId)
        {
            return Builders<Domain.Agenda.VisitaUsuario>.Filter.Where(visitaBrokerSuscriptor => visitaBrokerSuscriptor.IdSuscripcion == suscripcionId);
        }

        public FilterDefinition<Domain.Agenda.VisitaUsuario> FindByClientesId(IEnumerable<string> clientesId)
        {
            return Builders<Domain.Agenda.VisitaUsuario>.Filter.Where(visitaUsuario => clientesId.Contains(visitaUsuario.ClienteId));
        }
    }
}
