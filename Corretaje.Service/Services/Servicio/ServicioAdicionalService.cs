using Corretaje.Repository;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IServicio;

namespace Corretaje.Service.Services.Servicio
{
    public class ServicioAdicionalService<T> : ServicioService<T> where T : Entity
    {
        public ServicioAdicionalService(
            IRepository<T> repositoryServicioAdicional,
            IRespuestaDelServicio respuestaDelServicio,
            IServicioQueryFiltro<T> servicioQueryFiltro) : base(repositoryServicioAdicional, respuestaDelServicio, servicioQueryFiltro)
        {

        }
    }
}
