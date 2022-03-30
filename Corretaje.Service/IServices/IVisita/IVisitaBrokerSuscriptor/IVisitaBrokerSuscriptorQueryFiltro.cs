using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IVisita.IVisitaBase;
using MongoDB.Driver;

namespace Corretaje.Service.IServices.IVisita.IVisitaBrokerSuscriptor
{
    public interface IVisitaBrokerSuscriptorQueryFiltro : IVisitaQueryFiltro<VisitaBrokerSuscriptor>
    {
        FilterDefinition<VisitaBrokerSuscriptor> Filter(string fechaInicial, string fechaFinal, string idBroker, string idSuscripcion, bool mostrarSoloSinConfirmar, bool incluirTodasLasVisitasPasadas = false, bool incluirTodasLasVisitasFuturas = false);
    }
}
