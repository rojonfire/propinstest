using Corretaje.Service.IServices.IVisita.IVisitaVirtual;
using Corretaje.Service.Services.Visita.VisitaBase;
using MongoDB.Driver;

namespace Corretaje.Service.Services.Visita.VisitaVirtual
{
    public class VisitaVirtualQueryFiltro : VisitaQueryFiltro<Domain.Agenda.VisitaVirtual>, IVisitaVirtualQueryFiltro
    {
        public FilterDefinition<Domain.Agenda.VisitaVirtual> FindByPropiedadIdAndMesAnio(string IdPropiedad, string MesAnio)
        {
            FilterDefinition<Domain.Agenda.VisitaVirtual> filter = FilterDefinition<Domain.Agenda.VisitaVirtual>.Empty;

            filter &= FindByPropiedadId(IdPropiedad);

            filter &= FindByMesAnio(MesAnio);

            return filter;
        }

        private FilterDefinition<Domain.Agenda.VisitaVirtual> FindByMesAnio(string MesAnio)
        {
            return Builders<Domain.Agenda.VisitaVirtual>.Filter.Where(v => v.MesAnioVisita == MesAnio);
        }
    }
}

    
