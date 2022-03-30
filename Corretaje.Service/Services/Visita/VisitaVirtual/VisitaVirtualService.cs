using Corretaje.Repository;
using Corretaje.Service.IServices.IVisita.IVisitaVirtual;
using System.Threading.Tasks;
using System.Linq;

namespace Corretaje.Service.Services.Visita.VisitaVirtual
{
    public class VisitaVirtualService : VisitaBase.VisitaService<Domain.Agenda.VisitaVirtual>, IVisitaVirtualService
    {
        private readonly IVisitaVirtualQueryFiltro _visitaVirtualQueryFiltro;
        private readonly IVisitaVirtualEmail _visitaVirtualEmail;

        public VisitaVirtualService(
           IRepository<Domain.Agenda.VisitaVirtual> repository, 
           IVisitaVirtualEmail visitaVirtualEmail, 
           IVisitaVirtualQueryFiltro visitaVirtualQueryFiltro) : base(repository, visitaVirtualQueryFiltro)
        {
            _visitaVirtualQueryFiltro = visitaVirtualQueryFiltro;
            _visitaVirtualEmail = visitaVirtualEmail;
        }

        public async Task<Domain.Agenda.VisitaVirtual> GetByPropiedadIdAndMesAnio(string IdPropiedad, string MesAnio)
        {
            var results = await _repository.SearchFor(_visitaVirtualQueryFiltro.FindByPropiedadIdAndMesAnio(IdPropiedad, MesAnio));

            return results.FirstOrDefault();
        }

        public async Task<Domain.Agenda.VisitaVirtual> IncrementarCantidadVisitas(string IdPropiedad, string MesAnio)
        {
            var visita = await GetByPropiedadIdAndMesAnio(IdPropiedad, MesAnio);
            if (visita == null)
            {
                return await Add(new Domain.Agenda.VisitaVirtual()
                {
                    PropiedadId = IdPropiedad,
                    MesAnioVisita = MesAnio,
                });

            } else
            {
                visita.CantidadVisitas += 1;
                return await Update(visita);
            }
        }

    }
}
