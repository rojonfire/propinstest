using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IVisita.IVisitaBase;
using MongoDB.Driver;

namespace Corretaje.Service.IServices.IVisita.IVisitaVirtual
{
    public interface IVisitaVirtualQueryFiltro : IVisitaQueryFiltro<VisitaVirtual>
    {
        FilterDefinition<Domain.Agenda.VisitaVirtual> FindByPropiedadIdAndMesAnio(string IdPropiedad, string MesAnio);
    }
}
