using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IVisita.IVisitaBase;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IVisita.IVisitaVirtual
{
    public interface IVisitaVirtualService : IVisitaService<VisitaVirtual>
    {
        Task<VisitaVirtual> GetByPropiedadIdAndMesAnio(string IdPropiedad, string MesAnio);

        Task<VisitaVirtual> IncrementarCantidadVisitas(string IdPropiedad, string MesAnio);
    }
}
