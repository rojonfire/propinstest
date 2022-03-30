using Corretaje.Service.IServices.IVisita.IVisitaBrokerSuscriptor;
using Corretaje.Service.Services.Visita.VisitaBase;
using MongoDB.Driver;
using System;

namespace Corretaje.Service.Services.Visita.VisitaBrokerSuscriptor
{
    public class VisitaBrokerSuscriptorQueryFiltro : VisitaQueryFiltro<Domain.Agenda.VisitaBrokerSuscriptor>, IVisitaBrokerSuscriptorQueryFiltro
    {
        public FilterDefinition<Domain.Agenda.VisitaBrokerSuscriptor> Filter(string fechaInicial, string fechaFinal, string idBroker = null, string idSuscripcion = null, bool mostrarSoloSinConfirmar = false, bool incluirTodasLasVisitasPasadas = false, bool incluirTodasLasVisitasFuturas = false)
        {
            FilterDefinition<Domain.Agenda.VisitaBrokerSuscriptor> filter = FilterDefinition<Domain.Agenda.VisitaBrokerSuscriptor>.Empty;
            if (fechaInicial != null && fechaInicial != "")
            {
                DateTime fechaInicialFormatted = Convert.ToDateTime(fechaInicial);

                if (fechaFinal != null && fechaFinal != "")
                {
                    DateTime fechaFinalFormatted = Convert.ToDateTime(fechaFinal);
                    filter &= FindByRangoFechas(fechaInicialFormatted, fechaFinalFormatted);

                } else {
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

        private FilterDefinition<Domain.Agenda.VisitaBrokerSuscriptor> FindByBrokerId(string brokerId)
        {
            return Builders<Domain.Agenda.VisitaBrokerSuscriptor>.Filter.Where(visitaBrokerSuscriptor => visitaBrokerSuscriptor.IdBroker == brokerId);
        }

        private FilterDefinition<Domain.Agenda.VisitaBrokerSuscriptor> FindBySuscripcionId(string suscripcionId)
        {
            return Builders<Domain.Agenda.VisitaBrokerSuscriptor>.Filter.Where(visitaBrokerSuscriptor => visitaBrokerSuscriptor.IdSuscripcion == suscripcionId);
        }
        /*
        private FilterDefinition<Domain.Agenda.VisitaBrokerSuscriptor> FindByFecha(DateTime fecha)
        {
            return Builders<Domain.Agenda.VisitaBrokerSuscriptor>.Filter.Where(visitaBrokerSuscriptor => visitaBrokerSuscriptor.Fecha == fecha);
        }
        */
    }
}
